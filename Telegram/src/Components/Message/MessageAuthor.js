/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import { getUserFullName } from '../../Utils/User';
import { getChatTitle, isPrivateChat } from '../../Utils/Chat';
import { openUser as openUserCommand, openChat as openChatCommand } from '../../Actions/Client';
import UserStore from '../../Stores/UserStore';
import ChatStore from '../../Stores/ChatStore';
import './MessageAuthor.css';

class MessageAuthor extends React.Component {
    handleSelect = event => {
        const { chatId, userId, openUser, openChat } = this.props;

        if (openUser && userId) {
            event.stopPropagation();

            openUserCommand(userId, true);
            return;
        }

        if (openChat && chatId) {
            event.stopPropagation();

            openChatCommand(chatId, null, true);
            return;
        }
    };

    render() {
        const { t, chatId, userId, openUser, openChat, isOutgoing } = this.props;
        const cls = classNames('message-author', {
            [`message-author--is-outoing`]: isOutgoing,
        })

        const user = UserStore.get(userId);
        if (user) {
            const tileColor = isPrivateChat(chatId) ? 'message-author-color' : null
            const className = classNames(cls, [tileColor]);
            const fullName = getUserFullName(userId, null, t);

            return openUser ? (
                <a className={className} onClick={this.handleSelect}>
                    {fullName}
                </a>
            ) : (
                <>{fullName}</>
            );
        }

        const chat = ChatStore.get(chatId);
        if (chat) {
            const className = classNames(cls, 'message-author-color');
            const fullName = getChatTitle(chatId, false, t);

            return openChat ? (
                <a className={className} onClick={this.handleSelect}>
                    {fullName}
                </a>
            ) : (
                <>{fullName}</>
            );
        }

        return null;
    }
}

MessageAuthor.propTypes = {
    chatId: PropTypes.number,
    isOutgoing: PropTypes.bool,
    openChat: PropTypes.bool,
    openUser: PropTypes.bool,
    userId: PropTypes.number,
};

MessageAuthor.defaultProps = {
    isOutgoing: false,
    openChat: false,
    openUser: false,
};

export default withTranslation()(MessageAuthor);
