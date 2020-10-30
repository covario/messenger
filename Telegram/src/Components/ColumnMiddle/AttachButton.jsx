/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import PhotoSizeSelectActualSharpIcon from '@material-ui/icons/PhotoSizeSelectActualSharp';
import PropTypes from 'prop-types';
import React from 'react';

import './AttachButton.scss';
import Image from '../../Assets/Icons/Image';
import Document2 from '../../Assets/Icons/Document2';

class AttachButton extends React.Component {
  static baseClass = 'attach-button';

  handleAttachPhoto = () => {
    const { onAttachPhoto } = this.props;
    if (!onAttachPhoto) return;

    onAttachPhoto();
  };

  handleAttachDocument = () => {
    const { onAttachDocument } = this.props;
    if (!onAttachDocument) return;

    onAttachDocument();
  };

  handleAttachPoll = () => {
    const { onAttachPoll } = this.props;
    if (!onAttachPoll) return;

    onAttachPoll();
  };

  render() {
    const { chatId, canSendMediaMessages, canSendPolls, isPrivateChat } = this.props;

    return (
      <div className={AttachButton.baseClass}>
        <Button
          disabled={!canSendMediaMessages(chatId)}
          onClick={this.handleAttachPhoto}
          size="small"
        >
          <Image fontSize="small" />
        </Button>

        <Button
          disabled={!canSendMediaMessages(chatId)}
          onClick={this.handleAttachDocument}
          size="small"
        >
          <Document2 fontSize="small" />
        </Button>
      </div>
    );
  }
}

AttachButton.propTypes = {
  chatId: PropTypes.number.isRequired,
  onAttachDocument: PropTypes.func.isRequired,
  onAttachPhoto: PropTypes.func.isRequired,
  onAttachPoll: PropTypes.func.isRequired,
  canSendMediaMessages: PropTypes.func.isRequired,
  canSendPolls: PropTypes.func.isRequired,
  isPrivateChat: PropTypes.func.isRequired,
};

export default withTranslation()(AttachButton);
