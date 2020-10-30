import { rgba, Color } from '../../Utils/colors';

export const MuiListItem = {
  root: {
    color: rgba(Color.Sun),
    padding: 12,
    borderBottom: `1px solid ${rgba(Color.Neptune)}`,
    '& .tile-first-row': {
      display: 'flex',
    },
    '& .tile-second-row': {
      margin: '5px 0 0 0',
      display: 'flex',
    },
  },
  button: {
    '&:hover': {
      backgroundColor: rgba(Color.Uranus),
    },
  },
  gutters: {
    paddingLeft: 8,
  },
};
