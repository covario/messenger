import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';

import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as authActions from '../actions/authActions';
import { RootState } from '../reducers/reducer';
import { signalRconnection } from '../../common/signalR';
import { SignalrInvokeMethods } from '../../common/signalR/constants';
import { UserProfile } from '../states/userState';

type Action = ActionType<typeof authActions>;

export const invokeLoginEpic: Epic<Action, Action, RootState> = (action$) => {
  return action$.pipe(
    filter(isActionOf(authActions.attemptLoginAction.request)),
    switchMap((action) => {
      const invokePromise = signalRconnection.invoke<UserProfile>(
        SignalrInvokeMethods.LOGIN,
        action.payload.username,
        action.payload.password,
      );
      return from(invokePromise).pipe(
        map(authActions.attemptLoginAction.success),
        catchError((error) => {
          console.log(error);
          return of(authActions.attemptLoginAction.failure(false));
        }),
      );
    }),
  );
};
