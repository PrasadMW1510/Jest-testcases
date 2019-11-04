/*
 *
 * SchoolForm constants
 *
 */

export const TAB_PROFILE = 'tab-profile';
export const TAB_CONTACT = 'tab-contact';
export const TAB_DEMOGRAPHICS = 'tab-demographics';

export const TITLE_1_STATUS_LIST = [
  { id: 'None', label: 'None' },
  { id: 'Title I', label: 'Title I' },
  { id: 'Title I School-Wide', label: 'Title I School-Wide' },
  { id: 'High Needs', label: 'High Needs' },
  { id: 'At-Risk', label: 'At-Risk' },
  { id: 'Focus Site', label: 'Focus Site' },
];

export const NUM_GRADING_PERIODS_LIST = [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
  { id: 5, label: '5' },
  { id: 6, label: '6' },
];

export const SCHOOL_TYPE_LIST = [
  { id: '0', label: 'Elementary School' },
  { id: '1', label: 'Junior High School' },
  { id: '2', label: 'Middle School' },
  { id: '3', label: 'High School' },
];

// Form Field Names
// *IMPORTANT*:  For any fields that have server-side validation, the values of these constants
// should match the names provided by the server in the error response.

export const FORM_FIELD_NAMES = {
  Grades: 'grades',
  GradingPeriodEnd: 'gradingPeriodEnd',
  GradingPeriodStart: 'gradingPeriodStart',
  NumberOfGradingPeriods: 'numGradingPeriods',
  SchoolContactAddressLine1: 'schoolContactAddressLine1',
  SchoolContactAddressLine2: 'schoolContactAddressLine2',
  SchoolContactAddressLine3: 'schoolContactAddressLine3',
  SchoolContactCity: 'schoolContactCity',
  SchoolContactEmail: 'schoolContactEmail',
  SchoolContactFirstName: 'schoolContactFirstName',
  SchoolContactLastName: 'schoolContactLastName',
  SchoolContactMiddleName: 'schoolContactMiddleName',
  SchoolContactPhoneNumber: 'schoolContactPhoneNumber',
  SchoolContactState: 'schoolContactState',
  SchoolContactTitle: 'schoolContactTitle',
  SchoolContactZip: 'schoolContactZip',
  SchoolName: 'name',
  SchoolNumber: 'schoolNumber',
  SchoolTypes: 'schoolTypes',
  SchoolYearEnd: 'schoolYearEnd',
  SchoolYearStart: 'schoolYearStart',
  Title1Status: 'title1Status',
};

export const VALIDATION_ERROR_DISPLAY_ORDER = [
  FORM_FIELD_NAMES.SchoolName,
  FORM_FIELD_NAMES.SchoolNumber,
  FORM_FIELD_NAMES.Grades,
  FORM_FIELD_NAMES.SchoolTypes,
  FORM_FIELD_NAMES.SchoolContactLastName,
  FORM_FIELD_NAMES.SchoolContactFirstName,
  FORM_FIELD_NAMES.SchoolContactEmail,
  FORM_FIELD_NAMES.SchoolContactAddressLine1,
  FORM_FIELD_NAMES.SchoolContactCity,
  FORM_FIELD_NAMES.SchoolContactState,
  FORM_FIELD_NAMES.SchoolContactZip,
  FORM_FIELD_NAMES.SchoolContactPhoneNumber,
];
