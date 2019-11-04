import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

export function* getSGClassDataRequest() {
  // const state = yield select(schoolList());
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getPfStudentGoalData = yield call(
      Request.getPfStudentGoalRequest,
      sessionId,
      userId,
      messageObj
    );
    const classList = getPfStudentGoalData.output_data[0].classes[0].class.map(item => ({
      id: item.class_id[0],
      name: item.display_name[0],
      type: 'PfStudentGoal',
    }));

    yield put(Actions.setSGClassRequestSuccess(classList));
  } catch (err) {
    // yield put(Actions.getInstalledQuizDataRequestFailure(err));
  }
}

export function* getSGClassGridListDataRequest(classId) {
  // const state = yield select(schoolList());
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getPfStudentGoalData = yield call(
      Request.getPfSGGridRequest,
      sessionId,
      userId,
      classId,
      messageObj
    );
    const studentGoalList = getPfStudentGoalData.output_data[0].students[0].student;
    if (getPfStudentGoalData.output_data[0].students[0] !== '') {
      const classSubmissionList = studentGoalList.map(item => ({
        studentId: item.user_id[0],
        id: item.work_item_id[0],
        student_name: item.student_name[0],
        goals: item.academic_goal[0],
        behaviour_goal: item.behavioral_goal[0],
        link: ' ',
      }));
      yield put(Actions.setClassSGGridRequestSuccess(classSubmissionList));
    } else {
      yield put(Actions.setClassSGGridRequestSuccess([]));
    }
  } catch (err) {
    // yield put(Actions.getInstalledQuizDataRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_PORTFOLIO_SG_CLASSES, getSGClassDataRequest),
    takeLatest(Constants.GET_PORTFOLIO_SG_CLASSES_GOAL_LIST, getSGClassGridListDataRequest),
  ]);
}
