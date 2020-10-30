import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { ChatPage, DispatchProps } from './ChatPage';
import { RootState } from '../../redux/reducers/reducer';
import { getContacts } from '../../redux/actions/contactActions';
import {
  startContactNotifier,
  startMessageNotifier,
  startOpenChatNotifier,
} from '../../redux/actions/notifierActions';

const mapStateToProps = (state: RootState) => {
  // console.log(state.chats.activeChat);
  return {
    chats: state.chats.allChats,
    activeChat: state.chats.activeChat,
    isSignalRconnected: state.signalR.isConnected,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    requestContacts: () => dispatch(getContacts()),
    startSignalrNotifiers: () => {
      dispatch(startMessageNotifier());
      dispatch(startContactNotifier());
      dispatch(startOpenChatNotifier());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
