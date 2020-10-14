import React from 'react';
import classnames from 'classnames';

import { Icons, IconSrc } from './icons';

interface Props {
  name: Icons;
  className?: string;
}

const baseClass = 'icon';

const defaultProps = {
  className: undefined,
};

export const Icon = ({ className, name }: Props): JSX.Element => {
  const cls = classnames(baseClass, className);
  const Component = IconSrc[name];

  return <Component className={cls} />;
};

Icon.defaultProps = defaultProps;
