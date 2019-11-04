// Individual exports for testing
/**
 * fetch all installed stages of r180ng program setting
 */
import { getUrl, postUrl } from 'utils/request';
import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
import {
  makeSelectProfileSessionId,
  makeSelectProfileUserType,
  makeSelectLoginUserOrg,
  makeSelectProfileUserOrgId,
} from 'containers/App/selectors';
import {
  makeSelectSmartBarContainer,
  makeSelectEffectiveCohortObject,
} from 'containers/SmartBarContainer/selectors';
import * as R180Action from 'containers/R180NGSettingContainer/actions';
import * as R180Request from 'containers/R180NGSettingContainer/request';
import * as Actions from './actions';
import * as Request from './request';
import * as Constants from './constants';
import * as SmartBarConstants from '../SmartBarContainer/constants';

export function* r180NGTopicsRequestFlow(action) {
  try {
    let stageId = '';
    let url = null;
    const sessionId = yield select(makeSelectProfileSessionId());
    const userOrgType = yield select(makeSelectLoginUserOrg());
    if (typeof action.r180ngTopics !== 'undefined') stageId = action.r180ngTopics;
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const userId = yield select(makeSelectProfileUserOrgId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    let schoolId = smartBarSelections.getIn(['selectedSchoolId']);
    const cohortType = cohortObj.cohortType;
    const cohortId = cohortObj.id;
    if (userOrgType === 'School') {
      schoolId = userId;
    }
    switch (cohortType) {
      case COHORT_TYPE.District:
      case COHORT_TYPE.School: {
        url = `/r180ng/r180ngProductCtrls?command=get_district_topics&sid=${sessionId}&stage_id=${stageId}`;
        break;
      }
      case COHORT_TYPE.Grade: {
        url = `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${sessionId}&stage_id=${stageId}&cohort_type=${cohortType.toLowerCase()}&cohort_id=${cohortId}&school_id=${schoolId}`;
        break;
      }
      case COHORT_TYPE.Class:
      case COHORT_TYPE.Teacher:
      case COHORT_TYPE.Group: {
        url = `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${sessionId}&stage_id=${stageId}&cohort_type=${cohortType}&cohort_id=${cohortId}`;
        break;
      }
      case COHORT_TYPE.Student: {
        const programSetting = yield call(
          R180Request.getGroupSettingsR180NG,
          sessionId,
          cohortId,
          cohortType
        );
        yield put(R180Action.updateR180NGSettingRequestSuccess(programSetting));
        url = `/r180ng/r180ngProductCtrls?command=get_student_topics&sid=${sessionId}&stage_id=${stageId}&user_id=${cohortId}`;
        break;
      }
      default:
        url = `/r180ng/r180ngProductCtrls?command=get_district_topics&sid=${sessionId}&stage_id=${stageId}`;
        // scenario unexpected
        break;
    }
    const topics = yield call(getUrl, url);
    yield put(Actions.updateR180NGTopicsSelectedStageRequestSuccess(stageId));
    yield put(Actions.R180NGTopicsRequestSuccess(topics));
  } catch (err) {
    yield put(Actions.R180NGTopicsRequestFailure(err));
  }
}

export function* r180ngTopicInstalledStagesFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());
    const installedStages = yield call(Request.geInstalledStagesR180NG, sessionId);
    yield put(Actions.R180NGTopicsInstalledStagesRequestSuccess(installedStages));
  } catch (err) {
    yield put(Actions.R180NGTopicsInstalledStagesRequestFailure(err));
  }
}

export function* r180ngTopicsSaveRequestFlow(action) {
  try {
    let url = null;
    let data = null;
    const sessionId = yield select(makeSelectProfileSessionId());
    const userType = yield select(makeSelectProfileUserType());
    const userOrgType = yield select(makeSelectLoginUserOrg());
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const userId = yield select(makeSelectProfileUserOrgId());
    const smartBarSelections = yield select(makeSelectSmartBarContainer());
    let schoolId = smartBarSelections.getIn(['activeSchoolId']);
    const cohortType = cohortObj.cohortType;
    const cohortId = cohortObj.id;
    if (userOrgType === 'School') {
      schoolId = userId;
    }
    let skipTopicObj = '';
    if (cohortType === COHORT_TYPE.Student) {
      if (action.r180ngTopics.skipTopic) {
        skipTopicObj = {
          topic_cd: {
            enable: '1',
            completed: '1',
            manual_advance: '1',
            cd_name: action.r180ngTopics.currentTopicID && action.r180ngTopics.currentTopicID,
            cd_segment: '0',
            level: action.r180ngTopics.skipData.skipLevel && action.r180ngTopics.skipData.skipLevel,
          },
        };
      }
      if (action.r180ngTopics.skipSegment) {
        skipTopicObj = {
          topic_cd: {
            enable: '1',
            completed: 0,
            manual_advance: '1',
            cd_name: action.r180ngTopics.currentTopicID && action.r180ngTopics.currentTopicID,
            cd_segment: action.r180ngTopics.skipsSegmentData.skippedSegmentId,
            level:
              action.r180ngTopics.skipsSegmentData.skipLevel &&
              action.r180ngTopics.skipsSegmentData.skipLevel,
          },
        };
      }
      const studentObj =
        action.r180ngTopics &&
        action.r180ngTopics.r180ngTopicsObj.topic_cd.map(coldata => ({
          topic_cd: {
            enable: coldata.enable && coldata.enable[0],
            completed: '0',
            manual_advance: '0',
            cd_name: coldata.cd_name && coldata.cd_name[0],
            cd_segment: coldata.current_segment && coldata.current_segment[0],
            level: action.r180ngTopics.r180ngTopicsObj.student_level[0],
          },
        }));
      if (action.r180ngTopics.skipTopic) {
        studentObj.push(skipTopicObj);
      }
      if (action.r180ngTopics.skipSegment) {
        studentObj.push(skipTopicObj);
      }
      url = `/r180ng/r180ngProductCtrls?command=set_student_topics&sid=${sessionId}`;
      data = {
        output: {
          output_data: {
            user_id: cohortId,
            topic_cds: [studentObj],
          },
        },
      };
    } else {
      const r180ngTopicObj =
        action.r180ngTopics &&
        action.r180ngTopics.r180ngTopicsObj.topic_cd.map(coldata => ({
          topic_cd: {
            enable: coldata.enable && coldata.enable[0],
            cd_name: coldata.cd_name && coldata.cd_name[0],
          },
        }));

      if (
        userType === USER_TYPE.Administrator ||
        userType === USER_TYPE.Tech ||
        cohortType === COHORT_TYPE.School ||
        cohortType === COHORT_TYPE.District ||
        cohortType === ''
      ) {
        url = `/r180ng/r180ngProductCtrls?command=set_district_topics&sid=${sessionId}`;
        data = {
          output: {
            output_data: { topic_cds: [r180ngTopicObj] },
          },
        };
      }
      switch (cohortType) {
        case COHORT_TYPE.Group:
        case COHORT_TYPE.Grade:
        case COHORT_TYPE.Teacher:
        case COHORT_TYPE.Class:
          url = `/r180ng/r180ngProductCtrls?command=set_group_topics&sid=${sessionId}`;
          data = {
            output: {
              output_data: {
                cohort_type: cohortType.toLowerCase(),
                cohort_id: cohortId,
                topic_cds: [r180ngTopicObj],
              },
            },
          };
          break;
        default:
          // this option will not be selected in given scenario
          break;
      }
    }
    yield call(postUrl, url, data);
    yield put(Actions.R180NGTopicsSaveRequestSuccess());
    let stageId = '';
    if (action.r180ngTopics.activeStage) stageId = action.r180ngTopics.activeStage;
    switch (cohortType) {
      case COHORT_TYPE.School: {
        url = `/r180ng/r180ngProductCtrls?command=get_district_topics&sid=${sessionId}&stage_id=${stageId}`;
        break;
      }
      case COHORT_TYPE.Grade: {
        url = `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${sessionId}&stage_id=${stageId}&cohort_type=${cohortType}&cohort_id=${cohortId}&school_id=${schoolId}`;
        break;
      }
      case COHORT_TYPE.Class:
      case COHORT_TYPE.Teacher:
      case COHORT_TYPE.Group: {
        url = `/r180ng/r180ngProductCtrls?command=get_group_topics&sid=${sessionId}&stage_id=${stageId}&cohort_type=${cohortType}&cohort_id=${cohortId}`;
        break;
      }
      case COHORT_TYPE.Student: {
        url = `/r180ng/r180ngProductCtrls?command=get_student_topics&sid=${sessionId}&user_id=${cohortId}&stage_id=''`;
        break;
      }
      default: {
        // todo
        url = `/r180ng/r180ngProductCtrls?command=get_district_topics&sid=${sessionId}&stage_id=${stageId}`;
        break;
      }
    }
    const topics = yield call(getUrl, url);
    yield put(Actions.updateR180NGTopicsRequestSuccess(topics));
  } catch (err) {
    yield put(Actions.R180NGTopicsSaveRequestFailure(err));
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(
      [
        Constants.R180NG_TOPICS_REQUEST,
        SmartBarConstants.CLASS_SELECTION_SUCCESS,
        SmartBarConstants.GRADE_SELECTION_SUCCESS,
        SmartBarConstants.GROUP_SELECTION_SUCCESS,
        SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
        SmartBarConstants.STUDENT_SELECTION_SUCCESS,
        SmartBarConstants.TEACHER_SELECTION_SUCCESS,
      ],
      r180NGTopicsRequestFlow
    ),
    takeLatest(Constants.R180NG_TOPICS_INSTALLED_STAGES_REQUEST, r180ngTopicInstalledStagesFlow),
    takeLatest(Constants.R180NG_TOPICS_SAVE_REQUEST, r180ngTopicsSaveRequestFlow),
  ]);
}
