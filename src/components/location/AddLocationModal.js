import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, makeStyles } from '@material-ui/core';
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
  const [selectedPlacePhoto, setSelectedPlacePhoto] = useState(null);
  const classes = useStyles();

  const handleClose = () => {
    setSelectedPlacePhoto(null);
    onClose();
  };

  const getPictures = async address => {
    try {
      const { data } = await getPhotos(address.place_id);
      setSelectedPlacePhoto(data.result.photos[0].photo_reference);
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
          {selectedPlacePhoto && (
            <Box alignItems="center" display="flex" flexDirection="column">
              <Avatar
                className={classes.fullWidth}
                alt="Place"
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedPlacePhoto}&key=AIzaSyDAvfXiXVeMN803sCuPUexOzkVy-dgnqdE`}
                variant="rounded"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </SimpleModal>
  );
};

export default AddLocationModal;
