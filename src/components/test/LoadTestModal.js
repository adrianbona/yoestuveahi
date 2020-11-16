import React, { useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import SimpleModal from '../SimpleModal';
import { actions as testActions } from '../../redux/modules/tests';
import { actions as userActions } from '../../redux/modules/users';

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

const LoadTestModal = ({
  onClose,
  open,
  loadTest,
  resetTests,
  refreshUsers,
  error,
  tests,
  loading
}) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());
  const [isPositive, setIsPositive] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    loadTest({
      dateTaken: selectedDate,
      isPositive
    });
  };

  const handleClose = () => {
    resetTests();
    refreshUsers();
    onClose();
  };

  useEffect(() => {
    if (!error && !loading) {
      handleClose();
    }
  }, [error, loading, tests]);

  return (
    <SimpleModal title="Load Test Result" open={open} onClose={onClose}>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <FormControl component="fieldset" className={classes.body}>
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
              </FormControl>
            </CardContent>
            <Divider />
            {error && (
              <>
                <Box
                  p={2}
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Alert className={classes.fullWidth} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                </Box>
                <Divider />
              </>
            )}
            <Box
              p={2}
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Button color="secondary" variant="contained" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" variant="contained" type="submit">
                Load
              </Button>
            </Box>
          </Card>
        </form>
      </div>
    </SimpleModal>
  );
};

const mapStateToProps = state => ({
  tests: state.tests.list,
  loading: state.tests.loading,
  error: state.tests.error
});

const mapDispatchToProps = dispatch => ({
  loadTest: data => dispatch(testActions.loadTest(data)),
  resetTests: () => dispatch(testActions.resetTests()),
  refreshUsers: () => dispatch(userActions.getUsers())
});

LoadTestModal.propTypes = {
  loadTest: PropTypes.func.isRequired,
  resetTests: PropTypes.func.isRequired,
  refreshUsers: PropTypes.func.isRequired,
  tests: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  open: PropTypes.bool,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadTestModal);
