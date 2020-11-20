import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function getTests() {
  return instance.get('/test/', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}

export function loadTest({ dateTaken, isPositive }) {
  return instance.post(
    '/test/',
    {
      date_taken: dateTaken,
      is_positive: isPositive
    },
    {
      headers: {
        Authorization: `token ${getUserToken()}`
      }
    }
  );
}
