import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  REGISTRIES_GET: createSagaActions('REGISTRIES_GET'),
  REGISTRIES_CREATE: createSagaActions('REGISTRIES_CREATE'),
  REGISTRIES_RESET: createSagaActions('REGISTRIES_RESET')
};

// Action Creators
export const actions = {
  getRegistries: () => ({ type: constants.REGISTRIES_GET.REQUEST }),
  resetRegistries: () => ({ type: constants.REGISTRIES_RESET }),
  createRegistry: data => ({
    type: constants.REGISTRIES_CREATE.REQUEST,
    ...data
  })
};

// Reducer
const initialState = {
  loading: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.REGISTRIES_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.REGISTRIES_GET.SUCCESS: {
      const { registries } = action;
      return {
        ...state,
        list: registries,
        loading: false
      };
    }

    case constants.REGISTRIES_GET.FAILURE: {
      return {
        ...state,
        list: state.list,
        error: action.message,
        loading: false
      };
    }

    case constants.REGISTRIES_CREATE.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.REGISTRIES_CREATE.SUCCESS: {
      const { registries } = action;
      return {
        ...state,
        list: registries,
        loading: false
      };
    }

    case constants.REGISTRIES_CREATE.FAILURE: {
      return {
        ...state,
        list: state.list,
        error: action.message,
        loading: false
      };
    }

    case constants.REGISTRIES_RESET: {
      return {
        ...state,
        list: state.list,
        error: null,
        loading: false
      };
    }

    default:
      return state;
  }
};
