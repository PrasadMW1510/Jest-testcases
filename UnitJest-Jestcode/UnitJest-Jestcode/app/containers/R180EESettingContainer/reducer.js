/*
 *
 * R180EESettingContainer reducer
 *
 */

import { fromJS } from 'immutable';

import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  loading: false,
  settings: {},
  topicManager: {
    installedStages: [],
    selectedStage: '',
    topics: [],
  },
});

function r180EESettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.R180EE_SETTINGS_CONTAINER:
    case SmartBarConstants.SCHOOL_SELECTION_SUCCESS:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return initialState.set('loading', true);
    case Constants.R180EE_SETTINGS_CONTAINER_SUCCESS:
      return state.set('loading', false);
    case Constants.R180EE_GET_SETTINGS_SUCCESS:
      return state.set('settings', fromJS(action.settings));
    case Constants.R180EE_GET_INSTALL_STAGES_SUCCESS:
      return state.setIn(['topicManager', 'installedStages'], fromJS(action.installStages));
    case Constants.R180EE_SET_SELECTED_STAGE:
      return state
        .setIn(['topicManager', 'selectedStage'], fromJS(action.selectedStage))
        .set('loading', true);
    case Constants.R180EE_GET_TOPICS_SUCCESS:
      return state.setIn(['topicManager', 'topics'], fromJS(action.topics)).set('loading', false);
    case Constants.R180EE_SETTINGS_SAVE:
    case Constants.R180EE_TOPIC_SAVE:
      return state.set('loading', true);
    default:
      return state;
  }
}

export default r180EESettingContainerReducer;
