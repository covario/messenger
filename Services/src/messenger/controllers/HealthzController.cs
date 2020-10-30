using Microsoft.AspNetCore.Mvc;

namespace Covario.Messenger.Controllers
{
    [ApiController]
    [Route("healthz")]
    public class HealthzController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var healthStatus = new
            {
                status = "Healthy",
                totalDuration = @"00:00:00.001",
                entries =
                    new
                    {
                        self = new
                        {
                            data = new { },
                            description = "messenger",
                            duration = @"00:00:00.001",
                            status = "Healthy"
                        }
                    }
            };

            return Ok(healthStatus);
        }
    }
}
