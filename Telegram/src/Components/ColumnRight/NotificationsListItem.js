/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Notifications from '../ColumnMiddle/Notifications';
import { Switch } from '../Switch';

class NotificationsListItem extends Notifications {
  render() {
    const { t } = this.props;
    const { isMuted } = this.state;

    return (
      <ListItem button className="list-item" onClick={this.handleSetChatNotifications}>
        <ListItemText
          primary={
            <Typography variant="inherit" noWrap>
              {t('Notifications')}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <Switch color="primary" onChange={this.handleSetChatNotifications} checked={!isMuted} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withTranslation()(NotificationsListItem);
