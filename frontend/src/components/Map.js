import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker as LeafletMarker,
  Popup
} from 'react-leaflet';
import { makeStyles } from '@material-ui/styles';
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

const SimpleMap = ({ markers }) => {
  const classes = useStyles();
  return (
    <div style={{ height: '40vh', width: '100%' }}>
      <LeafletMap
        style={{ height: '100%', width: '100%' }}
        center={[-34.58, -58.44]}
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(
          ({
            id,
            latitude,
            longitude,
            name,
            currentCapacity,
            maximumCapacity
          }) => (
            <LeafletMarker key={id} position={[latitude, longitude]}>
              <Popup>
                <div className={classes.marker}>{name}</div>
                <div className={classes.capacity}>
                  {`${maximumCapacity - currentCapacity} /  ${maximumCapacity}`}
                </div>
              </Popup>
            </LeafletMarker>
          )
        )}
      </LeafletMap>
    </div>
  );
};

SimpleMap.propTypes = {
  markers: PropTypes.array.isRequired
};

export default SimpleMap;
