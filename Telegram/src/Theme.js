/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import orange from '@material-ui/core/colors/orange';
import React from 'react';

import { getBadgeSelectedColor } from './Utils/Color';
import { getDisplayName } from './Utils/HOC';
import { Color, colors, Opacity, rgba } from './Utils/colors';
import { theme } from './Theme/themeDefinition';
import ApplicationStore from './Stores/ApplicationStore';

function updateDarkTheme(theme) {
  const { style } = document.documentElement;

  for (const color in colors) {
    style.setProperty(`--color-${color.toLowerCase()}`, colors[color].HEX);
  }

  style.setProperty('--text-primary', theme.palette.text.primary);
  style.setProperty('--text-secondary', theme.palette.text.secondary);
  style.setProperty('--text-disabled', theme.palette.text.disabled);

  style.setProperty('--error', '#E53935');

  style.setProperty('--tile-size', '54px');
  style.setProperty('--tile-size-normal', '48px');
  style.setProperty('--tile-size-extra-small', '16px');
  style.setProperty('--tile-size-small', '33px');
  style.setProperty('--tile-size-big', '120px');

  style.setProperty('--z-index-modal', theme.zIndex.modal);

  style.setProperty('--color-accent-main', theme.palette.primary.main);
  style.setProperty('--color-accent-main22', theme.palette.primary.main + '44');
  style.setProperty('--color-accent-dark', theme.palette.primary.dark);
  style.setProperty('--color-accent-light', theme.palette.primary.light);
  style.setProperty('--color-grey700', theme.palette.grey[700]);
  style.setProperty('--color-grey', '#9AA7B2');
  style.setProperty('--color-hover', rgba(Color.Uranus));

  style.setProperty('--search-input-background', '#424242');
  style.setProperty('--search-input-icon', rgba(Color.Sun));

  style.setProperty('--header-color', rgba(Color.Sun));
  style.setProperty('--header-background', rgba(Color.Uranus));
  style.setProperty('--header-subtle-color', theme.palette.text.secondary);

  style.setProperty('--badge-unmuted', '#333');
  style.setProperty('--badge-muted', '#979797');
  style.setProperty('--badge-item-selected', getBadgeSelectedColor(theme.palette.primary.main));

  style.setProperty('--online-indicator', '#0AC630');

  style.setProperty('--message-service-color', rgba(Color.Sun, Opacity.Sirius));
  style.setProperty('--message-service-background', '#303030');

  style.setProperty('--panel-background', rgba(Color.Moon));
  style.setProperty('--border', theme.palette.divider);
  style.setProperty('--chat-background', rgba(Color.Moon));
  style.setProperty('--background', theme.palette.grey[900]);
  style.setProperty('--background-paper', theme.palette.background.paper);
  style.setProperty('--shared-media-background', theme.palette.background.paper);

  style.setProperty('--dialog-color', rgba(Color.Sun));
  style.setProperty('--dialog-subtle-color', rgba(Color.Sun, Opacity.Sirius));
  style.setProperty('--dialog-meta-color', theme.palette.text.secondary);
  style.setProperty('--dialog-meta-read-color', rgba(Color.Neptune));

  style.setProperty('--media-in-tile-background', theme.palette.primary.main);
  style.setProperty('--media-out-tile-background', theme.palette.primary.main);

  style.setProperty('--message-in-link', theme.palette.primary.main);
  style.setProperty('--message-in-author', theme.palette.text.secondary);
  style.setProperty('--message-in-background', '#303030'); // background.default
  style.setProperty('--message-in-color', rgba(Color.Sun));
  style.setProperty('--message-in-subtle-color', rgba(Color.Sun, Opacity.Betelgeuse));
  style.setProperty('--message-in-meta-color', rgba(Color.Sun, Opacity.Betelgeuse));
  style.setProperty('--message-in-reply-title', theme.palette.primary.main);
  style.setProperty('--message-in-reply-border', theme.palette.primary.main);
  style.setProperty('--message-in-control', theme.palette.primary.main);
  style.setProperty('--message-in-control-hover', theme.palette.primary.main + '22');
  style.setProperty('--message-in-control-border', theme.palette.primary.main + '77');
  style.setProperty('--message-in-control-border-hover', theme.palette.primary.main);

  style.setProperty('--message-out-link', theme.palette.primary.main);
  style.setProperty('--message-out-author', theme.palette.primary.main);
  style.setProperty('--message-out-background', '#303030'); // background.default
  style.setProperty('--message-out-color', rgba(Color.Sun));
  style.setProperty('--message-out-subtle-color', rgba(Color.Sun, Opacity.Betelgeuse));
  style.setProperty('--message-out-meta-color', rgba(Color.Sun, Opacity.Betelgeuse)); // text.secondary
  style.setProperty('--message-out-reply-title', theme.palette.primary.main);
  style.setProperty('--message-out-reply-border', theme.palette.primary.main);
  style.setProperty('--message-out-control', theme.palette.primary.main);
  style.setProperty('--message-out-control-hover', theme.palette.primary.main + '22');
  style.setProperty('--message-out-control-border', theme.palette.primary.main + '77');
  style.setProperty('--message-out-control-border-hover', theme.palette.primary.main);
}

export function createTheme(type = 'dark', primary = orange) {
  const newTheme = createMuiTheme(theme);

  updateDarkTheme(newTheme);

  return newTheme;
}

function withTheme(WrappedComponent) {
  class ThemeWrapper extends React.Component {
    constructor(props) {
      super(props);

      let { type, primary } = { type: 'dark', primary: orange };
      try {
        const themeOptions = JSON.parse(localStorage.getItem('themeOptions'));
        if (themeOptions) {
          type = themeOptions.type;
          primary = themeOptions.primary;
        }
      } catch (err) {
        console.error(err);
      }

      const theme = createTheme(type, primary);

      this.state = { theme };
    }

    componentDidMount() {
      ApplicationStore.on('clientUpdateThemeChanging', this.onClientUpdateThemeChanging);
    }

    componentWillUnmount() {
      ApplicationStore.off('clientUpdateThemeChanging', this.onClientUpdateThemeChanging);
    }

    onClientUpdateThemeChanging = (update) => {
      const { type, primary } = update;

      const theme = createTheme(type, primary);
      localStorage.setItem('themeOptions', JSON.stringify({ type, primary }));

      this.setState({ theme }, () => ApplicationStore.emit('clientUpdateThemeChange'));
    };

    render() {
      const { theme } = this.state;

      return (
        <StylesProvider injectFirst={true}>
          <MuiThemeProvider theme={theme}>
            <WrappedComponent {...this.props} />
          </MuiThemeProvider>
        </StylesProvider>
      );
    }
  }

  ThemeWrapper.displayName = `WithTheme(${getDisplayName(WrappedComponent)})`;

  return ThemeWrapper;
}

export default withTheme;
