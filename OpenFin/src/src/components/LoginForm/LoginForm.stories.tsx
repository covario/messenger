import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import React from 'react';

import { LoginForm } from './LoginForm';

export default {
  title: 'Composed Components|LoginForm',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  const onClickLogin = action('onClickLogin');

  return <LoginForm onClickLogin={onClickLogin} />;
};

// Extra story options.
Default.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
