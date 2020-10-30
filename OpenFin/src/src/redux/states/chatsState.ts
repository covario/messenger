export type Chat = Readonly<{
  id: string;
  title: string;
  preview: string;
  date: string;
  messages: Map<string, Message>;
  members: string[];
}>;

export type MessageParams = Readonly<{
  value: string;
}>;

export type Message = {
  messageId: string;
  userId: string;
  name: string;
  date: string;
  messageText: string;
};

export type ChatState = {
  activeChat: Chat;
  allChats: Map<string, Chat>;
};

export type ChatFromSignalR = {
  chatId: Chat['id'];
  chatName: Chat['title'];
  members: Chat['members'];
  createdDateTime: string;
};

export type MessageFromSignalR = {
  chatId: string;
  messageId: string;
  senderUserId: string;
  sentDateTime: string;
  messageText: string;
};

export const initialChatsState: ChatState = {
  activeChat: {} as Chat,
  allChats: new Map<string, Chat>(),
};
