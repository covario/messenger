let connection = null;
let chats = {};
let me = {};
let users = [];

function sendMessage(e, chat) {
    e.preventDefault();
    var messageElement = chat.dom.querySelector("#message");

    var message = {
        chatId : chat.chatId,
        messageText: messageElement.value,
        sentDateTime: new Date()
    };
    messageElement.value = '';

    connection.invoke("SendMessage",
        message.chatId,
        message.sentDateTime.toISOString(),
        message.messageText
    ).then(messageId => {
        message.messageId = messageId;
        c.messages.data.push(message);
        c.messages.all[messageId] = message;
    } );
}

function newMessage(message) {
    if (chats[message.chatId] == undefined) {
        log.error("Message received for closed chat");
        connection.invoke("OpenChat", message.chatId).then(newMessage(e,message));
    } else {
        var c = chats[message.chatId];
        var messagesList = c.dom.querySelector("#messages");
        var messageLine = document.createElement("li");
        messageLine.className = "";
        messageLine.innerText = message.messageText;
        messagesList.appendChild(messageLine);
        sendButton.addEventListener("click", (e) => sendMessage(e, c));
    }
}

function newChat(e, userId, directChatId) {
    e.preventDefault();
    if (directChatId == null) {
        console.log('New chat ' + userId);
        connection.invoke("NewChat", [userId]);
    } else {
        console.log('Resume chat ' + directChatId);
        connection.invoke("OpenChat", directChatId);
    }
}

function contactNotify(contactUpdate) {
    var table = document.getElementById("contactsList");
    var row = null;
    for (var i = 0; i < table.rows.length; i++) {
        var r = table.rows[i];
        if (r.getAttribute("data-userId") === contactUpdate.userId)
            row = r;
    }
    if (row == null) {
        row = table.insertRow(table.rows.length);
        if (table.rows[1].getAttribute("data-userId") == undefined) {
            table.deleteRow(1);
        }
        row.setAttribute("data-userId", contactUpdate.userId);

        var link = document.createElement("a");
        link.setAttribute("href", "#");
        link.addEventListener("click", e => newChat(e, contactUpdate.userId, contactUpdate.directChatId), false);
        var linkText = document.createTextNode(contactUpdate.displayName);
        link.appendChild(linkText);
        row.insertCell(0).appendChild(link);
        row.insertCell(1).innerText = contactUpdate.lastSent;
        row.insertCell(2).innerText = contactUpdate.lastSeen;
        row.insertCell(3).innerText = contactUpdate.connectionStatus;
    } else {
        row.cells[1].innerText = contactUpdate.lastSent;
        row.cells[2].innerText = contactUpdate.lastSeen;
        row.cells[3].innerText = contactUpdate.connectionStatus;
    }
}

function chatNotify(chat) {

    if (chats[chat.chatId] == undefined) {
        var c = {};
        var chatTemplate = document.getElementById("chatTemplate");
        c.dom = chatTemplate.cloneNode(true);
        c.chatId = chat.chatId;
        chats[chat.chatId] = c;
        c.messages = { data: [] };
        var chatBlock = chatTemplate.parentNode.appendChild(c.dom);
        chatBlock.className = "Container";
        chatBlock = chat.chatName;
        var sendButton = c.dom.querySelector("#sendButton");
        sendButton.addEventListener("click", (e) => sendMessage(e, c));

        c.dom.querySelector("#chatTitle").innerText = chat.chatName;
    }
}

setupConnection = () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl("/hub")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    connection.on("ContactNotify", (c) => contactNotify(c));

    connection.on("OpenChatNotify", (c) => chatNotify(c));

    connection.on("MessageNotify", (m) => newMessage(m));

    connection.start()
        .catch(err => console.error(err.toString()));
};

setupConnection();

document.getElementById("loginButton").addEventListener("click", e => {
    e.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    connection.invoke("Login", username, password)
        .then(id => {
            console.log(id);
            me = id;
            users.push(id);
            document.getElementById("status").innerText = '';
            document.getElementById("loginForm").className = "d-none";
            document.getElementById("chatForm").className = "container";

            connection.invoke("GetContacts").then(contacts => {
                for (var c in contacts) {
                    contactNotify(contacts[c]);
                }
            });
        }).catch(e => {
            document.getElementById("status").innerText = 'Invalid login';
        });
});

document.getElementById("getContacts").addEventListener("click", e => {
    e.preventDefault();

    connection.invoke("GetContacts").then(contacts => {
        console.log(contacts);
        for (var c in contacts) {
            contactNotify(contacts[c]);
        }
    });
});

document.getElementById("logoutButton").addEventListener("click", e => {
    e.preventDefault();

    connection.invoke("Logout").then(e => {
        document.getElementById("loginForm").className = "container";
        document.getElementById("chatForm").className = "d-none";
    });
});
