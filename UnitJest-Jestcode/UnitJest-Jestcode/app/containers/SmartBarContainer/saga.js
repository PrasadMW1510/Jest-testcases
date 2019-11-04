/* eslint-disable no-constant-condition*/
import { takeLatest, all, put, select, fork, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import * as AppActions from 'containers/App/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import * as AppConstants from 'containers/App/constants';
import * as SmartBarActions from './actions';
import * as UsageSummaryActions from '../UsageSummaryContainer/actions';
import * as Constants from './constants';
import {
  makeSelectedActiveClassId,
  makeSelectedActiveGroupId,
  makeSelectedActiveStudentId,
  makeSelectClickedSchoolId,
  makeSelectedActiveGradeId,
  makeSelectedActiveTeacherId,
  makeSelectedActiveSchoolId,
  makeSelectCohortType,
} from './selectors';

/**
 * Keeps track of the Ids and reset them based on the cohort selected.
 * Doing it this way will clear the lower cohort signal click values when the upper cohort value is selected.
 * @type {null}
 */
let schoolId = null;
let gradeId = null;
let teacherId = null;
let classId = null;
let groupId = null;
let studentId = null;

/**
 * Handles the school selection action
 * On one click of a unique id, it will only get the derived data
 * On the second click of the same id, it will set the id in the store and redirect to the roster page
 *
 * @param action
 */
export function* schoolSelectionFlow() {
  while (true) {
    const action = yield take(Constants.SCHOOL_SELECTION);
    try {
      if (action.schoolId === schoolId) {
        yield put(SmartBarActions.schoolSelectionSuccess(action.schoolId));
        const location = yield select(makeSelectLocation());
        if (location.pathname === '/') {
          yield put(push('/roster'));
        }
        yield put(AppActions.updateSchoolData(action.schoolId));
        gradeId = null;
        teacherId = null;
        classId = null;
        groupId = null;
        studentId = null;
      } else {
        schoolId = null;
        gradeId = null;
        teacherId = null;
        classId = null;
        groupId = null;
        studentId = null;
        yield put(AppActions.updateSchoolData(action.schoolId));
        schoolId = action.schoolId;
      }
    } catch (err) {
      yield put(UsageSummaryActions.usageSummaryRequestFailure(err));
      yield put(SmartBarActions.schoolSelectionFailure(err));
    }
  }
}

/**
 * Handle the teacher redirection on an action
 *
 */
export function* schoolRedirectionFlow() {
  const action = yield take(Constants.SCHOOL_REDIRECTION);
  yield put(AppActions.updateSchoolData(action.schoolId));
  yield put(SmartBarActions.schoolSelectionSuccess(action.schoolId));
  yield put(push('/roster'));
}

/**
 * Handles the class redirection action
 *
 */
export function* classRedirectionFlow() {
  const action = yield take(Constants.CLASS_REDIRECTION);
  yield put(AppActions.updateClassData(action.classId));
  yield put(SmartBarActions.classSelectionSuccess(action.classId));
  yield put(push('/roster'));
}

/**
 * Handles the class selection action
 * On one click of a unique id, it will only get the derived data
 * On the second click of the same id, it will set the id in the store and redirect to the roster page
 *
 * @param action
 */
export function* classSelectionFlow() {
  while (true) {
    const action = yield take(Constants.CLASS_SELECTION);
    try {
      if (action.classId === classId) {
        yield put(SmartBarActions.classSelectionSuccess(action.classId));
        const location = yield select(makeSelectLocation());
        if (location.pathname === '/') {
          yield put(push('/roster'));
        }
        yield put(AppActions.updateClassData(action.classId));
        groupId = null;
        studentId = null;
      } else {
        classId = null;
        groupId = null;
        studentId = null;
        yield put(AppActions.updateClassData(action.classId));
        classId = action.classId;
      }
    } catch (err) {
      yield put(SmartBarActions.classSelectionFailure(err));
    }
  }
}

/**
 * Handle the group selection action
 * On one click of a unique id, it will only get the derived data
 * On the second click of the same id, it will set the id in the store and redirect to the roster page
 *
 * @param action
 */
export function* groupSelectionFlow() {
  while (true) {
    const action = yield take(Constants.GROUP_SELECTION);
    try {
      if (action.groupId === groupId) {
        yield put(SmartBarActions.groupSelectionSuccess(action.groupId));
        const location = yield select(makeSelectLocation());
        if (location.pathname === '/') {
          yield put(push('/roster'));
        }
        yield put(AppActions.updateGroupData(action.groupId));
        studentId = null;
      } else {
        groupId = null;
        studentId = null;
        yield put(AppActions.updateGroupData(action.groupId));
        groupId = action.groupId;
      }
    } catch (err) {
      yield put(SmartBarActions.groupSelectionFailure(err));
    }
  }
}

/**
 * Handle the student selection action
 * On one click of a unique id, it will only get the derived data
 * On the second click of the same id, it will set the id in the store and redirect to the roster page
 *
 * @param action
 */
export function* studentsSelectionFlow() {
  while (true) {
    const action = yield take(Constants.STUDENT_SELECTION);
    try {
      if (action.studentId === studentId) {
        yield put(SmartBarActions.studentSelectionSuccess(action.studentId));
        const location = yield select(makeSelectLocation());
        if (location.pathname === '/') {
          yield put(push('/roster'));
        }
        yield put(AppActions.updateStudentData(action.studentId));
      } else {
        studentId = null;
        yield put(AppActions.updateStudentData(action.studentId));
        studentId = action.studentId;
      }
    } catch (err) {
      yield put(SmartBarActions.studentSelectionFailure(err));
    }
  }
}

/**
 * Handle the grade selection action
 * On one click of a unique id, it will only get the derived data
 * On the second click of the same id, it will set the id in the store and redirect to the roster page
 *
 * @param action
 */
export function* gradeSelectionFlow() {
  while (true) {
    const action = yield take(Constants.GRADE_SELECTION);
    try {
      if (action.gradeId === gradeId) {
        yield put(SmartBarActions.gradeSelectionSuccess(action.gradeId));
        const location = yield select(makeSelectLocation());
        if (location.pathname === '/') {
          yield put(push('/roster'));
        }
        const clickedSchoolId = yield select(makeSelectClickedSchoolId());
        yield put(AppActions.updateGradeData(action.gradeId, clickedSchoolId));
        teacherId = null;
        classId = null;
        groupId = null;
        studentId = null;
      } else {
        gradeId = null;
        teacherId = null;
        classId = null;
        groupId = null;
        studentId = null;
        const clickedSchoolId = yield select(makeSelectClickedSchoolId());
        yield put(AppActions.updateGradeData(action.gradeId, clickedSchoolId));
        gradeId = action.gradeId;
      }
    } catch (err) {
      yield put(SmartBarActions.gradeSelectionFailure(err));
    }
  }
}

/**
 * Handle the teacher selection action
 * On one click of a unique id, it will only get the derived data
 * On the second click of the same id, it will set the id in the store and redirect to the roster page
 *
 * @param action
 */
export function* teacherSelectionFlow() {
  while (true) {
    const action = yield take(Constants.TEACHER_SELECTION);
    try {
      if (action.teacherId === teacherId) {
        yield put(SmartBarActions.teacherSelectionSuccess(action.teacherId));
        const location = yield select(makeSelectLocation());
        if (location.pathname === '/') {
          yield put(push('/roster'));
        }
        const clickedSchoolId = yield select(makeSelectClickedSchoolId());
        yield put(AppActions.updateTeacherData(action.teacherId, clickedSchoolId));
        classId = null;
        groupId = null;
        studentId = null;
      } else {
        teacherId = null;
        classId = null;
        groupId = null;
        studentId = null;
        const clickedSchoolId = yield select(makeSelectClickedSchoolId());

        yield put(AppActions.updateTeacherData(action.teacherId, clickedSchoolId));
        teacherId = action.teacherId;
      }
    } catch (err) {
      yield put(SmartBarActions.teacherSelectionFailure(err));
    }
  }
}

/**
 * Handle the teacher redirection action
 *
 * @param action
 */
export function* teacherRedirectionFlow() {
  const action = yield take(Constants.TEACHER_REDIRECTION);
  const clickedSchoolId = yield select(makeSelectClickedSchoolId());
  yield put(AppActions.updateTeacherData(action.teacherId, clickedSchoolId));
  yield put(SmartBarActions.teacherSelectionSuccess(action.teacherId));
  yield put(push('/roster'));
}

/**
 * Handle the grade redirection action
 *
 * @param action
 */
export function* gradeRedirectionFlow() {
  const action = yield take(Constants.GRADE_REDIRECTION);
  const clickedSchoolId = yield select(makeSelectClickedSchoolId());
  yield put(AppActions.updateGradeData(action.gradeId, clickedSchoolId));
  yield put(SmartBarActions.gradeSelectionSuccess(action.gradeId));
  yield put(push('/roster'));
}

/**
 * Handle the group redirection action when clicked on the class link on the header.
 *
 * @param action
 */
export function* classRedirectionInGroupFlow() {
  const action = yield take(Constants.CLASS_REDIRECTION_IN_GROUP);
  const clickedSchoolId = yield select(makeSelectClickedSchoolId());
  yield put(AppActions.updateGroupData(action.classId, clickedSchoolId));
  yield put(SmartBarActions.classSelectionSuccess(action.classId));
  yield put(push('/roster'));
}

/**
 * Handle Group redirection action
 *
 * @returns {IterableIterator<*>}
 */
export function* groupRedirectoinFlow() {
  const action = yield take(Constants.GROUP_REDIRECTION);
  const activeSchoolId = yield select(makeSelectedActiveSchoolId());
  const activeTeacherId = yield select(makeSelectedActiveTeacherId());
  yield put(AppActions.updateTeacherData(activeTeacherId, activeSchoolId));
  yield put(AppActions.updateGroupData(action.groupId));
  yield put(SmartBarActions.groupSelectionSuccess(action.groupId));
  yield put(push('/roster'));
}

export function* redirectionCommonModule() {
  yield take(Constants.REDIRECTION_COMMON_SGT);
  const schoolIdRedirection = yield select(makeSelectedActiveSchoolId());
  const gradeIdRedirection = yield select(makeSelectedActiveGradeId());
  const teacherIdRedirection = yield select(makeSelectedActiveTeacherId());
  const classIdRedirection = yield select(makeSelectedActiveClassId());
  const groupIdRedirection = yield select(makeSelectedActiveGroupId());
  const studentIdRedirection = yield select(makeSelectedActiveStudentId());
  const cohortType = yield select(makeSelectCohortType());

  yield put(SmartBarActions.resetSelections());
  let allEmpty = true;
  if (schoolIdRedirection !== '') {
    yield put(AppActions.updateSchoolData(schoolIdRedirection));
    allEmpty = false;
    yield take(AppConstants.UPDATE_SCHOOL_DATA_SUCCESS);
  }
  if (cohortType === 'School') {
    yield put(SmartBarActions.schoolSelectionSuccess(schoolIdRedirection));
  }
  if (gradeIdRedirection !== '') {
    yield put(AppActions.updateGradeData(gradeIdRedirection, schoolIdRedirection));
    allEmpty = false;
    yield take(AppConstants.UPDATE_GRADE_DATA_SUCCESS);
  }
  if (cohortType === 'Grade') {
    yield put(SmartBarActions.gradeSelectionSuccess(gradeIdRedirection));
  }
  if (teacherIdRedirection !== '') {
    yield put(AppActions.updateTeacherData(teacherIdRedirection, schoolIdRedirection));
    allEmpty = false;
    yield take(AppConstants.UPDATE_TEACHER_DATA_SUCCESS);
  }
  if (cohortType === 'Teacher') {
    yield put(SmartBarActions.teacherSelectionSuccess(teacherIdRedirection));
  }

  if (classIdRedirection !== '') {
    yield put(AppActions.updateClassData(classIdRedirection));
    allEmpty = false;
    yield take(AppConstants.UPDATE_CLASS_DATA_SUCCESS);
  }
  if (cohortType === 'Class') {
    yield put(SmartBarActions.classSelectionSuccess(classIdRedirection));
  }
  if (groupIdRedirection !== '') {
    yield put(AppActions.updateGroupData(groupIdRedirection));
    allEmpty = false;
    yield take(AppConstants.UPDATE_GROUP_DATA_SUCCESS);
  }
  if (cohortType === 'Group') {
    yield put(SmartBarActions.groupSelectionSuccess(groupIdRedirection));
  }
  if (studentIdRedirection !== '') {
    yield put(AppActions.updateStudentData(studentIdRedirection));
    allEmpty = false;
    yield take(AppConstants.UPDATE_STUDENT_DATA_SUCCESS);
  }
  if (cohortType === 'Student') {
    yield put(SmartBarActions.studentSelectionSuccess(studentIdRedirection));
  }

  if (allEmpty) {
    yield put(AppActions.updateUserData());
  }
  yield put(push('/roster'));
}

/**
 * Route change update flow
 * This clears the user selections
 * Currently, this can be triggered from clicking the home tab and the quick links button
 */
export function* routeChangeFlow({ payload }) {
  if (payload.pathname === '/') {
    yield put(SmartBarActions.resetSelections());
  }
}

export function* resetSmartBarConstValues() {
  yield take(Constants.RESET_SMARTBAR_CONSTANTS);
  schoolId = null;
  gradeId = null;
  teacherId = null;
  classId = null;
  groupId = null;
  studentId = null;
  yield put(push('/'));
}

/**
 * Handles all the selection flows.
 * On location change, it restarts the selection flows since they all internally hold last clicked state
 * This generator function never finishes.
 */
export function* mainSelectionFlow() {
  while (true) {
    const watcherTasks = yield all([
      fork(studentsSelectionFlow),
      fork(groupSelectionFlow),
      fork(classSelectionFlow),
      fork(schoolSelectionFlow),
      fork(classRedirectionFlow),
      fork(schoolRedirectionFlow),
      fork(gradeSelectionFlow),
      fork(teacherSelectionFlow),
      fork(teacherRedirectionFlow),
      fork(gradeRedirectionFlow),
      fork(classRedirectionInGroupFlow),
      fork(groupRedirectoinFlow),
      fork(redirectionCommonModule),
      fork(resetSmartBarConstValues),
    ]);

    yield take(LOCATION_CHANGE);

    yield all(watcherTasks.map(task => cancel(task)));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield all([fork(mainSelectionFlow), takeLatest(LOCATION_CHANGE, routeChangeFlow)]);
}
