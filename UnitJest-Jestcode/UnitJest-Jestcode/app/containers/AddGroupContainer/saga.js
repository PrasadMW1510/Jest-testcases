import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  makeSelectProfileSessionId,
  makeSelectProfileUserId,
  makeSelectProfileUserType,
} from 'containers/App/selectors';
import { USER_TYPE } from 'containers/App/constants';
import { hideModal } from 'containers/ModalController/actions';
import { redirectionSmartBarSGT } from 'containers/SmartBarContainer/actions';
import {
  makeSelectedActiveSchoolId,
  makeSelectedActiveTeacherId,
  makeSelectedActiveClassId,
  makeSelectedActiveGroupId,
} from 'containers/SmartBarContainer/selectors';
import { getClassDetails, getGroupProfilePageData } from 'containers/ProfilePageContainer/request';
import * as Request from './request';
import * as Actions from './actions';
import * as Constants from './constants';

/**
 * There are three main conditions to determine how the data is generated
 * @returns {IterableIterator<*>}
 */
export function* getClassesStudentInformation() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const teacherLoginUserId = yield select(makeSelectProfileUserId());
    const userType = yield select(makeSelectProfileUserType());

    let getClassTeacherInfo = null;

    const schoolId = yield select(makeSelectedActiveSchoolId());
    const teacherId = yield select(makeSelectedActiveTeacherId());
    const classId = yield select(makeSelectedActiveClassId());

    if (classId !== '') {
      getClassTeacherInfo = yield call(getClassDetails, sessionId, classId);
    } else if (schoolId !== '' && userType === USER_TYPE.Teacher) {
      getClassTeacherInfo = yield call(
        Request.getClassDataWithStudents,
        sessionId,
        schoolId,
        teacherLoginUserId
      );
    } else if (schoolId !== '') {
      getClassTeacherInfo = yield call(
        Request.getClassDataWithStudents,
        sessionId,
        schoolId,
        teacherId
      );
    } else if (userType === USER_TYPE.Teacher && teacherId === '') {
      getClassTeacherInfo = yield call(
        Request.getClassesAssosiatedWithTeacher,
        sessionId,
        teacherLoginUserId
      );
    } else {
      getClassTeacherInfo = yield call(
        Request.getClassesAssosiatedWithTeacher,
        sessionId,
        teacherId
      );
    }

    yield put(Actions.getClassesWithStudentInfoSuccess(getClassTeacherInfo));
  } catch (error) {
    yield put(Actions.getClassesWithStudentInfoFailure(error));
  }
}

export function* postGroupInfo({ group }) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const groupId = yield select(makeSelectedActiveGroupId());

    let groupInfo = null;
    if (groupId === '') {
      groupInfo = yield call(Request.postCreateAGroup, sessionId, group);
    } else {
      groupInfo = yield call(Request.updateGroupInfo, sessionId, group);
    }
    yield put(Actions.postGroupSuccess(groupInfo));

    yield put(Actions.resetGroupStatus());

    yield put(redirectionSmartBarSGT());
    yield put(hideModal());
  } catch (error) {
    yield put(Actions.postGroupFailure(error));
  }
}

export function* getGroupInfo() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const groupId = yield select(makeSelectedActiveGroupId());

    const groupInfo = yield call(getGroupProfilePageData, sessionId, groupId);
    yield put(Actions.getGroupInfoSuccess(groupInfo));
  } catch (error) {
    yield put(Actions.getGroupInfoFailure(error));
  }
}

export default function* getClassInfoTeacher() {
  yield takeLatest(Constants.GET_CLASSES_WITH_STUDENT_INFO, getClassesStudentInformation);
  yield takeLatest(Constants.POST_GROUP, postGroupInfo);
  yield takeLatest(Constants.GET_GROUP_INFO, getGroupInfo);
}
