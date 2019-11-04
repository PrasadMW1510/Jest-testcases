import { call, put, takeLatest, select } from 'redux-saga/effects';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from 'containers/App/selectors';
import { makeSelectSmartBarContainer } from 'containers/SmartBarContainer/selectors';
import { hideModal, showModal } from 'containers/ModalController/actions';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';
import * as ModalConstants from 'containers/ModalController/constants';
import * as Request from 'containers/DeactivateModalContainer/request';
import * as Actions from './actions';
import * as Constants from './constants';

export function* DeactivateSchoolFlow() {
  try {
    yield put(showLoading());
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']).toLowerCase();
    const cohortId = smartBarSelections.getIn(['selectedSchoolId']);
    const deactivateSchool = yield call(
      Request.getDeactivateUser,
      sessionId,
      cohortId,
      cohortType,
      userId
    );
    yield put(Actions.deactivateSchoolRequestSuccess(deactivateSchool));
    yield put(hideLoading());
    yield put(showModal(ModalConstants.DEACTIVATE_SCHOOL_SUCCESS_MODAL));
  } catch (err) {
    yield put(hideModal());
    yield put(Actions.deactivateSchoolRequestFailure(err));
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.DEACTIVATE_SCHOOL_REQUEST, DeactivateSchoolFlow);
}
