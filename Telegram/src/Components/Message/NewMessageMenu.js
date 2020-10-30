/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import CheckIcon from '@material-ui/icons/Check';

import { cancelPollAnswer, stopPoll } from '../../Actions/Poll';
import {
  canMessageBeClosed,
  canMessageBeDeleted,
  canMessageBeEdited,
  canMessageBeForwarded,
  canMessageBeUnvoted,
  isMessagePinned,
} from '../../Utils/Message';
import { canPinMessages, canSendMessages } from '../../Utils/Chat';
import {
  clearSelection,
  deleteMessages,
  editMessage,
  forwardMessages,
  replyMessage,
  selectMessage,
} from '../../Actions/Client';
import { compose } from '../../Utils/HOC';
import { copy } from '../../Utils/Text';
import { getArrayBuffer } from '../../Utils/File';
import { isPublicSupergroup } from '../../Utils/Supergroup';
import { NOTIFICATION_AUTO_HIDE_DURATION_MS } from '../../Constants';
import { pinMessage, unpinMessage } from '../../Actions/Message';
import AppStore from '../../Stores/ApplicationStore';
import CloseIcon from '../../Assets/Icons/Close';
import CopyIcon from '../../Assets/Icons/Copy';
import EditIcon from '../../Assets/Icons/Edit';
import MessageStore from '../../Stores/MessageStore';
import PinIcon from '../../Assets/Icons/Pin2';
import UnpinIcon from '../../Assets/Icons/Pin2';
import RemoveCheckIcon from '../../Assets/Icons/RemoveCheck';
import StopIcon from '../../Assets/Icons/Stop';
import TdLibController from '../../Controllers/TdLibController';
import Reply from '../../Assets/Icons/Reply';
import Forward from '../../Assets/Icons/Forward';
import Delete from '../../Assets/Icons/Delete';

class MessageMenu extends React.PureComponent {
  state = {
    confirmStopPoll: false,
  };

  handleConfirmStopPoll = (event) => {
    const { dialog } = this.state;
    if (dialog) return;

    this.setState({
      confirmStopPoll: true,
      contextMenu: false,
    });
  };

  handleCloseConfirm = (event) => {
    if (event) {
      event.stopPropagation();
    }

    this.setState({ confirmStopPoll: false });
  };

  handleStopPoll = (event) => {
    event.stopPropagation();

    const { chatId, messageId } = this.props;
    const { confirmStopPoll } = this.state;

    if (confirmStopPoll) {
      this.setState({ confirmStopPoll: false });
    }

    stopPoll(chatId, messageId);
  };

  handleUnvote = (event) => {
    if (event) {
      event.stopPropagation();
    }

    const { chatId, messageId } = this.props;

    cancelPollAnswer(chatId, messageId);
  };

  handleCopyLink = (event) => {
    const { copyLink, t } = this.props;

    if (!copyLink) return;

    copy(copyLink);
    this.handleScheduledAction(t('LinkCopied'));
  };

  handleCopyPublicMessageLink = async (event) => {
    const { chatId, messageId, t } = this.props;

    const httpUrl = await TdLibController.send({
      '@type': 'getPublicMessageLink',
      chat_id: chatId,
      message_id: messageId,
      for_album: false,
    });

    if (!httpUrl) return;
    const { link: copyLink } = httpUrl;

    if (!copyLink) return;

    copy(copyLink);
    this.handleScheduledAction(t('LinkCopied'));
  };

  handleScheduledAction = (message) => {
    const { enqueueSnackbar, closeSnackbar } = this.props;

    const snackKey = enqueueSnackbar(message, {
      autoHideDuration: NOTIFICATION_AUTO_HIDE_DURATION_MS,
      preventDuplicate: true,
      action: [
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className="notification-close-button"
          onClick={() => {
            closeSnackbar(snackKey);
          }}
        >
          <CloseIcon size="small" />
        </IconButton>,
      ],
    });
  };

  handleReply = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { chatId, messageId } = this.props;

    clearSelection();
    replyMessage(chatId, messageId);
  };

  handlePin = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { chatId, messageId } = this.props;

    clearSelection();

    if (isMessagePinned(chatId, messageId)) {
      unpinMessage(chatId);
    } else {
      pinMessage(chatId, messageId);
    }
  };

  handleForward = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { chatId, messageId } = this.props;

    forwardMessages(chatId, [messageId]);
  };

  handleEdit = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { chatId, messageId } = this.props;

    clearSelection();
    editMessage(chatId, messageId);
  };

  handleSelect = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { chatId, messageId } = this.props;

    selectMessage(chatId, messageId, true);
  };

  handleDelete = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const { chatId, messageId } = this.props;

    deleteMessages(chatId, [messageId]);
  };

  handleDownload = async (event) => {
    const { chatId, messageId } = this.props;

    const message = MessageStore.get(chatId, messageId);
    if (!message) return;

    const { content } = message;
    if (!content) return;

    const { audio } = content;
    if (!audio) return;

    const { audio: file } = audio;
    if (!file) return;

    const { id: file_id } = file;

    const result = await TdLibController.send({
      '@type': 'downloadFile',
      file_id,
      priority: 1,
      offset: 10 * 1024,
      limit: 1024,
      synchronous: true,
    });

    const blob = await TdLibController.send({
      '@type': 'readFilePart',
      file_id,
      offset: 10 * 1024,
      count: 1024,
    });

    console.log('[file] result', result, blob);
  };

  handleTest = async () => {
    const { chatId, messageId } = this.props;
    const message = MessageStore.get(chatId, messageId);
    if (!message) return;

    const { content } = message;
    if (!content) return;

    const { video } = content;
    if (!video) return;

    const { video: file } = video;
    if (!file) return;

    const { size } = file;

    const chunk = 512 * 1024;
    const count = size / chunk;

    for (let i = 0; i < count; i++) {
      console.log('[d] filePart', file.id, chunk * i);
      await TdLibController.send({
        '@type': 'downloadFile',
        file_id: file.id,
        priority: 1,
        offset: chunk * i,
        limit: chunk,
        synchronous: true,
      });

      const filePart = await TdLibController.send({
        '@type': 'readFilePart',
        file_id: file.id,
        offset: chunk * i,
        count: chunk,
      });

      const buffer = await getArrayBuffer(filePart.data);
    }
  };

  render() {
    const { t, chatId, messageId, anchorPosition, copyLink, open, className } = this.props;
    const { confirmStopPoll } = this.state;
    const cls = classnames('message-menu', className);
    const isPinned = isMessagePinned(chatId, messageId);
    const canBeUnvoted = canMessageBeUnvoted(chatId, messageId);
    const canBeClosed = canMessageBeClosed(chatId, messageId);
    const canBeReplied = canSendMessages(chatId);
    const canBePinned = canPinMessages(chatId);
    const canBeForwarded = canMessageBeForwarded(chatId, messageId);
    const canBeDeleted = canMessageBeDeleted(chatId, messageId);
    const canBeEdited = canMessageBeEdited(chatId, messageId) && !AppStore.recording;
    const canBeSelected = !MessageStore.hasSelectedMessage(chatId, messageId);
    const canCopyLink = Boolean(copyLink);
    const canCopyPublicMessageLink = isPublicSupergroup(chatId);

    return (
      <div className={cls}>
        <ButtonGroup variant="text" size="small">
          {/*<MenuItem onClick={this.handleTest}>*/}
          {/*    <ListItemIcon>*/}
          {/*        <CopyIcon size="small" />*/}
          {/*    </ListItemIcon>*/}
          {/*    <ListItemText primary='Test' />*/}
          {/*</MenuItem>*/}
          {canCopyPublicMessageLink && (
            <Button onClick={this.handleCopyPublicMessageLink}>
              <CopyIcon fontSize="small" />

              {t('CopyMessageLink')}
            </Button>
          )}
          {canCopyLink && (
            <Button onClick={this.handleCopyLink}>
              <CopyIcon fontSize="small" />

              {t('CopyLink')}
            </Button>
          )}

          {canBeReplied && (
            <Button onClick={this.handleReply}>
              <Reply fontSize="small" />

              {t('Reply')}
            </Button>
          )}

          {canBePinned && (
            <Button onClick={this.handlePin}>
              {isPinned ? (
                <>
                  <UnpinIcon fontSize="small" />

                  {t('UnpinFromTop')}
                </>
              ) : (
                <>
                  <PinIcon fontSize="small" />

                  {t('PinToTop')}
                </>
              )}
            </Button>
          )}

          {canBeSelected && (
            <Button onClick={this.handleSelect}>
              <CheckIcon fontSize="small" />

              {t('Select')}
            </Button>
          )}

          {canBeForwarded && (
            <Button onClick={this.handleForward}>
              <Forward fontSize="small" />

              {t('Forward')}
            </Button>
          )}

          {canBeEdited && (
            <Button onClick={this.handleEdit}>
              <EditIcon fontSize="small" />

              {t('Edit')}
            </Button>
          )}

          {canBeDeleted && (
            <Button onClick={this.handleDelete}>
              <Delete fontSize="small" />

              {t('Delete')}
            </Button>
          )}

          {canBeUnvoted && (
            <Button onClick={this.handleUnvote}>
              <RemoveCheckIcon fontSize="small" />

              {t('Unvote')}
            </Button>
          )}

          {canBeClosed && (
            <Button onClick={this.handleConfirmStopPoll}>
              <StopIcon fontSize="small" />

              {t('StopPoll')}
            </Button>
          )}
        </ButtonGroup>

        <Dialog
          transitionDuration={0}
          open={confirmStopPoll}
          onClose={this.handleCloseConfirm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{t('StopPollAlertTitle')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t('StopPollAlertText')}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseConfirm} color="primary">
              {t('Cancel')}
            </Button>
            <Button onClick={this.handleStopPoll} color="primary">
              {t('Stop')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MessageMenu.propTypes = {
  className: PropTypes.string,
  chatId: PropTypes.number.isRequired,
  messageId: PropTypes.number.isRequired,
  anchorPosition: PropTypes.object,
  open: PropTypes.bool.isRequired,
  copyLink: PropTypes.string,
};

const enhance = compose(withTranslation(), withSnackbar);

export default enhance(MessageMenu);
