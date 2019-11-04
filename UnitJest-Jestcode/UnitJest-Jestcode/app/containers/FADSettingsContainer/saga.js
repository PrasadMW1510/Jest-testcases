// import { take, call, put, select } from 'redux-saga/effects';
import {
  makeSelectCohortType,
  makeSelectCohortTypeCohortId,
} from 'containers/SmartBarContainer/selectors';
import { makeSelectLoginData } from 'containers/App/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Request from './request';

export function* setFADSettingsFlow(params) {
  try {
    const loginData = yield select(makeSelectLoginData({}));
    const cohortType = yield select(makeSelectCohortType());
    const cohortId = yield select(makeSelectCohortTypeCohortId());
    const result = yield call(
      Request.setFADsettings,
      loginData.getIn(['session_id', 0]),
      cohortType,
      cohortId.id,
      params.retake,
      params.reset
    );
    yield put(Actions.setSettingsSuccess(result));
  } catch (err) {
    yield put(Actions.setSettingsFailure(err));
  }
}

export function* getFADSettingsFlow() {
  try {
    const loginData = yield select(makeSelectLoginData({}));
    let cohortType = yield select(makeSelectCohortType());
    let cohortId = yield select(makeSelectCohortTypeCohortId());
    if (!cohortType) {
      cohortType = loginData.getIn(['user_type', 0]);
      cohortId = { id: loginData.getIn(['user_id', 0]) };
    }
    const result = yield call(
      Request.getFADSettings,
      loginData.getIn(['session_id', 0]),
      cohortType,
      cohortId.id
    );
    yield put(Actions.getSettingsSuccess(result));
  } catch (err) {
    yield put(Actions.getSettingsFailure(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(Constants.FAD_GET_SETTINGS_REQUEST, getFADSettingsFlow);
  yield takeLatest(Constants.FAD_SET_SETTINGS_REQUEST, setFADSettingsFlow);
}
