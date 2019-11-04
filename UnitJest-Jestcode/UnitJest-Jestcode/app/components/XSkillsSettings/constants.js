import { CHECKBOX_STATE } from 'components/SettingsFourStateCheckbox/constants';

export const TAB_SETTINGS = {
  id: 'tab-settings',
  label: 'xSkills Settings',
};

export const TAB_TEST_ASSIGNMENT = {
  id: 'tab-test-assignment',
  label: 'xSkills Test Assignment',
};

export const INVALID_COHORT_MESSAGE =
  'To change xSkills tests settings, please select a teacher, class, group, or student from the SmartBar on the left.';

export const SETTINGS_COMING_SOON = 'Expert 21 Settings coming soon';

export const XSKILLS_COURSES = {
  XT_I: 'C1',
  XT_II: 'C2',
  XT_III: 'C3',
};

export const XSKILLS_PDF_PATH = '/xt/extensions/sample_pdfs/';

export const XSKILLS_SETTINGS_CHECKBOX_STATUS_MAP = {
  [CHECKBOX_STATE.UncheckedDisabled]: [],
  [CHECKBOX_STATE.UncheckedEnabled]: ['0'],
  [CHECKBOX_STATE.CheckedDisabled]: [],
  [CHECKBOX_STATE.CheckedEnabled]: ['1'],
  [CHECKBOX_STATE.MixedDisabled]: [],
  [CHECKBOX_STATE.MixedEnabled]: ['-2'],
};

// program settings that XSkills has
export const XSKILLS_SETTINGS_TEST_EXPERIENCE_VALUES = [
  { apiProperty: 'audio_instructions', label: 'Include audio directions' },
  { apiProperty: 'show_correct_incorrect', label: 'Show correct and incorrect answers' },
  { apiProperty: 'include_open_response', label: 'Include constructed response' },
  { apiProperty: 'include_writing_prompts', label: 'Include extended constructed response' },
];
