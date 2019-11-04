// import { take, call, put, select } from 'redux-saga/effects';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { USER_ORG } from 'containers/App/constants';
import { getProfileData } from 'containers/App/request';
import * as Constants from './constants';
import * as Actions from './actions';
import * as Request from './request';
import {
  makeSelectProfileSessionId,
  makeSelectProfileDistrictId,
  makeSelectLoginUserOrg,
  makeSelectProfileUserOrgId,
} from '../App/selectors';

export function* getAdminRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const profileDetails = yield call(getProfileData, sessionId, action.userId);

    yield put(Actions.getAdminRequestSuccess(profileDetails));
  } catch (err) {
    yield put(Actions.getAdminRequestFailure(err));
  }
}

export function* getAdminsRequest() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const districtId = yield select(makeSelectProfileDistrictId());
    const userOrg = yield select(makeSelectLoginUserOrg());
    const schoolId = yield select(makeSelectProfileUserOrgId());

    let admins;

    if (userOrg === USER_ORG.District) {
      admins = yield call(Request.getAdmins, sessionId, districtId);
    } else {
      admins = yield call(Request.getSchools, sessionId, schoolId);
    }

    yield put(Actions.getAdminsRequestSuccess(admins));
  } catch (err) {
    yield put(Actions.getAdminsRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_ADMIN_REQUEST, getAdminRequest),
    takeLatest(Constants.GET_ADMINS_REQUEST, getAdminsRequest),
  ]);
}
