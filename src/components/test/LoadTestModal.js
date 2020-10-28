import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import SimpleModal from '../SimpleModal';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.primary.light
  },
  close: {
    marginRight: theme.spacing(1)
  }
}));

const LoadTestModal = props => {
  const { onClose, open } = props;
  const classes = useStyles();

  return (
    <SimpleModal title="Load a test result" open={open} onClose={onClose}>
      <div className={classes.container}>
        <form>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                label="Date taken"
                margin="normal"
                name="dateTaken"
                onChange={() => {}}
                type="text"
                value={moment()}
                variant="outlined"
              />
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Button
                className={classes.close}
                color="secondary"
                variant="contained"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button color="primary" variant="contained">
                Load
              </Button>
            </Box>
          </Card>
        </form>
      </div>
    </SimpleModal>
  );
};

export default LoadTestModal;
