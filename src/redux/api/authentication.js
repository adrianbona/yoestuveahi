import { instance } from './axios';

export function login({ email, password }) {
  return instance.post('/login', {
    body: {
      email,
      password
    }
  });
}

export default {
  login
};
