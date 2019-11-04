/*
 *
 * FadsettingsContainer constants
 *
 */

export const TAB_SETTINGS = {
  id: 'tab-settings',
  label: 'Settings',
};

export const INIT_ASSMNT_PLACE = {
  TITLE: 'Initial Assessment And Placement',
  LABEL: 'Reset student(s) to initial assessment',
  ERROR:
    'This setting can be changed for individual students only.  If you wish to change this setting, please select a student from the SmartBar on the left.',
};

export const FINAL_ASSMNT = {
  TITLE: 'Final Assessment',
  LABEL: 'Require student(s) to retake final assessment',
  ERROR:
    'This setting is unavailable because none of the students in the selected cohort have taken the final assessment',
};

export const ERRORS = {
  COHORT:
    'To change Fraction Nation advanced settings, please select a teacher, class, group, or student from the SmartBar on the left.',
};

export const FAD_SET_SETTINGS_REQUEST = 'fad_set_settings_request';
export const FAD_SET_SETTINGS_SUCCESS = 'fad_set_settings_success';
export const FAD_SET_SETTINGS_FAILURE = 'fad_set_settings_failure';

export const FAD_GET_SETTINGS_REQUEST = 'fad_get_settings_request';
export const FAD_GET_SETTINGS_SUCCESS = 'fad_get_settings_success';
export const FAD_GET_SETTINGS_FAILURE = 'fad_get_settings_failure';
