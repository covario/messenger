import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import withTheme from '@material-ui/core/styles/withTheme';
import { modalManager } from './Utils/Modal';
import AppStore from './Stores/ApplicationStore';
import TdLibController from './Controllers/TdLibController';
import TelegramApp from './TelegramApp';
import withTelegramTheme from './Theme';
import { compose } from './Utils/HOC';

interface State {
  fatalError: boolean;
}

export class ApplicationWrapper extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { fatalError: false };
  }

  static getDerivedStateFromError() {
    return { fatalError: true };
  }

  componentDidMount() {
    AppStore.on('updateFatalError', this.setFatalError);
  }

  componentWillUnmount() {
    AppStore.off('updateFatalError', this.setFatalError);
  }

  setFatalError = () => {
    this.setState({ fatalError: true});
  }

  handleError = () => {
    this.setState({ fatalError: false });
    window.location.reload();
  };

  handleDestroy = () => {
    this.setState({ fatalError: false });
    TdLibController.send({ '@type': 'destroy' });
  };

  render() {
    const { fatalError } = this.state;
    console.log(fatalError);

    const page = fatalError ? <div /> : <TelegramApp />;

    return (
      <>
        {!fatalError && page}
        <Dialog
          PaperProps={{ variant: 'elevation' }}
          manager={modalManager}
          transitionDuration={0}
          open={fatalError}
          onClose={this.handleError}
          aria-labelledby="fatal-error-dialog-title"
          aria-describedby="fatal-error-dialog-description"
        >
          <DialogTitle id="fatal-error-dialog-title">Covario Telegram Application</DialogTitle>
          <DialogContent>
            <DialogContentText id="fatal-error-dialog-description">
              Oops! Something went wrong. Please try refreshing.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDestroy} color="primary">
              Log out
            </Button>
            <Button onClick={this.handleError} color="primary" autoFocus>
              Refresh
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const enhance = compose(withTelegramTheme, withTheme);

export default enhance(ApplicationWrapper);
