import React from 'react';
import { createStyles, SwitchClassKey, Theme, withStyles } from '@material-ui/core';
import MaterialUiSwitch, { SwitchProps } from '@material-ui/core/Switch';
import { Color, rgba } from '../../Utils/colors';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const createTheme = (theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        '& + $track': {
          backgroundColor: rgba(Color.Mercury),
          opacity: 1,
          border: 'none',
        },
      },
    },
    thumb: {
      width: 24,
      height: 24,
      color: theme.palette.common.white,
    },
    track: {
      borderRadius: 26 / 2,
      border: 'none',
      backgroundColor: rgba(Color.Neptune),
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  });

export const Switch = withStyles((theme: Theme) => createTheme(theme))(
  ({ classes, ...props }: Props): JSX.Element => (
    <MaterialUiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  ),
);
