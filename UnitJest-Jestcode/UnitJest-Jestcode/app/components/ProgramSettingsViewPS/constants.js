import { CHECKBOX_STATE } from 'components/SettingsFourStateCheckbox/constants';

export const DEFAULT_SETTINGS = {
  audio_instructions: ['1'],
  student_access_to_score: ['1'],
  include_sample_questions: ['1'],
  ell_audio_instructions: ['0'],
};
export const PROGRESS_SPACE_STATUS_MAP = {
  [CHECKBOX_STATE.UncheckedDisabled]: [],
  [CHECKBOX_STATE.UncheckedEnabled]: ['0'],
  [CHECKBOX_STATE.CheckedDisabled]: [],
  [CHECKBOX_STATE.CheckedEnabled]: ['1'],
  [CHECKBOX_STATE.MixedDisabled]: [],
  [CHECKBOX_STATE.MixedEnabled]: ['-1'],
};
