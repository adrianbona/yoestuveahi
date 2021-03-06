import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function getNotifications() {
  return instance.get('/contagion/risk/', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}

export function markNotificationAsRead({ id, shown }) {
  return instance.patch(
    `/contagion/risk/${id}/`,
    {
      shown
    },
    {
      headers: {
        Authorization: `token ${getUserToken()}`
      }
    }
  );
}
