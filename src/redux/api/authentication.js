import { instance } from './axios';

export function login({ email, password }) {
  return instance.post('/login', {
    email,
    password
  });
}

export function logout() {
  return instance.get('/logout');
}
