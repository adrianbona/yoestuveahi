import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import SimpleModal from '../SimpleModal';
import LocationSearchInput from '../LocationSearchInput';
import getPhotos, { getPhotoSourceFromReference } from '../../redux/api/photos';
import { actions } from '../../redux/modules/locations';

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
    height: 'inherit',
    maxHeight: '50vh'
  }
}));

const AddLocationModal = props => {
  const { onClose, open, createLocation, locationCreated, error } = props;
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [placePhotos, setPlacePhotos] = useState({ index: 0, list: [] });
  const classes = useStyles();

  const handleClose = useCallback(() => {
    setPlacePhotos({ index: 0, list: [] });
    onClose();
  }, [onClose]);

  const handleCreate = imageUrl => {
    createLocation({
      id: selectedAddress.place_id,
      name: selectedAddress.name.split(',')[0],
      description: selectedAddress.formatted_address,
      latitude: selectedAddress.geometry.location.lat(),
      longitude: selectedAddress.geometry.location.lng(),
      logo: imageUrl
    });
  };

  const getPictures = async address => {
    try {
      const { data } = await getPhotos(address.place_id);
      setPlacePhotos({ index: 0, list: data.result.photos });
    } catch (err) {}
  };

  const photoSource =
    placePhotos.list.length > 0
      ? getPhotoSourceFromReference(
          placePhotos.list[placePhotos.index].photo_reference
        )
      : '';

  useEffect(() => {
    if (selectedAddress) {
      getPictures(selectedAddress);
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (locationCreated) {
      handleClose();
    }
  }, [locationCreated, handleClose]);

  return (
    <SimpleModal title="Add a new location" open={open} onClose={handleClose}>
      <Card>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <LocationSearchInput
              className={classes.fullWidth}
              onSelectedAddress={(name, address) =>
                setSelectedAddress({ ...address, name })
              }
            />
          </Box>
          {placePhotos.list.length > 0 && (
            <>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  className={classes.fullWidth}
                  alt="Place"
                  src={photoSource}
                  variant="rounded"
                />
              </Box>
              {error && (
                <Box
                  p={2}
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Alert className={classes.fullWidth} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                </Box>
              )}
              <Box
                p={2}
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
              >
                {placePhotos.list.length > 1 && (
                  <Button
                    className={classes.scanAgain}
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      setPlacePhotos({
                        index:
                          (placePhotos.index + 1) % placePhotos.list.length,
                        list: placePhotos.list
                      })
                    }
                  >
                    Change image
                  </Button>
                )}
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleCreate(photoSource)}
                >
                  Create location
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </SimpleModal>
  );
};

const mapStateToProps = state => ({
  locationCreated: state.locations.locationCreated,
  loading: state.locations.loading,
  error: state.locations.error
});

const mapDispatchToProps = dispatch => ({
  createLocation: data => dispatch(actions.createLocation(data))
});

AddLocationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  createLocation: PropTypes.func.isRequired,
  open: PropTypes.bool,
  locationCreated: PropTypes.bool,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationModal);
