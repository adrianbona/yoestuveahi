import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, TextField, Typography } from '@material-ui/core';

const LoginCodeStep = props => {
  const { onSubmit } = props;
  return (
    <Formik
      initialValues={{}}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .max(255)
          .required('Password is required')
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
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box my={2}>
            <Button
              color="primary"
              disabled={isSubmitting || !values.password}
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

export default LoginCodeStep;
