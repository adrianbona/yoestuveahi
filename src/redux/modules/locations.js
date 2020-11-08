import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  LOCATIONS_GET: createSagaActions('LOCATIONS_GET'),
  LOCATIONS_CREATE: createSagaActions('LOCATIONS_CREATE')
};

// Action Creators
export const actions = {
  getLocations: () => ({ type: constants.LOCATIONS_GET.REQUEST }),
  createLocation: data => ({
    type: constants.LOCATIONS_CREATE.REQUEST,
    ...data
  })
};

// Reducer
const initialState = {
  loading: false,
  locationCreated: false,
  list: {
    locations: []
  }
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
        list: { locations },
        loading: false
      };
    }

    case constants.LOCATIONS_GET.FAILURE: {
      return {
        ...state,
        list: { ...state.list },
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
        list: { ...action.list.locations, location },
        locationCreated: true,
        loading: false
      };
    }

    case constants.LOCATIONS_CREATE.FAILURE: {
      return {
        ...state,
        list: { ...state.list },
        error: action.message,
        loading: false
      };
    }

    default:
      return state;
  }
};
