import { createAction } from 'typesafe-actions';
import { ChatFromSignalR, Message } from '../states/chatsState';

export interface NewMessageToSend {
  chatId: string;
  name: string;
  messageText: string;
}

export interface ReceivedMessage {
  chatId: string;
  message: Message;
}

const START_NEW_CHAT = 'START_NEW_CHAT';
const CREATE_NEW_CHAT = 'CREATE_NEW_CHAT';
const UPDATE_CHAT = 'UPDATE_CHAT';
const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';
const ADD_PRE_MESSAGE = 'ADD_PRE_MESSAGE';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

export const requestNewChat = createAction(START_NEW_CHAT)<string[]>();
export const createNewChat = createAction(CREATE_NEW_CHAT)();
export const updateChat = createAction(UPDATE_CHAT)<ChatFromSignalR>();
export const sendNewMessage = createAction(SEND_NEW_MESSAGE)<NewMessageToSend>();
export const addPreMessage = createAction(ADD_PRE_MESSAGE)<Message>();
export const addNewMessage = createAction(ADD_NEW_MESSAGE)<ReceivedMessage>();
