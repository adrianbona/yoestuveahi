import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, TextField, Typography } from '@material-ui/core';

const LoginEmailStep = props => {
  const { onSubmit } = props;
  return (
    <Formik
      initialValues={{}}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required')
      })}
      onSubmit={onSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              Sign in
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              #YoEstuveAhí
            </Typography>
          </Box>
          <Box mt={3} mb={1} />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <Box my={2}>
            <Button
              color="primary"
              disabled={isSubmitting || !values.email}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign in
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginEmailStep;
