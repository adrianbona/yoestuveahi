import { instance } from './axios';
import { getUserToken } from '../../components/authentication/session';

export function login({ email, password }) {
  return instance.post('/login', {
    email,
    password
  });
}

export function logout() {
  return instance.get('/logout', {
    headers: {
      Authorization: `token ${getUserToken()}`
    }
  });
}
