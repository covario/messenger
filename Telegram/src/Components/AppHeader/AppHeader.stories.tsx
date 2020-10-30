import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { AppHeader } from './AppHeader';

export default {
  title: 'Base Components|AppHeader',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  const onClose = action('click');
  const onMaximize = action('click');
  const onMinimize = action('click');
  const isMaximized = boolean('Maximize', false);

  return (
    <AppHeader
      isMaximized={isMaximized}
      onClose={onClose}
      onMaximize={onMaximize}
      onMinimize={onMinimize}
    />
  );
};
