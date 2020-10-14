/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { modalManager } from '../../../Utils/Modal';
import TdLibController from '../../../Controllers/TdLibController';

class SettingsMenuButton extends React.Component {
  state = {
    open: false,
  };

  handleLogOut = () => {
    this.setState({ open: true });
  };

  handleDone = () => {
    TdLibController.logOut();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { t } = this.props;
    const { open } = this.state;

    return (
      <>
        <Button size="small" onClick={this.handleLogOut}>
          Logout
        </Button>
        <Dialog
          manager={modalManager}
          transitionDuration={0}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{t('Confirm')}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ whiteSpace: 'pre-wrap' }}>
              {t('AreYouSureLogout')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {t('Cancel')}
            </Button>
            <Button onClick={this.handleDone} color="primary">
              {t('Ok')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

SettingsMenuButton.propTypes = {};

export default withTranslation()(SettingsMenuButton);
