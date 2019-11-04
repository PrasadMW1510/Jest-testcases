import { call, put, select, takeLatest } from 'redux-saga/effects';

import { makeSelectProfileSessionId } from 'containers/App/selectors';
import { hideModal } from 'containers/ModalController/actions';
import * as MIAActions from 'containers/ManageInactiveAccountsContainer/actions';
import * as AppActions from 'containers/App/actions';

import * as Actions from './actions';
import * as Constants from './constants';
import * as Request from './request';

export function* postReactivateSchoolRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const schoolsToReactivate = action.payload.accounts; // readability
    yield call(Request.postReactivateSchool, sessionId, schoolsToReactivate);

    // refresh smartbar - updated reactivated school
    yield put(AppActions.updateUserData());

    // school reactivating complete, issue request to refresh mia page
    yield put(MIAActions.getInactiveCohortMembersRequest(action.payload.searchOpts));
    yield put(Actions.postReactivateSchoolRequestSuccess());
    // hide the modal
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.postReactivateSchoolRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.POST_REACTIVATE_SCHOOL_REQUEST, postReactivateSchoolRequest);
}
