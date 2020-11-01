import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
import { getLatLng } from 'react-places-autocomplete';
import SimpleModal from '../SimpleModal';
import LocationSearchInput from '../LocationSearchInput';
import getPhotos from '../../redux/api/photos';

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
    height: 'inherit'
  }
}));

const AddLocationModal = props => {
  const { onClose, open, customer } = props;
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
    getLatLng(address).then(latLng => latLng);
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
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placePhotos[photoIndex].photo_reference}&key=AIzaSyDAvfXiXVeMN803sCuPUexOzkVy-dgnqdE`}
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
