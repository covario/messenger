import React, { useEffect } from 'react';
import { AppHeader } from '../AppHeader';
import { ChatWindow } from '../ChatWindow';
import ContactList from '../ContactList/ConnectedContactList';
import { ChatState } from '../../redux/states/chatsState';

interface OwnProps {
  chats: ChatState['allChats'];
  activeChat: ChatState['activeChat'];
  // NOTE: This should be the same as ChatWindow.
  onSubmitMessage: ({ value }: { value: string }) => void;
}

export interface StateProps {
  isSignalRconnected: boolean;
}

export interface DispatchProps {
  requestContacts: () => void;
  startSignalrNotifiers: () => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const baseClass = 'chat-page';

const renderChat = (
  chats: Props['chats'],
  activeChat: Props['activeChat'],
  onSubmitMessage: Props['onSubmitMessage'],
) => {
  if (chats && !chats.size) {
    return <p className={`${baseClass}__not-found`}>No chats available</p>;
  }
  return (
    <ChatWindow
      chat={activeChat}
      messages={activeChat.messages}
      onScrolledToTop={() => {}}
      onSubmitMessage={onSubmitMessage}
    />
  );
};

export const ChatPage = ({
  chats,
  activeChat,
  onSubmitMessage,
  requestContacts,
  startSignalrNotifiers,
}: Props): JSX.Element => {
  useEffect(() => {
    requestContacts();
    startSignalrNotifiers();
  }, []);
  return (
    <div className={baseClass}>
      <AppHeader />

      <div className={`${baseClass}__content`}>
        <ContactList chats={chats} activeChat={activeChat} />

        <section className={`${baseClass}__chat-wrapper`}>
          {renderChat(chats, activeChat, onSubmitMessage)}
        </section>
      </div>
    </div>
  );
};
