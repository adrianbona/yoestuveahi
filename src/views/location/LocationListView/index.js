import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import data from './data';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LocationListView = () => {
  const classes = useStyles();
  const [locations] = useState(data);

  return (
    <Page className={classes.root} title="Locations">
      <Container>
        <Box mt={3}>
          <Results locations={locations} />
        </Box>
      </Container>
    </Page>
  );
};

export default LocationListView;
