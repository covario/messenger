import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { AppHeader } from './AppHeader';

export default {
  title: 'Base Components|AppHeader',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  return <AppHeader />;
};
