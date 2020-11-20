import React, { useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Results from './Results';
import { actions } from '../../../redux/modules/registries';
import NoResults from '../../../components/NoResults';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegistryList = ({ registries, getRegistries }) => {
  const classes = useStyles();

  useEffect(() => {
    getRegistries();
  }, [getRegistries]);

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Box mt={3}>
          {registries.length > 0 ? (
            <Results registries={registries} />
          ) : (
            <NoResults />
          )}
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => ({
  registries: state.registries.list
});

const mapDispatchToProps = dispatch => ({
  getRegistries: () => dispatch(actions.getRegistries())
});

RegistryList.propTypes = {
  getRegistries: PropTypes.func.isRequired,
  registries: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistryList);
