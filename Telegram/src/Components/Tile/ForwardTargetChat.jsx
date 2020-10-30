/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { withTranslation } from 'react-i18next';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';

import { getChatShortTitle } from '../../Utils/Chat';

import './ForwardTargetChat.scss';

const ForwardTargetChat = ({ chatId, selected, onSelect, t }) => {
  const shortTitle = getChatShortTitle(chatId, true, t);

  return (
    <ListItem className="forward-target-chat" onClick={onSelect}>
      <ListItemIcon>
        <Checkbox
          checked={selected}
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </ListItemIcon>

      <ListItemText>
        <div className="forward-target-chat-title">{shortTitle}</div>
      </ListItemText>
    </ListItem>
  );
}

ForwardTargetChat.propTypes = {
  chatId: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default withTranslation()(ForwardTargetChat);
