import React, { useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Results from './Results';
import { actions } from '../../../redux/modules/tests';
import NoResults from '../../../components/NoResults';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TestListView = ({ tests, getTests }) => {
  const classes = useStyles();

  useEffect(() => {
    getTests();
  }, [getTests]);

  return (
    <Page className={classes.root} title="Tests">
      <Container maxWidth={false}>
        <Box mt={3}>
          {tests.length > 0 ? <Results tests={tests} /> : <NoResults />}
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => ({
  tests: state.tests.list
});

const mapDispatchToProps = dispatch => ({
  getTests: () => dispatch(actions.getTests())
});

TestListView.propTypes = {
  getTests: PropTypes.func.isRequired,
  tests: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TestListView);
