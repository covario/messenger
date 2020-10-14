import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';
import { filter, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as chatsActions from '../actions/chatsActions';
import { RootState } from '../reducers/reducer';
import { signalRconnection } from '../../common/signalR';
import { SignalrInvokeMethods } from '../../common/signalR/constants';

type Action = ActionType<typeof chatsActions>;

export const invokeNewChatEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(chatsActions.requestNewChat)),
    mergeMap((action) => {
      void signalRconnection.invoke<string>(SignalrInvokeMethods.NEW_CHAT, action.payload);
      return of(chatsActions.createNewChat());
    }),
  );
