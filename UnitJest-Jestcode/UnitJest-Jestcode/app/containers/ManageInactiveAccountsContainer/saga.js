import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as Constants from 'components/ManageInactiveAccounts/constants';
import { push } from 'react-router-redux';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Request from './request';
import * as Actions from './actions';

export function* redirectToRosterFlow() {
  yield put(push('/roster'));
}

export function* loadInactiveCohortMembers(action) {
  try {
    const { sessionId, currentlyLoggedInUserId } = yield call(getLoginData);
    const inactiveMembersResponse = yield call(
      Request.getInactiveCohortMembers,
      sessionId,
      currentlyLoggedInUserId,
      action.payload
    );
    yield put(Actions.getInactiveCohortMembersRequestSuccess(inactiveMembersResponse));
  } catch (err) {
    yield put(Actions.getInactiveCohortMembersRequestFailure(err));
  }
}

export function* getLoginData() {
  const sessionId = yield select(makeSelectProfileSessionId());
  const currentlyLoggedInUserId = yield select(makeSelectProfileUserId());
  return { sessionId, currentlyLoggedInUserId };
}

export default function* defaultSaga() {
  yield all([
    takeLatest(
      [
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      ],
      redirectToRosterFlow
    ),
    takeLatest(Constants.GET_INACTIVE_COHORT_MEMBERS_REQUEST, loadInactiveCohortMembers),
  ]);
}
