import { instance_test } from './axios';

export function getPosts() {
  return instance_test.get('/posts/');
}

export default {
  getPosts
};
