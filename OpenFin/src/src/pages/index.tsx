import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Action, Dispatch } from 'redux';

import { AppHeader } from '../components/AppHeader';
import LoginForm from '../components/LoginForm/ConnectedLoginForm';
import { attemptLoginAction, LoginPayload } from '../redux/actions/authActions';
import { RootState } from '../redux/reducers/reducer';
import { startSignalRconnection } from '../common/signalR';
import { ConnectionStats } from '../redux/states/userState';
import { setSignalRconnectionStatus } from '../redux/actions/signalrActions';

const baseClass = 'page-index';

interface DispatchProps {
  attemptLogin: (loginInfo: LoginPayload) => void;
  setSRconnectionStatus: (payload: boolean) => void;
}

interface StateProps {
  isSignalrConnected: boolean;
  isLoggedIn: boolean;
}

type Props = DispatchProps & StateProps;

const Index = ({
  attemptLogin,
  isLoggedIn,
  isSignalrConnected,
  setSRconnectionStatus,
}: Props): JSX.Element => {
  useEffect(() => {
    startSignalRconnection()
      .then(() => {
        // set signalR connection status
        setSRconnectionStatus(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogin = (username?: string, password?: string) => {
    if (username !== undefined && password !== undefined) {
      attemptLogin({ username, password });
    }
  };

  const router = useRouter();
  if (isLoggedIn) {
    void router.push('/chat');
  }

  const renderPage = (): JSX.Element => {
    if (isSignalrConnected) {
      return (
        (!isLoggedIn && (
          <>
            <AppHeader />
            <div className="container">
              <LoginForm onClickLogin={handleLogin} />
            </div>
          </>
        )) || <div />
      );
    }
    return (
      <div className={`${baseClass}--loading`}>
        Starting Covario Chat Application
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    );
  };

  return <div className={baseClass}>{renderPage()}</div>;
};

// TODO: move redux out of this file - carlin
const mapStateToProps = (state: RootState): StateProps => {
  return {
    isSignalrConnected: state.signalR.isConnected,
    isLoggedIn: state.userProfile.connectionStatus === ConnectionStats.ONLINE,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    attemptLogin: (loginInfo) => dispatch(attemptLoginAction.request(loginInfo)),
    setSRconnectionStatus: (status) => dispatch(setSignalRconnectionStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
