/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import withLanguage from './Language';
import { compose } from './Utils/HOC';
import packageJson from '../package.json';
import AuthForm from './Components/Auth/AuthForm';
import InactivePage from './Components/InactivePage';
import NativeAppPage from './Components/NativeAppPage';
import registerServiceWorker from './registerServiceWorker';
import { isMobile } from './Utils/Common';
import { loadData } from './Utils/Phone';
import KeyboardManager, { KeyboardHandler } from './Components/Additional/KeyboardManager';
import { openPinnedChat } from './Actions/Chat';
import { modalManager } from './Utils/Modal';
import { editMessage, replyMessage, searchChat } from './Actions/Client';
import { OPTIMIZATIONS_FIRST_START } from './Constants';
import UserStore from './Stores/UserStore';
import AppStore from './Stores/ApplicationStore';
import AuthorizationStore from './Stores/AuthorizationStore';
import MessageStore from './Stores/MessageStore';
import TdLibController from './Controllers/TdLibController';
import './TelegramApp.css';
import { AppHeader } from './Components/AppHeader';

const MainPage = React.lazy(() => import('./Components/MainPage'));
const MAXIMIZED = 'maximized';
const RESTORED = 'restored';

class TelegramApp extends Component {
  constructor(props) {
    super(props);

    console.log(`Start Telegram Web ${packageJson.version}`);

    this.state = {
      prevAuthorizationState: AuthorizationStore.current,
      authorizationState: null,
      tdlibDatabaseExists: false,
      inactive: false,
      nativeMobile: isMobile(),
      isSmall: window.innerWidth < 800,
      isAppWindowMaximized: false,
    };

    this.replyMessageId = 0;
    this.editMessageId = 0;
    this.keyboardHandler = new KeyboardHandler(this.handleKeyDown);
    this.keyMap = new Map();
    this.window = window.fin?.desktop.Window.getCurrent();

    document.addEventListener('keyup', (event) => {
      this.keyMap.delete(event.key);
    });
  }

  handleKeyDown = async (event) => {
    const { altKey, ctrlKey, keyCode, key, metaKey, repeat, shiftKey } = event;

    this.keyMap.set(key, key);

    const { authorizationState, chatId } = AppStore;
    if (!authorizationState) return;
    if (authorizationState['@type'] !== 'authorizationStateReady') return;
    if (this.keyMap.size > 3) return;

    switch (key) {
      case 'Escape': {
        if (
          !altKey &&
          !ctrlKey &&
          !metaKey &&
          !shiftKey &&
          !repeat &&
          !modalManager.modals.length
        ) {
          // console.log('[keydown] esc', this.editMessageId, this.replyMessageId);
          if (this.editMessageId) {
            editMessage(chatId, 0);
            return;
          }
          if (this.replyMessageId) {
            replyMessage(chatId, 0);
            return;
          }
          if (!chatId) {
            // open search if no one dialog opened
            searchChat(0, null);

            return;
          }

          TdLibController.setChatId(0);

          event.preventDefault();
          event.stopPropagation();
        }
        break;
      }
      case '0': {
        if (altKey && ctrlKey && !metaKey && !shiftKey && !repeat && !modalManager.modals.length) {
          if (this.editMessageId) return;
          if (this.replyMessageId) return;

          const chat = await TdLibController.send({
            '@type': 'createPrivateChat',
            user_id: UserStore.getMyId(),
            force: true,
          });

          if (!chat) return;

          TdLibController.setChatId(chat.id);
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      }
      case '1':
      case '2':
      case '3':
      case '4':
      case '5': {
        if (altKey && ctrlKey && !metaKey && !shiftKey && !repeat && !modalManager.modals.length) {
          if (this.editMessageId) return;
          if (this.replyMessageId) return;

          openPinnedChat(Number(key) - 1);
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      }
    }
  };

  componentWillMount() {
    const { location } = this.props;

    TdLibController.init(location);
  }

  componentDidMount() {
    setTimeout(() => loadData(), 1500);
    TdLibController.on('update', this.onUpdate);

    AppStore.on('clientUpdateAppInactive', this.onClientUpdateAppInactive);
    AppStore.on('clientUpdateFocusWindow', this.onClientUpdateFocusWindow);
    AppStore.on('clientUpdateTdLibDatabaseExists', this.onClientUpdateTdLibDatabaseExists);
    AppStore.on('updateAuthorizationState', this.onUpdateAuthorizationState);
    MessageStore.on('clientUpdateEditMessage', this.onClientUpdateEditMessage);
    MessageStore.on('clientUpdateReply', this.onClientUpdateReply);
    KeyboardManager.add(this.keyboardHandler);

    if (this.window) {
      this.window.addEventListener(MAXIMIZED, () => {
        this.setState({ isAppWindowMaximized: true });
      });
      this.window.addEventListener(RESTORED, () => {
        this.setState({ isAppWindowMaximized: false });
      });
    }
  }

  componentWillUnmount() {
    TdLibController.off('update', this.onUpdate);

    AppStore.off('clientUpdateAppInactive', this.onClientUpdateAppInactive);
    AppStore.off('clientUpdateFocusWindow', this.onClientUpdateFocusWindow);
    AppStore.off('clientUpdateTdLibDatabaseExists', this.onClientUpdateTdLibDatabaseExists);
    AppStore.off('updateAuthorizationState', this.onUpdateAuthorizationState);
    MessageStore.off('clientUpdateEditMessage', this.onClientUpdateEditMessage);
    MessageStore.off('clientUpdateReply', this.onClientUpdateReply);
    KeyboardManager.remove(this.keyboardHandler);
  }

  onClientUpdateEditMessage = (update) => {
    const { messageId } = update;

    this.editMessageId = messageId;
  };

  onClientUpdateReply = (update) => {
    const { messageId } = update;

    this.replyMessageId = messageId;
  };

  onClientUpdateFocusWindow = (update) => {
    this.keyMap.clear();
  };

  onClientUpdateTdLibDatabaseExists = (update) => {
    const { exists } = update;

    if (!exists) {
      this.setState({
        authorizationState: {
          '@type': 'authorizationStateWaitTdlib',
        },
        tdlibDatabaseExists: exists,
      });
    }
  };

  onUpdate = (update) => {
    if (OPTIMIZATIONS_FIRST_START) {
      if (!this.checkServiceWorker) {
        this.checkServiceWorker = true;

        const register = localStorage.getItem('register');
        if (!register) {
          registerServiceWorker();
        }
      }
    }
  };

  onUpdateAuthorizationState = (update) => {
    const { authorization_state: authorizationState } = update;

    this.setState({ authorizationState });

    if (!window.hasFocus) return;
    if (!authorizationState) return;

    TdLibController.send({
      '@type': 'setOption',
      name: 'online',
      value: { '@type': 'optionValueBoolean', value: true },
    });
  };

  onClientUpdateAppInactive = (update) => {
    this.setState({ inactive: true });
  };

  handleChangePhone = () => {
    this.setState({
      changePhone: true,
    });
  };

  handleRequestQRCode = () => {
    const { changePhone, authorizationState } = this.state;

    if (
      changePhone &&
      authorizationState &&
      authorizationState['@type'] === 'authorizationStateWaitOtherDeviceConfirmation'
    ) {
      this.setState({ changePhone: false });
    } else {
      TdLibController.send({
        '@type': 'requestQrCodeAuthentication',
        other_user_ids: [],
      });
    }
  };

  handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  handleClose = () => {
    this.window.close();
  };

  handleMinimize = () => {
    this.window.minimize();
  };

  handleMaximize = () => {
    this.window.getState((state) => {
      if (state === MAXIMIZED) {
        this.window.restore();
        return;
      }
      this.window.maximize();
    });
  };

  render() {
    // test for browser vs. OpenFin
    const isOpenFin = 'fin' in window;

    const { t, theme } = this.props;
    const { inactive, nativeMobile } = this.state;
    let { authorizationState: state, prevAuthorizationState, changePhone } = this.state;
    if (changePhone) {
      state = { '@type': 'authorizationStateWaitPhoneNumber' };
    } else if (
      !state ||
      state['@type'] === 'authorizationStateWaitEncryptionKey' ||
      state['@type'] === 'authorizationStateWaitTdlibParameters'
    ) {
      if (prevAuthorizationState) {
        state = prevAuthorizationState;
      } else {
        state = { '@type': 'authorizationStateWaitPhoneNumber' };
      }
    }

    const loading = t('Loading').replace('...', '');
    let page = (
      <React.Suspense fallback={null}>
        <MainPage />
      </React.Suspense>
    );

    if (nativeMobile) {
      page = <NativeAppPage />;
    } else if (inactive) {
      page = <InactivePage />;
    } else if (state) {
      switch (state['@type']) {
        case 'authorizationStateClosed':
        case 'authorizationStateClosing':
        case 'authorizationStateLoggingOut':
        case 'authorizationStateReady': {
          break;
        }
        case 'authorizationStateWaitOtherDeviceConfirmation':
        case 'authorizationStateWaitCode':
        case 'authorizationStateWaitRegistration':
        case 'authorizationStateWaitPassword':
        case 'authorizationStateWaitPhoneNumber':
        case 'authorizationStateWaitTdlib':
          page = (
            <AuthForm
              authorizationState={state}
              onChangePhone={this.handleChangePhone}
              onRequestQRCode={this.handleRequestQRCode}
            />
          );
          break;
        case 'authorizationStateWaitEncryptionKey':
        case 'authorizationStateWaitTdlibParameters': {
          break;
        }
      }
    }

    const allowBrowser =
      localStorage.getItem('covario:allowBrowser') != null &&
      process.env.NODE_ENV === 'development';

    // if (!this.window && !allowBrowser) {
    //   return (
    //     <div className="openfin-message">
    //       <div>Download the Covario chat application at:</div>
    //       <a target="_blank" rel="noreferrer" href="https://messenger.covar.io/">
    //         https://messenger.covar.io/
    //       </a>
    //     </div>
    //   );
    // }

    return (
      <div id="app" className="dark" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
        <AppHeader
          isMaximized={this.state.isAppWindowMaximized}
          onMaximize={this.handleMaximize}
          onMinimize={this.handleMinimize}
          onClose={this.handleClose}
        />
        {page}
      </div>
    );
  }
}

window.hasFocus = true;

// set offline on page lost focus
// console.log('[ns] window.onblur attach');
window.onblur = function () {
  window.hasFocus = false;

  TdLibController.clientUpdate({
    '@type': 'clientUpdateFocusWindow',
    focused: false,
  });
};

// set online on page get focus
// console.log('[ns] window.onfocus attach');
window.onfocus = function () {
  window.hasFocus = true;

  TdLibController.clientUpdate({
    '@type': 'clientUpdateFocusWindow',
    focused: true,
  });
};

// disable back navigation
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.go(1);
};

const enhance = compose(withLanguage, withTranslation());

export default enhance(TelegramApp);
