using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using covario.ChatApp.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace covario.ChatApp.Controllers
{
    [ApiController]
    [Route("/openfin")]
    [Produces("application/json")]
    public class OpenFinController : ControllerBase
    {
        private readonly ILogger<OpenFinController> _logger;
        private readonly IWebHostEnvironment _env;

        public OpenFinController(ILogger<OpenFinController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        [HttpGet]
        [Route("/openfin")]
        public IActionResult Get()
        {
            return Get(@"telegram");
        }

        [HttpGet]
        [Route("/openfin/{clientName}")]
        public IActionResult Get(string clientName)
        {
            clientName = clientName.ToLower();
            var title = clientName[0].ToString().ToUpper() + clientName.Remove(0, 1);
            var config = new OpenFinAppConfig
            {
                Startup = new OpenFinAppConfig.StartupAppModel
                {
                    Name = $"Covario {title} application",
                    Url = $"https://messenger.covar.io/{clientName}/index.html",
                    Icon = $"https://messenger.covar.io/{clientName}/favicon.ico",
                    TaskbarIcon = $"https://messenger.covar.io/{clientName}/favicon.ico",
                    Uuid = "4f6b4434-39da-4744-bb5c-a92f95b54294",
                    ContextMenu = true
                },
                Shortcut = new OpenFinAppConfig.ShortcutModel
                {
                    Company = "Covario",
                    Icon = $"https://messenger.covar.io/{clientName}/favicon.ico",
                    Name = $"Covario Messenger",
                    Description = $"Covario Messenger",
                    UninstallShortcut = true
                }
            };

            return new JsonResult(config, new JsonSerializerOptions
            {
                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                IgnoreNullValues = true
            }) { StatusCode = (int)HttpStatusCode.OK };
        }
    }
}
