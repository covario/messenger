using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using covario.ChatApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace covario.ChatApp.Controllers
{
    [ApiController]
    [Route("healthz")]
    public class HealthzController : ControllerBase
    {
        private readonly ILogger<HealthzController> _logger;

        private static readonly IHealthEntry _serviceStatus = new ChatAppHealthEntry
        {
            Status = HealthStatusCode.Healthy,
            Duration = new TimeSpan(100),
            Data = new HealthEntryData()
        };

        public HealthzController(ILogger<HealthzController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var allHealth = new IHealthEntry[] { _serviceStatus };

            var status = _serviceStatus.Status;
            var healthStatus = new
            {
                status = status.ToString(),
                totalDuration = new DateTime(allHealth.Sum(h => h.Duration.Ticks)).ToString(@"HH:mm:ss.fff"),
                entries = allHealth.Select(h =>
                    new
                    {
                        self = new
                        {
                            data = new { },
                            description = "messenger",
                            duration = new DateTime(h.Duration.Ticks).ToString(@"HH:mm:ss.fff"),
                            status = "Healthy"
                        }
                    })
            };

            if (status == HealthStatusCode.Healthy)
            {
                return Ok(healthStatus);
            }

            return StatusCode((int)HttpStatusCode.ServiceUnavailable, healthStatus);
        }
    }
}
