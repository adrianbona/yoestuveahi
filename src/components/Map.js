import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/styles';
import QRCode from 'qrcode.react';
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
    marginBottom: '10px'
  }
});

const Marker = ({ location }) => {
  const { id, name, currentCapacity, maximumCapacity } = location;
  const classes = useStyles();
  const [showQR, setIsShowingQR] = useState(false);
  const showMap = show => setIsShowingQR(show);

  console.log(location);
  return (
    <div
      onMouseEnter={() => {
        showMap(true);
      }}
      onMouseLeave={() => {
        showMap(false);
      }}
    >
      <StoreIcon color="primary" fontSize="large" />
      <div className={classes.marker}>{name}</div>
      <div className={classes.capacity}>
        {`${currentCapacity - maximumCapacity} /  ${maximumCapacity}`}
      </div>
      {showQR && <QRCode value={String(id)} size={100} renderAs="svg" />}
    </div>
  );
};

const SimpleMap = ({ markers }) => {
  const defaultProps = {
    center: {
      lat: -34.6037,
      lng: -58.3816
    },
    zoom: 12
  };

  return (
    <div style={{ height: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            lat={marker.latitude}
            lng={marker.longitude}
            location={marker}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
