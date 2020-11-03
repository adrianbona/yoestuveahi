import { instance } from './axios';

export function login({ email, password }) {
  return instance.post('/login', {
    username: email,
    password
  });
}

export default {
  login
};
