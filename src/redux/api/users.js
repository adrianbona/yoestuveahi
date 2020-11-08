import { instance } from './axios';

export function getUsers() {
  return instance.get('/user/', { withCredentials: true });
}

export function updateDetails({ name, isAdministrator }) {
  return instance.patch(
    '/user/',
    {
      name,
      is_admin: isAdministrator
    },
    { withCredentials: true }
  );
}
