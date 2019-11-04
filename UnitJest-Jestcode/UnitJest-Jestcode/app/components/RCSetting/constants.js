import { CHECKBOX_STATE } from 'components/SettingsFourStateCheckbox/constants';

export const TAB_SETTINGS = {
  id: 'tab-settings',
  label: 'Settings',
};

export const TAB_RESTRICT_QUIZZES = {
  id: 'tab-restrict-quizzes',
  label: 'Restrict Quizzes',
};

export const RC_SETTINGS_CHECKBOX_STATUS_MAP = {
  [CHECKBOX_STATE.UncheckedDisabled]: [],
  [CHECKBOX_STATE.UncheckedEnabled]: ['0'],
  [CHECKBOX_STATE.CheckedDisabled]: [],
  [CHECKBOX_STATE.CheckedEnabled]: ['1'],
  [CHECKBOX_STATE.MixedDisabled]: [],
  [CHECKBOX_STATE.MixedEnabled]: ['-1'],
};

export const INITIAL_FORM_VALUE = 'initial';

// the format of these object values' arrays are:
// [minimum, maxmimum, field description in error message (if outside range), value to revert to after error]
export const TEXT_FIELD_NUMERIC_RANGES = {
  Blue: [1, 999, 'Blue level of the Award Summary Project (in the Award Settings box)', ''],
  Bronze: [1, 999, 'Bronze level of the Award Summary Project (in the Award Settings box)', ''],
  DaysBetweenRetake: [0, 6, '"Retake days between quizzes" (in the Quiz Settings box)', '0'],
  Gold: [1, 999, 'Gold level of the Award Summary Project (in the Award Settings box)', ''],
  NumQuestionsPerEReads: [
    1,
    10,
    '"Number of questions per eReads Quiz" (in the Number of Questions per Quiz box)',
    '1',
  ],
  NumQuestionsPerQuiz: [
    1,
    30,
    '"Number of questions per quiz" (in the Number of Questions per Quiz box)',
    '',
  ],
  PercentRequired: [
    1,
    100,
    '"% required to pass a quiz" (in the Quiz Settings box)',
    INITIAL_FORM_VALUE,
  ],
  PointsMultiplier: [1, 99, '"Points Multipler" (in the Award Settings box)', ''],
  QuizAttemptsAllowed: [1, 6, '"Quiz attempts allowed" (in the Quiz Settings box)', ''],
  Red: [1, 999, 'Red level of the Award Summary Project (in the Award Settings box)', ''],
  Silver: [1, 999, 'Silver level of the Award Summary Project (in the Award Settings box)', ''],
  StudentGoal: [0, 9999, '"Goals" (in the Award Settings box)', '0'],
};

// TODO: Change text for any cohorts that are inapplicable for this product
export const INVALID_COHORT_MESSAGE =
  'To change Reading Counts settings, please select a grade, teacher, class, group, or student from the SmartBar on the left.';

// TODO: "under-construction" message for tabs in progress
export const COMING_SOON = 'This content will be coming soon';
