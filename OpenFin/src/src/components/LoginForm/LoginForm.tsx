import React, { useState } from 'react';
import classnames from 'classnames';

import { Button } from '../Button';
import { Intent } from '../../common/intent';

interface OwnProps {
  onClickLogin: (username?: string, password?: string) => void;
}

export interface StateProps {
  isLoggedIn?: boolean;
}

type Props = OwnProps & StateProps;

const baseClass = 'login-form';

export const LoginForm = ({ onClickLogin, isLoggedIn }: Props): JSX.Element => {
  // Temporarily a div for now. We should use a <form /> or just use Formik.

  const [didSubmit, setDidSubmit] = useState(false);

  const onSubmitForm = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setDidSubmit(false);

      const username = event.currentTarget.elements.namedItem(
        'username',
      ) as HTMLInputElement | null;
      const password = event.currentTarget.elements.namedItem(
        'password',
      ) as HTMLInputElement | null;

      setDidSubmit(true);
      if (!username || !username.value || !password || !password.value) {
        return;
      }

      onClickLogin(username.value, password.value);

      username.value = '';
      password.value = '';
    },
    [onClickLogin],
  );

  const formCls = classnames(`${baseClass}__form`, {
    [`${baseClass}__error`]: !isLoggedIn && didSubmit,
  });

  return (
    <div className={baseClass}>
      <p className={`${baseClass}__title`}>
        Login
        <span style={{ display: (!isLoggedIn && didSubmit && 'block') || 'none' }}>
          Invalid Login. Please try again.
        </span>
      </p>
      <form onSubmit={onSubmitForm} className={formCls} autoComplete="off">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <Button text="Login" type="submit" block intent={Intent.Primary} onClick={() => {}} />
      </form>
    </div>
  );
};
