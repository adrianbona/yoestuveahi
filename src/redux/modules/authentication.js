import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  AUTHENTICATION_LOGIN: createSagaActions('AUTHENTICATION_LOGIN'),
  AUTHENTICATION_LOGOUT: createSagaActions('AUTHENTICATION_LOGOUT'),
  AUTHENTICATION_UPDATE_DETAILS: createSagaActions(
    'AUTHENTICATION_UPDATE_DETAILS'
  ),
  AUTHENTICATION_REFRESH: createSagaActions('AUTHENTICATION_REFRESH')
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
  }),
  updateDetails: ({ name, isAdministrator }) => ({
    type: constants.AUTHENTICATION_UPDATE_DETAILS.REQUEST,
    name,
    isAdministrator
  })
};

// Reducer
const initialState = {
  loggingIn: false,
  error: null,
  user: null
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
        loggingIn: false
      };
    }

    case constants.AUTHENTICATION_LOGIN.FAILURE:
      return { ...state, error: action.message, loggingIn: false };

    case constants.AUTHENTICATION_UPDATE_DETAILS.REQUEST:
      return { ...state, error: null, loggingIn: true };

    case constants.AUTHENTICATION_UPDATE_DETAILS.SUCCESS: {
      const { user } = action;
      return {
        ...state,
        user,
        loggingIn: false
      };
    }

    case constants.AUTHENTICATION_UPDATE_DETAILS.FAILURE:
      return { ...state, error: action.message, loggingIn: false };

    case constants.AUTHENTICATION_LOGOUT.REQUEST:
      return { ...initialState };

    case constants.AUTHENTICATION_LOGOUT.SUCCESS:
      return { ...initialState };

    case constants.AUTHENTICATION_LOGOUT.FAILURE:
      return { ...initialState, error: 'Error Logging out' };

    case constants.AUTHENTICATION_REFRESH: {
      const { users } = action;
      return {
        ...state,
        user: {
          ...state.user,
          ...users.find(user => user.id === state.user.id)
        }
      };
    }

    default:
      return state;
  }
};
