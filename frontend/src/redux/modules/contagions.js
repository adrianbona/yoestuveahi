import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  CONTAGIONS_GET: createSagaActions('CONTAGIONS_GET')
};

// Action Creators
export const actions = {
  getContagions: () => ({ type: constants.CONTAGIONS_GET.REQUEST })
};

// Reducer
const initialState = {
  loading: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CONTAGIONS_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.CONTAGIONS_GET.SUCCESS: {
      const { contagions } = action;
      return {
        ...state,
        list: contagions.sort((contA, contB) => {
          return contA.reportedOn > contB.reportedOn;
        }),
        loading: false
      };
    }

    case constants.CONTAGIONS_GET.FAILURE: {
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
