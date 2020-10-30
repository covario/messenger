/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { withTranslation } from 'react-i18next';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import { editMessage, replyMessage } from '../../Actions/Client';
import CloseIcon from '../../Assets/Icons/Close';
import MessageStore from '../../Stores/MessageStore';
import Reply from '../Message/Reply';
import TdLibController from '../../Controllers/TdLibController';


import './InputBoxHeader.css';

class InputBoxHeader extends React.Component {
    componentDidMount() {
        MessageStore.on('updateMessageContent', this.onUpdateMessageContent);
    }

    componentWillUnmount() {
        MessageStore.off('updateMessageContent', this.onUpdateMessageContent);
    }

    onUpdateMessageContent = update => {
        const { chatId, messageId, editMessageId } = this.props;
        const { chat_id, message_id } = update;

        if (chatId !== chat_id) return;
        if (messageId !== message_id && editMessageId !== message_id) return;

        this.forceUpdate();
    };

    handleClose = () => {
        const { chatId, editMessageId } = this.props;

        if (editMessageId) {
            editMessage(chatId, 0);
        } else {
            replyMessage(chatId, 0);
        }
    };

    render() {
        const { chatId, messageId, editMessageId, t, onClick, className } = this.props;
        if (!chatId) return null;
        if (!messageId && !editMessageId) return null;

        const cls = classnames('inputbox-header', className);

        return (
            <div className={cls}>
                <Reply
                    chatId={chatId}
                    messageId={editMessageId || messageId}
                    title={editMessageId ? t('EditMessage') : null}
                    onClick={onClick}
                />

                <IconButton className='inputbox-icon-button' aria-label='Close' onClick={this.handleClose}>
                    <CloseSharpIcon fontSize="small" />
                </IconButton>
            </div>
        );
    }
}

InputBoxHeader.propTypes = {
    className: PropTypes.string,
    chatId: PropTypes.number.isRequired,
    messageId: PropTypes.number.isRequired,
    editMessageId: PropTypes.number,
    onClick: PropTypes.func
};

export default withTranslation()(InputBoxHeader);
