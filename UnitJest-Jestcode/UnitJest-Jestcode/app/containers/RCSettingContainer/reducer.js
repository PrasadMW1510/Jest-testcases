/*
 *
 * RCSettingContainer reducer
 *
 */

import { fromJS } from 'immutable';

import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  loading: false,
  immSettings: {},
  // TODO: Redefine this object for second tab, when working on it
  /* topicManager: {
    installedStages: [],
    selectedStage: '',
    topics: [],
  }, */
});

function rcSettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.RC_SETTINGS_CONTAINER:
    case SmartBarConstants.SCHOOL_SELECTION_SUCCESS:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return initialState.set('loading', true);
    case Constants.RC_SETTINGS_CONTAINER_SUCCESS:
      return state.set('loading', false);
    case Constants.RC_GET_SETTINGS_SUCCESS:
      return state.set('immSettings', fromJS(action.settings));
    case Constants.RC_SETTINGS_SAVE:
      return state.set('loading', true);
    // TODO: Redefine following action handlers for second tab, when working on it
    /* case Constants.RC_GET_INSTALL_STAGES_SUCCESS:
      return state.setIn(['topicManager', 'installedStages'], fromJS(action.installStages));
    case Constants.RC_SET_SELECTED_STAGE:
      return state
        .setIn(['topicManager', 'selectedStage'], fromJS(action.selectedStage))
        .set('loading', true);
    case Constants.RC_GET_TOPICS_SUCCESS:
      return state.setIn(['topicManager', 'topics'], fromJS(action.topics)).set('loading', false); */
    default:
      return state;
  }
}

export default rcSettingContainerReducer;
