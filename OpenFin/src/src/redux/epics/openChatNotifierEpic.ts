import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RootState } from '../reducers/reducer';

import * as chatsActions from '../actions/chatsActions';
import * as notifierActions from '../actions/notifierActions';
import { signalRconnection } from '../../common/signalR';
import { SignalrReceiveMethods } from '../../common/signalR/constants';
import { ChatFromSignalR } from '../states/chatsState';

type Action = ActionType<typeof chatsActions>;

export const openChatNotifierEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(notifierActions.startOpenChatNotifier)),
    switchMap(() => {
      const o = new Observable<ChatFromSignalR>((subscriber) => {
        signalRconnection.on(SignalrReceiveMethods.OPEN_CHAT_NOTIFY, (chat: ChatFromSignalR) => {
          subscriber.next(chat);
        });
      });
      return o.pipe(map(chatsActions.updateChat));
    }),
  );
