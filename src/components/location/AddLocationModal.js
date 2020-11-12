import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SimpleModal from '../SimpleModal';
import LocationSearchInput from '../LocationSearchInput';
import getPhotos, { getPhotoSourceFromReference } from '../../redux/api/photos';
import { actions } from '../../redux/modules/locations';

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
    height: 'inherit',
    maxHeight: '30vh'
  }
}));

const AddLocationModal = props => {
  const {
    onClose,
    open,
    createLocation,
    resetLocations,
    error,
    locations,
    loading
  } = props;
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [placePhotos, setPlacePhotos] = useState({ index: 0, list: [] });
  const classes = useStyles();

  const handleClose = () => {
    setPlacePhotos({ index: 0, list: [] });
    resetLocations();
    onClose();
  };

  const handleCreate = (values, imageUrl) => {
    createLocation({
      id: selectedAddress.place_id,
      name: values.name,
      description: values.description,
      latitude: selectedAddress.geometry.location.lat(),
      longitude: selectedAddress.geometry.location.lng(),
      maximumCapacity: values.maximumCapacity,
      openingTime: values.openingTime,
      closingTime: values.closingTime,
      logo: imageUrl
    });
  };

  const getPictures = async address => {
    try {
      const { data } = await getPhotos(address.place_id);
      setPlacePhotos({ index: 0, list: data.result.photos || [] });
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
      setPlacePhotos({ index: 0, list: [] });
      getPictures(selectedAddress);
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (!error && !loading) {
      handleClose();
    }
  }, [error, loading, locations]);

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
          {placePhotos.list.length > 1 && (
            <>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Formik
                  initialValues={{
                    name: selectedAddress.name.split(',')[0],
                    description: selectedAddress.formatted_address,
                    maximumCapacity: '',
                    openingTime: '9:00',
                    closingTime: '18:00'
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string()
                      .max(255)
                      .required('Name is required'),
                    description: Yup.string()
                      .max(255)
                      .required('Description is required'),
                    maximumCapacity: Yup.number()
                      .integer()
                      .min(1)
                      .required('Maximum capacity is required'),
                    openingTime: Yup.string().required(
                      'Opening time is required'
                    ),
                    closingTime: Yup.string().required(
                      'Closing time is required'
                    )
                  })}
                  onSubmit={values => handleCreate(values, photoSource)}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    touched,
                    values
                  }) => (
                    <form
                      id="create-location"
                      onSubmit={handleSubmit}
                      className={classes.fullWidth}
                    >
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Name"
                        margin="normal"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label="Description"
                        margin="normal"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(
                          touched.maximumCapacity && errors.maximumCapacity
                        )}
                        fullWidth
                        helperText={
                          touched.maximumCapacity && errors.maximumCapacity
                        }
                        label="Maximum Capacity"
                        margin="normal"
                        name="maximumCapacity"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.maximumCapacity}
                        variant="outlined"
                      />
                    </form>
                  )}
                </Formik>
              </Box>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar
                  className={classes.fullWidth}
                  alt="Place"
                  src={photoSource}
                  variant="rounded"
                />
              </Box>
            </>
          )}
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
                disabled={placePhotos.list.length === 0}
                onClick={() =>
                  setPlacePhotos({
                    index: (placePhotos.index + 1) % placePhotos.list.length,
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
              disabled={placePhotos.list.length === 0}
              form="create-location"
              type="submit"
            >
              Create location
            </Button>
          </Box>
        </CardContent>
      </Card>
    </SimpleModal>
  );
};

const mapStateToProps = state => ({
  locations: state.locations.list,
  loading: state.locations.loading,
  error: state.locations.error
});

const mapDispatchToProps = dispatch => ({
  createLocation: data => dispatch(actions.createLocation(data)),
  resetLocations: () => dispatch(actions.resetLocations())
});

AddLocationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  createLocation: PropTypes.func.isRequired,
  resetLocations: PropTypes.func.isRequired,
  locations: PropTypes.array,
  loading: PropTypes.bool,
  open: PropTypes.bool,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationModal);
