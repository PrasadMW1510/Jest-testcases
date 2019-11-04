/*
 *
 * xSkillsSettingContainer reducer
 *
 */
import { fromJS } from 'immutable';
import {
  XSKILLS_SETTINGS_LOADING,
  XSKILLS_SETTINGS_REQUEST,
  XSKILLS_SETTINGS_REQUEST_SUCCESS,
  XSKILLS_TEST_ASSIGNMENT_LOADING,
  XSKILLS_TEST_ASSIGNMENT_REQUEST,
  XSKILLS_TEST_ASSIGNMENT_REQUEST_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  settings: {},
  testsMeta: {},
  loadingSettings: false,
  loadingTestAssignment: false,
});

function xSkillsSettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case XSKILLS_SETTINGS_LOADING:
      return state.set('loadingSettings', true);
    case XSKILLS_SETTINGS_REQUEST:
      return state.set('loadingSettings', true);
    case XSKILLS_SETTINGS_REQUEST_SUCCESS:
      return state.set('settings', fromJS(action.settings)).set('loadingSettings', false);
    case XSKILLS_TEST_ASSIGNMENT_LOADING:
      return state.set('loadingTestAssignment', true);
    case XSKILLS_TEST_ASSIGNMENT_REQUEST:
      return state.set('loadingTestAssignment', true);
    case XSKILLS_TEST_ASSIGNMENT_REQUEST_SUCCESS:
      return state
        .set('testsMeta', fromJS(action.testAssignmentMeta))
        .set('loadingTestAssignment', false);
    default:
      return state;
  }
}

export default xSkillsSettingContainerReducer;
