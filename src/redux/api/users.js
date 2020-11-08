import { instance } from './axios';

export function getUsers() {
  return instance.get('/user/');
}

export function updateDetails({ name, isAdministrator }) {
  return instance.put('/user/', {
    name,
    is_administrator: isAdministrator
  });
}
