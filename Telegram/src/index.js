/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { OPTIMIZATIONS_FIRST_START } from './Constants';
import './index.css';
import ApplicationWrapper from './ApplicationWrapper';

ReactDOM.render(
  <Router>
    <Route path="" component={ApplicationWrapper} />
  </Router>,
  document.getElementById('root'),
);

if (OPTIMIZATIONS_FIRST_START) {
  const register = localStorage.getItem('register');
  if (register) {
    registerServiceWorker();
  }
} else {
  registerServiceWorker();
}
