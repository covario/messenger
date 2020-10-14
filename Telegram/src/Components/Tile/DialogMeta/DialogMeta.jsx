/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Status from '../../Message/Status/Status';
import { getLastMessageDate, isMeChat } from '../../../Utils/Chat';
import ChatStore from '../../../Stores/ChatStore';

import './_dialog-meta.scss';
import { MoreHoriz } from '@material-ui/icons';

class DialogMeta extends React.Component {
  componentDidMount() {
    ChatStore.on('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
    ChatStore.on('clientUpdateClearHistory', this.onClientUpdateClearHistory);
    ChatStore.on('updateChatDraftMessage', this.onUpdate);
    ChatStore.on('updateChatLastMessage', this.onUpdate);
    ChatStore.on('updateChatReadInbox', this.onUpdate);
    ChatStore.on('updateChatUnreadMentionCount', this.onUpdate);
    ChatStore.on('updateMessageMentionRead', this.onUpdate);
  }

  componentWillUnmount() {
    ChatStore.off('clientUpdateFastUpdatingComplete', this.onFastUpdatingComplete);
    ChatStore.off('clientUpdateClearHistory', this.onClientUpdateClearHistory);
    ChatStore.off('updateChatDraftMessage', this.onUpdate);
    ChatStore.off('updateChatLastMessage', this.onUpdate);
    ChatStore.off('updateChatReadInbox', this.onUpdate);
    ChatStore.off('updateChatUnreadMentionCount', this.onUpdate);
    ChatStore.off('updateMessageMentionRead', this.onUpdate);
  }

  onClientUpdateClearHistory = (update) => {
    const { chatId } = this.props;

    if (chatId === update.chatId) {
      this.clearHistory = update.inProgress;
      this.forceUpdate();
    }
  };

  onFastUpdatingComplete = (update) => {
    this.forceUpdate();
  };

  onUpdate = (update) => {
    const { chatId } = this.props;

    if (chatId !== update.chat_id) return;

    this.forceUpdate();
  };

  render() {
    if (this.clearHistory) return null;

    const { chatId, onKebobClick, isContextMenuActive } = this.props;

    const chat = ChatStore.get(chatId);
    if (!chat) return null;

    const isMe = isMeChat(chatId);

    const { last_message } = chat;
    if (!last_message) return null;

    const date = getLastMessageDate(chat);
    if (!date) return null;

    const { id, is_outgoing } = last_message;

    return (
      <>
        <div className="dialog-meta">
          {is_outgoing && !isMe && (
            <>
              <Status chatId={chatId} messageId={id} />
              <span> </span>
            </>
          )}
          {date}
        </div>
        <MoreHoriz
          fontSize="small"
          className="dialog-meta__kebob"
          ref={this.props.kebobRef}
          onClick={onKebobClick}
        />
      </>
    );
  }
}

const WrappedDialogMeta = (Component) => {
  return React.forwardRef((props, ref) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} kebobRef={ref} />;
  });
};

export default WrappedDialogMeta(DialogMeta);
