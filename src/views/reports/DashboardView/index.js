import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Sales from './Sales';
import UsersByStatus from './UsersByStatus';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6} lg={6} xl={6} xs={12}>
            <Sales />
          </Grid>
          <Grid item sm={12} md={6} lg={6} xl={6} xs={12}>
            <UsersByStatus />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
