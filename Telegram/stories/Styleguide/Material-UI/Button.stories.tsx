import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { muiTheme } from 'storybook-addon-material-ui';
import React from 'react';

import { Button } from '../../../src/Components/Button';
import { theme } from '../../../src/Theme/themeDefinition';

export default {
  title: 'Material-UI/Button',
  // @ts-ignore
  decorators: [muiTheme([theme]), withKnobs],
};

const Size = {
  Small: 'small',
} as const;

const Variant = {
  Outlined: 'outlined',
} as const;

const Color = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export const Default = (): JSX.Element => {
  const onClick = action('onClick');
  const buttonText = text('Text', "Hello world, I'm a button!");

  const danger = boolean('Danger', false);
  const disabled = boolean('Disabled', false);
  const size = select('Size', { ...Size, Default: undefined }, undefined);
  const variant = select('Variant', { ...Variant, Default: undefined }, undefined);
  const color = select('Color', { ...Color, Default: 'default' }, 'default');

  return (
    <Button
      danger={danger}
      onClick={onClick}
      disabled={disabled}
      size={size}
      variant={variant}
      color={color}
    >
      {buttonText}
    </Button>
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
