import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import { COHORT_TYPE, USER_TYPE, USER_ORG } from 'containers/App/constants';
import {
  makeSelectProfileSessionId,
  makeSelectProfileUserId,
  makeSelectProfileUserType,
  makeSelectLoginUserOrg,
  makeSelectProfileUserOrgId,
} from 'containers/App/selectors';
import { makeSelectSmartBarContainer } from 'containers/SmartBarContainer/selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Request from './request';
import * as SmartBarConstants from '../SmartBarContainer/constants';

export function* r180NGProgramSettingsEnrollmentRequestFlow() {
  try {
    let enrollmentCount = null;
    let cohortId = null;
    let schoolId = null;
    const sessionId = yield select(makeSelectProfileSessionId());
    const userOrgType = yield select(makeSelectLoginUserOrg());
    const userOrgId = yield select(makeSelectProfileUserOrgId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const userId = yield select(makeSelectProfileUserId());
    const userType = yield select(makeSelectProfileUserType());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    if (userType === USER_TYPE.Teacher) {
      switch (cohortType) {
        case COHORT_TYPE.Class:
          cohortId = smartBarSelections.getIn(['selectedClassId']);
          enrollmentCount = yield call(Request.getEnrollmentCountClass, sessionId, cohortId);
          break;
        case COHORT_TYPE.Group:
          cohortId = smartBarSelections.getIn(['selectedGroupId']);
          enrollmentCount = yield call(Request.getEnrollmentCountGroup, sessionId, cohortId);
          break;
        case COHORT_TYPE.Student:
          cohortId = smartBarSelections.getIn(['selectedStudentId']);
          enrollmentCount = yield call(Request.getEnrollmentCountStudent, sessionId, cohortId);
          break;
        default:
          enrollmentCount = yield call(Request.getEnrollmentCountTeacher, sessionId, userId);
          break;
      }
    } else {
      switch (cohortType) {
        case COHORT_TYPE.Teacher:
          cohortId = smartBarSelections.getIn(['selectedTeacherId']);
          enrollmentCount = yield call(Request.getEnrollmentCountTeacher, sessionId, cohortId);
          break;
        case COHORT_TYPE.Grade:
          if (userOrgType === USER_ORG.School) {
            schoolId = userOrgId;
          } else {
            schoolId = smartBarSelections.getIn(['selectedSchoolId']);
          }
          cohortId = smartBarSelections.getIn(['selectedGradeId']);

          enrollmentCount = yield call(
            Request.getEnrollmentCountGrade,
            sessionId,
            schoolId,
            cohortId
          );
          break;
        case COHORT_TYPE.Class:
          cohortId = smartBarSelections.getIn(['selectedClassId']);
          enrollmentCount = yield call(Request.getEnrollmentCountClass, sessionId, cohortId);
          break;
        case COHORT_TYPE.Group:
          cohortId = smartBarSelections.getIn(['selectedGroupId']);
          enrollmentCount = yield call(Request.getEnrollmentCountGroup, sessionId, cohortId);
          break;
        case COHORT_TYPE.Student:
          cohortId = smartBarSelections.getIn(['selectedStudentId']);
          enrollmentCount = yield call(Request.getEnrollmentCountStudent, sessionId, cohortId);
          break;
        default:
          // enrollmentCount = 'admin';
          enrollmentCount = yield call(Request.getEnrollmentCountDistrict, sessionId, userOrgId);
          break;
      }
    }
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(enrollmentCount));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err));
  }
}

/**
 * Teacher selection from smart bar
 * @param action
 */
export function* enrollmentCountR180NGTeacherRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    const enrollmentCount = yield call(
      Request.getEnrollmentCountTeacher,
      sessionId,
      action.teacherId
    );
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(enrollmentCount));
    const programSetting = yield call(
      Request.getGroupSettingsR180NG,
      sessionId,
      action.teacherId,
      cohortType
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err));
  }
}

/**
 * smart bar selection Teacher for R180NG Setting
 * @param action
 */
export function* programSettingsR180NGSettingsTeacherRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);

    const programSetting = yield call(
      Request.getGroupSettingsR180NG,
      sessionId,
      action.teacherId,
      cohortType
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsRequestFailure(err));
  }
}

/**
 * smart bar selection Teacher for R180NG Setting
 * @param action
 */
export function* programSettingsR180NGSettingsGroupRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);

    const programSetting = yield call(
      Request.getGroupSettingsR180NG,
      sessionId,
      action.groupId,
      cohortType
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsRequestFailure(err));
  }
}
/**
 * smart bar selection Class for R180NG Setting
 * @param action
 */
export function* programSettingsR180NGSettingsClassRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);

    const programSetting = yield call(
      Request.getGroupSettingsR180NG,
      sessionId,
      action.classId,
      cohortType
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsRequestFailure(err));
  }
}

/**
 * smart bar selection Class for R180NG Setting
 * @param action
 */
export function* programSettingsR180NGSettingsGradeRequestFlow(action, schoolId) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    const programSetting = yield call(
      Request.getGradeSettingsR180NG,
      sessionId,
      action.gradeId,
      cohortType,
      schoolId
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsRequestFailure(err));
  }
}

/**
 * smart bar selection Student for R180NG Setting
 * @param action
 */
export function* programSettingsR180NGSettingsStudentRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);

    const programSetting = yield call(
      Request.getGroupSettingsR180NG,
      sessionId,
      action.studentId,
      cohortType
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsRequestFailure(err));
  }
}
/**
 * School selection from smart bar
 * @param action
 */
export function* enrollmentCountR180NGSchoolRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const enrollmentCount = yield call(
      Request.getEnrollmentCountSchool,
      sessionId,
      action.schoolId
    );
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(enrollmentCount));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err));
  }
}

/**
 * Group selection from smart bar
 * @param action
 */
export function* enrollmentCountR180NGGroupRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    const enrollmentCount = yield call(Request.getEnrollmentCountGroup, sessionId, action.groupId);

    yield put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(enrollmentCount));

    const programSetting = yield call(
      Request.getGroupSettingsR180NG,
      sessionId,
      action.groupId,
      cohortType
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err));
  }
}

/**
 * Teacher selection from smart bar
 * @param action
 * @param school
 */
export function* enrollmentCountR180NGGradeRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const userOrgType = yield select(makeSelectLoginUserOrg());
    const userOrgId = yield select(makeSelectProfileUserOrgId());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    let schoolSelection = null;
    if (userOrgType === USER_ORG.School) {
      schoolSelection = userOrgId;
    } else {
      schoolSelection = smartBarSelections.getIn(['selectedSchoolId']);
    }
    const enrollmentCount = yield call(
      Request.getEnrollmentCountGrade,
      sessionId,
      schoolSelection,
      action.gradeId
    );
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(enrollmentCount));

    const programSetting = yield call(
      Request.getGradeSettingsR180NG,
      sessionId,
      action.gradeId,
      cohortType,
      schoolSelection
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err));
  }
}

/**
 * Teacher selection from smart bar
 * @param action
 */

export function* enrollmentCountR180NGClassRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);
    const enrollmentCount = yield call(Request.getEnrollmentCountClass, sessionId, action.classId);
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(enrollmentCount));
    const getSettings = yield call(
      Request.getGroupSettingsR180NG,
      sessionId,
      action.classId,
      cohortType
    );
    yield put(Actions.R180NGProgramSettingsRequestSuccess(getSettings));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err));
  }
}

/**
 * Student selection from smart bar
 * @param action
 */
export function* enrollmentCountR180NGStudentRequestFlow(action) {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const enrollmentCount = yield call(
      Request.getEnrollmentCountStudent,
      sessionId,
      action.studentId
    );
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestSuccess(enrollmentCount));
    const cohortType = smartBarSelections.getIn(['selectedCohType']);

    const programSetting = yield call(
      Request.getGroupSettingsR180NG,
      sessionId,
      action.studentId,
      cohortType
    );

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsEnrollmentRequestFailure(err));
  }
}

export function* r180NGProgramSettingsRequestFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const userId = yield select(makeSelectProfileUserId());
    const userType = yield select(makeSelectProfileUserType());
    const userOrgType = yield select(makeSelectLoginUserOrg());
    const userOrgId = yield select(makeSelectProfileUserOrgId());
    let programSetting = null;
    if (userType === USER_TYPE.Teacher) {
      const smartBarSelections = yield select(makeSelectSmartBarContainer());
      const cohortType = smartBarSelections.getIn(['selectedCohType']);
      switch (cohortType) {
        case COHORT_TYPE.Class:
          programSetting = yield call(
            Request.getGroupSettingsR180NG,
            sessionId,
            smartBarSelections.getIn(['selectedClassId']),
            cohortType
          );
          break;
        case COHORT_TYPE.Group:
          programSetting = yield call(
            Request.getGroupSettingsR180NG,
            sessionId,
            smartBarSelections.getIn(['selectedGroupId']),
            cohortType
          );
          break;
        case COHORT_TYPE.Student:
          programSetting = yield call(
            Request.getGroupSettingsR180NG,
            sessionId,
            smartBarSelections.getIn(['selectedStudentId']),
            cohortType
          );
          break;
        default:
          programSetting = yield call(Request.getGroupSettingsR180NG, sessionId, userId, userType);
          break;
      }
    } else {
      const smartBarSelections = yield select(makeSelectSmartBarContainer());
      const cohortType = smartBarSelections.getIn(['selectedCohType']);

      switch (cohortType) {
        case COHORT_TYPE.Teacher:
          programSetting = yield call(
            Request.getGroupSettingsR180NG,
            sessionId,
            smartBarSelections.getIn(['selectedTeacherId']),
            cohortType
          );
          break;
        case COHORT_TYPE.Grade:
          if (userOrgType === USER_ORG.School) {
            programSetting = yield call(
              Request.getGradeSettingsR180NG,
              sessionId,
              smartBarSelections.getIn(['selectedGradeId']),
              cohortType,
              userOrgId
            );
          } else {
            programSetting = yield call(
              Request.getGradeSettingsR180NG,
              sessionId,
              smartBarSelections.getIn(['selectedGradeId']),
              cohortType,
              smartBarSelections.getIn(['selectedSchoolId'])
            );
          }
          break;
        case COHORT_TYPE.Class:
          programSetting = yield call(
            Request.getGroupSettingsR180NG,
            sessionId,
            smartBarSelections.getIn(['selectedClassId']),
            cohortType
          );
          break;
        case COHORT_TYPE.Group:
          programSetting = yield call(
            Request.getGroupSettingsR180NG,
            sessionId,
            smartBarSelections.getIn(['selectedGroupId']),
            cohortType
          );
          break;
        case COHORT_TYPE.Student:
          programSetting = yield call(
            Request.getGroupSettingsR180NG,
            sessionId,
            smartBarSelections.getIn(['selectedStudentId']),
            cohortType
          );
          break;
        default:
          // TODO: look at school admins
          programSetting = 'admin';
          break;
      }
    }

    yield put(Actions.R180NGProgramSettingsRequestSuccess(programSetting));
  } catch (err) {
    yield put(Actions.R180NGProgramSettingsRequestFailure(err));
  }
}

export function* R180NGSaveRequestFlow(action) {
  try {
    const userType = yield select(makeSelectProfileUserType());
    const sessionId = yield select(makeSelectProfileSessionId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    const userOrgType = yield select(makeSelectLoginUserOrg());
    const userOrgId = yield select(makeSelectProfileUserOrgId());
    const cohortType = smartBarSelections.getIn(['selectedCohType']);

    let userId = null;
    switch (cohortType) {
      case COHORT_TYPE.Student:
        userId = smartBarSelections.getIn(['selectedStudentId']);
        break;
      case COHORT_TYPE.Teacher:
        userId = smartBarSelections.getIn(['selectedTeacherId']);
        break;
      case COHORT_TYPE.Class:
        userId = smartBarSelections.getIn(['selectedClassId']);
        break;
      case COHORT_TYPE.Group:
        userId = smartBarSelections.getIn(['selectedGroupId']);
        break;
      case COHORT_TYPE.Grade:
        userId = smartBarSelections.getIn(['selectedGradeId']);
        break;
      default:
        userId = yield select(makeSelectProfileUserId());
        break;
    }

    const settings = action.programsSettingChanged;
    const groupSettings = {
      auto_level: settings.auto_level[0],
      computer_placement: settings.computer_placement[0],
      writing_zone_enabled: settings.writing_zone_enabled[0],
      writing_zone_frequency: settings.writing_zone_frequency[0],
      ereads_enabled: settings.ereads_enabled[0],
      match_ereads_level_to_sw_reading_level: settings.match_ereads_level_to_sw_reading_level[0],
      ereads_level: settings.ereads_level[0],
      reading_speed: settings.reading_speed[0],
      captioning: settings.captioning[0],
      student_level: settings.student_level[0],
      second_language_id: settings.second_language_id[0],
      pronunciation_tip: settings.pronunciation_tip[0],
      alt_color_scheme: settings.alt_color_scheme[0],
      button_rollover: settings.button_rollover[0],
    };
    let r180NGObj = null;
    switch (userType) {
      case USER_TYPE.Teacher:
        r180NGObj = {
          output: {
            output_data: {
              cohort_type:
                cohortType === '' ? USER_TYPE.Teacher.toUpperCase() : cohortType.toUpperCase(),
              cohort_id: userId,
              group_settings: groupSettings,
            },
          },
        };
        break;
      case USER_TYPE.Tech:
      case USER_TYPE.Administrator:
        switch (userOrgType) {
          case USER_ORG.District:
            r180NGObj = {
              output: {
                output_data: {
                  cohort_type: cohortType.toUpperCase(),
                  cohort_id: userId,
                  school_id: smartBarSelections.getIn(['selectedSchoolId']),
                  group_settings: groupSettings,
                },
              },
            };
            break;
          case USER_ORG.School:
            r180NGObj = {
              output: {
                output_data: {
                  cohort_type: cohortType.toUpperCase(),
                  cohort_id: userId,
                  school_id: userOrgId,
                  group_settings: groupSettings,
                },
              },
            };
            break;
          default:
            break;
        }
        break;
      default:
        // TODO: This will be changed when adding support for new user types
        throw new Error('User Type not supported yet');
    }
    yield call(Request.postChangeSettingsR180NG, sessionId, r180NGObj);
    yield put(Actions.R180NGSaveRequestSuccess());
    let getSettings = '';
    if (cohortType === COHORT_TYPE.Grade) {
      getSettings = yield call(
        Request.getGradeSettingsR180NG,
        sessionId,
        userId,
        cohortType,
        smartBarSelections.getIn(['selectedSchoolId'])
      );
    } else {
      getSettings = yield call(Request.getGroupSettingsR180NG, sessionId, userId, cohortType);
    }
    yield put(Actions.updateR180NGSettingRequestSuccess(getSettings));
  } catch (err) {
    yield put(Actions.R180NGSaveRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(SmartBarConstants.SCHOOL_SELECTION_SUCCESS, enrollmentCountR180NGSchoolRequestFlow),
    takeLatest(SmartBarConstants.GRADE_SELECTION_SUCCESS, enrollmentCountR180NGGradeRequestFlow),
    takeLatest(
      SmartBarConstants.TEACHER_SELECTION_SUCCESS,
      enrollmentCountR180NGTeacherRequestFlow
    ),
    takeLatest(SmartBarConstants.CLASS_SELECTION_SUCCESS, enrollmentCountR180NGClassRequestFlow),
    takeLatest(SmartBarConstants.GROUP_SELECTION_SUCCESS, enrollmentCountR180NGGroupRequestFlow),
    takeLatest(
      SmartBarConstants.STUDENT_SELECTION_SUCCESS,
      enrollmentCountR180NGStudentRequestFlow
    ),
    takeLatest(Constants.R180NG_PROGRAM_SETTINGS_REQUEST, r180NGProgramSettingsRequestFlow),
    takeLatest(
      Constants.R180NG_PROGRAM_SETTINGS_ENROLLMENT_REQUEST,
      r180NGProgramSettingsEnrollmentRequestFlow
    ),
    takeLatest(Constants.R180NG_SAVE_REQUEST, R180NGSaveRequestFlow),
  ]);
}
