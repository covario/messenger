import React from 'react';
import Button from '@material-ui/core/Button/Button';

import './FooterCommand.scss';

const baseClass = 'footer-command';

export default ({ command, onCommand }) => (
  <div className={baseClass}>
    <div className={`${baseClass}__actions`}>
      <Button color="primary" className={`${baseClass}__button`} onClick={onCommand}>
        {command}
      </Button>
    </div>
  </div>
);
