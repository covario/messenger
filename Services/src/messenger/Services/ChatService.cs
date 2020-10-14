using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Disposables;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using covario.ChatApp.Hub;
using covario.ChatApp.Models;
using Covario.ChatApp.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace covario.ChatApp.Services
{
    public class ChatService: IChatService
    {
        private readonly ILogger<ChatService> _logger;
        private readonly IHubContext<ChatAppHub, IChatAppHub> _hub;
        private readonly ConcurrentDictionary<string, Connection> _activeConnections;
        private ConcurrentDictionary<string, UserProfile> _users;
        private ConcurrentDictionary<string, Chat> _chats = new ConcurrentDictionary<string, Chat>();
        public readonly Subject<Message> Messages;
        public readonly Subject<Contact> ContactChange;
        public Subject<UserProfile> UserProfileChange { get; }
        public readonly Subject<Chat> Chat;
        public readonly IObservable<long> ClientHealth;
        public readonly IDisposable ClientWatcher;

        private static UserProfile[] _dummyProfiles = {};
        
        public ChatService(ILogger<ChatService> logger, IHubContext<ChatAppHub, IChatAppHub> hub)
        {
            _logger = logger;
            _hub = hub;
            _activeConnections = new ConcurrentDictionary<string, Connection>();
            _users  = new ConcurrentDictionary<string, UserProfile>();
            foreach (var user in _dummyProfiles)
            {
                _users.TryAdd(user.UserId, user);
                foreach (var contact in _dummyProfiles)
                {
                    
                    _users.TryAdd(user.UserId, user);
                }
            }
            
            // Add all contacts to all users
            foreach (var user in _users.Values)
            {
                foreach (var contact in _users.Values)
                {
                    if (user != contact)
                    {
                        user.Contacts.Add(contact);
                    }
                }
            }

            Messages = new Subject<Message>();
            ContactChange = new Subject<Contact>();
            UserProfileChange = new Subject<UserProfile>();
            Chat = new Subject<Chat>();
            ClientHealth = Observable.Interval(TimeSpan.FromSeconds(3));
            ClientWatcher = ClientHealth.Subscribe(l => keepAlive());
            UserProfileChange.Subscribe(publishUserProfileChanges);
            Messages.Subscribe(publishMessage);
        }

        private async void publishMessage(Message message)
        {
            var chat = _chats[message.ChatId];
            var subscribers = chat.Participants.SelectMany(p => _users[p].Connections, (p, c) => c.ConnectionId).ToList();

            // Notify the user
            await _hub.Clients.Clients(subscribers).MessageNotify(message);
        }

        private async void publishUserProfileChanges(UserProfile user)
        {
            // Notify the user
            foreach (var notify in GetUserUpdateNotifications(user))
            {
                await _hub.Clients.Clients(notify.connectionId).ContactNotify(notify.contact);
            }
        }


        private void keepAlive()
        {
            foreach (var user in _users.Values)
            {
                if (user.Connections.Count == 0)
                {
                    if (user.ConnectionStatus != ConnectionStatusEnum.Offline)
                    {
                        user.ConnectionStatus = ConnectionStatusEnum.Offline;
                        UserProfileChange.OnNext(user);
                    }
                }
                else
                {
                    user.LastSeen = DateTime.Now;
                    user.ConnectionStatus = ConnectionStatusEnum.Online;
                    UserProfileChange.OnNext(user);
                }
            }
        }

        public IEnumerable<(string connectionId, Contact contact)> GetUserUpdateNotifications(UserProfile user)
        {
            // All other users that have this user as a contact
            // Combine the user and contact with any direct chats to create a contact notification
            // Return the contact for all connections
            return
                _users.Where(u => u.Value != user && u.Value.Contacts.Contains(user))
                    .Select(u => (connections: u.Value.Connections, contact: new Contact(user, user.Chats.FirstOrDefault(c => c.Participants.Length == 2 && c.Participants.Contains(user.UserId))?.ChatId)))
                    .SelectMany(p => p.connections, (p, c) => (c.ConnectionId, p.contact));
        }

        public async Task SendChatNotifications(Chat chat)
        {
            var notifications = chat.Participants.SelectMany(p => GetChatNotifications(chat, p));
            foreach (var notification in notifications)
            {
                await _hub.Clients.Client(notification.connectionId).OpenChatNotify(notification.chatNotifyModel);
            }
        }

        public IEnumerable<(string connectionId, ChatNotifyModel chatNotifyModel)> GetChatNotifications(Chat chat)
        {
            return chat.Participants.SelectMany(p => GetChatNotifications(chat, p));
        }

        private IEnumerable<(string connectionId, ChatNotifyModel chatNotifyModel)> GetChatNotifications(Chat chat, string participantId)
        {
            string name;
            if (chat.Participants.Length == 2)
            {
                name = GetNames(chat.Participants.Except(new[] { participantId }).ToArray());
            }
            else
            {
                name = "Group Chat";
            }

            return _users[participantId].Connections.Select(c => (connectionId: c.ConnectionId, chatNotifyModel : new ChatNotifyModel(chat, name)));
        }

        public IEnumerable<Contact> GetContactForUser(UserProfile user)
        {
            return
                user.Contacts.Select(c => 
                    new Contact(c, user.Chats.FirstOrDefault(c => c.Participants.Length == 2 && c.Participants.Contains(user.UserId))?.ChatId));
        }

        public IEnumerable<Contact> GetContactForConnection(string connectionId)
        {
            return GetContactForUser(_activeConnections[connectionId].UserProfile);
        }

        private Chat GetChatForParticipants(bool withCreate, params string[] participants)
        {
            Chat chat;

            // Need to change to reader writer locks
            lock (_chats)
            {
                chat = _chats.Values.FirstOrDefault(c => 
                    c.Participants.Intersect(participants).Count() == participants.Length);
                if (chat == null && withCreate)
                {
                    chat = new Chat(participants);
                    _chats.TryAdd(chat.ChatId, chat);
                }
            }
            
            return chat;
        }
        
        public UserProfile SimpleLogin(string connectionId, string username, string password)
        {
            var user = _dummyProfiles.SingleOrDefault(u => u.UserName == username);
            if (user == null)
                return null;

            if (user.Password != password)
                return null;

            var connection = new Connection(connectionId, user);

            if (!_activeConnections.TryAdd(connectionId, connection))
            {
                // Need to explain this some more
                return null;
            }

            user.Connections.Add(connection);

            return user;
        }

        public UserProfile ConnectedProfile(string connectionId)
        {
            if (_activeConnections.TryGetValue(connectionId, out var connection))
            {
                return connection.UserProfile;
            }
            return null;
        }

        public bool Disconnect(string connectionId)
        {
            Connection connection;

            if (_activeConnections.TryRemove(connectionId, out connection))
            {
                connection.UserProfile.Connections.Remove(connection);

                return true;
            }

            // Not logged in
            return false;
        }

        public Chat StartChat(string connectionId, string[] contacts)
        {
            if (_activeConnections.TryGetValue(connectionId, out var connection))
            {
                var participants = new string[contacts.Length + 1];
                Array.Copy(contacts, participants,1);
                participants[contacts.Length] = connection.UserProfile.UserId;

                var chat = GetChatForParticipants(true, participants);
                return chat;
            }

            // Need to handle exception process
            return null;
        }

        public string GetNames(params string[] users)
        {
            return string.Join(", ",users.Select(u => _users[u].DisplayName));
        }

        public Chat ResumeChat(string connectionId, string chatId)
        {
            if (_activeConnections.TryGetValue(connectionId, out var connection))
            {
                Chat chat;
                lock (_chats)
                {
                    chat = _chats[chatId];
                }
                return chat;
            }

            return null;
        }

        public string SendMessage(string connectionId, string chatId, string messageId, DateTime sentDateTime, string messageText)
        {
            if (_activeConnections.TryGetValue(connectionId, out var connection))
            {
                Chat chat;
                lock (_chats)
                {
                    chat = _chats[chatId];
                }

                // Need to handle invalid chatId
                if (chat == null)
                    return null;

                var message = new Message(
                    chat,
                    connection.UserProfile.UserId,
                    messageId ?? Guid.NewGuid().ToString("N"),
                    DateTime.Now,
                    messageText);

                chat.Messages.Add(message);

                Messages.OnNext(message);

                return message.MessageId;
            }
            
            // Need to handle invalid connection
            return null;
        }

        public string GetHistory(string chatId)
        {
            throw new NotImplementedException();
        }
    }
}
