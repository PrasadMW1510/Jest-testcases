import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import { makeSelectProfileSessionId } from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';

import * as Actions from './actions';
import * as Constants from './constants';

// ------ Helper functions -----
const createSettingsGetUrlObj = (cohortObj, sid) => {
  const { cohortType } = cohortObj;
  const urlObj = {
    url: Constants.RC_SETTINGS_URL,
    params: {
      cohort_id: cohortObj.id,
      cohort_type: cohortType.toUpperCase(),
      command: Constants.RC_SETTINGS_URL_GET_COMMAND,
      sid,
    },
  };
  if (cohortType === COHORT_TYPE.Grade) {
    urlObj.params.school_id = cohortObj.schoolId;
  }
  return urlObj;
};

const createSettingPostUrlObj = (cohortObj, sid) => {
  const { cohortType } = cohortObj;
  const urlObj = {
    url: Constants.RC_SETTINGS_URL,
    params: {
      cohort_id: cohortObj.id,
      cohort_type: cohortType.toUpperCase(),
      command: Constants.RC_SETTINGS_URL_SET_COMMAND,
      sid,
    },
  };
  if (cohortType === COHORT_TYPE.Grade) {
    urlObj.params.school_id = cohortObj.schoolId;
  }
  return urlObj;
};

const createSettingsPayloadObj = (cohortObj, immSettings) => {
  // filter out the default setting blocks of each of the 3 setting categories
  const immStudentSettings = immSettings
    .getIn(['StudentSettings', 0])
    .filter((val, key) => key !== 'StudentDefaults' && val.get(0).trim())
    .map(val => val.get(0));
  const immQuizSettings = immSettings
    .getIn(['QuizSettings', 0])
    .filter((val, key) => key !== 'QuizDefaults' && val.get(0).trim())
    .map(val => val.get(0));
  const immAwardSettings = immSettings
    .getIn(['AwardSettings', 0])
    .filter(
      (val, key) =>
        key !== 'AwardDefaults' &&
        key !== 'BookDefaults' &&
        key !== 'PointDefaults' &&
        val.get(0).trim()
    )
    .map(val => val.get(0));
  const payloadObj = {
    SetSettingsReq: {
      StudentSettings: immStudentSettings.toJS(),
      QuizSettings: immQuizSettings.toJS(),
      AwardSettings: immAwardSettings.toJS(),
    },
  };
  return payloadObj;
};

// TODO: The following set of methods all deal with a second tab.
// Uncomment when working second tab.

/* const createTopicsGetUrlObj = (cohortObj, sid, stageId) => {
  switch (cohortObj.cohortType) {
    case COHORT_TYPE.District:
    case COHORT_TYPE.School: {
      return {
        url: Constants.RC_SETTINGS_URL,
        params: {
          command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.District,
          sid,
          stage_id: stageId,
        },
      };
    }
    case COHORT_TYPE.Grade: {
      return {
        url: Constants.RC_SETTINGS_URL,
        params: {
          command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.Group,
          sid,
          cohort_type: cohortObj.cohortType.toLowerCase(),
          cohort_id: cohortObj.id,
          school_id: cohortObj.schoolId,
          stage_id: stageId,
        },
      };
    }
    case COHORT_TYPE.Student: {
      return {
        url: Constants.RC_SETTINGS_URL,
        params: {
          command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.Student,
          sid,
          cohort_type: cohortObj.cohortType.toLowerCase(),
          user_id: cohortObj.id,
          stage_id: stageId,
        },
      };
    }
    default:
      return {
        url: Constants.RC_SETTINGS_URL,
        params: {
          command: Constants.RC_SETTINGS_URL_TOPIC_COMMAND.Group,
          sid,
          cohort_type:
            cohortObj.cohortType !== COHORT_TYPE.Group
              ? cohortObj.cohortType.toLowerCase()
              : COHORT_TYPE.Class.toLowerCase(),
          cohort_id: cohortObj.id,
          stage_id: stageId,
        },
      };
  }
};

const createTopicsPostUrlObj = (cohortObj, sid) => {
  const { cohortType } = cohortObj;

  let command = Constants.RC_SETTINGS_URL_SET_TOPIC_COMMAND.Group;
  if (cohortType === COHORT_TYPE.District || cohortType === COHORT_TYPE.School) {
    command = Constants.RC_SETTINGS_URL_SET_TOPIC_COMMAND.District;
  }

  return {
    url: Constants.RC_SETTINGS_URL,
    params: {
      command,
      sid,
    },
  };
};

const createTopicsPayloadObj = (cohortObj, topicData) => {
  const { cohortType } = cohortObj;

  const topicObj = {
    output: {
      output_data: {
        cohort_type: cohortType.toUpperCase(),
        cohort_id: cohortObj.id,
        topic_cds: [],
      },
    },
  };

  if (cohortType === COHORT_TYPE.District || cohortType === COHORT_TYPE.School) {
    topicObj.output.output_data.topic_cds = [
      topicData.map(topic => ({
        topic_cd: {
          enable: topic.enable[0],
          cd_name: topic.cd_name[0],
        },
      })),
    ];
  } else {
    topicObj.output.output_data.topic_cds = [
      topicData.map(topic => ({
        topic_cd: {
          enable: topic.enable[0],
          cd_name: topic.cd_name[0],
          globally_enabled: topic.globally_enabled[0],
        },
      })),
    ];
  }

  return topicObj;
}; */

// ------ Saga flows -----
export function* rcSettingsContainerFlow() {
  try {
    // TODO: Uncomment and rename when working on second tab.
    yield all([
      call(rcProgramSettingsFlow),
      // call(rcInstallStagesFlow),
      // call(rcTopicsFlow)
    ]);
    yield put(Actions.rcSettingsContainerSuccess());
  } catch (e) {
    yield put(Actions.rcSettingsContainerFailure(e));
  }
}

export function* rcProgramSettingsFlow() {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());
    const urlObj = createSettingsGetUrlObj(cohortObj, sessionId);
    const output = yield call(genericNonSLMSGetAPICall, urlObj.url, urlObj.params);
    const outputData = output.output.output_data[0].GetSettingsResp[0];
    return yield put(Actions.rcGetSettingsSuccess(outputData));
  } catch (e) {
    return yield put(Actions.rcGetSettingsFailure(e));
  }
}

export function* rcProgramSettingsSaveFlow(action) {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());
    const urlObj = createSettingPostUrlObj(cohortObj, sessionId);
    const payloadData = createSettingsPayloadObj(cohortObj, action.immSettings);
    yield call(genericNonSLMSPostAPICall, urlObj.url, urlObj.params, payloadData);
    yield put(Actions.rcSettingsSaveSuccess(action.immSettings));
    // if the user sets a blank value for any text field, then after the save operation completes,
    // the form on-screen is supposed to update with the original value of that field from the DB;
    // therefore, we need to run another GET request here (after the save operation) to cover that case.
    if (action.shouldRedirect) {
      yield put(push('/roster'));
    } else {
      yield put(Actions.rcSettingsContainerRequest());
    }
  } catch (e) {
    yield put(Actions.rcSettingsSaveFailure(e));
  }
}

// TODO: The following sagas all deal with a second tab.
// Uncomment and edit when working on second tab.

/* export function* rcInstallStagesFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const params = {
      command: Constants.RC_SETTINGS_URL_INSTALL_STAGES_COMMAND,
      sid: sessionId,
    };

    const output = yield call(genericNonSLMSGetAPICall, Constants.RC_SETTINGS_URL, params);
    const outputData = output.output.output_data[0].installed_stages[0].stage;

    yield put(Actions.rcGetInstallStagesSuccess(outputData));
  } catch (e) {
    yield put(Actions.rcGetInstallStagesFailure(e));
  }
}

export function* rcTopicsFlow() {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());
    const stageId = yield select(Selectors.getSelectedStage());

    const urlObj = createTopicsGetUrlObj(cohortObj, sessionId, stageId);

    const output = yield call(genericNonSLMSGetAPICall, urlObj.url, urlObj.params);

    let outputData = [];
    // The work to get topic data for student is coming later
    // when there is a cohort with no students enrolled output_data is empty string
    if (cohortObj.cohortType !== COHORT_TYPE.Student && output.output.output_data[0] !== '') {
      outputData = output.output.output_data[0].topic_cds[0].topic_cd;
    }

    yield put(Actions.rcGetTopicsSuccess(outputData));
  } catch (e) {
    yield put(Actions.rcGetTopicsFailure(e));
  }
}

export function* rcTopicsSaveFlow(action) {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());

    const urlObj = createTopicsPostUrlObj(cohortObj, sessionId);
    const payloadData = createTopicsPayloadObj(cohortObj, action.topicData);

    yield call(genericNonSLMSPostAPICall, urlObj.url, urlObj.params, payloadData);

    yield put(Actions.rcTopicSaveSuccess());

    // We want to refresh the settings data after saving the topics.
    yield put(Actions.rcSettingsContainerRequest());
  } catch (e) {
    yield put(Actions.rcTopicSaveFailure(e));
  }
} */

const getSettingsConstants = [
  Constants.RC_SETTINGS_CONTAINER,
  SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
  SmartBarConstants.GRADE_SELECTION_SUCCESS,
  SmartBarConstants.TEACHER_SELECTION_SUCCESS,
  SmartBarConstants.CLASS_SELECTION_SUCCESS,
  SmartBarConstants.GROUP_SELECTION_SUCCESS,
  SmartBarConstants.STUDENT_SELECTION_SUCCESS,
];

export default function* defaultSaga() {
  // TODO: Uncomment and rename when working on second tab.
  yield all([
    takeLatest(getSettingsConstants, rcSettingsContainerFlow),
    takeLatest(Constants.RC_SETTINGS_SAVE, rcProgramSettingsSaveFlow),
    // takeLatest(Constants.RC_SET_SELECTED_STAGE, rcTopicsFlow),
    // takeLatest(Constants.RC_TOPIC_SAVE, rcTopicsSaveFlow),
  ]);
}
