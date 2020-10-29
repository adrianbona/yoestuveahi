import { createSagaActions } from '../utils/saga';

// Constants
export const constants = {
  COMPANY_AGENTS_GET: createSagaActions('COMPANY_AGENTS_GET'),
  COMPANY_AGENT_GET: createSagaActions('COMPANY_AGENT_GET')
};

// Action Creators
export const actions = {
  getCompanyAgents: (
    userId,
    {
      page = 1,
      pageSize = 50,
      orderField = null,
      orderDirection = null,
      filters = null
    }
  ) => ({
    type: constants.COMPANY_AGENTS_GET.REQUEST,
    userId,
    page,
    pageSize,
    orderField,
    orderDirection,
    filters
  }),
  getCompanyAgent: (userId, companyAgentId) => ({
    type: constants.COMPANY_AGENT_GET.REQUEST,
    userId,
    companyAgentId
  })
};

// Reducer
const initialState = {
  loading: false,
  list: {
    page: 1,
    pageSize: 10,
    companies: []
  },
  byId: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.COMPANY_AGENTS_GET.REQUEST: {
      return { ...state, error: null, loading: true };
    }

    case constants.COMPANY_AGENTS_GET.SUCCESS: {
      const { page, pageSize, companies } = action;
      return {
        ...state,
        list: { page, pageSize, companies: [...companies] },
        loading: false
      };
    }

    case constants.COMPANY_AGENTS_GET.FAILURE: {
      return {
        ...state,
        list: { ...state.list, companies: [] },
        error: action.message,
        loading: false
      };
    }

    case constants.COMPANY_AGENT_GET.REQUEST: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }

    case constants.COMPANY_AGENT_GET.SUCCESS: {
      const { companyAgent } = action;
      return {
        ...state,
        byId: { ...state.byId, [companyAgent.id]: companyAgent },
        loading: false
      };
    }

    case constants.COMPANY_AGENT_GET.FAILURE:
      return {
        ...state,
        error: action.message,
        loading: false
      };

    default:
      return state;
  }
};
