import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const NotificationListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Users">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results notifications={[]} />
        </Box>
      </Container>
    </Page>
  );
};

export default NotificationListView;
