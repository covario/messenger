/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import DialogContent from '../DialogContent/DialogContent';
import DialogBadge from '../DialogBadge/DialogBadge';
import DialogTitle from '../DialogTitle/DialogTitle';
import DialogMeta from '../DialogMeta/DialogMeta';
import {
  canAddChatToList,
  isChatArchived,
  isChatMuted,
  isChatPinned,
  isChatSecret,
  isChatUnread,
  isPrivateChat,
} from '../../../Utils/Chat';
import {
  addChatToList,
  toggleChatIsMarkedAsUnread,
  toggleChatIsPinned,
  toggleChatNotificationSettings,
} from '../../../Actions/Chat';
import { openChat } from '../../../Actions/Client';
import { viewMessages } from '../../../Actions/Message';
import ApplicationStore from '../../../Stores/ApplicationStore';
import ChatStore from '../../../Stores/ChatStore';
import OptionStore from '../../../Stores/OptionStore';
import TdLibController from '../../../Controllers/TdLibController';
import './_dialog.scss';

class Dialog extends Component {
  static contextMenuId;

  constructor(props) {
    super(props);

    this.dialog = React.createRef();
    this.dialogMeta = React.createRef();

    this.baseClass = 'dialog';

    const chat = ChatStore.get(this.props.chatId);
    this.state = {
      chat,
      contextMenu: false,
      left: 0,
      top: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { chatId, t, hidden, isLastPinned, chatList, style } = this.props;
    const { contextMenu } = this.state;

    if (nextProps.chatId !== chatId) {
      return true;
    }

    if (nextProps.t !== t) {
      return true;
    }

    if (nextProps.hidden !== hidden) {
      return true;
    }

    if (nextProps.isLastPinned !== isLastPinned) {
      return true;
    }

    if (nextState.contextMenu !== contextMenu) {
      return true;
    }

    if (nextState.chatList !== chatList) {
      return true;
    }

    if (nextProps.style && style && style.top !== nextProps.style.top) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    ChatStore.on('updateChatNotificationSettings', this.onChatNotificationSettings);
    ApplicationStore.on('clientUpdateChatId', this.onClientUpdateChatId);
  }

  componentWillUnmount() {
    ChatStore.off('updateChatNotificationSettings', this.onChatNotificationSettings);
    ApplicationStore.off('clientUpdateChatId', this.onClientUpdateChatId);
  }

  onChatNotificationSettings = () => {
    this.forceUpdate();
  };

  onClientUpdateChatId = (update) => {
    const { chatId } = this.props;

    if (chatId === update.previousChatId || chatId === update.nextChatId) {
      this.forceUpdate();
    }
  };

  handleSelect = (event) => {
    if (event.button === 0) {
      openChat(this.props.chatId);
    }
  };

  handleContextMenu = async (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const { chatId, chatList } = this.props;
    const { contextMenu } = this.state;

    if (contextMenu) {
      this.setState({ contextMenu: false });
    } else {
      const contextMenuId = new Date();
      Dialog.contextMenuId = contextMenuId;

      const left = event.clientX;
      const top = event.clientY;
      const isPinned = isChatPinned(chatId, chatList);
      const canTogglePin = (await this.canPinChats(chatId)) || isPinned;
      const canToggleArchive = canAddChatToList(chatId);

      if (Dialog.contextMenuId !== contextMenuId) {
        return;
      }

      this.setState({
        contextMenu: true,
        canTogglePin,
        canToggleArchive,
        left,
        top,
      });
    }
  };

  handleCloseContextMenu = (event) => {
    if (event) {
      event.stopPropagation();
    }

    this.setState({ contextMenu: false });
  };

  handleMute = (event) => {
    this.handleCloseContextMenu(event);

    const { chatId } = this.props;

    toggleChatNotificationSettings(chatId, !isChatMuted(chatId));
  };

  canPinChats = async (chatId) => {
    const { chatList } = this.props;

    const pinnedSumMaxOption = isChatArchived(chatId)
      ? OptionStore.get('pinned_archived_chat_count_max')
      : OptionStore.get('pinned_chat_count_max');
    if (!pinnedSumMaxOption) return false;

    const isSecret = isChatSecret(chatId);
    const chats = await TdLibController.send({
      '@type': 'getChats',
      chat_list: chatList,
      offset_order: '9223372036854775807',
      offset_chat_id: 0,
      limit: pinnedSumMaxOption.value + 10,
    });

    const pinnedSum = chats.chat_ids.reduce((x, id) => {
      if (isChatSecret(id) !== isSecret) return x;

      const chat = ChatStore.get(id);

      return x + (chat && isChatPinned(chat.id, chatList) ? 1 : 0);
    }, 0);

    return pinnedSum < pinnedSumMaxOption.value;
  };

  handlePin = async (event) => {
    this.handleCloseContextMenu(event);

    const { chatId, chatList } = this.props;
    const isPinned = isChatPinned(chatId, chatList);

    if (!isPinned && !this.canPinChats(chatId)) return;

    toggleChatIsPinned(chatId, chatList, !isPinned);
  };

  handleArchive = async (event) => {
    this.handleCloseContextMenu(event);

    const { chatId } = this.props;
    if (!canAddChatToList(chatId)) return;

    addChatToList(chatId, { '@type': isChatArchived(chatId) ? 'chatListMain' : 'chatListArchive' });
  };

  getViewInfoTitle = () => {
    const { chatId, t } = this.props;
    const chat = ChatStore.get(chatId);
    if (!chat) return;

    const { type } = chat;
    switch (type['@type']) {
      case 'chatTypeBasicGroup': {
        return t('ViewGroupInfo');
      }
      case 'chatTypePrivate':
      case 'chatTypeSecret': {
        return t('ViewProfile');
      }
      case 'chatTypeSupergroup': {
        if (type.is_channel) {
          return t('ViewChannelInfo');
        }

        return t('ViewGroupInfo');
      }
    }
  };

  handleViewInfo = (event) => {
    this.handleCloseContextMenu(event);

    const { chatId } = this.props;

    openChat(chatId, null, true);
  };

  handleRead = (event) => {
    this.handleCloseContextMenu(event);

    const { chatId } = this.props;

    const isUnread = isChatUnread(chatId);
    if (isUnread) {
      const chat = ChatStore.get(chatId);
      if (!chat) return;

      const { is_marked_as_unread, last_message, unread_count } = chat;
      if (unread_count > 0 && last_message) {
        viewMessages(chatId, [last_message.id], true);
      } else if (is_marked_as_unread) {
        toggleChatIsMarkedAsUnread(chatId, false);
      }
    } else {
      toggleChatIsMarkedAsUnread(chatId, true);
    }
  };

  render() {
    const { chatId, chatList, showSavedMessages, hidden, t, isLastPinned, style } = this.props;
    const { contextMenu, left, top, canToggleArchive, canTogglePin } = this.state;

    const chat = ChatStore.get(chatId);
    const isPinned = isChatPinned(chatId, chatList);
    const currentChatId = ApplicationStore.getChatId();
    const isSelected = currentChatId === chatId;
    const isMuted = isChatMuted(chatId);
    const isGroupChat =
      chat &&
      (chat.type['@type'] === 'chatTypeSupergroup' || chat.type['@type'] === 'chatTypeBasicGroup');
    const isUnread = isChatUnread(chatId);
    const isArchived = isChatArchived(chatId);

    const cls = classNames(this.baseClass, {
      [`${this.baseClass}--item-selected`]: isSelected,
      [`${this.baseClass}--active-context`]: contextMenu,
      [`${this.baseClass}--hidden`]: hidden,
    });

    return (
      <div ref={this.dialog} className={cls} onClick={this.handleSelect} style={style}>
        <div className="dialog-wrapper">
          <div className="dialog-inner-wrapper">
            <div className="tile-first-row">
              <DialogTitle
                isMuted={isMuted}
                isGroupChat={isGroupChat}
                chatId={chatId}
                baseClass={this.baseClass}
              />
              <DialogMeta
                ref={this.dialogMeta}
                chatId={chatId}
                isContextMenuActive={contextMenu}
                onKebobClick={this.handleContextMenu}
              />
            </div>
            <div className="tile-second-row">
              <DialogContent chatId={chatId} />
              <DialogBadge chatId={chatId} chatList={chatList} />
            </div>
          </div>
        </div>
        <Popover
          open={contextMenu}
          onClose={this.handleCloseContextMenu}
          anchorEl={this.dialogMeta?.current || null}
          anchorOrigin={{
            vertical:
              (this.dialogMeta?.current && this.dialogMeta.current.clientHeight + 8) || 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <MenuList onClick={(e) => e.stopPropagation()}>
            {canToggleArchive && (
              <MenuItem onClick={this.handleArchive}>
                {isArchived ? (
                  <>
                    <ListItemText primary={t('Unarchive')} />
                  </>
                ) : (
                  <>
                    <ListItemText primary={t('Archive')} />
                  </>
                )}
              </MenuItem>
            )}
            {canTogglePin && (
              <MenuItem onClick={this.handlePin}>
                {isPinned ? (
                  <>
                    <ListItemText primary={t('UnpinFromTop')} />
                  </>
                ) : (
                  <>
                    <ListItemText primary={t('PinToTop')} />
                  </>
                )}
              </MenuItem>
            )}
            <MenuItem onClick={this.handleViewInfo}>
              {isPrivateChat(chatId) ? (
                <>
                  <ListItemText primary={this.getViewInfoTitle()} />
                </>
              ) : (
                <>
                  <ListItemText primary={this.getViewInfoTitle()} />
                </>
              )}
            </MenuItem>
            <MenuItem onClick={this.handleMute}>
              {isMuted ? (
                <>
                  <ListItemText primary={t('ChatsUnmute')} />
                </>
              ) : (
                <>
                  <ListItemText primary={t('ChatsMute')} />
                </>
              )}
            </MenuItem>
            <MenuItem onClick={this.handleRead}>
              {isUnread ? (
                <>
                  <ListItemText primary={t('MarkAsRead')} />
                </>
              ) : (
                <>
                  <ListItemText primary={t('MarkAsUnread')} />
                </>
              )}
            </MenuItem>
          </MenuList>
        </Popover>
      </div>
    );
  }
}

Dialog.propTypes = {
  chatId: PropTypes.number.isRequired,
  chatList: PropTypes.object.isRequired,
  hidden: PropTypes.bool,
  showSavedMessages: PropTypes.bool,
  isLastPinned: PropTypes.bool,
  style: PropTypes.object,
};

Dialog.defaultProps = {
  hidden: false,
  showSavedMessages: true,
};

export default withTranslation()(Dialog);
