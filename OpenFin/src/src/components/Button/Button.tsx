import React from 'react';
import classnames from 'classnames';

import { Icon, Icons } from '../Icon';
import { Intent } from '../../common/intent';
import { Size } from '../../common/size';

interface BaseProps {
  block?: boolean;
  className?: string;
  disabled?: boolean;
  intent?: Intent | null;
  onClick: () => void;
  outlined?: boolean;
  size?: Size | null;
  type?: 'button' | 'submit' | 'reset';
}

interface PropsWithText extends BaseProps {
  icon?: Icons | null;
  text: string;
}

interface PropsWithOnlyIcon extends BaseProps {
  icon: Icons | null;
  text?: never;
}

// You can have a button with only text, text and
// an icon, or only an icon. You _cannot_ have a button
// with no text and no icon.
type Props = PropsWithText | PropsWithOnlyIcon;

const baseClass = 'button';
const defaultProps = {
  type: 'button',
};

export const Button = ({
  block,
  className,
  disabled,
  icon,
  intent,
  onClick,
  outlined,
  size,
  text,
  type,
}: Props): JSX.Element => {
  const cls = classnames(baseClass, className, intent, {
    [`${baseClass}--block`]: block,
    [`${baseClass}--icon-only`]: icon && !text,
    [`${baseClass}--intent-${intent || ''}`]: intent,
    [`${baseClass}--outlined`]: outlined,
    [`${baseClass}--size-${size || ''}`]: size,
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button disabled={disabled} type={type} onClick={onClick} className={cls}>
      {icon && <Icon name={icon} className={`${baseClass}__icon`} />}

      {text && <span className={`${baseClass}__text`}>{text}</span>}
    </button>
  );
};

Button.defaultProps = defaultProps;
