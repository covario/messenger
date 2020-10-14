using System;
using System.Text.Json.Serialization;

namespace covario.ChatApp.Models
{
    public class OpenFinAppConfig
    {
        [JsonPropertyName("startup_app")]
        public StartupAppModel Startup { get; set; } = new StartupAppModel();

        public ShortcutModel Shortcut { get; set; } = new ShortcutModel();

        public RunTimeModel Runtime { get; set; } = new RunTimeModel();

        public class StartupAppModel
        {
            public string Name { get; set; }
            public string Url { get; set; }
            public string Icon { get; set; }
            public string TaskbarIcon { get; set; }
            public bool Frame { get; set; } = false;
            public bool AutoShow { get; set; } = true;
            public int DefaultWidth { get; set; } = 1000;
            public int DefaultHeight { get; set; } = 1000;
            public int MinWidth { get; set; } = 1000;
            public bool DefaultCentered { get; set; } = true;
            public bool ContextMenu { get; set; } = false;
            public bool Shadow { get; set; } = true;
            public string Uuid { get; set; } = Guid.NewGuid().ToString();
            public bool EnableAppLogging { get; set; } = true;
        }

        public class ShortcutModel
        {
            public string Company { get; set; }
            public string Icon { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string[] Target { get; set; } = new[] {"start-menu", "desktop"};
            public bool Force { get; set; } = true;

            [JsonPropertyName("uninstall-shortcut")]
            public bool UninstallShortcut { get; set; } = false;
        }

        public class RunTimeModel
        {
            public string Arguments { get; set; } = "--v=1 --diagnostics --log-net-log=%localappdata%\\OpenFin\\logs\\net-log.json --net-log-capture-mode=IncludeCookiesAndCredentials --net-log-capture-mode=IncludeSocketBytes";
            public string Version { get; set; } = "16.83.52.32";
        }
    }
}
