import orange from '@material-ui/core/colors/orange';

import { rgba, Color } from '../Utils/colors';
import { MuiButton } from './overrides/MuiButton';
import { MuiBackdrop } from './overrides/MuiBackdrop';
import { MuiDialogTitle } from './overrides/MuiDialogTitle';
import { MuiDialogActions } from './overrides/MuiDialogActions';
import { MuiDialogContent } from './overrides/MuiDialogContent';
import { MuiListItem } from './overrides/MuiListItem';

export const theme = {
  themeName: 'Covario',
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiPaper: {
      square: true,
      variant: 'outlined',
    },
  },
  palette: {
    type: 'dark',
    primary: orange,
    secondary: { main: '#E53935' },
    action: {},
  },
  typography: {
    fontFamily: ['IBM Plex Sans', '-apple-system', 'sans-serif'].join(','),
    fontSize: 16,
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiButton,
    MuiBackdrop,
    MuiDialogTitle,
    MuiDialogActions,
    MuiDialogContent,
    MuiListItem,
    MuiOutlinedInput: {
      input: {
        padding: '17.5px 14px',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: rgba(Color.Saturn),
      },
      outlined: {
        border: `1px solid ${rgba(Color.Sun)}`,
      },
    },
    MuiAutocomplete: {
      option: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
      },
      paper: {
        '& > ul': {
          maxHeight: 56 * 5.5,
        },
      },
    },
    MuiButtonGroup: {
      root: {
        borderRadius: 0,
      },
      contained: {
        boxShadow: 'none',
      },
      groupedContainedHorizontal: {
        '&:not(:last-child)': {
          borderRight: 0,
          marginRight: 1,
        },
      },
    },
    MuiMenuList: {
      root: {
        minWidth: 150,
      },
    },
    MuiList: {
      root: {
        minWidth: 150,
      },
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 40,
      },
      alignItemsFlexStart: {
        marginTop: 6,
      },
    },
    MuiMenuItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
        borderBottom: `1px solid ${rgba(Color.Neptune)}`,
      },
    },
  },
};
