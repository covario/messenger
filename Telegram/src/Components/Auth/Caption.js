/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ReactComponent as Logo } from '../../Assets/telegram-logo.svg';

import './Caption.scss';

export default ({ state }) => {
    let control = null;

    switch (state['@type']) {
        case 'authorizationStateWaitOtherDeviceConfirmation': {
            break;
        }
        case 'authorizationStateWaitPhoneNumber':
        case 'authorizationStateWaitRegistration':
        case 'authorizationStateWaitEncryptionKey':
        case 'authorizationStateWaitTdlibParameters':
        case 'authorizationStateWaitTdlib':
        case 'authorizationStateWaitCode':
        case 'authorizationStateWaitPassword': {
            control = <Logo className="auth-caption__telegram-logo" />;
            break;
        }
        default:
            control = <Logo className="auth-caption__telegram-logo" />;
            break;
    }

    return <div className="auth-caption">{control}</div>;
}
