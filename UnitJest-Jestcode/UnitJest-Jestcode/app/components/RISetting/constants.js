/*
 *
 * RISetting constants
 *
 */

import { CHECKBOX_STATE } from 'components/SettingsFourStateCheckbox/constants';

export const TAB_SETTINGS = {
  id: 'tab-settings',
  label: 'Settings',
};

export const TAB_ADVANCED_SETTINGS = {
  id: 'tab-advanced-settings',
  label: 'Advanced Settings',
};

export const STARTING_GRADE_INDEX = 1;

export const TAB_ADVANCED_SETTINGS_EDITABLE_INSTRUCTIONS = `Use these options to customize proficiency band names and ranges. You may change the number \
    of bands and select a band as the target proficiency range using the pull-down menus below \
    the chart. The maximum Lexile setting is 1700. These settings may be adjusted at the \
    District level only.`;
export const TAB_ADVANCED_SETTINGS_READ_ONLY_INSTRUCTIONS =
  'These settings may be adjusted at the District level only.';

export const MINIMUM_TIME_BETWEEN_TESTS_BLANK_MESSAGE =
  'Please enter a number between 1 and 365 in the Minimum Time Between Completed Tests field.';
export const MINIMUM_TIME_BETWEEN_TESTS_OUT_OF_RANGE_MESSAGE =
  'Minimum time between tests may not exceed 365 days.';

export const ENROLLMENT_COUNT_ERROR_MESSAGE_TEACHER =
  'This teacher does not have any students enrolled in The Reading Inventory.';
export const INVALID_COHORT_MESSAGE =
  'To change The Reading Inventory settings, please select a school, grade, teacher, class, group, or student from the SmartBar on the left.';
export const ENROLLMENT_COUNT_ERROR_MESSAGE_CLASS =
  'This class does not have any students enrolled in The Reading Inventory.';
export const ENROLLMENT_COUNT_ERROR_MESSAGE_GRADE =
  'This grade does not have any students enrolled in The Reading Inventory.';
export const ENROLLMENT_COUNT_ERROR_MESSAGE_GROUP =
  'This group does not have any students enrolled in The Reading Inventory.';
export const ENROLLMENT_COUNT_ERROR_MESSAGE_STUDENT =
  'This student is not enrolled in The Reading Inventory.';

export const RI_SETTINGS_CHECKBOX_STATUS_MAP = {
  [CHECKBOX_STATE.UncheckedDisabled]: [],
  [CHECKBOX_STATE.UncheckedEnabled]: ['0'],
  [CHECKBOX_STATE.CheckedDisabled]: [],
  [CHECKBOX_STATE.CheckedEnabled]: ['1'],
  [CHECKBOX_STATE.MixedDisabled]: [],
  [CHECKBOX_STATE.MixedEnabled]: ['-1'],
};

export const TAB_SETTINGS_DEFAULT_VALUES = {
  allow_min_days_between_tests: ['1'],
  choose_reading_interests: ['1'],
  est_reading_level: ['1'],
  limit_reading_to_installed_quizzes: ['0'],
  max_books_in_reading_list: ['30'],
  min_days_between_tests: ['30'],
  require_practice_test: ['1'],
  see_reading_list: ['1'],
  show_lexile_after_test: ['1'],
};
