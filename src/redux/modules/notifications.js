import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  NOTIFICATIONS_GET: createSagaActions('NOTIFICATIONS_GET'),
  NOTIFICATIONS_REFRESH: createSagaActions('NOTIFICATIONS_REFRESH')
};

// Action Creators
export const actions = {
  getNotifications: () => ({ type: constants.NOTIFICATIONS_GET.REQUEST })
};

// Reducer
const initialState = {
  loading: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.NOTIFICATIONS_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.NOTIFICATIONS_GET.SUCCESS: {
      const { notifications } = action;
      return {
        ...state,
        list: notifications,
        loading: false
      };
    }

    case constants.NOTIFICATIONS_GET.FAILURE: {
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
