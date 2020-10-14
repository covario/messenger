/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ArrowBackIcon from '../../../Assets/Icons/Back';
import CloseIcon from '../../../Assets/Icons/Close';
import Chat from '../../Tile/Chat';
import ListItemText from '@material-ui/core/ListItemText';
import { setProfileMediaViewerContent } from '../../../Actions/Client';
import ChatStore from '../../../Stores/ChatStore';
import './Main.css';
import List from '@material-ui/core/List';

class Main extends React.Component {
  handleOpenViewer = () => {
    const { chatId } = this.props;

    const chat = ChatStore.get(chatId);
    if (!chat) return;
    if (!chat.photo) return;

    setProfileMediaViewerContent({ chatId });
  };

  render() {
    const {
      chatId,
      popup,
      t,
      onClose,
      onEditProfile,
      onGeneral,
      onNotifications,
      onPrivacySecurity,
      onLanguage,
      onFilters,
    } = this.props;
    const chat = ChatStore.get(chatId);
    if (!chat) return null;

    const { photo } = chat;

    return (
      <>
        <div className="header-master">
          <IconButton className="header-left-button" onClick={onClose}>
            {popup ? <CloseIcon /> : <ArrowBackIcon />}
          </IconButton>
          <div className="header-status grow cursor-pointer">
            <span className="header-status-content">{t('Settings')}</span>
          </div>
        </div>
        <div className="sidebar-page-content">
          <div className="chat-details-info">
            <Chat
              chatId={chatId}
              big={true}
              showChatTile={true}
              showStatus={true}
              showLogout={true}
              showSavedMessages={false}
              onTileSelect={photo ? this.handleOpenViewer : null}
            />
          </div>
          <List>
            <ListItem className="settings-list-item" button onClick={onEditProfile}>
              <ListItemText primary={t('EditProfile')} />
            </ListItem>
            <ListItem className="settings-list-item" button onClick={onNotifications}>
              <ListItemText primary={t('Notifications')} />
            </ListItem>
            <ListItem className="settings-list-item" button onClick={onPrivacySecurity}>
              <ListItemText primary={t('PrivacySettings')} />
            </ListItem>
            <ListItem autoFocus={false} className="settings-list-item" button onClick={onFilters}>
              <ListItemText primary={t('Filters')} />
            </ListItem>
            <ListItem autoFocus={false} className="settings-list-item" button onClick={onLanguage}>
              <ListItemText primary={t('Language')} />
            </ListItem>
          </List>
        </div>
      </>
    );
  }
}

Main.propTypes = {
  chatId: PropTypes.number,
  popup: PropTypes.bool,
  onClose: PropTypes.func,
  onEditProfile: PropTypes.func,
  onGeneral: PropTypes.func,
  onNotifications: PropTypes.func,
  onPrivacySecurity: PropTypes.func,
  onLanguage: PropTypes.func,
  onFilters: PropTypes.func,
};

export default withTranslation()(Main);
