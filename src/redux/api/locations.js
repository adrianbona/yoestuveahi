import { instance } from './axios';

export function getLocations() {
  return instance.get('/location/');
}

export function createLocation({
  id,
  name,
  description,
  logo,
  latitude,
  longitude
}) {
  return instance.post('/location/', {
    id,
    name,
    description,
    maximum_capacity: 15,
    logo,
    latitude,
    longitude,
    opening_time: '9AM',
    closing_time: '6PM'
  });
}
