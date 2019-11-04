import { fromJS } from 'immutable';
import { CHECKBOX_STATE } from 'components/SettingsFourStateCheckbox/constants';

export const CHECKBOXES = {
  computerPlacement: {
    id: 'computer_placement',
    text: 'Enable automatic placement based on initial Reading Inventory Lexile\u00AE',
  },
  autoLevel: {
    id: 'auto_level',
    text: 'Promote student to next level automatically',
  },
  captioning: {
    id: 'captioning',
    text: 'Enable captioning',
  },
  altColorScheme: {
    id: 'alt_color_scheme',
    text: 'Display with alternate color scheme',
  },
  buttonRollover: {
    id: 'button_rollover',
    text: 'Enable button rollover',
  },
  pronunciationTip: {
    id: 'pronunciation_tip',
    text: 'Pronunciation Tips (Spanish Only)',
  },
};

export const LANGUAGE_OPTIONS = [
  { id: '0', name: 'None' },
  { id: '1', name: 'Spanish' },
  { id: '2', name: 'Haitian Creole' },
  { id: '3', name: 'Cantonese' },
  { id: '4', name: 'Vietnamese' },
  { id: '5', name: 'Hmong' },
];

export const PRONUNCIATION_TIP_STATUS_MAP = {
  [CHECKBOX_STATE.UncheckedDisabled]: ['0'],
  [CHECKBOX_STATE.UncheckedEnabled]: [],
  [CHECKBOX_STATE.CheckedDisabled]: ['1'],
  [CHECKBOX_STATE.CheckedEnabled]: [],
  [CHECKBOX_STATE.MixedDisabled]: ['-2'],
  [CHECKBOX_STATE.MixedEnabled]: [],
};

export const RADIO = {
  secondLanguageId: {
    id: 'second_language_id',
  },
};

export const SELECTS = {
  studentLevel: {
    id: 'student_level',
    text: "Set student's next level to: ",
  },
  readingSpeed: {
    id: 'reading_speed',
    text: 'Set reading speed to: ',
  },
};

export const DEFAULT_SETTINGS = fromJS({
  [RADIO.secondLanguageId.id]: ['0'],
  [CHECKBOXES.pronunciationTip.id]: ['0'],
  [CHECKBOXES.captioning.id]: ['0'],
  [CHECKBOXES.altColorScheme.id]: ['0'],
  [CHECKBOXES.buttonRollover.id]: ['0'],
  [SELECTS.readingSpeed.id]: ['3'],
});
