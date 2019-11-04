/*
 *
 * RSkillsCCSettingContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  RSKILLSCC_SETTINGS_CONTAINER_LOADING,
  RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST,
  RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_SUCCESS,
  RSKILLSCC_DEFAULT_SETTINGS_REQUEST,
  RSKILLSCC_DEFAULT_SETTINGS_REQUEST_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  stages: [],
  loading: false,
  programSettings: {},
  defaultProgramSettings: {},
  defaultProgramSettingsLoading: false,
});

function rSkillsCCSettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST:
      return state.set('loading', true);
    case RSKILLSCC_SETTINGS_CONTAINER_LOADING:
      return state.set('loading', true);
    case RSKILLSCC_SETTINGS_TEST_ASSIGNMENT_REQUEST_SUCCESS:
      return state
        .set('stages', fromJS(action.testAssignmentMeta.stages))
        .set('programSettings', fromJS(action.programSettings))
        .set('loading', false);
    case RSKILLSCC_DEFAULT_SETTINGS_REQUEST:
      return state
        .set('defaultProgramSettings', fromJS({}))
        .set('defaultProgramSettingsLoading', true);
    case RSKILLSCC_DEFAULT_SETTINGS_REQUEST_SUCCESS:
      return state
        .set('defaultProgramSettings', fromJS(action.defaultProgramSettings))
        .set('defaultProgramSettingsLoading', false);
    default:
      return state;
  }
}

export default rSkillsCCSettingContainerReducer;
