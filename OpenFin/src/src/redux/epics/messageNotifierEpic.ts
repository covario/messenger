import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RootState } from '../reducers/reducer';

import * as chatsActions from '../actions/chatsActions';
import { ReceivedMessage } from '../actions/chatsActions';
import * as notifierActions from '../actions/notifierActions';
import { signalRconnection } from '../../common/signalR';
import { SignalrReceiveMethods } from '../../common/signalR/constants';
import { MessageFromSignalR } from '../states/chatsState';
import { updateExistingMessage } from '../../common/utils';

type Action = ActionType<typeof notifierActions> | ActionType<typeof chatsActions>;

export const messageNotifierEpic: Epic<Action, Action, RootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(notifierActions.startMessageNotifier)),
    switchMap(() => {
      const o = new Observable<ReceivedMessage>((subscriber) => {
        signalRconnection.on(
          SignalrReceiveMethods.MESSAGE_NOTIFY,
          (newMessage: MessageFromSignalR) => {
            const oldMessage = state$.value.chats.allChats
              .get(newMessage.chatId)!
              .messages.get(newMessage.messageId)!;
            const name = state$.value.contacts.filter(
              (contact) => contact.userId === newMessage.senderUserId,
            )[0].displayName;
            subscriber.next({
              chatId: newMessage.chatId,
              message: updateExistingMessage(oldMessage, newMessage, name),
            });
          },
        );
      });
      return o.pipe(map(chatsActions.addNewMessage));
    }),
  );
