using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using covario.ChatApp.Hub;
using covario.ChatApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace covario.ChatApp.Controllers
{
    [ApiController]
    [Route("/api/contacts")]
    public class ContactsController : ControllerBase
    {
        private readonly ILogger<ContactsController> _logger;
        private readonly IHubContext<ChatAppHub, IChatAppHub> _hub;
        private readonly IChatService _chatService;

        public ContactsController(ILogger<ContactsController> logger, IHubContext<ChatAppHub, IChatAppHub> hub, IChatService chatService)
        {
            _logger = logger;
            _hub = hub;
            _chatService = chatService;
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            _logger.LogInformation("ConnectionId = {ConnectionId}", HttpContext.Connection.Id); 
            foreach (var c in _chatService.GetContactForConnection(HttpContext.Connection.Id))
            {
                await _hub.Clients.All.ContactNotify(c);
            }
            return Ok();
        }
    }
}
