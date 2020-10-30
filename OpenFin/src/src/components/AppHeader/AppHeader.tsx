import React from 'react';

import Logo from '../../assets/logo.svg';

const baseClass = 'app-header';

export const AppHeader = (): JSX.Element => {
  return (
    <div className={baseClass}>
      <Logo className={`${baseClass}__logo`} />
    </div>
  );
};
