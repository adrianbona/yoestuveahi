import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function getContagions() {
  return instance.get('/contagion/', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}
