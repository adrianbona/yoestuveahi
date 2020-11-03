import React, { useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Results from './Results';
import { actions } from '../../../redux/modules/users';
import NoResults from '../../../components/NoResults';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = props => {
  const { usersData, getUsers } = props;
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box mt={3}>
          {usersData.list.users > 0 ? (
            <Results customers={usersData.list.users} />
          ) : (
            <NoResults />
          )}
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => ({
  usersData: state.users
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(actions.getUsers())
});

CustomerListView.propTypes = {
  getUsers: PropTypes.func.isRequired,
  usersData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
    list: PropTypes.shape({
      users: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    })
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListView);
