import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  NOTIFICATIONS_GET: createSagaActions('NOTIFICATIONS_GET'),
  NOTIFICATIONS_MARK_AS_READ: createSagaActions('NOTIFICATIONS_MARK_AS_READ'),
  NOTIFICATIONS_REFRESH: createSagaActions('NOTIFICATIONS_REFRESH')
};

// Action Creators
export const actions = {
  getNotifications: () => ({ type: constants.NOTIFICATIONS_GET.REQUEST }),
  markNotificationAsRead: data => ({
    type: constants.NOTIFICATIONS_MARK_AS_READ.REQUEST,
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

    case constants.NOTIFICATIONS_MARK_AS_READ.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.NOTIFICATIONS_MARK_AS_READ.SUCCESS: {
      const { notification } = action;
      return {
        ...state,
        list: state.list.map(notif => {
          if (notif.id === notification.id) {
            return notification;
          }
          return notif;
        }),
        loading: false
      };
    }

    case constants.NOTIFICATIONS_MARK_AS_READ.FAILURE: {
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
