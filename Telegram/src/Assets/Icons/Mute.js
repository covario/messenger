/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { createSvgIcon } from '@material-ui/core';
import { Color, rgba } from '../../Utils/colors';

export default createSvgIcon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.00009 9.12354L17.0001 3.12354V6.39053L20.5837 4.00145L21.4158 5.24953L1.71144 18.3857L0.879395 17.1377L4.00009 15.0572V9.12354H8.00009ZM9.10217 15.8583L17.0001 10.593L17.0001 21.1235L9.10217 15.8583Z"
    fill={rgba(Color.Proxima)}
  />,
  'Mute',
);
