import { muiTheme } from 'storybook-addon-material-ui';
import { withKnobs } from '@storybook/addon-knobs';

// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

import { Button } from '../../../src/Components/Button';
import { theme } from '../../../src/Theme/themeDefinition';

export default {
  title: 'Material-UI/Dialog',
  // @ts-ignore
  decorators: [muiTheme([theme]), withKnobs],
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>

      <Dialog
        PaperProps={{ variant: 'elevation' }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>Subscribe</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={() => setOpen(false)} danger>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
