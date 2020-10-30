import React from 'react';
import { addDecorator } from '@storybook/react';

import '../src/styles/styles.scss';

addDecorator(storyFn => <div style={{ margin: 10, minHeight: 'calc(100vh - 20px)' }}>{storyFn()}</div>);
