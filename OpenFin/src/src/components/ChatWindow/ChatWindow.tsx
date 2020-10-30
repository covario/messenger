import React from 'react';

import { ChatMessage } from '../ChatMessage';
import { ChatCommandBar } from '../ChatCommandBar';
import { Chat, MessageParams } from '../../redux/states/chatsState';

interface Props {
  chat: Chat;
  messages: Chat['messages'];
  onScrolledToTop: () => void;
  onSubmitMessage: (messageParams: MessageParams) => void;
  disabled?: boolean;
}

const baseClass = 'chat-window';
const defaultProps = {
  disabled: false,
};

export const ChatWindow = ({
  chat,
  messages,
  onScrolledToTop,
  onSubmitMessage,
  disabled,
}: Props): JSX.Element => {
  const { title } = chat;
  const [scrolledToTop, setScrolledToTop] = React.useState<boolean>(false);
  const inputRef = React.createRef<HTMLInputElement>();
  const messagesRef = React.createRef<HTMLDivElement>();
  const scrolledToTopCallback = React.useCallback(() => {
    if (scrolledToTop) {
      onScrolledToTop();
    }
  }, [scrolledToTop, onScrolledToTop]);

  scrolledToTopCallback();

  // Scroll the messages list to the bottom when new messages
  // come in.
  React.useEffect(() => {
    const { current } = messagesRef;

    if (!current) {
      return;
    }

    current.scrollTop = current.scrollHeight;
    // Purposely ignoring messageRef in the dependencies array because
    // we really do only want to scroll to bottom when the messages change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // Set the scrollBehavior of the messages list on
  // the first render.
  React.useEffect(() => {
    const { current } = messagesRef;

    if (!current) {
      return;
    }

    setTimeout(() => {
      current.style.scrollBehavior = 'smooth';
    }, 0);
    // This only needs to happen a single time when the component is
    // rendered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for scroll events on the messages list so
  // we know when we're scrolled to the top.
  React.useEffect(() => {
    const { current } = messagesRef;

    if (!current) {
      return () => {};
    }

    const handleScroll = () => setScrolledToTop(current.scrollTop === 0);

    current.addEventListener('scroll', handleScroll);

    return () => {
      current.removeEventListener('scroll', handleScroll);
    };
  });
  return (
    <div className={baseClass}>
      <header className={`${baseClass}__header`}>
        <p className={`${baseClass}__title`}>{title}</p>
      </header>
      <div
        className={`${baseClass}__messages`}
        onClick={() => inputRef.current?.focus()}
        onKeyPress={() => {}}
        ref={messagesRef}
        // Note: This might not be the right role. Needs more a11y research.
        role="presentation"
      >
        {Array.from(messages?.values() || []).map((message) => (
          <ChatMessage key={message.messageId} message={message} />
        ))}
      </div>
      <ChatCommandBar disabled={disabled} onSubmit={onSubmitMessage} ref={inputRef} />
    </div>
  );
};

ChatWindow.defaultProps = defaultProps;
