using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using covario.ChatApp.Models;
using covario.ChatApp.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace covario.ChatApp.Hub
{
    public class ChatAppHub: Hub<IChatAppHub>
    {
        private readonly ILogger<ChatAppHub> _logger;
        private readonly IChatService _chatService;

        public ChatAppHub(ILogger<ChatAppHub> logger, IChatService chatService)
        {
            _logger = logger;
            _chatService = chatService;
        }
        
        #region "Events"

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _chatService.Disconnect(this.Context.ConnectionId);
            
            return base.OnDisconnectedAsync(exception);
        }

        #endregion

        #region "Client side actions"

        public async Task<IEnumerable<Contact>> GetContacts()
        {
            _logger.LogInformation("ConnectionId = {ConnectionId}", Context.ConnectionId);
            
            return _chatService.GetContactForConnection(Context.ConnectionId);
        }
        
        public async Task<Contact> Login(string username, string password)
        {
            _logger.LogInformation("ConnectionId = {ConnectionId}", Context.ConnectionId);

            var user = _chatService.SimpleLogin(Context.ConnectionId, username, password);
            if (user != null)
            {
                _logger.LogInformation("New Login for {username}", username);
                return new Contact(user, null);
            }

            _logger.LogWarning("Failed login for {username}", password);
            throw new UnauthorizedAccessException();
        }

        public async Task Logout()
        {
            _chatService.Disconnect(this.Context.ConnectionId);
        }

        public async Task OpenChat(string chatId)
        {
            var chat = _chatService.ResumeChat(this.Context.ConnectionId, chatId);
            var connectedUserId = _chatService.ConnectedProfile(this.Context.ConnectionId).UserId;
            var participants = chat.Participants.Except(new[] {connectedUserId});
            var name = chat.Participants.Length == 1 ? "Chat with " + _chatService.GetNames(participants.ToArray()) : "Group Chat";
            
            await Clients.All.OpenChatNotify(new ChatNotifyModel(chat, name));
        }

        public async Task<string> NewChat(string[] participants)
        {
            var chat = _chatService.StartChat(this.Context.ConnectionId, participants);
            await _chatService.SendChatNotifications(chat);

            return chat.ChatId;
        }

        public async Task<string> SendMessage(string chatId, string sentDateTime, string messageText)
        {
            DateTime sentDateTimeParm = DateTime.Parse(sentDateTime);
            var messageId = _chatService.SendMessage(this.Context.ConnectionId, chatId, null, sentDateTimeParm, messageText);

            return messageId;
        }

        #endregion
    }
}
