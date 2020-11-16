import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  USERS_GET: createSagaActions('USERS_GET'),
  USERS_REFRESH: createSagaActions('USERS_REFRESH')
};

// Action Creators
export const actions = {
  getUsers: () => ({ type: constants.USERS_GET.REQUEST }),
  refreshUsers: () => ({ type: constants.USERS_REFRESH.REQUEST })
};

// Reducer
const initialState = {
  loading: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.USERS_REFRESH.REQUEST:
    case constants.USERS_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.USERS_REFRESH.SUCCESS:
    case constants.USERS_GET.SUCCESS: {
      const { users } = action;
      return {
        ...state,
        list: users.sort((userA, userB) => {
          return userA.email.localeCompare(userB.email);
        }),
        loading: false
      };
    }

    case constants.USERS_REFRESH.FAILURE:
    case constants.USERS_GET.FAILURE: {
      return {
        ...state,
        list: state.list,
        error: action.message,
        loading: false
      };
    }

    default:
      return state;
  }
};
