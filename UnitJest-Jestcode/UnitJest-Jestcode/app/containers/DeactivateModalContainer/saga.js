import { call, put, takeLatest, select } from 'redux-saga/effects';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from 'containers/App/selectors';
import * as Request from './request';
import * as Actions from './actions';
import * as Constants from './constants';
import { makeSelectSmartBarContainer } from '../SmartBarContainer/selectors';
import { hideModal, showDeactivateUserSuccessModal } from '../ModalController/actions';
export function* DeactivateUserFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']).toLowerCase();
    const cohortId = smartBarSelections.getIn(['selectedTeacherId']);
    const deactivateUser = yield call(
      Request.getDeactivateUser,
      sessionId,
      cohortId,
      cohortType,
      userId
    );
    yield put(Actions.deactivateUserRequestSuccess(deactivateUser));
    yield put(showDeactivateUserSuccessModal());
  } catch (err) {
    yield put(hideModal());
    yield put(showDeactivateUserSuccessModal());
    yield put(Actions.deactivateUserRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.DEACTIVATE_USER_REQUEST, DeactivateUserFlow);
}
