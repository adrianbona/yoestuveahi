import React, { useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Results from './Results';
import NoResults from '../../../components/NoResults';
import { actions } from '../../../redux/modules/notifications';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const NotificationListView = ({ notifications, getNotifications }) => {
  const classes = useStyles();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <Page className={classes.root} title="Users">
      <Container maxWidth={false}>
        <Box mt={3}>
          {notifications.length > 0 ? (
            <Results notifications={notifications} />
          ) : (
            <NoResults />
          )}
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => ({
  notifications: state.notifications.list
});

const mapDispatchToProps = dispatch => ({
  getNotifications: () => dispatch(actions.getNotifications())
});

NotificationListView.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationListView);
