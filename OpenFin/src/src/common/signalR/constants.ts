export enum SignalrInvokeMethods {
  LOGIN = 'Login',
  GET_CONTACTS = 'GetContacts',
  NEW_CHAT = 'NewChat',
  OPEN_CHAT = 'OpenChat',
  SEND_MESSAGE = 'SendMessage',
  NEW_MESSAGE = 'NewMessage',
}

export enum SignalrReceiveMethods {
  CONTACT_NOTIFY = 'ContactNotify',
  OPEN_CHAT_NOTIFY = 'OpenChatNotify',
  MESSAGE_NOTIFY = 'MessageNotify',
}
