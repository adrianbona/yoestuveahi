import { Posts } from './constants';

export const fetchPosts = data => {
  return {
    type: Posts.fetchPosts,
    payload: data
  };
};

export const fetchPostsSuccess = data => {
  return {
    type: Posts.fetchPostsSuccess,
    payload: data
  };
};

export const fetchPostsError = data => {
  return {
    type: Posts.fetchPostsError,
    payload: data
  };
};
