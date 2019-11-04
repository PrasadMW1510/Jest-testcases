import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { COHORT_TYPE } from 'containers/App/constants';
import { genericNonSLMSGetAPICall, genericNonSLMSPostAPICall } from 'containers/App/request';
import { makeSelectProfileSessionId } from 'containers/App/selectors';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import { makeSelectEffectiveCohortObject } from 'containers/SmartBarContainer/selectors';

import * as Actions from './actions';
import * as Constants from './constants';
import * as Selectors from './selectors';

// ------ Helper functions -----
const createSettingsGetUrlObj = (cohortObj, sid) => {
  const { cohortType } = cohortObj;
  const cohortTypeParam = cohortType !== COHORT_TYPE.Group ? cohortType : COHORT_TYPE.Class;

  const urlObj = {
    url: Constants.R180EE_SETTINGS_URL,
    params: {
      command: Constants.R180EE_SETTINGS_URL_GET_COMMAND,
      sid,
      cohort_type: cohortTypeParam.toLowerCase(),
      cohort_id: cohortObj.id,
    },
  };

  if (cohortType === COHORT_TYPE.Grade) {
    urlObj.params.school_id = cohortObj.schoolId;
  }

  return urlObj;
};

const createSettingPostUrlObj = sid => ({
  url: Constants.R180EE_SETTINGS_URL,
  params: {
    command: Constants.R180EE_SETTINGS_URL_SET_COMMAND,
    sid,
  },
});

const createSettingsPayloadObj = (cohortObj, settingsData) => ({
  output: {
    output_data: {
      cohort_type: cohortObj.cohortType.toUpperCase(),
      cohort_id: cohortObj.id,
      school_id: cohortObj.schoolId,
      group_settings: {
        auto_level: settingsData.auto_level[0],
        computer_placement: settingsData.computer_placement[0],
        reading_speed: settingsData.reading_speed[0],
        captioning: settingsData.captioning[0],
        student_level: settingsData.student_level[0],
        second_language_id: settingsData.second_language_id[0],
        pronunciation_tip: settingsData.pronunciation_tip[0],
        alt_color_scheme: settingsData.alt_color_scheme[0],
        button_rollover: settingsData.button_rollover[0],
      },
    },
  },
});

const createTopicsGetUrlObj = (cohortObj, sid, stageId) => {
  switch (cohortObj.cohortType) {
    case COHORT_TYPE.District:
    case COHORT_TYPE.School: {
      return {
        url: Constants.R180EE_SETTINGS_URL,
        params: {
          command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.District,
          sid,
          stage_id: stageId,
        },
      };
    }
    case COHORT_TYPE.Grade: {
      return {
        url: Constants.R180EE_SETTINGS_URL,
        params: {
          command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.Group,
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
        url: Constants.R180EE_SETTINGS_URL,
        params: {
          command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.Student,
          sid,
          cohort_type: cohortObj.cohortType.toLowerCase(),
          user_id: cohortObj.id,
          stage_id: stageId,
        },
      };
    }
    default:
      return {
        url: Constants.R180EE_SETTINGS_URL,
        params: {
          command: Constants.R180EE_SETTINGS_URL_TOPIC_COMMAND.Group,
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

  let command = null;
  switch (cohortType) {
    case COHORT_TYPE.District:
    case COHORT_TYPE.School:
      command = Constants.R180EE_SETTINGS_URL_SET_TOPIC_COMMAND.District;
      break;
    case COHORT_TYPE.Student:
      command = Constants.R180EE_SETTINGS_URL_SET_TOPIC_COMMAND.Student;
      break;
    default:
      command = Constants.R180EE_SETTINGS_URL_SET_TOPIC_COMMAND.Group;
      break;
  }

  return {
    url: Constants.R180EE_SETTINGS_URL,
    params: {
      command,
      sid,
    },
  };
};

const createTopicsPayloadObj = (cohortObj, topicData) => {
  const { cohortType } = cohortObj;

  let topicObj = {
    output: {
      output_data: {
        cohort_type: cohortType.toUpperCase(),
        cohort_id: cohortObj.id,
        topic_cds: [],
      },
    },
  };

  switch (cohortType) {
    case COHORT_TYPE.District:
    case COHORT_TYPE.School:
      topicObj.output.output_data.topic_cds = [
        topicData.map(topic => ({
          topic_cd: {
            enable: topic.enable[0],
            cd_name: topic.cd_name[0],
          },
        })),
      ];
      break;
    case COHORT_TYPE.Student:
      topicObj = {
        output: {
          output_data: {
            user_id: cohortObj.id,
            topic_cds: [
              topicData.map(topic => ({
                topic_cd: { ...topic },
              })),
            ],
          },
        },
      };
      break;
    default:
      topicObj.output.output_data.topic_cds = [
        topicData.map(topic => ({
          topic_cd: {
            enable: topic.enable[0],
            cd_name: topic.cd_name[0],
            globally_enabled: topic.globally_enabled[0],
          },
        })),
      ];
      break;
  }

  return topicObj;
};

// ------ Saga flows -----
export function* r180EESettingsContainerFlow() {
  try {
    yield all([
      call(r180EEProgramSettingsFlow),
      call(r180EEInstallStagesFlow),
      call(r180EETopicsFlow),
    ]);

    yield put(Actions.r180EESettingsContainerSuccess());
  } catch (e) {
    yield put(Actions.r180EESettingsContainerFailure(e));
  }
}

export function* r180EEProgramSettingsFlow() {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());

    // We dont need to make the server call if the cohort type is District or School
    if (
      cohortObj.cohortType === COHORT_TYPE.District ||
      cohortObj.cohortType === COHORT_TYPE.School
    ) {
      return yield put(Actions.r180EEGetSettingsSuccess());
    }

    const sessionId = yield select(makeSelectProfileSessionId());
    const urlObj = createSettingsGetUrlObj(cohortObj, sessionId);

    const output = yield call(genericNonSLMSGetAPICall, urlObj.url, urlObj.params);
    const outputData = output.output.output_data[0];

    // Cohorts without data the output_data is empty string
    const settings = outputData === '' ? {} : outputData.group_settings[0];

    return yield put(Actions.r180EEGetSettingsSuccess(settings));
  } catch (e) {
    return yield put(Actions.r180EEGetSettingsFailure(e));
  }
}

export function* r180EEProgramSettingsSaveFlow(action) {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());

    const urlObj = createSettingPostUrlObj(sessionId);
    const payloadData = createSettingsPayloadObj(cohortObj, action.settingsData);

    yield call(genericNonSLMSPostAPICall, urlObj.url, urlObj.params, payloadData);

    yield put(Actions.r180EESettingsSaveSuccess());

    // We want to refresh the settings data after saving the settings.
    yield put(Actions.r180EESettingsContainerRequest());
  } catch (e) {
    yield put(Actions.r180EESettingsSaveFailure(e));
  }
}

export function* r180EEInstallStagesFlow() {
  try {
    const sessionId = yield select(makeSelectProfileSessionId());

    const params = {
      command: Constants.R180EE_SETTINGS_URL_INSTALL_STAGES_COMMAND,
      sid: sessionId,
    };

    const output = yield call(genericNonSLMSGetAPICall, Constants.R180EE_SETTINGS_URL, params);
    const outputData = output.output.output_data[0].installed_stages[0].stage;

    yield put(Actions.r180EEGetInstallStagesSuccess(outputData));
  } catch (e) {
    yield put(Actions.r180EEGetInstallStagesFailure(e));
  }
}

export function* r180EETopicsFlow() {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());
    const stageId = yield select(Selectors.getSelectedStage());

    const urlObj = createTopicsGetUrlObj(cohortObj, sessionId, stageId);

    const output = yield call(genericNonSLMSGetAPICall, urlObj.url, urlObj.params);

    let outputData = [];
    // when there is a cohort with no students enrolled output_data is empty string
    if (output.output.output_data[0] !== '') {
      if (cohortObj.cohortType !== COHORT_TYPE.Student) {
        outputData = output.output.output_data[0].topic_cds[0].topic_cd;
      } else {
        outputData = output.output.output_data[0].topic_cds[0];
      }
    }

    yield put(Actions.r180EEGetTopicsSuccess(outputData));
  } catch (e) {
    yield put(Actions.r180EEGetTopicsFailure(e));
  }
}

export function* r180EETopicsSaveFlow(action) {
  try {
    const cohortObj = yield select(makeSelectEffectiveCohortObject());
    const sessionId = yield select(makeSelectProfileSessionId());

    const urlObj = createTopicsPostUrlObj(cohortObj, sessionId);
    const payloadData = createTopicsPayloadObj(cohortObj, action.topicData);

    yield call(genericNonSLMSPostAPICall, urlObj.url, urlObj.params, payloadData);

    yield put(Actions.r180EETopicSaveSuccess());

    // We want to refresh the settings data after saving the topics.
    yield put(Actions.r180EESettingsContainerRequest());
  } catch (e) {
    yield put(Actions.r180EETopicSaveFailure(e));
  }
}

const getSettingsConstants = [
  Constants.R180EE_SETTINGS_CONTAINER,
  SmartBarConstants.SCHOOL_SELECTION_SUCCESS,
  SmartBarConstants.GRADE_SELECTION_SUCCESS,
  SmartBarConstants.TEACHER_SELECTION_SUCCESS,
  SmartBarConstants.CLASS_SELECTION_SUCCESS,
  SmartBarConstants.GROUP_SELECTION_SUCCESS,
  SmartBarConstants.STUDENT_SELECTION_SUCCESS,
];

export default function* defaultSaga() {
  yield all([
    takeLatest(getSettingsConstants, r180EESettingsContainerFlow),
    takeLatest(Constants.R180EE_SETTINGS_SAVE, r180EEProgramSettingsSaveFlow),
    takeLatest(Constants.R180EE_SET_SELECTED_STAGE, r180EETopicsFlow),
    takeLatest(Constants.R180EE_TOPIC_SAVE, r180EETopicsSaveFlow),
  ]);
}
