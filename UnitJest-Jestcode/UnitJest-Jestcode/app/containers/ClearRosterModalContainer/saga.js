import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  makeSelectProfileSessionId,
  makeSelectProfileUserId,
  makeSelectLoginUserOrg,
  makeSelectProfileUserOrgId,
} from 'containers/App/selectors';
import { USER_ORG } from 'containers/App/constants';
import { showLoading, hideLoading } from 'containers/LoadingController/actions';

import { makeSelectSchoolId } from 'containers/SmartBarContainer/selectors';
import { hideModal, showModal } from 'containers/ModalController/actions';
import * as ModalConstants from 'containers/ModalController/constants';
import * as Request from './request';
import * as Actions from './actions';
import * as Constants from './constants';

export function* deactivateAllClassesFlow() {
  try {
    yield put(showLoading());
    const userId = yield select(makeSelectProfileUserId());
    const sessionId = yield select(makeSelectProfileSessionId());
    let schoolId = yield select(makeSelectSchoolId());
    const userOrg = yield select(makeSelectLoginUserOrg());

    if (userOrg === USER_ORG.School) {
      schoolId = yield select(makeSelectProfileUserOrgId());
    }
    yield call(Request.deactivateAllClasses, userId, sessionId, schoolId);
    yield put(Actions.deactivateAllClassesRequestSuccess());
    yield put(hideLoading());
    yield put(showModal(ModalConstants.CLEAR_ROSTER_SUCCESS_MODAL));
  } catch (err) {
    yield put(hideModal());
    yield put(showModal(ModalConstants.CLEAR_ROSTER_SUCCESS_MODAL));
    yield put(Actions.deactivateAllClassesRequestFailure(err));
    yield put(hideLoading());
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.DEACTIVATE_ALL_CLASSES_REQUEST, deactivateAllClassesFlow);
}
