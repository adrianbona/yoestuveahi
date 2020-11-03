import { instance } from './axios';

export function getUsers() {
  return instance.get('/users/');
}

export default {
  getUsers
};
