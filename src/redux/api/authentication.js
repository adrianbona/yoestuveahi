import { instance } from './axios';

export function login({ email, password }) {
  return instance.post('/user/', {
    email,
    password
  });
}

export default {
  login
};
