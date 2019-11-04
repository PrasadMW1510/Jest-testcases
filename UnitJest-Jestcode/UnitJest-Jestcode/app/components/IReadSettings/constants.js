import { fromJS } from 'immutable';

export const TAB_SETTINGS = {
  id: 'tab-settings',
  label: 'Settings',
};

export const ENROLLMENT_COUNT_ERROR_MESSAGE_ADMIN =
  'To change iRead settings, please select a class, group, or student from the SmartBar on the left.';
export const ENROLLMENT_COUNT_ERROR_MESSAGE_CLASS =
  'This class does not have any students enrolled in iRead.';
export const ENROLLMENT_COUNT_ERROR_MESSAGE_GROUP =
  'This group does not have any students enrolled in iRead.';
export const ENROLLMENT_COUNT_ERROR_MESSAGE_STUDENT = 'This student is not enrolled in iRead.';

export const IREAD_DEFAULT_SETTINGS = fromJS({
  allow_recordings_flag: ['1'],
  new_administration_flag: ['0'],
  second_language_id: ['0'],
});
