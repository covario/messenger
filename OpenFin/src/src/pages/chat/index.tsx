import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import ChatPage from '../../components/ChatPage/ConnectedChatPage';
import { ChatState, MessageParams } from '../../redux/states/chatsState';
import { RootState } from '../../redux/reducers/reducer';
import { addPreMessage, NewMessageToSend, sendNewMessage } from '../../redux/actions/chatsActions';
import { UserProfile } from '../../redux/states/userState';
import { createNewMessage } from '../../common/utils';
import { SignalrInvokeMethods } from '../../common/signalR/constants';

interface StateProps {
  chats: ChatState['allChats'];
  activeChat: ChatState['activeChat'];
  user: UserProfile;
}

interface DispatchProps {
  sendMessage: (newMessage: NewMessageToSend) => void;
}

type Props = StateProps & DispatchProps;

const baseClass = 'page page--chat';

const ChatIndex = ({ activeChat, sendMessage, user }: Props): JSX.Element => {
  const onSubmit = ({ value }: MessageParams) => {
    sendMessage({
      chatId: activeChat.id,
      name: user.displayName,
      messageText: value,
    });
  };

  return (
    <div className={baseClass}>
      <ChatPage onSubmitMessage={onSubmit} />
    </div>
  );
};

// TODO: remove redux from this file
const mapStateToProps = (state: RootState): StateProps => {
  return {
    chats: state.chats.allChats,
    activeChat: state.chats.activeChat,
    user: state.userProfile,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    sendMessage: (newMessage) => {
      dispatch(
        addPreMessage(
          createNewMessage(
            SignalrInvokeMethods.NEW_MESSAGE,
            newMessage.name,
            newMessage.messageText,
          ),
        ),
      );
      setTimeout(() => {
        dispatch(sendNewMessage(newMessage));
      }, 1000);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatIndex);
