import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { actions } from '../../../redux/modules/authentication';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  }
}));

const UserDetails = props => {
  const { updateDetails, userUpdated, loggingIn, error, user } = props;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const classes = useStyles();

  const onSubmit = values => {
    updateDetails(values);
  };

  useEffect(() => {
    if (userUpdated) {
      setShowConfirmation(userUpdated);
    }
  }, [userUpdated]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Formik
        initialValues={{
          name: user.name,
          isAdministrator: user.isAdministrator
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(255)
            .required('Name is required')
        })}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader title="Update User Details" />
              <Divider />
              <CardContent>
                {error && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                )}
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="name"
                  value={values.name}
                  variant="outlined"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="isAdministrator" onChange={handleChange} />
                  }
                  label="Is Administrator"
                />
              </CardContent>
              <Divider />
              <Box
                p={2}
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
              >
                <Button
                  color="primary"
                  disabled={loggingIn}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Update
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
      <Snackbar
        open={showConfirmation}
        autoHideDuration={5000}
        onClose={() => setShowConfirmation(false)}
      >
        <Alert
          className={classes.root}
          onClose={() => setShowConfirmation(false)}
          variant="filled"
          severity="success"
        >
          User details were updated!
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.authentication.user,
  userUpdated: state.authentication.userUpdated,
  loggingIn: state.authentication.loggingIn,
  error: state.authentication.error
});

const mapDispatchToProps = dispatch => ({
  updateDetails: data => dispatch(actions.updateDetails(data))
});

UserDetails.propTypes = {
  updateDetails: PropTypes.func.isRequired,
  user: PropTypes.object,
  userUpdated: PropTypes.bool,
  loggingIn: PropTypes.bool,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
