/*
 *
 * R180NgtopicContainer reducer
 *
 */

import { fromJS } from 'immutable';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  loading: false,
  r180ngTopics: [],
  r180ngTopicsInstalledStages: [],
  r180ngActiveSelectedStage: '',
});

function r180NGTopicContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.R180NG_TOPICS_REQUEST:
    case SmartBarConstants.SCHOOL_SELECTION_SUCCESS:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return initialState.set('loading', true);
    case Constants.R180NG_TOPICS_REQUEST_SUCCESS:
      return state
        .set(
          'r180ngTopics',
          fromJS(
            action.r180ngTopics.output.output_data[0] === ''
              ? {}
              : action.r180ngTopics.output.output_data[0].topic_cds[0]
          )
        )
        .set('loading', false);
    case Constants.R180NG_TOPICS_INSTALLED_STAGES_REQUEST_SUCCESS:
      return state.set('r180ngTopicsInstalledStages', fromJS(action.r180ngTopicsInstalledStages));
    case Constants.UPDATE_R180NG_TOPICS_REQUEST_SUCCESS:
      return state
        .set(
          'r180ngTopics',
          fromJS(
            action.r180ngTopics.output.output_data[0] === ''
              ? {}
              : action.r180ngTopics.output.output_data[0].topic_cds[0]
          )
        )
        .set('loading', false);
    case Constants.UPDATE_R180NG_TOPICS_STAGE_SELECTED_REQUEST_SUCCESS:
      return state.set('r180ngActiveSelectedStage', action.activeStage);
    case Constants.R180NG_TOPICS_REQUEST_FAILURE:
      return state.set('error', action.error);
    case Constants.R180NG_TOPICS_SAVE_REQUEST:
      return state.set('loading', true);
    case Constants.R180NG_TOPICS_SAVE_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default r180NGTopicContainerReducer;
