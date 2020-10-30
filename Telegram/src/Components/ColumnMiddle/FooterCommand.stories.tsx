import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { muiTheme } from 'storybook-addon-material-ui';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import React from 'react';

import { theme } from '../../Theme/themeDefinition';
import FooterCommand from './FooterCommand';

export default {
  title: 'Legacy Components/FooterCommand',
  // @ts-ignore
  decorators: [muiTheme([createMuiTheme(theme)]), withKnobs],
};

export const Default = (): JSX.Element => {
  const onCommand = action('onCommand');
  const command = text('command', 'Some command');

  return <FooterCommand command={command} onCommand={onCommand} />;
};
