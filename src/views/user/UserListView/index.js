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

const UserListView = props => {
  const { users, getUsers } = props;
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box mt={3}>
          {users.list.users.length > 0 ? (
            <Results users={users.list.users} />
          ) : (
            <NoResults />
          )}
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(actions.getUsers())
});

UserListView.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
    list: PropTypes.shape({
      users: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    })
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListView);
