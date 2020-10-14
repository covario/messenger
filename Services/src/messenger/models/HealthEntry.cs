using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace covario.ChatApp.Models
{
    public abstract class HealthEntry: IHealthEntry
    {
        public IHealthEntryData Data { get; set; }

        public abstract string Description { get; }

        public TimeSpan Duration { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public HealthStatusCode Status { get; set; }
    }
}
