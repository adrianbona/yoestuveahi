import React, { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, makeStyles
} from '@material-ui/core';
import QrReader from 'react-qr-scanner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LocationCard from '../../views/location/LocationListView/LocationCard';
import SimpleModal from '../SimpleModal';
import { actions as locationActions } from '../../redux/modules/locations';
import { actions as registryActions } from '../../redux/modules/registries';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  scanAgain: {
    marginRight: theme.spacing(1)
  },
  container: {
    padding: '20px'
  }
}));

const ScanQRCodeModal = ({
  onClose,
  open,
  createRegistry,
  resetRegistries,
  error,
  getLocations,
  locations,
  registries,
  loading
}) => {
  const classes = useStyles();

  const [delay] = useState(100);
  const [QRData, setQRData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      const parsedQR = JSON.parse(data);
      const locationFound = locations.find((location) => location.id === parseInt(parsedQR.location_id, 10)
        && location.siteSource === parseInt(parsedQR.server_id, 10));
      if (locationFound) {
        setQRData(locationFound);
      } else {
        setQRData({ siteSource: parsedQR.server_id });
      }
    }
  };

  const handleClose = () => {
    setQRData(null);
    resetRegistries();
    getLocations();
    onClose();
  };

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const handleCreate = () => {
    createRegistry({
      locationId: QRData.id
    });
  };

  useEffect(() => {
    if (!error && !loading) {
      handleClose();
    }
  }, [error, loading, registries]);

  return (
    <SimpleModal title="Scan a QR code" open={open} onClose={handleClose}>
      <div className={classes.container}>
        {QRData ? (
          <>
            <Box alignItems="center" display="flex" flexDirection="column">
              <LocationCard location={QRData} />
            </Box>
            <Box
              p={2}
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <Button
                className={classes.scanAgain}
                color="secondary"
                variant="contained"
                onClick={() => setQRData(null)}
              >
                Scan Again
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleCreate}
              >
                Check in
              </Button>
            </Box>
          </>
        ) : (
          <Card>
            <CardContent>
              <Box position="relative">
                <QrReader
                  delay={delay}
                  onScan={handleScan}
                  onError={() => {}}
                  style={{
                    width: '100%'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </div>
    </SimpleModal>
  );
};

const mapStateToProps = (state) => ({
  locations: state.locations.list,
  registries: state.registries.list
});

const mapDispatchToProps = (dispatch) => ({
  createRegistry: (data) => dispatch(registryActions.createRegistry(data)),
  resetRegistries: () => dispatch(registryActions.resetRegistries()),
  getLocations: () => dispatch(locationActions.getLocations())
});

ScanQRCodeModal.propTypes = {
  createRegistry: PropTypes.func.isRequired,
  resetRegistries: PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  registries: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  open: PropTypes.bool,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanQRCodeModal);
