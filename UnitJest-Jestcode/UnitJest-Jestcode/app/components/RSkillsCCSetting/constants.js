import { CHECKBOX_STATE } from 'components/SettingsFourStateCheckbox/constants';

export const RSKILLSCC_SELECT_OTHER_COHORT =
  'Please select a teacher, class, group, or student from the SmartBar on the left.';
export const RSKILLSCC_SETTINGS_FUNCTIONALITY_TK = 'Under Construction settings functionality TK';
export const RSKILLSCC_TEST_ASSIGNMENT_FUNCTIONALITY_TK =
  'Under Construction test assignment functionality TK ';
export const TAB_TEST_ASSIGNMENT = 'tab-test-assignment';
export const TAB_TEST_ASSIGNMENT_LABEL = 'Test Assignment';

export const RSKILLSCC_SETTINGS_CHECKBOX_STATUS_MAP = {
  [CHECKBOX_STATE.UncheckedDisabled]: [],
  [CHECKBOX_STATE.UncheckedEnabled]: ['0'],
  [CHECKBOX_STATE.CheckedDisabled]: [],
  [CHECKBOX_STATE.CheckedEnabled]: ['1'],
  [CHECKBOX_STATE.MixedDisabled]: [],
  [CHECKBOX_STATE.MixedEnabled]: ['-2'],
};

export const RSKILLSCC_SETTING_GRADING_RUBRIC_FOUR_PT = 1;

export const RSKILLSCC_SETTING_GRADING_RUBRIC_SIX_PT = 0;
