import { instance } from './axios';

export function login({ email, password }) {
  return instance.post('/login', {
    email,
    password
  });
}

export default {
  login
};
