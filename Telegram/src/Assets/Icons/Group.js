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
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.03537 9.75256C5.64095 7.62957 6.7696 5.53315 8.49981 5.17496C8.83099 5.10639 9.16901 5.10639 9.50019 5.17496C11.2304 5.53315 12.3591 7.62957 11.9646 9.75257L10.9301 14.3211L11.4444 16.2379L15.2011 17.3147C16.2541 17.6166 17 18.7812 17 20.1235H1C1 18.7812 1.7459 17.6166 2.79888 17.3147L6.55556 16.2379L7.06993 14.3211L6.55265 11.5369L6.03537 9.75256Z"
      fill={rgba(Color.Proxima)}
    />
    <path
      d="M18.0001 20.1235L23.0001 20.1235C23.0001 19.1168 22.4406 18.2433 21.6509 18.0169L18.8334 17.2093L18.4476 16.1155L19.2235 12.5953C19.5193 11.0031 18.6729 9.43074 17.3752 9.1621C17.1268 9.11068 16.8733 9.11068 16.6249 9.1621C15.3272 9.43074 14.4808 11.0031 14.7766 12.5953L15.5525 16.1155L15.4693 16.3513L15.4767 16.3534C17.0746 16.8115 18.0001 18.4686 18.0001 20.1235Z"
      fill={rgba(Color.Proxima)}
    />
  </g>,
  'Group',
);
