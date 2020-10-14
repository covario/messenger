using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using covario.ChatApp.Models;

namespace covario.ChatApp.Hub
{
    /// <summary>
    /// Defined the calls that will be executed on the client by the server
    /// </summary>
    public interface IChatAppHub
    {
        #region "Server side actions"

        Task Login(string username, string password);

        Task Logout();

        Task GetContacts();

        Task OpenChat(string chatId);

        Task NewChat(string[] participants);

        Task SendMessage(string chatId, string sentDateTime, string messageText);

        #endregion

        #region "Client side events"

        Task ContactNotify(Contact contact);

        Task OpenChatNotify(ChatNotifyModel chat);

        Task MessageNotify(Message message);

        #endregion
    }
}
