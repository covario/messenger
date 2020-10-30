import { ActionType, getType } from 'typesafe-actions';

import * as actions from '../actions/chatsActions';
import { Chat, ChatState, initialChatsState } from '../states/chatsState';
import { createNewChat, updateExistingChat } from '../../common/utils';
import { SignalrInvokeMethods } from '../../common/signalR/constants';

type Action = ActionType<typeof actions>;

// TODO: probably a more efficient way of doing this without having to use two different functions
const createNewImmutableChats = (chats: ChatState['allChats']) => new Map<string, Chat>([...chats]);

export const chatsReducer = (state: ChatState = initialChatsState, action: Action): ChatState => {
  let chat: Chat;
  switch (action.type) {
    case getType(actions.createNewChat):
      return {
        allChats: createNewImmutableChats(state.allChats),
        activeChat: createNewChat(),
      };
    case getType(actions.updateChat):
      chat = updateExistingChat(state.allChats.get(action.payload.chatId), action.payload);
      return {
        allChats: createNewImmutableChats(state.allChats).set(chat.id, chat),
        activeChat:
          !state.activeChat.id ||
          state.activeChat.id === chat.id ||
          state.activeChat.id === SignalrInvokeMethods.NEW_CHAT
            ? chat
            : state.activeChat,
      };
    case getType(actions.addPreMessage):
      state.activeChat.messages.set(SignalrInvokeMethods.NEW_MESSAGE, action.payload);
      return {
        allChats: createNewImmutableChats(state.allChats),
        activeChat: state.activeChat,
      };
    case getType(actions.addNewMessage):
      chat = state.allChats.get(action.payload.chatId)!;
      chat.messages.set(action.payload.message.messageId, action.payload.message);
      // remove the pre-message
      chat.messages.delete(SignalrInvokeMethods.NEW_MESSAGE);
      return {
        allChats: createNewImmutableChats(state.allChats),
        activeChat:
          !state.activeChat.id ||
          state.activeChat.id === chat.id ||
          state.activeChat.id === SignalrInvokeMethods.NEW_CHAT
            ? chat
            : state.activeChat,
      };
    default:
      return state;
  }
};
