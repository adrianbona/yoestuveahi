import { instance } from './axios';

export function getLocations() {
  return instance.get('/location/');
}

export function createLocation({ name, address, maxCapacity, imageUrl }) {
  return instance.post('/location/', {
    name,
    description: name,
    address,
    max_capacity: maxCapacity,
    logo: imageUrl
  });
}
