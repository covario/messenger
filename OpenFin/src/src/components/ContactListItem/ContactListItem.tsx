import React from 'react';
import classnames from 'classnames';
import { Contact } from '../../redux/states/contactState';

type OwnProps = Partial<Contact>;

type Props = OwnProps;

const baseClass = 'contact-list-item';

export const ContactListItem = ({
  displayName,
  lastSeen,
  connectionStatus,
  handleContactClick,
  userId,
  directChatId,
}: Props): JSX.Element => {
  const cls = classnames(`${baseClass}`);

  return (
    <div
      className={cls}
      data-user-id={userId}
      data-chat-id={directChatId}
      onClick={handleContactClick}
    >
      <header>
        <div>{displayName}</div>
        <div className={`${baseClass}__timestamp`}>{lastSeen}</div>
      </header>
      <footer>
        <div className={`${baseClass}__status`}>{connectionStatus}</div>
        <div>
          <span className={`${baseClass}__unread`}>12</span>
        </div>
      </footer>
    </div>
  );
};
