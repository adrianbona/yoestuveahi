import React, { useState } from 'react';
import clsx from 'clsx';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import theme from '../theme';

const useStyles = makeStyles({
  suggestion: {
    lineHeight: '1.33',
    letterSpacing: '0.95px',
    cursor: 'pointer',
    padding: '5px 0',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  }
});

const LocationSearchInput = () => {
  const classes = useStyles();
  const [address, setAddress] = useState('');

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    setAddress(address);
    geocodeByAddress(address)
      .then(results => {
        const result = results[0];
        console.log(result.place_id);
        return getLatLng(result);
      })
      .then(latLng => console.log(latLng))
      .catch(error => console.error(error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      shouldFetchSuggestions={address.length > 3}
      searchOptions={{ componentRestrictions: { country: 'ar' } }}
      highlightFirstSuggestion
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div>
          <TextField
            fullWidth
            label="Search for a location"
            margin="normal"
            name="location"
            type="text"
            className={clsx('location-search-input')}
            variant="outlined"
            {...getInputProps()}
          />
          <div className="autocomplete-dropdown-container">
            {suggestions.map((suggestion, index) => {
              return (
                <div
                  key={`suggestions-${index}`}
                  {...getSuggestionItemProps(suggestion, {})}
                >
                  <Typography className={classes.suggestion} variant="h5">
                    {suggestion.description}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
