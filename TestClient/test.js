const signalR = require("signalr"); //here i can't use @aspnet/signalr or @microsoft/signalr because those aren't compatible with SignalR that's on the 3rd party server. UGH Microsoft!

let connection = new signalR.HubConnectionBuilder().withUrl("https://myurl/signalr/hubName")
    .configureLogging("warn")
        .build();

    connection.start().then(() => {
        console.log("yeeey!");
    }).catch((e) => {
        console.log(e);
    });
