import { ActionType, getType } from 'typesafe-actions';
import { Contact, initialContactListState } from '../states/contactState';
import * as actions from '../actions/contactActions';
import { getTimeFromDate } from '../../common/utils';

type Action = ActionType<typeof actions>;

export const constactsReducer = (
  state: Contact[] = initialContactListState,
  action: Action,
): Contact[] => {
  switch (action.type) {
    case getType(actions.setContacts):
      return action.payload.map((contact) => {
        return {
          ...contact,
          lastSeen: getTimeFromDate(contact.lastSeen),
        };
      });
    case getType(actions.setContact):
      return [
        ...state.filter((contact) => contact.userId !== action.payload.userId),
        {
          ...action.payload,
          lastSeen: getTimeFromDate(action.payload.lastSeen),
        },
      ];
    default:
      return state;
  }
};
