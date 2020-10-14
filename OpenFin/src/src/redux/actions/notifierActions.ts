import { createAction } from 'typesafe-actions';

const START_CONTACT_NOTIFIER = 'START_CONTACT_NOTIFIER';
const START_MESSAGE_NOTIFIER = 'START_MESSAGE_NOTIFIER';
const START_OPEN_CHAT_NOTIFIER = 'START_OPEN_CHAT_NOTIFIER';

export const startContactNotifier = createAction(START_CONTACT_NOTIFIER)();
export const startMessageNotifier = createAction(START_MESSAGE_NOTIFIER)();
export const startOpenChatNotifier = createAction(START_OPEN_CHAT_NOTIFIER)();
