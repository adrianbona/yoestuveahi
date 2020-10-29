import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  CLIENTS_GET: createSagaActions('CLIENTS_GET'),
  CLIENT_GET: createSagaActions('CLIENT_GET')
};

// Action Creators
export const actions = {
  getClients: (
    userId,
    {
      page = 1,
      pageSize = 50,
      orderField = null,
      orderDirection = null,
      filters = null
    }
  ) => ({
    type: constants.CLIENTS_GET.REQUEST,
    userId,
    page,
    pageSize,
    orderField,
    orderDirection,
    filters
  }),
  getClient: (userId, clientId) => ({
    type: constants.CLIENT_GET.REQUEST,
    userId,
    clientId
  })
};

// Reducer
const initialState = {
  loading: false,
  list: {
    page: 1,
    pageSize: 10,
    clients: []
  },
  byId: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CLIENTS_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.CLIENTS_GET.SUCCESS: {
      const { page, pageSize, clients } = action;
      return {
        ...state,
        list: { page, pageSize, clients: [...clients] },
        loading: false
      };
    }

    case constants.CLIENTS_GET.FAILURE: {
      return {
        ...state,
        list: { ...state.list, clients: [] },
        error: action.message,
        loading: false
      };
    }

    case constants.CLIENT_GET.REQUEST: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }

    case constants.CLIENT_GET.SUCCESS: {
      const { client } = action;
      return {
        ...state,
        byId: { ...state.byId, [client.id]: client },
        loading: false
      };
    }

    case constants.CLIENT_GET.FAILURE:
      return {
        ...state,
        error: action.message,
        loading: false
      };

    default:
      return state;
  }
};
