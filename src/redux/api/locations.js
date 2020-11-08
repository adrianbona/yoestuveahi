import { instance } from './axios';

export function getLocations() {
  return instance.get('/location/');
}

export function createLocation({ name, address, maxCapacity, imageUrl }) {
  return instance.post('/location/', {
    name,
    address,
    max_capacity: maxCapacity,
    image_url: imageUrl
  });
}
