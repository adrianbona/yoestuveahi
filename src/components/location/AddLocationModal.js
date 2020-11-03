import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
import SimpleModal from '../SimpleModal';
import LocationSearchInput from '../LocationSearchInput';
import getPhotos, { getPhotoSourceFromReference } from '../../redux/api/photos';

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
    height: 'inherit'
  }
}));

const AddLocationModal = props => {
  const { onClose, open } = props;
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [placePhotos, setPlacePhotos] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const classes = useStyles();

  const handleClose = () => {
    setPlacePhotos([]);
    onClose();
  };

  const getPictures = async address => {
    try {
      const { data } = await getPhotos(address.place_id);
      setPlacePhotos(data.result.photos);
    } catch (err) {}
  };

  useEffect(() => {
    if (selectedAddress) {
      getPictures(selectedAddress);
    }
  }, [selectedAddress]);

  return (
    <SimpleModal title="Add a new location" open={open} onClose={handleClose}>
      <Card>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <LocationSearchInput
              className={classes.fullWidth}
              onSelectedAddress={address => setSelectedAddress(address)}
            />
          </Box>
          {placePhotos.length > 0 && (
            <>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  className={classes.fullWidth}
                  alt="Place"
                  src={getPhotoSourceFromReference(
                    placePhotos[photoIndex].photo_reference
                  )}
                  variant="rounded"
                />
              </Box>
              <Box
                p={2}
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
              >
                <Button
                  className={classes.scanAgain}
                  color="secondary"
                  variant="contained"
                  onClick={() =>
                    setPhotoIndex((photoIndex + 1) % placePhotos.length)
                  }
                >
                  Change image
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleClose}
                >
                  Create
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </SimpleModal>
  );
};

export default AddLocationModal;
