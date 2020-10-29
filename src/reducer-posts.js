import { Posts } from './constants';

const initialState = {
  posts: []
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Posts.fetchPosts:
      return state;
    case Posts.fetchPostsSuccess:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return initialState;
  }
};
