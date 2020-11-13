import React from 'react';
import GoogleMapReact from 'google-map-react';
import StoreIcon from '@material-ui/icons/Store';

const Marker = ({ text }) => (
  <div>
    <StoreIcon color="primary" />
    {text}
  </div>
);

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
