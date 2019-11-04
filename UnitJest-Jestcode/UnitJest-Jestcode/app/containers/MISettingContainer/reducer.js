/*
 *
 * MISettingContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { TAB_SETTINGS, TAB_ADVANCED_SETTINGS } from 'components/MISetting/constants';
import * as SmartBarConstants from 'containers/SmartBarContainer/constants';
import * as Constants from './constants';

const initialState = fromJS({
  error: false,
  loading: false,
  proficiencyBandData: {},
  programSettingsObj: {},
});

function miSettingContainerReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.MI_PROGRAM_SETTINGS_REQUEST:
    case SmartBarConstants.GRADE_SELECTION_SUCCESS:
    case SmartBarConstants.TEACHER_SELECTION_SUCCESS:
    case SmartBarConstants.CLASS_SELECTION_SUCCESS:
    case SmartBarConstants.GROUP_SELECTION_SUCCESS:
    case SmartBarConstants.SCHOOL_SELECTION_SUCCESS:
    case SmartBarConstants.STUDENT_SELECTION_SUCCESS:
      return state
        .set('programSettingsObj', fromJS({}))
        .set('proficiencyBandData', fromJS({}))
        .set('loading', true);
    case Constants.MI_PROGRAM_SETTINGS_REQUEST_SUCCESS:
      return state
        .set('loading', false)
        .set('programSettingsObj', fromJS(action.programSetting))
        .set('proficiencyBandData', fromJS(action.proficiencyBandData));
    case Constants.MI_SAVE_REQUEST_SUCCESS: {
      let immFormProgramSettingsSaved = action.immFormProgramSettingsSaved;
      let stateKey = null;
      if (action.activeTabId === TAB_SETTINGS) {
        stateKey = 'programSettingsObj';
        immFormProgramSettingsSaved = fromJS(action.immFormProgramSettingsSaved);
      } else if (action.activeTabId === TAB_ADVANCED_SETTINGS) {
        stateKey = 'proficiencyBandData';
      } else {
        return state;
      }
      return state.set(stateKey, immFormProgramSettingsSaved);
    }
    case Constants.MI_PROGRAM_SETTINGS_REQUEST_FAILURE:
    case Constants.MI_SAVE_REQUEST_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default miSettingContainerReducer;
