import { List, ListItem, ListItemText } from '@material-ui/core';
import { muiTheme } from 'storybook-addon-material-ui';
import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { theme } from '../../../src/Theme/themeDefinition';


export default {
  title: 'Material-UI/List',
  // @ts-ignore
  decorators: [muiTheme([theme]), withKnobs],
};

export const Default = () => {
  return (
    <List>
      <ListItem>
        <ListItemText>
          List item 1
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          List item 2
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          List item 3
        </ListItemText>
      </ListItem>
    </List>
  );
};
