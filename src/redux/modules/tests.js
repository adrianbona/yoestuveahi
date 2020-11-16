import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  TESTS_GET: createSagaActions('TESTS_GET'),
  TESTS_LOAD: createSagaActions('TESTS_LOAD'),
  TESTS_RESET: createSagaActions('TESTS_RESET')
};

// Action Creators
export const actions = {
  getTests: () => ({ type: constants.TESTS_GET.REQUEST }),
  resetTests: () => ({ type: constants.TESTS_RESET }),
  loadTest: data => ({
    type: constants.TESTS_LOAD.REQUEST,
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
    case constants.TESTS_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.TESTS_GET.SUCCESS: {
      const { tests } = action;
      return {
        ...state,
        list: tests.sort((testA, testB) => {
          return testA.dateTaken > testB.dateTaken;
        }),
        loading: false
      };
    }

    case constants.TESTS_GET.FAILURE: {
      return {
        ...state,
        list: state.list,
        error: action.message,
        loading: false
      };
    }

    case constants.TESTS_LOAD.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.TESTS_LOAD.SUCCESS: {
      const { test } = action;
      return {
        ...state,
        list: state.list.concat(test).sort((testA, testB) => {
          return testA.dateTaken > testB.dateTaken;
        }),
        loading: false
      };
    }

    case constants.TESTS_LOAD.FAILURE: {
      return {
        ...state,
        list: state.list,
        error: action.message,
        loading: false
      };
    }

    case constants.TESTS_RESET: {
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
