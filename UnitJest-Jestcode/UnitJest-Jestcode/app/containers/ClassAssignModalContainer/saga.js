// import { take, call, put, select } from 'redux-saga/effects';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { hideModal } from 'containers/ModalController/actions';
import * as MIAActions from 'containers/ManageInactiveAccountsContainer/actions';
import * as Constants from './constants';
import * as Actions from './actions';
import * as Request from './request';

import {
  makeSelectProfileSessionId,
  makeSelectProfileDistrictId,
  makeSelectProfileUserId,
} from '../App/selectors';

export function* getClassesAndGroupsRequest() {
  try {
    const districtId = yield select(makeSelectProfileDistrictId());
    const userId = yield select(makeSelectProfileUserId());
    const sessionId = yield select(makeSelectProfileSessionId());

    const schoolDetails = yield call(
      Request.getClassesAndGroupForSearch,
      districtId,
      userId,
      sessionId
    );
    yield put(Actions.getClassesAndGroupsRequestSuccess(schoolDetails));
  } catch (err) {
    yield put(Actions.getClassesAndGroupsRequestFailure(err));
  }
}

export function* postAssignToClassRequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const assignData = action.payload; // readability
    yield call(Request.postAssignToClass, sessionId, assignData);
    yield put(Actions.postAssignToClassRequestSuccess());
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.postAssignToClassRequestFailure(err));
  }
}

export function* postAssignToClassMIARequest(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const assignData = action.payload; // readability
    yield call(Request.postAssignToClass, sessionId, assignData);
    yield put(Actions.postAssignToClassRequestSuccess());

    yield put(MIAActions.getInactiveCohortMembersRequest(action.searchOpts));
    yield put(Actions.postAssignToClassMIARequestSuccess());
    yield put(hideModal());
  } catch (err) {
    yield put(Actions.postAssignToClassMIARequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_CLASSES_AND_GROUPS_REQUEST, getClassesAndGroupsRequest),
    takeLatest(Constants.POST_ASSIGN_TO_CLASS_REQUEST, postAssignToClassRequest),
    takeLatest(Constants.POST_ASSIGN_TO_CLASS_MIA_REQUEST, postAssignToClassMIARequest),
  ]);
}
