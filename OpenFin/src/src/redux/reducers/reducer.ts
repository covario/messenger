import { combineReducers } from 'redux';
import { constactsReducer } from './contactReducer';
import { Contact } from '../states/contactState';
import { signalrReducer } from './signalrReducer';
import { SignalRstate } from '../states/signalRstate';
import { userReducer } from './userReducer';
import { UserProfile } from '../states/userState';
import { ChatState } from '../states/chatsState';
import { chatsReducer } from './chatsReducer';

export type RootState = {
  contacts: Contact[];
  signalR: SignalRstate;
  chats: ChatState;
  userProfile: UserProfile;
};

export const reducers = combineReducers({
  contacts: constactsReducer,
  signalR: signalrReducer,
  userProfile: userReducer,
  chats: chatsReducer,
});
