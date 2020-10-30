import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import MaterialUiButton, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

import { rgba, Color } from '../../Utils/colors';

type Props = ButtonProps & {
  danger?: boolean;
};

const useStyles = makeStyles({
  danger: {
    backgroundColor: rgba(Color.Earth),
    color: rgba(Color.Sun),

    '&:hover': {
      backgroundColor: rgba(Color.EarthSecondary),
      color: rgba(Color.Sun),
    },
  },
});

export const Button = ({
  danger,
  ...props
}: Props): React.ReactElement<typeof MaterialUiButton> => {
  const classes = useStyles(props);
  const cls = classnames({
    [classes.danger]: danger,
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MaterialUiButton className={cls} {...props} />;
};
