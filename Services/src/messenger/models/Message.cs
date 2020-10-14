using System;

namespace covario.ChatApp.Models
{
    public class Message
    {
        public Message(Chat chat, string senderUserId, string messageId, DateTime sentDateTime, string messageText)
        {
            _chat = chat;
            SenderUserId = senderUserId;
            MessageId = messageId;
            SentDateTime = sentDateTime;
            MessageText = messageText;
        }

        private readonly Chat _chat;
        
        public string ChatId => _chat.ChatId;

        public string SenderUserId { get; set; }

        public string MessageId { get; set; }

        public DateTime SentDateTime { get; set; }

        public string MessageText { get; set; }
    }
}