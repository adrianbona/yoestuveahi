import React, { useState } from 'react';
import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import theme from '../theme';

const useStyles = makeStyles({
  marker: {
    width: 'max-content',
    color: theme.palette.secondary.light,
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    fontWeight: 'bolder',
    fontSize: 'larger'
  },
  capacity: {
    width: 'max-content',
    color: theme.palette.primary.light,
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    fontWeight: 'bolder',
    fontSize: 'larger',
    paddingBottom: '10px'
  }
});

const Marker = ({ location }) => {
  const { name, currentCapacity, maximumCapacity } = location;
  const classes = useStyles();
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <StoreIcon
        color="primary"
        fontSize="large"
        style={{
          backgroundColor: hovering ? 'white' : '',
          borderRadius: '25px'
        }}
      />
      <div className={classes.marker}>{name}</div>
      <div className={classes.capacity}>
        {`${maximumCapacity - currentCapacity} /  ${maximumCapacity}`}
      </div>
    </div>
  );
};

Marker.propTypes = {
  name: PropTypes.string.isRequired,
  currentCapacity: PropTypes.number.isRequired,
  maximumCapacity: PropTypes.number.isRequired
};

export default Marker;
