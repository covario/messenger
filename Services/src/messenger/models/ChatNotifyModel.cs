using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace covario.ChatApp.Models
{
    public class ChatNotifyModel
    {
        public ChatNotifyModel(Chat chat, string name)
        {
            ChatId = chat.ChatId;
            ChatName = name;
        }

        public string ChatId { get; set; }

        public string ChatName { get; set; }
    }
}
