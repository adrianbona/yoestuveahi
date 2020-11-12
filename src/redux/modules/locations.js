import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  LOCATIONS_GET: createSagaActions('LOCATIONS_GET'),
  LOCATIONS_CREATE: createSagaActions('LOCATIONS_CREATE'),
  LOCATIONS_RESET: createSagaActions('LOCATIONS_RESET')
};

// Action Creators
export const actions = {
  getLocations: () => ({ type: constants.LOCATIONS_GET.REQUEST }),
  resetLocations: () => ({ type: constants.LOCATIONS_RESET }),
  createLocation: data => ({
    type: constants.LOCATIONS_CREATE.REQUEST,
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
    case constants.LOCATIONS_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.LOCATIONS_GET.SUCCESS: {
      const { locations } = action;
      return {
        ...state,
        list: locations,
        loading: false
      };
    }

    case constants.LOCATIONS_GET.FAILURE: {
      return {
        ...state,
        list: state.list,
        error: action.message,
        loading: false
      };
    }

    case constants.LOCATIONS_CREATE.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.LOCATIONS_CREATE.SUCCESS: {
      const { location } = action;
      return {
        ...state,
        list: state.list.concat(location),
        loading: false
      };
    }

    case constants.LOCATIONS_CREATE.FAILURE: {
      return {
        ...state,
        list: state.list,
        error: action.message,
        loading: false
      };
    }

    case constants.LOCATIONS_RESET: {
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
