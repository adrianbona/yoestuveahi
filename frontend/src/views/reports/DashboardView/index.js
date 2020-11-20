import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContagionsByDate from './ContagionsByDate';
import UsersByStatus from './UsersByStatus';
import SimpleMap from '../../../components/Map';
import { actions } from '../../../redux/modules/locations';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = ({ locations, getLocations }) => {
  const classes = useStyles();

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={12} lg={12} xl={12} xs={12}>
            <SimpleMap markers={locations} />
          </Grid>
          <Grid item sm={12} md={6} lg={6} xl={6} xs={12}>
            <ContagionsByDate />
          </Grid>
          <Grid item sm={12} md={6} lg={6} xl={6} xs={12}>
            <UsersByStatus />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => ({
  locations: state.locations.list
});

const mapDispatchToProps = dispatch => ({
  getLocations: () => dispatch(actions.getLocations())
});

Dashboard.propTypes = {
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
