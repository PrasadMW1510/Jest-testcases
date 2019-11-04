import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import * as Constants from './constants';
import * as Request from './request';
import * as Actions from './actions';
import { schoolList } from './selectors';
import { makeSelectProfileSessionId, makeSelectProfileUserId } from '../App/selectors';

export function* getSchoolDataRequest(distId) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getSchoolData = yield call(
      Request.getPortfolioClassData,
      sessionId,
      userId,
      distId,
      messageObj
    );
    yield put(Actions.getSchoolDataRequestSuccess(getSchoolData));
  } catch (err) {
    yield put(Actions.getSchoolDataRequestSuccess([]));
  }
}

export function* getGradeDataRequest(schoolid) {
  const state = yield select(schoolList());
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const messageObj = '<>';
    const getGradeData = yield call(
      Request.getPortfolioGradeData,
      sessionId,
      userId,
      messageObj,
      schoolid
    );
    const gradeData = getGradeData.output_data[0].grades[0].grade.map(item => ({
      name: item.full_name[0],
      full_name: item.name[0],
      children: [],
    }));
    if (
      state.treeData.length > 0 &&
      Object.prototype.hasOwnProperty.call(state.treeData[0], 'org_id')
    ) {
      state.treeData.map(item => {
        const newItem = item;
        if (item.org_id[0] === schoolid.schoolid[0]) {
          newItem.children = gradeData;
          newItem.toggled = true;
        } else if (Object.prototype.hasOwnProperty.call(item, 'toggled')) {
          newItem.toggled = false;
        }
        return item;
      });
    } else if (schoolid.userType === Constants.SCHOOL_USER) {
      state.treeData = gradeData;
    }

    yield put(Actions.getGradeDataRequestSuccess(state.treeData, schoolid));
    yield put(Actions.setGradeDataRequestSuccess(schoolid.schoolid[0]));
  } catch (err) {
    yield put(Actions.setGradeDataRequestSuccess([]));
  }
}

export function* getTeacherDataRequest(gradeid) {
  const state = yield select(schoolList());
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const schoolid = state.selectedSchoolId;
    const messageObj = '<>';
    const getTeacherData = yield call(
      Request.getPortfolioTeacherData,
      sessionId,
      userId,
      schoolid,
      gradeid.gradeId,
      messageObj
    );
    const teacherList = getTeacherData.output_data[0].users[0].user.map(item => {
      const newItem = item;
      newItem.name = `${item.last_name[0]}, ${item.first_name[0]}`;
      newItem.children = [];
      return item;
    });
    if (Object.prototype.hasOwnProperty.call(state.treeData[0], 'org_id')) {
      state.treeData.map(item => {
        if (item.org_id[0] === state.selectedSchoolId) {
          item.children.map(chitem => {
            const chnewItem = chitem;
            if (chitem.full_name === gradeid.gradeId) {
              chnewItem.children = teacherList;
              chnewItem.toggled = true;
            }
            return chitem;
          });
        }
        return item;
      });
    } else if (gradeid.adminType === Constants.ORG_SCHOOL) {
      state.treeData.map(item => {
        const newItem = item;
        if (item.full_name === gradeid.gradeId) {
          newItem.children = teacherList;
          newItem.toggled = true;
        }
        return item;
      });
    }

    yield put(Actions.getTeacherDataRequestSuccess(state.treeData));
    yield put(Actions.setPortfolioSelectedGradeId(gradeid.gradeId));
  } catch (err) {
    yield put(Actions.getTeacherDataRequestSuccess([]));
  }
}

export function* getPortfolioClassDataRequest(teacherid) {
  const state = yield select(schoolList());
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const messageObj = '<>';
    const getPortfolioClassData = yield call(
      Request.getPortfolioClassDataRequest,
      sessionId,
      teacherid,
      messageObj
    );

    const classList = getPortfolioClassData.output_data[0].classes[0].class.map(item => {
      const newItem = item;
      newItem.name = item.display_name[0];
      newItem.page = 'student_work';
      newItem.children = [];
      return item;
    });
    if (teacherid.adminType === Constants.ORG_SCHOOL) {
      state.treeData.map(item => {
        if (item.full_name === state.selectedGradeId) {
          item.children.map(chitem => {
            const newchitem = chitem;
            if (chitem.user_id[0] === teacherid.teacherId[0]) {
              newchitem.children = classList;
              newchitem.toggled = true;
            }
            return chitem;
          });
        }
        return item;
      });
    } else if (teacherid.userType === Constants.TEACHER_USER) {
      state.treeData = classList;
    } else {
      state.treeData.map(item => {
        if (item.org_id[0] === state.selectedSchoolId) {
          item.children.map(chitem => {
            if (chitem.full_name === state.selectedGradeId) {
              chitem.children.map(ch1item => {
                const newch1item = ch1item;
                if (ch1item.user_id[0] === teacherid.teacherId[0]) {
                  newch1item.children = classList;
                  newch1item.toggled = true;
                }
                return ch1item;
              });
            }
            return chitem;
          });
        }
        return item;
      });
    }

    yield put(Actions.getTeacherDataRequestSuccess(state.treeData));
    yield put(Actions.setPortfolioSelectedTeacherId(teacherid.teacherId[0]));
  } catch (err) {
    yield put(Actions.getTeacherDataRequestSuccess([]));
  }
}

export function* getStudentSubmissionMetaData(data) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const classId = data.classId[0];
    const messageObj = '<>';
    const getStudentSubmissionData = yield call(
      Request.getStudentSubmissionDataRequest,
      sessionId,
      userId,
      classId,
      messageObj
    );
    if (getStudentSubmissionData.output_data[0].workItemsMetadata[0] !== '') {
      const studentSubmissionList = getStudentSubmissionData.output_data[0].workItemsMetadata[0].workItemMetadata.map(
        item => ({
          id: item.$.studentId,
          studentId: item.$.studentId,
          date: item.$.dateSubmitted,
          student: `${item.$.studentLastName}, ${item.$.studentFirstName}`,
          assignment: item.$.assignment,
          from: item.$.from,
          community_id: item.$.communityId,
          communityId: item.$.communityId,
          workItemId: item.$.workItemId,
          graded: item.$.graded ? 'true' : 'false',
          kind: item.$.kind,
        })
      );
      // if (studentSubmissionList.length > 0) {
      yield put(Actions.setStudentRequestSuccess(studentSubmissionList));
      // }
    } else {
      yield put(Actions.setStudentRequestSuccess([]));
    }
  } catch (err) {
    yield put(Actions.setStudentRequestSuccess([]));
  }
}

export function* getStudentSubmissionTreeData(classId) {
  const state = yield select(schoolList());
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const messageObj = '<>';
    const getstudentlistData = yield call(
      Request.getPortfolioStudentTreeData,
      sessionId,
      classId,
      messageObj
    );
    const studentList = getstudentlistData.output_data[0].students[0].student.map(item => ({
      name: `${item.student_last_name[0]}, ${item.student_first_name[0]}`,
      student_id: item.student_id[0],
    }));
    if (classId.adminType === Constants.ORG_SCHOOL) {
      state.treeData.map(chitem => {
        if (chitem.full_name === state.selectedGradeId) {
          chitem.children.map(ch1item => {
            if (ch1item.user_id[0] === state.selectedTeacherId) {
              ch1item.children.map(ch2item => {
                const newch2item = ch2item;
                if (ch2item.class_id[0] === classId.data[0]) {
                  newch2item.children = studentList;
                  newch2item.toggled = true;
                }
                return ch2item;
              });
            }
            return ch1item;
          });
        }
        return chitem;
      });
    } else if (classId.userType === Constants.TEACHER_USER) {
      state.treeData.map(item => {
        const newitem = item;
        if (item.class_id[0] === classId.data[0]) {
          newitem.children = studentList;
          if (newitem.toggled === undefined || newitem.toggled === false) {
            newitem.toggled = true;
          } else {
            newitem.toggled = false;
          }
        }
        return item;
      });
    } else {
      state.treeData.map(item => {
        if (item.org_id[0] === state.selectedSchoolId) {
          item.children.map(chitem => {
            if (chitem.full_name === state.selectedGradeId) {
              chitem.children.map(ch1item => {
                if (ch1item.user_id[0] === state.selectedTeacherId) {
                  ch1item.children.map(ch2item => {
                    const newch2Item = ch2item;
                    if (ch2item.class_id[0] === classId.data[0]) {
                      newch2Item.children = studentList;
                      if (newch2Item.toggled === undefined || newch2Item.toggled === false) {
                        newch2Item.toggled = true;
                      } else {
                        newch2Item.toggled = false;
                      }
                    }
                    return ch2item;
                  });
                }
                return ch1item;
              });
            }
            return chitem;
          });
        }
        return item;
      });
    }
    yield put(Actions.getTeacherDataRequestSuccess(state.treeData));
  } catch (err) {
    yield put(Actions.getTeacherDataRequestSuccess([]));
  }
}

export function* getStudentSubmissionNodeData(data) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const studentId = data.data;
    const messageObj = '<>';
    const getStudentNodeData = yield call(
      Request.getStudentSubmissionNodeRequest,
      sessionId,
      userId,
      studentId,
      messageObj
    );
    if (getStudentNodeData.output_data[0].workItemsMetadata[0] !== '') {
      const studentSubmissionList = getStudentNodeData.output_data[0].workItemsMetadata[0].workItemMetadata.map(
        item => ({
          id: item.$.studentId,
          date: item.$.dateSubmitted,
          student: `${item.$.studentLastName}, ${item.$.studentFirstName}`,
          assignment: item.$.assignment,
          from: item.$.from,
          graded: item.$.graded ? 'true' : 'false',
          community_id: item.$.communityId,
          communityId: item.$.communityId,
          workItemId: item.$.workItemId,
        })
      );
      // if (studentSubmissionList.length > 0) {
      yield put(Actions.setStudentRequestSuccess(studentSubmissionList));
      // }
    } else {
      yield put(Actions.setStudentRequestSuccess([]));
    }
  } catch (err) {
    yield put(Actions.setStudentRequestSuccess([]));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(Constants.GET_SCHOOL_DATA, getSchoolDataRequest),
    takeLatest(Constants.GET_GRADE_DATA, getGradeDataRequest),
    takeLatest(Constants.GET_TEACHERS_DATA, getTeacherDataRequest),
    takeLatest(Constants.GET_PORTFOLIO_CLASS_DATA, getPortfolioClassDataRequest),
    takeLatest(Constants.GET_STUDENT_SUBMISSION_META_DATA_SW, getStudentSubmissionMetaData),
    takeLatest(Constants.GET_PORTFOLIO_STUDENT_ENROLMENT_TREE_DATA, getStudentSubmissionTreeData),
    takeLatest(Constants.SET_PORTFOLIO_STUDENT_NODE_LIST, getStudentSubmissionNodeData),
  ]);
}
