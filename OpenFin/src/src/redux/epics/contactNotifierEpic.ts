import { Epic } from 'redux-observable';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActionType, isActionOf } from 'typesafe-actions';

import { Observable } from 'rxjs';
import * as notifierActions from '../actions/notifierActions';
import * as contactsActions from '../actions/contactActions';
import { signalRconnection } from '../../common/signalR';
import { SignalrReceiveMethods } from '../../common/signalR/constants';
import { Contact } from '../states/contactState';
import { RootState } from '../reducers/reducer';

type Action = ActionType<typeof notifierActions> | ActionType<typeof contactsActions>;

export const contactNotifierEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(notifierActions.startContactNotifier)),
    switchMap(() => {
      const o = new Observable<Contact>((subscriber) => {
        signalRconnection.on(SignalrReceiveMethods.CONTACT_NOTIFY, (contact: Contact) => {
          subscriber.next(contact);
        });
      });
      return o.pipe(map(contactsActions.setContact));
    }),
  );
