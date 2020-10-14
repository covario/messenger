using System;

namespace covario.ChatApp.Models
{
    public interface IHealthEntry
    {
        IHealthEntryData Data { get; }

        string Description { get; }

        TimeSpan Duration { get; }

        HealthStatusCode Status { get; }
    }
}