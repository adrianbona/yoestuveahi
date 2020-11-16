import React, { useState } from 'react';
import clsx from 'clsx';
import PlacesAutocomplete, {
  geocodeByAddress
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

const LocationSearchInput = props => {
  const classes = useStyles();
  const { onSelectedAddress, className } = props;
  const [address, setAddress] = useState('');

  const handleChange = selectedAddress => {
    setAddress(selectedAddress);
  };

  const handleSelect = async selectedAddress => {
    setAddress(selectedAddress);
    geocodeByAddress(selectedAddress)
      .then(results => {
        onSelectedAddress(selectedAddress, results[0]);
      })
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
        <div className={className}>
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
            {suggestions.map(suggestion => {
              return (
                <div
                  key={suggestion.placeId}
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
