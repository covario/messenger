import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { muiTheme } from 'storybook-addon-material-ui';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';

import { theme } from '../../../src/Theme/themeDefinition';

export default {
  title: 'Material-UI/IconButton',
  // @ts-ignore
  decorators: [muiTheme([theme]), withKnobs],
};

const Size = {
  Small: 'small',
} as const;

const Color = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export const Default = (): JSX.Element => {
  const onClick = action('onClick');
  const disabled = boolean('Disabled', false);
  const size = select('Size', { ...Size, Default: undefined }, undefined);
  const iconSize = select('Icon size', { ...Size, Default: undefined }, undefined);
  const color = select('Color', { ...Color, Default: 'default' }, 'default');

  return (
    <IconButton onClick={onClick} disabled={disabled} size={size} color={color}>
      <AccountCircleIcon fontSize={iconSize} />
    </IconButton>
  );
};

// Extra story options.
Default.story = {
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
