import { ActionType } from 'typesafe-actions';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { reducers, RootState } from './reducers/reducer';
import * as actions from './actions/authActions';
import { initialContactListState } from './states/contactState';
import { initialSignalRstate } from './states/signalRstate';
import { initialUserState } from './states/userState';
import { initialChatsState } from './states/chatsState';

import { invokeLoginEpic } from './epics/invokeLoginEpic';
import { invokeContactsEpic } from './epics/invokeContactsEpic';
import { contactNotifierEpic } from './epics/contactNotifierEpic';
import { invokeNewChatEpic } from './epics/invokeNewChatEpic';
import { openChatNotifierEpic } from './epics/openChatNotifierEpic';
import { invokeSendMessageEpic } from './epics/invokeSendMessageEpic';
import { messageNotifierEpic } from './epics/messageNotifierEpic';

export type ActionsType = ActionType<typeof actions>;

const epics: Epic[] = [
  invokeLoginEpic,
  invokeContactsEpic,
  invokeNewChatEpic,
  invokeSendMessageEpic,
  contactNotifierEpic,
  openChatNotifierEpic,
  messageNotifierEpic,
];

const epicMiddleware = createEpicMiddleware<ActionsType, ActionsType, RootState, unknown>();
const configureStore = (initialState: RootState) => {
  const middlewares = [epicMiddleware];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducers, initialState, enhancer);

  epicMiddleware.run(combineEpics(...epics));

  return store;
};

export const store = configureStore({
  contacts: initialContactListState,
  signalR: initialSignalRstate,
  chats: initialChatsState,
  userProfile: initialUserState,
});
