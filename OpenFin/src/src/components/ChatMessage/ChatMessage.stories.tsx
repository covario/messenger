import { withKnobs, text, date } from '@storybook/addon-knobs';
import React from 'react';

import { ChatMessage } from './ChatMessage';

export default {
  title: 'Base Components|ChatMessage',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  const name = text('Name', 'Johnathan Doe');
  const dateValue = date('Date', new Date());
  const content = text(
    'Content',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ante non lorem ullamcorper placerat eget et turpis. Nam condimentum lobortis dolor in ullamcorper. Morbi mi justo, gravida eget iaculis a, eleifend et sem.',
  );

  const message = {
    name,
    userId: '',
    messageId: Date.now().toString(),
    date: new Date(dateValue).toISOString(),
    messageText: content,
  };

  return <ChatMessage message={message} />;
};
