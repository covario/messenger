import { rgba, Color, Opacity } from '../../Utils/colors';

export const MuiButton = {
  root: {
    alignItems: 'center',
    backgroundColor: rgba(Color.Sun, Opacity.Arcturis),
    border: 0,
    borderRadius: 0,
    color: rgba(Color.Sun, Opacity.Sirius),
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: 400,
    fontSize: 15,
    minWidth: 40,
    padding: '.4rem 1.2rem .4rem',
    textAlign: 'center',
    textTransform: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: rgba(Color.Sun, Opacity.AlphaCenturi),
      color: rgba(Color.Sun),
    },
    '&:active': {
      backgroundColor: rgba(Color.Sun),
      color: rgba(Color.Sun),
    },
    '&:focus': {
      outline: `2px solid ${rgba(Color.Sun)}`,
      outlineOffset: 1,
    },
    '&[disabled]:hover, &[disabled]': {
      backgroundColor: rgba(Color.Sun, Opacity.Arcturis),
      border: 0,
      color: rgba(Color.Sun, Opacity.Arcturis),
      cursor: 'no-allowed',
    },
  },
  sizeSmall: {
    fontSize: '.9rem',
    padding: '0 .5rem .1rem',
  },
  text: {
    padding: undefined,
  },
  textPrimary: {
    color: rgba(Color.Sun),
    backgroundColor: rgba(Color.VenusSecondary),
    '&:hover': {
      backgroundColor: rgba(Color.Venus),
    },
    '&:active': {
      backgroundColor: rgba(Color.Sun),
      color: rgba(Color.Moon),
    },
    '&[disabled]:hover, &[disabled]': {
      backgroundColor: rgba(Color.Neptune),
      border: 0,
      color: rgba(Color.Moon),
    },
  },
  textSecondary: {
    backgroundColor: rgba(Color.Mercury),
    color: rgba(Color.Moon),
    '&:hover': {
      backgroundColor: rgba(Color.MercuryTertiary),
      color: rgba(Color.Moon),
    },
    '&:active': {
      backgroundColor: rgba(Color.Sun),
      color: rgba(Color.Moon),
    },
    '&[disabled]:hover, &[disabled]': {
      backgroundColor: rgba(Color.Neptune),
      border: 0,
      color: rgba(Color.Moon),
    },
  },
  outlined: {
    backgroundColor: 'transparent',
    border: 0,
    boxShadow: `inset 0 0 0 1px ${rgba(Color.Neptune)}`,
    color: rgba(Color.Sun),
    padding: null,
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: `inset 0 0 0 1px ${rgba(Color.Sun)}`,
    },
    '&:active': {
      backgroundColor: rgba(Color.Neptune),
      color: rgba(Color.Sun),
    },
    '&[disabled]:hover, &[disabled]': {
      backgroundColor: 'transparent',
      border: 0,
      boxShadow: `inset 0 0 0 1px ${rgba(Color.Neptune)}`,
      color: rgba(Color.Sun, Opacity.Canopus),
    },
  },
  outlinedPrimary: {
    border: 0,
    boxShadow: `inset 0 0 0 1px ${rgba(Color.VenusTertiary)}`,
    color: rgba(Color.Sun),
    '&:hover': {
      border: 0,
      boxShadow: `inset 0 0 0 1px ${rgba(Color.Venus)}`,
    },
    '&:active': {
      backgroundColor: rgba(Color.Venus, Opacity.Arcturis),
      border: 0,
      boxShadow: `inset 0 0 0 1px ${rgba(Color.Venus)}`,
    },
    '&[disabled]:hover, &[disabled]': {
      border: 0,
    },
  },
  outlinedSecondary: {
    border: 0,
    boxShadow: `inset 0 0 0 1px ${rgba(Color.Mercury)}`,
    color: rgba(Color.Mercury),
    '&:hover': {
      backgroundColor: rgba(Color.MercurySecondary, Opacity.Arcturis),
      border: 0,
      boxShadow: `inset 0 0 0 1px ${rgba(Color.MercurySecondary)}`,
      color: rgba(Color.Mercury),
    },
    '&:active': {
      backgroundColor: rgba(Color.Mercury, Opacity.Arcturis),
      border: 0,
      boxShadow: `inset 0 0 0 1px ${rgba(Color.Mercury)}`,
    },
    '&[disabled]:hover, &[disabled]': {
      border: 0,
    },
  },
};
