using covario.ChatApp.Services;

namespace Covario.ChatApp.Services
{
    public class Connection
    {
        public Connection(string connectionId, UserProfile userProfile)
        {
            ConnectionId = connectionId;
            UserProfile = userProfile;
        }

        public string ConnectionId { get; }

        public UserProfile UserProfile { get; }
    }
}