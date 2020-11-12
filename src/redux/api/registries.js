import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function getRegistries() {
  return instance.get('/registry/', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}

export function createRegistry({ locationId }) {
  return instance.post(
    '/registry/',
    {
      included_in: locationId
    },
    {
      headers: {
        Authorization: `token ${getUserToken()}`
      }
    }
  );
}
