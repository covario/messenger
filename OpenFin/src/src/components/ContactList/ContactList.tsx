import React from 'react';
import classnames from 'classnames';

import { ContactListItem } from '../ContactListItem';
import { Contact } from '../../redux/states/contactState';
import { ChatState } from '../../redux/states/chatsState';

interface OwnProps {
  chats: ChatState['allChats'];
  activeChat: ChatState['activeChat'];
}

export interface StateProps {
  contacts: Contact[];
}

export interface DispatchProps {
  startNewChat: (userId: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const baseClass = 'contact-list';

export const ContactList = ({ contacts = [], chats, startNewChat }: Props): JSX.Element => {
  const cls = classnames(`${baseClass}`);

  const handleContactClick = (contact: Contact) => {
    const chat = chats.get(contact.directChatId);
    if (!chat) {
      startNewChat(contact.userId);
    }
  };

  return (
    <aside className={cls}>
      {contacts.length ? (
        contacts.map((contact) => (
          <ContactListItem
            key={contact.userId}
            userId={contact.userId}
            displayName={contact.displayName}
            lastSeen={contact.lastSeen}
            connectionStatus={contact.connectionStatus}
            directChatId={contact.directChatId}
            handleContactClick={() => handleContactClick(contact)}
          />
        ))
      ) : (
        <p className={`${baseClass}__not-found`}>No Contacts</p>
      )}
    </aside>
  );
};
