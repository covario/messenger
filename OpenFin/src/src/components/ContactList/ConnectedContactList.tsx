import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { ContactList, DispatchProps, StateProps } from './ContactList';
import { RootState } from '../../redux/reducers/reducer';
import { requestNewChat } from '../../redux/actions/chatsActions';

const mapStateToProps = (state: RootState): StateProps => {
  return {
    contacts: state.contacts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    startNewChat: (userId) => {
      dispatch(requestNewChat([userId]));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
