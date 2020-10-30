using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Covario.Messenger.Controllers
{
    [ApiController]
    [Route("/openfin")]
    public class ConfigController : Controller
    {
        private readonly ILogger<ConfigController> _logger;
        private readonly IWebHostEnvironment _env;

        public ConfigController(ILogger<ConfigController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        [HttpGet]
        [Route("/openfin/{clientName}")]
        public IActionResult Get(string clientName)
        {
            var configFile = Path.Combine(_env.ContentRootPath, "OpenFinConfig", $"{clientName}.json");
            string config;

            if (System.IO.File.Exists(configFile))
                config = System.IO.File.ReadAllText(configFile);
            else
            {
                _logger.LogWarning("Request for OpenFinConfig from unknown host {application}", clientName);
                configFile = Path.Combine(_env.ContentRootPath, "OpenFinConfig", $"_default.json");
                config = System.IO.File.ReadAllText(configFile).Replace("{application}", clientName);
            }

            return Content(config, "application/json");
        }
    }
}