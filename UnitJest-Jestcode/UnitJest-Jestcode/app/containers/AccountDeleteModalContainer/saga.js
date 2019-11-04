import { call, put, select, takeLatest } from 'redux-saga/effects';

import { makeSelectProfileSessionId } from 'containers/App/selectors';
import { hideModal, showModal } from 'containers/ModalController/actions';
import { getSearchResultsRequest } from 'containers/SearchModalContainer/actions';
import { COHORT_TYPE } from 'containers/App/constants';

import * as ModalConstants from 'containers/ModalController/constants';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Request from './request';

export function* postAccountDeleteRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const accountsToDelete = action.payload.accounts; // readability
    const searchOpts = action.payload.searchOpts; // readability
    yield call(Request.postAccountsDelete, sessionId, accountsToDelete);
    yield put(Actions.postAccountDeleteRequestSuccess());
    // put the search refresh action
    yield put(getSearchResultsRequest(searchOpts));
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.postAccountDeleteRequestFailure(err));
  }
}

export function* postAccountDeleteMIARequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const accountsToDelete = action.payload.accounts; // readability
    const searchOpts = action.payload.searchOpts; // readability

    const deleteResponse = yield call(
      Request.postAccountsMIADelete,
      sessionId,
      accountsToDelete,
      searchOpts.cohortType
    );
    let data;

    if (
      searchOpts.cohortType === COHORT_TYPE.Student ||
      searchOpts.cohortType === COHORT_TYPE.Teacher
    ) {
      data = {
        successCount: deleteResponse.results[0].disabled[0].$.count,
        failureCount: deleteResponse.results[0].not_disabled[0].$.count,
        isDelete: true,
        searchOpts,
      };
    } else if (searchOpts.cohortType === COHORT_TYPE.School) {
      data = {
        // successCount: deleteResponse ? deleteResponse.item_count[0] : 0,
        successCount: deleteResponse ? accountsToDelete.input.schools[0].school_id.length : 0,
        searchOpts,
      };
    } else {
      data = {
        // successCount: deleteResponse ? deleteResponse.item_count[0] : 0,
        successCount: deleteResponse ? accountsToDelete.input.classes[0].class_id.length : 0,
        searchOpts,
      };
    }
    yield put(showModal(ModalConstants.DELETE_INACTIVE_SUCCESS_MODAL, data));
  } catch (err) {
    yield put(Actions.postAccountDeleteRequestFailure(err));
  }
}

export function* postAccountUnenrollRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const accountsToUneroll = action.payload.accounts; // readability
    const searchOpts = action.payload.searchOpts; // readability
    const unEnrollResponse = yield call(Request.postAccountsUnenroll, sessionId, accountsToUneroll);
    yield put(Actions.postAccountUnenrollRequestSuccess());

    const data = {
      successCount: unEnrollResponse.results[0].unenrolled[0].$.count,
      failureCount: unEnrollResponse.results[0].not_unenrolled[0].$.count,
      isDelete: false,
      searchOpts,
    };
    // put the search refresh action
    yield put(showModal(ModalConstants.DELETE_INACTIVE_SUCCESS_MODAL, data));
  } catch (err) {
    yield put(Actions.postAccountUnenrollRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(Constants.POST_ACCOUNT_DELETE_REQUEST, postAccountDeleteRequest);
  yield takeLatest(Constants.POST_ACCOUNT_DELETE_MIA_REQUEST, postAccountDeleteMIARequest);
  yield takeLatest(Constants.POST_ACCOUNT_UNENROLL_REQUEST, postAccountUnenrollRequest);
}
