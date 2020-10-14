import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { muiTheme } from 'storybook-addon-material-ui';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import React from 'react';

import { theme } from '../../Theme/themeDefinition';
import AttachButton from './AttachButton';

export default {
  title: 'Legacy Components/AttachButton',
  // @ts-ignore
  decorators: [muiTheme([createMuiTheme(theme)]), withKnobs],
};

export const Default = (): JSX.Element => {
  const canSendMediaMessages = boolean('canSendMediaMessages', true);
  const canSendPolls = boolean('canSendPolls', true);
  const isPrivateChat = boolean('isPrivateChat', true);
  const onAttachDocument = action('onAttachDocument');
  const onAttachPhoto = action('onAttachPhoto');
  const onAttachPoll = action('onAttachPoll');

  return (
    <AttachButton
      canSendMediaMessages={() => canSendMediaMessages}
      canSendPolls={() => canSendPolls}
      chatId={0}
      isPrivateChat={() => isPrivateChat}
      onAttachDocument={onAttachDocument}
      onAttachPhoto={onAttachPhoto}
      onAttachPoll={onAttachPoll}
    />
  );
};
