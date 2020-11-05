import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  AUTHENTICATION_LOGIN: createSagaActions('AUTHENTICATION_LOGIN'),
  AUTHENTICATION_LOGOUT: createSagaActions('AUTHENTICATION_LOGOUT')
};

// Action Creators
export const actions = {
  login: ({ email, password }) => ({
    type: constants.AUTHENTICATION_LOGIN.REQUEST,
    email,
    password
  }),
  logout: () => ({
    type: constants.AUTHENTICATION_LOGOUT.REQUEST
  })
};

// Reducer
const initialState = {
  loading: false,
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.AUTHENTICATION_LOGIN.REQUEST:
      return { ...state, error: null, loggingIn: true };

    case constants.AUTHENTICATION_LOGIN.SUCCESS: {
      const { user } = action;
      return {
        ...state,
        user,
        error: null,
        loggingIn: false
      };
    }

    case constants.AUTHENTICATION_LOGIN.FAILURE:
      return { ...state, error: action.message, loggingIn: false };

    case constants.AUTHENTICATION_LOGOUT.REQUEST:
      return { ...initialState };

    case constants.AUTHENTICATION_LOGOUT.SUCCESS:
      return { ...initialState };

    case constants.AUTHENTICATION_LOGOUT.FAILURE:
      return { ...initialState, error: 'Error Logging out' };

    default:
      return state;
  }
};
