import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import TelegramApp from './TelegramApp';
import 'fake-indexeddb/auto';
import { ApplicationWrapper } from './ApplicationWrapper';
import Worker from './Workers/pako.worker';

describe('<TelegramApp />', () => {
  let MuiMount: typeof mount;
  let MuiShallow: typeof shallow;

  beforeAll(() => {
    MuiMount = createMount();
    MuiShallow = createShallow();
  });

  it('renders without crashing', () => {
    MuiShallow(<TelegramApp />);
  });
  it('should catch errors in an ErrorBoundry', (done) => {
    const wrapper = MuiMount(
      <ApplicationWrapper>
        <TelegramApp />
      </ApplicationWrapper>,
    );

    const error = new Error('test error');

    wrapper.find(TelegramApp).simulateError(error);

    // @ts-ignore
    window.Worker = Worker;
    expect(wrapper.state()).toHaveProperty('fatalError', true);
    setTimeout(() => {
      done();
    }, 1000);
  });
});
