import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  POSTS_GET: createSagaActions('POSTS_GET')
};

// Action Creators
export const actions = {
  getPosts: () => ({ type: constants.POSTS_GET.REQUEST })
};

// Reducer
const initialState = {
  loading: false,
  list: {
    posts: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.POSTS_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.POSTS_GET.SUCCESS: {
      const { posts } = action;
      return {
        ...state,
        list: { posts },
        loading: false
      };
    }

    case constants.POSTS_GET.FAILURE: {
      return {
        ...state,
        list: { ...state.list, posts: [] },
        error: action.message,
        loading: false
      };
    }

    default:
      return state;
  }
};
