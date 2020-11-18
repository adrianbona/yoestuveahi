import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import Marker from './Marker';

const SimpleMap = ({ markers }) => {
  const defaultProps = {
    center: {
      lat: -34.58,
      lng: -58.44
    },
    zoom: 13
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

SimpleMap.propTypes = {
  markers: PropTypes.array.isRequired
};

export default SimpleMap;
