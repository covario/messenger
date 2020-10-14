using System.Text.Json.Serialization;

namespace covario.ChatApp.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ConnectionStatusEnum
    {
        Offline,
        Online
    }
}