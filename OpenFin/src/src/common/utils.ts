import moment from 'moment';
import { Chat, ChatFromSignalR, Message, MessageFromSignalR } from '../redux/states/chatsState';
import { SignalrInvokeMethods } from './signalR/constants';

export const createNewChat = (): Chat => {
  return {
    id: SignalrInvokeMethods.NEW_CHAT,
    title: '',
    preview: '',
    date: '',
    messages: new Map<string, Message>(),
    members: [],
  };
};

export const updateExistingChat = (oldChat: Chat | undefined, newChat: ChatFromSignalR): Chat => {
  return {
    id: newChat.chatId,
    title: `Chat with ${newChat.chatName}`,
    preview: '',
    date: newChat.createdDateTime,
    messages: oldChat?.messages || new Map<string, Message>(),
    members: newChat.members,
  };
};

export const createNewMessage = (messageId: string, name: string, messageText: string): Message => {
  return {
    name,
    messageId,
    messageText,
    userId: '',
    date: new Date().toISOString(),
  };
};

export const updateExistingMessage = (
  oldMessage: Message,
  newMessage: MessageFromSignalR,
  name: string,
): Message => {
  return {
    name,
    messageId: oldMessage?.messageId || newMessage.messageId,
    userId: newMessage.senderUserId,
    date: newMessage.sentDateTime,
    messageText: newMessage.messageText,
  };
};

export const getTimeFromDate = (date: string): string => moment(new Date(date)).format('h:mm a');
