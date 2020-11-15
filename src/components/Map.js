import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/styles';
import QRCode from 'qrcode.react';
import theme from '../theme';

const useStyles = makeStyles({
  marker: {
    color: theme.palette.secondary.light,
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    fontWeight: 'bolder',
    fontSize: 'larger',
    marginBottom: '10px'
  }
});
const Marker = ({ text }) => {
  const classes = useStyles();
  const [showQR, setIsShowingQR] = useState(false);
  const showMap = show => setIsShowingQR(show);
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
      <div className={classes.marker}>{text}</div>
      {showQR && <QRCode value={text} size={100} renderAs="svg" />}
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
            lat={marker.latitude}
            lng={marker.longitude}
            text={marker.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
