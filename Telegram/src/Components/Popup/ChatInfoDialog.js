/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ChatInfo from '../ColumnRight/ChatInfo';
import { modalManager } from '../../Utils/Modal';
import ApplicationStore from '../../Stores/ApplicationStore';
import TdLibController from '../../Controllers/TdLibController';
import './ChatInfoDialog.scss';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { isChannelChat, isPrivateChat } from '../../Utils/Chat';
import { withTranslation } from 'react-i18next';

class ChatInfoDialog extends React.Component {
  state = {
    chatId: ApplicationStore.dialogChatId,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { chatId } = this.state;

    return nextState.chatId !== chatId;
  }

  componentDidMount() {
    ApplicationStore.on('clientUpdateDialogChatId', this.onClientUpdateDialogChatId);
    ApplicationStore.on('clientUpdateMediaViewerContent', this.onClientUpdateMediaViewerContent);
  }

  componentWillUnmount() {
    ApplicationStore.off('clientUpdateDialogChatId', this.onClientUpdateDialogChatId);
    ApplicationStore.off('clientUpdateMediaViewerContent', this.onClientUpdateMediaViewerContent);
  }

  onClientUpdateMediaViewerContent = (update) => {
    if (ApplicationStore.mediaViewerContent) {
      this.handleClose();
    }
  };

  onClientUpdateDialogChatId = (update) => {
    const { chatId } = update;

    this.setState({ chatId });
  };

  handleClose = () => {
    TdLibController.clientUpdate({
      '@type': 'clientUpdateDialogChatId',
      chatId: 0,
    });
  };

  render() {
    const { chatId } = this.state;
    const { t } = this.props;
    if (!chatId) return null;
    let info = t('ChatInfo');
    if (isPrivateChat(chatId)) {
      info = t('Info');
    } else if (isChannelChat(chatId)) {
      info = t('ChannelInfo');
    }
    return (
      <Dialog
        open
        manager={modalManager}
        transitionDuration={0}
        onClose={this.handleClose}
        PaperProps={{
          variant: 'elevation',
        }}
        classes={{
          root: 'chat-info-dialog-root',
          container: 'chat-info-dialog-container',
          paper: 'chat-info-dialog-paper',
        }}
      >
        <DialogTitle>{info}</DialogTitle>
        <DialogContent className="chat-info-dialog-content-wrapper">
          <ChatInfo className="chat-info-dialog-content" chatId={chatId} popup />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ChatInfoDialog.propTypes = {};

export default withTranslation()(ChatInfoDialog);
