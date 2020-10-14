import { withKnobs, select } from '@storybook/addon-knobs';
import React from 'react';

import { Icon } from './Icon';
import { Icons } from './icons';

export default {
  title: 'Base Components|Icon',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  const name = select('Icons', Icons, Icons.ALERT);

  return <Icon name={name} />;
};

// Extra story options.
Default.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
