import { connect } from 'react-redux';

import { LoginForm, StateProps } from './LoginForm';
import { RootState } from '../../redux/reducers/reducer';
import { ConnectionStats } from '../../redux/states/userState';

const mapStateToProps = (state: RootState): StateProps => {
  return {
    isLoggedIn: state.userProfile.connectionStatus === ConnectionStats.ONLINE,
  };
};

export default connect(mapStateToProps, null)(LoginForm);
