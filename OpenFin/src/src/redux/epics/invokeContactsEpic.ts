import { Epic } from 'redux-observable';

import { ActionType, isActionOf } from 'typesafe-actions';
import { filter, map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { RootState } from '../reducers/reducer';
import * as contactsActions from '../actions/contactActions';
import { signalRconnection } from '../../common/signalR';
import { Contact } from '../states/contactState';
import { SignalrInvokeMethods } from '../../common/signalR/constants';

type Action = ActionType<typeof contactsActions>;

export const invokeContactsEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(contactsActions.getContacts)),
    switchMap(() => {
      const invokePromise = signalRconnection.invoke<Contact[]>(SignalrInvokeMethods.GET_CONTACTS);
      return from(invokePromise).pipe(map(contactsActions.setContacts));
    }),
  );
