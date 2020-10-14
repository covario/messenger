using System;
using System.Collections.Generic;

namespace covario.ChatApp.Models
{
    public class Chat
    {
        public string ChatId { get; set; }

        public string CreatedDateTime { get; set; }

        public string[] Participants { get; set; }

        public List<Message> Messages { get; } = new List<Message>();

        public Chat(string[] participants)
        {
            CreatedDateTime = DateTime.Now.ToString();
            ChatId = Guid.NewGuid().ToString("N");
            Participants = participants;
        }
    }
}