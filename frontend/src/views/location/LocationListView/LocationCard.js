import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PeopleIcon from '@material-ui/icons/People';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  }
}));

const LocationCard = ({ className, location, ...rest }) => {
  const classes = useStyles();

  if (parseInt(location.siteSource, 10) === 1) {
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              alt="Product"
              src={location.logo}
              className={classes.large}
              variant="circle"
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {location.name}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {location.description}
          </Typography>
        </CardContent>
        <Box flexGrow={1} />
        <Divider />
        <Box p={1}>
          <Grid container justify="center" spacing={2}>
            <Grid className={classes.statsItem} item>
              <AccessTimeIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2">
                {`Last update at ${moment(location.createdAt).format(
                  'MMMM D, YYYY HH:mm'
                )}`}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <PeopleIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2">
                {location.maximumCapacity}
                {' '}
                people allowed inside
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  }
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            alt="Product"
            src="https://auxilo.com/blog/wp-content/uploads/2018/05/Study-abroad-834x600.jpg"
            className={classes.large}
            variant="circle"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {location.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {`Location Coming from ${parseInt(location.siteSource, 10) === 0 ? 'YEA!' : 'COVIDWEB2020'}`}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={1}>
        <Grid container justify="center" spacing={2}>
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {`Last update at ${moment().format(
                'MMMM D, YYYY HH:mm'
              )}`}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <PeopleIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {`${25} people allowed inside`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

LocationCard.propTypes = {
  className: PropTypes.string,
  location: PropTypes.object.isRequired
};

export default LocationCard;
