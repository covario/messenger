import { createAction } from 'typesafe-actions';

interface SendSignalrMessage {
  name: string;
  data: any;
}

const SET_SIGNAL_R_CONNECTION_STATUS = 'SET_SIGNAL_R_CONNECTION_STATUS';
const START_SIGNAL_R_CONNECTION = 'START_SIGNAL_R_CONNECTION';
const SEND_SIGNAL_R_MESSAGE = 'SEND_SIGNAL_R_MESSAGE';

export const setSignalRconnectionStatus = createAction(SET_SIGNAL_R_CONNECTION_STATUS)<boolean>();
export const startSignalrConnection = createAction(START_SIGNAL_R_CONNECTION)();
export const sendSignalrMessage = createAction(SEND_SIGNAL_R_MESSAGE)<SendSignalrMessage>();
