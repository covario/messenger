import { ActionType, getType } from 'typesafe-actions';
import { ConnectionStats, initialUserState, UserProfile } from '../states/userState';
import * as actions from '../actions/authActions';

type Action = ActionType<typeof actions>;

export const userReducer = (state: UserProfile = initialUserState, action: Action): UserProfile => {
  switch (action.type) {
    case getType(actions.attemptLoginAction.success):
      return {
        ...action.payload,
        connectionStatus: ConnectionStats.ONLINE,
      };
    default:
      return state;
  }
};
