using System;
using System.Collections.Generic;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using covario.ChatApp.Models;
using Microsoft.AspNetCore.Connections.Features;

namespace covario.ChatApp.Services
{
    public interface IChatService
    {
        Subject<UserProfile> UserProfileChange { get; }

        IEnumerable<(string connectionId, Contact contact)> GetUserUpdateNotifications(UserProfile user);

        IEnumerable<Contact> GetContactForUser(UserProfile user);
        
        IEnumerable<Contact> GetContactForConnection(string connectionId);

        UserProfile SimpleLogin(string connectionId, string username, string password);

        bool Disconnect(string connectionId);

        UserProfile ConnectedProfile(string connectionId);

        string GetNames(params string[] users);

        Chat StartChat(string connectionId, string[] contacts);

        Chat ResumeChat(string connectionId, string chatId);

        Task SendChatNotifications(Chat chat);

        string SendMessage(string connectionId, string chatId, string messageId, DateTime sentDateTime, string messageText);
        
        string GetHistory(string chatId);
    }
}