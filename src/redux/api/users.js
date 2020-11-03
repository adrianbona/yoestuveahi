import { instance } from './axios';

export function getUsers() {
  return instance.get('/user/');
}

export default {
  getUsers
};
