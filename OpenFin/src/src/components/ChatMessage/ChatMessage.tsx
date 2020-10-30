import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Message } from '../../redux/states/chatsState';
import { SignalrInvokeMethods } from '../../common/signalR/constants';

interface Props {
  message: Message;
}

const baseClass = 'chat-message';

export const ChatMessage = ({ message }: Props): JSX.Element => {
  const { name, date: rawDate, messageText } = message;
  const date = moment(new Date(rawDate)).format('h:mm a');

  const cls = classnames(baseClass, {
    [`${baseClass}--pre-message`]: message.messageId === SignalrInvokeMethods.NEW_MESSAGE,
  });

  return (
    <div className={cls}>
      <header className={`${baseClass}__header`}>
        <p className={`${baseClass}__name`}>{name}</p>

        <p className={`${baseClass}__date`}>{date}</p>
      </header>

      <div className={`${baseClass}__content`}>{messageText}</div>
    </div>
  );
};
