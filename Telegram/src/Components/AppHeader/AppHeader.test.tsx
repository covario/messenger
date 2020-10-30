import React from 'react';
import { shallow } from 'enzyme';

import { AppHeader } from './AppHeader';

describe('<AppHeader />', () => {
  it('renders without crashing', () => {
    shallow(
      <AppHeader
        isMaximized={false}
        onMaximize={() => {}}
        onMinimize={() => {}}
        onClose={() => {}}
      />,
    );
  });
});
