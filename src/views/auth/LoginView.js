import React, { useState } from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import LoginEmailStep from './LoginEmailStep';
import LoginCodeStep from './LoginCodeStep';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isFirstStep, setIsFirstStep] = useState(true);

  const onSubmitEmailStep = () => {
    setIsFirstStep(false);
  };

  const onSubmitCodeStep = () => {
    navigate('/app/dashboard', { replace: true });
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          {isFirstStep ? (
            <LoginEmailStep onSubmit={onSubmitEmailStep} />
          ) : (
            <LoginCodeStep onSubmit={onSubmitCodeStep} />
          )}

          <Typography variant="body2" color="textSecondary" align="center">
            {`Copyright © Yo Estuve Ahí App ${new Date().getFullYear()}`}
          </Typography>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
