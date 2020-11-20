import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function getLocations() {
  return instance.get('/location/', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}

export function createLocation({
  id,
  name,
  description,
  maximumCapacity,
  openingTime,
  closingTime,
  logo,
  latitude,
  longitude
}) {
  return instance.post(
    '/location/',
    {
      id,
      name,
      description,
      maximum_capacity: maximumCapacity,
      logo,
      latitude,
      longitude,
      opening_time: openingTime,
      closing_time: closingTime
    },
    {
      headers: {
        Authorization: `token ${getUserToken()}`
      }
    }
  );
}
