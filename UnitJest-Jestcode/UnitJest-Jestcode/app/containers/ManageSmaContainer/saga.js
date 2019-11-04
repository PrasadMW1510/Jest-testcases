import { all, call, select, put, takeLatest } from 'redux-saga/effects';
import { makeSelectProfileSessionId, makeSelectProfileDistrictId } from 'containers/App/selectors';
import * as Actions from './actions';
import * as Request from './request';
import * as Constants from './constants';

// Individual exports for testing
export function* handleMediaServersRequestFlow() {
  try {
    // const { sessionId, userOrgId } = yield call(getProfileData);
    const sessionId = yield select(makeSelectProfileSessionId());
    const districtId = yield select(makeSelectProfileDistrictId());

    const mediaServers = yield call(Request.getMediaServers, sessionId, districtId);
    yield put(Actions.handleMediaServersRequestSuccess(mediaServers));
  } catch (err) {
    yield put(Actions.handleMediaServersRequestFailure(err));
  }
}

// export function* getProfileData() {
//   const sessionId = yield select(makeSelectProfileSessionId());
//   const userOrgId = yield select(makeSelectProfileUserOrgId());
//   return { sessionId, userOrgId };
// }

export default function* defaultSaga() {
  yield all([takeLatest(Constants.GET_MEDIA_SERVERS_REQUEST, handleMediaServersRequestFlow)]);
}
