using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using covario.ChatApp.Services;

namespace covario.ChatApp.Models
{
    public class Contact
    {
        private UserProfile _userProfile;

        public Contact(UserProfile userProfile, string directChatId = null)
        {
            DirectChatId = directChatId;
            _userProfile = userProfile;
        }

        public string UserId => _userProfile.UserId;

        public string DirectChatId { get; set; }

        public string DisplayName => _userProfile.DisplayName;

        public DateTime LastSent => _userProfile.LastSent;

        public DateTime LastSeen => _userProfile.LastSeen;

        public ConnectionStatusEnum ConnectionStatus => _userProfile.ConnectionStatus;
    }
}
