import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Switch
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SimpleModal from '../SimpleModal';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.primary.light
  },
  body: {
    width: '100%',
    alignItems: 'center',
    '&>div': {
      marginBottom: '15px'
    }
  }
}));

const LoadTestModal = props => {
  const { onClose, open } = props;
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());
  const [isPositive, setIsPositive] = useState(false);

  return (
    <SimpleModal title="Load a test result" open={open} onClose={onClose}>
      <div className={classes.container}>
        <form>
          <Card>
            <CardContent>
              <FormControl component="fieldset" className={classes.body}>
                <FormGroup aria-label="position" row>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Test Taken On"
                      format="dd/MM/yyyy"
                      value={selectedDate}
                      onChange={setSelectedDate}
                      disableFuture
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormGroup>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="start"
                    control={
                      <Typography component="div">
                        <Grid
                          component="label"
                          container
                          alignItems="center"
                          spacing={1}
                        >
                          <Grid item>Negative</Grid>
                          <Grid item>
                            <Switch
                              color="primary"
                              checked={isPositive}
                              onChange={() => setIsPositive(!isPositive)}
                            />
                          </Grid>
                          <Grid item>Positive</Grid>
                        </Grid>
                      </Typography>
                    }
                    label="Test Result"
                    labelPlacement="top"
                  />
                </FormGroup>
              </FormControl>
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Button color="secondary" variant="contained" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" variant="contained" onClick={onClose}>
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
