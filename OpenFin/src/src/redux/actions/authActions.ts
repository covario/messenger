import { createAsyncAction } from 'typesafe-actions';
import { UserProfile } from '../states/userState';

export interface LoginPayload {
  username: string;
  password: string;
}

const ATTEMPT_LOGIN_REQUEST = 'ATTEMPT_LOGIN_REQUEST';
const ATTEMPT_LOGIN_SUCCESS = 'ATTEMPT_LOGIN_SUCCESS';
const ATTEMPT_LOGIN_FAILURE = 'ATTEMPT_LOGIN_FAILURE';

export const attemptLoginAction = createAsyncAction(
  ATTEMPT_LOGIN_REQUEST,
  ATTEMPT_LOGIN_SUCCESS,
  ATTEMPT_LOGIN_FAILURE,
)<LoginPayload, UserProfile, boolean>();
