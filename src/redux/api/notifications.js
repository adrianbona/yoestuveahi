import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function getNotifications() {
  return instance.get('/contagion/risk/', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}
