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
import { actions as authActions } from '../../../redux/modules/authentication';
import { actions as userActions } from '../../../redux/modules/users';

const UserDetails = props => {
  const { updateDetails, usersRefetch, user, loggingIn, error } = props;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = values => {
    updateDetails(values);
  };

  useEffect(() => {
    if (user) {
      setShowConfirmation(true);
      usersRefetch();
    }
  }, [user, usersRefetch]);

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          isAdministrator: false
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
        autoHideDuration={6000}
        onClose={() => setShowConfirmation(false)}
      >
        <Alert onClose={() => setShowConfirmation(false)} severity="success">
          User details were updated!
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.authentication.user,
  loggingIn: state.authentication.loggingIn,
  error: state.authentication.error
});

const mapDispatchToProps = dispatch => ({
  updateDetails: data => dispatch(authActions.updateDetails(data)),
  usersRefetch: data => dispatch(userActions.getUsers(data))
});

UserDetails.propTypes = {
  updateDetails: PropTypes.func.isRequired,
  usersRefetch: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.shape({ name: PropTypes.string })
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
