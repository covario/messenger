using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using covario.ChatApp.Models;
using Covario.ChatApp.Services;

namespace covario.ChatApp.Services
{
    public class UserProfile
    {
        public string UserId { get; set; } = Guid.NewGuid().ToString("N");

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string DisplayName { get; set; }

        public DateTime LastSent { get; set; }

        public DateTime LastSeen { get; set; }
        
        public List<Connection> Connections { get; } = new List<Connection>();

        public ConnectionStatusEnum ConnectionStatus { get; set; } = ConnectionStatusEnum.Offline;

        public List<Chat> Chats { get; } = new List<Chat>();

        public List<UserProfile> Contacts { get; } = new List<UserProfile>();
    }
}