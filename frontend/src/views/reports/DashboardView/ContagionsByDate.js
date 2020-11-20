import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/contagions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ContagionsByDate = ({ contagions, getContagions }) => {
  const classes = useStyles();
  const theme = useTheme();

  const contagionsByDate = contagions.reduce((groups, contagion) => {
    const date = contagion.reportedOn.format('D MMM');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(contagion);
    return groups;
  }, {});

  const data = {
    datasets: [
      {
        backgroundColor: theme.palette.primary.light,
        data: Object.values(contagionsByDate).map(date => date.length),
        label: 'Contagions'
      }
    ],
    labels: Object.keys(contagionsByDate)
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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
    getContagions();
  }, [getContagions]);

  return (
    <Card className={classes.root}>
      <CardHeader title="Latest Contagions By Date" />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

const mapStateToProps = state => ({
  contagions: state.contagions.list
});

const mapDispatchToProps = dispatch => ({
  getContagions: () => dispatch(actions.getContagions())
});

ContagionsByDate.propTypes = {
  getContagions: PropTypes.func.isRequired,
  contagions: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ContagionsByDate);
