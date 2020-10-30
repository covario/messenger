import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import React from 'react';

import { Button } from './Button';
import { Intent } from '../../common/intent';
import { Icons } from '../Icon';
import { Size } from '../../common/size';

export default {
  title: 'Base Components|Button',
  decorators: [withKnobs],
};

export const Default = (): JSX.Element => {
  const onClick = action('onClick');
  const buttonText = text('Text', "Hello world, I'm a button!");
  const block = boolean('Block', false);
  const disabled = boolean('Disabled', false);
  const outlined = boolean('Outlined', false);
  const size = select('Size', { ...Size, Default: null }, null);
  const intent = select('Intent', { ...Intent, Default: null }, null);
  const icon = select('Icons', { ...Icons, None: null }, null);

  return (
    <Button
      outlined={outlined}
      disabled={disabled}
      onClick={onClick}
      icon={icon}
      intent={intent}
      block={block}
      size={size}
      text={buttonText}
    />
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
