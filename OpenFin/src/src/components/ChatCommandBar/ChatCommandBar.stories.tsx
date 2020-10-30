import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import React from 'react';

import { ChatCommandBar } from './ChatCommandBar';

export default {
  title: 'Base Components|ChatCommandBar',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  const onSubmit = action('onSubmit');
  const submitButtonText = text('Submit button text', 'Send');
  const placeholder = text('Placeholder', 'Type message');

  return (
    <ChatCommandBar
      onSubmit={onSubmit}
      placeholder={placeholder}
      submitButtonText={submitButtonText}
    />
  );
};
