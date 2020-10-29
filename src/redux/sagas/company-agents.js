import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { constants } from '../modules/company-agents';
import * as api from '../api/company-agents';

export function* getCompanyAgents(action) {
  try {
    const { page, pageSize, companies } = yield call(api.getCompanyAgents, {
      ...action
    });

    yield put({
      type: constants.COMPANY_AGENTS_GET.SUCCESS,
      page,
      pageSize,
      companies
    });
  } catch (e) {
    yield put({
      type: constants.COMPANY_AGENTS_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetCompanyAgents() {
  yield takeLatest(constants.COMPANY_AGENTS_GET.REQUEST, getCompanyAgents);
}

export function* getCompanyAgent(action) {
  try {
    const companyAgent = yield call(api.getCompanyAgent, {
      ...action
    });

    yield put({
      type: constants.COMPANY_AGENT_GET.SUCCESS,
      companyAgent
    });
  } catch (e) {
    yield put({
      type: constants.COMPANY_AGENT_GET.FAILURE,
      message: e.message || e
    });
  }
}

export function* watchGetCompanyAgent() {
  yield takeLatest(constants.COMPANY_AGENT_GET.REQUEST, getCompanyAgent);
}

function* rootSaga() {
  const watchers = [watchGetCompanyAgents, watchGetCompanyAgent];
  yield all(watchers.map(fork));
}

export default rootSaga;
