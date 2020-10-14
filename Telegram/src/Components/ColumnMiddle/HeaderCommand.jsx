/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { clearSelection, deleteMessages, forwardMessages } from '../../Actions/Client';
import MessageStore from '../../Stores/MessageStore';

import './HeaderCommand.scss';

class HeaderCommand extends React.Component {
  handleCancel = () => {
    clearSelection();
  };

  handleDelete = () => {
    let id = 0;
    const messageIds = [];
    for (let { chatId, messageId } of MessageStore.selectedItems.values()) {
      id = chatId;
      messageIds.push(messageId);
    }

    deleteMessages(id, messageIds);
  };

  handleForward = () => {
    let id;
    const messageIds = [];
    for (let { chatId, messageId } of MessageStore.selectedItems.values()) {
      id = chatId;
      messageIds.push(messageId);
    }

    forwardMessages(id, messageIds);
  };

  render() {
    const { t, count } = this.props;

    let canBeDeleted = true;
    for (let { chatId, messageId } of MessageStore.selectedItems.values()) {
      const message = MessageStore.get(chatId, messageId);
      if (!message) {
        canBeDeleted = false;
        break;
      }
      if (!message.can_be_deleted_only_for_self && !message.can_be_deleted_for_all_users) {
        canBeDeleted = false;
        break;
      }
    }

    let canBeForwarded = true;
    for (let { chatId, messageId } of MessageStore.selectedItems.values()) {
      const message = MessageStore.get(chatId, messageId);
      if (!message) {
        canBeForwarded = false;
        break;
      }
      if (!message.can_be_forwarded) {
        canBeForwarded = false;
        break;
      }
    }

    return (
      <div className="header-command">
        <p className="header-command__count">
          {count} {`message${count === 1 ? '' : 's'}`} selected
        </p>

        {canBeForwarded && (
          <Button
            color="primary"
            className="header-command-button"
            size="small"
            onClick={this.handleForward}
          >
            {count <= 1 ? t('Forward') : `${t('Forward')} All`}
          </Button>
        )}

        {canBeDeleted && (
          <Button
            color="primary"
            className="header-command-button"
            size="small"
            onClick={this.handleDelete}
          >
            {count <= 1 ? t('Delete') : `${t('Delete')} All`}
          </Button>
        )}

        <div className="header-command-space" />

        <Button size="small" className="header-command-button" onClick={this.handleCancel}>
          {count <= 1 ? t('Unselect') : `${t('Unselect')} All`}
        </Button>
      </div>
    );
  }
}

HeaderCommand.propTypes = {
  count: PropTypes.number,
};

HeaderCommand.defaultProps = {
  count: 0,
};

export default withTranslation()(HeaderCommand);
