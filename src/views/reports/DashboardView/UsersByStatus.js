import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/users';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const UsersByStatus = ({ users, getUsers }) => {
  const classes = useStyles();
  const theme = useTheme();

  const seed = {
    Healthy: {
      title: 'Healthy',
      value: 0,
      color: colors.indigo[500]
    },
    'COVID Positive': {
      title: 'COVID Positive',
      value: 0,
      color: colors.red[600]
    },
    'Contagion Risk': {
      title: 'Contagion Risk',
      value: 0,
      color: colors.orange[600]
    }
  };

  users.reduce((accumulator, user) => {
    accumulator[user.status].value += 100 / users.length;
    return accumulator;
  }, seed);

  const data = {
    datasets: [
      {
        data: Object.values(seed).map(data => Math.round(data.value)),
        backgroundColor: Object.values(seed).map(data => data.color),
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: Object.keys(seed)
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Card className={classes.root}>
      <CardHeader title="Users by Status" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {Object.values(seed).map(({ color, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {Math.round(value)}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  users: state.users.list
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(actions.getUsers())
});

UsersByStatus.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersByStatus);
