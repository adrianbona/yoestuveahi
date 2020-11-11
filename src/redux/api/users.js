import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function getUsers() {
  return instance.get('/user/', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}

export function updateDetails({ name, isAdministrator }) {
  return instance.patch(
    '/user/',
    {
      name,
      is_admin: isAdministrator
    },
    {
      headers: {
        Authorization: `token ${getUserToken()}`
      }
    }
  );
}
