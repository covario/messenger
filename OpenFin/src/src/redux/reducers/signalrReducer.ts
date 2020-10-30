import { ActionType, getType } from 'typesafe-actions';

import { initialSignalRstate, SignalRstate } from '../states/signalRstate';
import * as actions from '../actions/signalrActions';

type Action = ActionType<typeof actions>;

export const signalrReducer = (
  state: SignalRstate = initialSignalRstate,
  action: Action,
): SignalRstate => {
  switch (action.type) {
    case getType(actions.setSignalRconnectionStatus):
      return {
        isConnected: action.payload,
      };
    default:
      return state;
  }
};
