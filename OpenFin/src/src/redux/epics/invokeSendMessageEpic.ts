import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { filter, map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { RootState } from '../reducers/reducer';

import * as chatsActions from '../actions/chatsActions';
import { signalRconnection } from '../../common/signalR';
import { SignalrInvokeMethods } from '../../common/signalR/constants';
import { createNewMessage } from '../../common/utils';

type Action = ActionType<typeof chatsActions>;

export const invokeSendMessageEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(chatsActions.sendNewMessage)),
    switchMap((action) => {
      const invokePromise = signalRconnection.invoke<string>(
        SignalrInvokeMethods.SEND_MESSAGE,
        action.payload.chatId,
        new Date().toISOString(),
        action.payload.messageText,
      );
      const curriedAddMessage = (name: string) => (messageId: string) =>
        chatsActions.addNewMessage({
          chatId: action.payload.chatId,
          message: createNewMessage(messageId, name, action.payload.messageText),
        });
      return from(invokePromise).pipe(map(curriedAddMessage(action.payload.name)));
    }),
  );
