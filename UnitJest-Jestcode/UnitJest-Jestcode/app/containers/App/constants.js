/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// API related Action constants
export const LOGIN_REQUEST = 'login_request';
export const LOGIN_REQUEST_SUCCESS = 'login_request_success';
export const LOGIN_CREDENTIALS_SAVE = 'login_credentials_save';
export const LOGIN_REQUEST_FAILURE = 'login_request_failure';

export const SSO_LOGIN = 'sso_login';
export const LOCAL_RELOGIN = 'local_relogin';

export const LOGOUT_REQUEST = 'logout_request';
export const LOGOUT_REQUEST_SUCCESS = 'logout_request_success';
export const LOGOUT_REQUEST_FAILURE = 'logout_request_failure';

export const PASSWORD_HINT_REQUEST = 'password_hint_request';
export const PASSWORD_HINT_REQUEST_SUCCESS = 'password_hint_request_success';
export const PASSWORD_HINT_REQUEST_FAILURE = 'password_hint_request_failure';

export const CLASS_LIST_REQUEST = 'class_list_request';
export const CLASS_LIST_REQUEST_SUCCESS = 'class_list_request_success';
export const CLASS_LIST_REQUEST_FAILURE = 'class_list_request_failure';

export const PROFILE_REQUEST = 'profile_request';
export const PROFILE_REQUEST_SUCCESS = 'profile_request_success';
export const PROFILE_REQUEST_FAILURE = 'profile_request_failure';

export const STUDENT_LIST_REQUEST = 'student_list_request';
export const STUDENT_LIST_REQUEST_SUCCESS = 'student_list_request_success';
export const STUDENT_LIST_REQUEST_FAILURE = 'student_list_request_failure';

export const SCHOOL_LIST_REQUEST = 'school_list_request';
export const SCHOOL_LIST_REQUEST_SUCCESS = 'school_list_request_success';
export const SCHOOL_LIST_REQUEST_FAILURE = 'school_list_request_failure';

export const SCHOOL_USER_LOGIN_FLOW_REQUEST = 'school_list_request';
export const SCHOOL_USER_LOGIN_FLOW_REQUEST_SUCCESS = 'school_list_request_success';
export const SCHOOL_USER_LOGIN_FLOW_REQUEST_FAILURE = 'school_list_request_failure';

export const GROUP_LIST_REQUEST = 'group_list_request';
export const GROUP_LIST_REQUEST_SUCCESS = 'group_list_request_success';
export const GROUP_LIST_REQUEST_FAILURE = 'group_list_request_failure';

export const GRADE_LIST_REQUEST = 'grade_list_request';
export const GRADE_LIST_REQUEST_SUCCESS = 'grade_list_request_success';
export const GRADE_LIST_REQUEST_FAILURE = 'grade_list_request_failure';

export const TEACHER_LIST_REQUEST = 'teacher_list_request';
export const TEACHER_LIST_REQUEST_SUCCESS = 'teacher_list_request_success';
export const TEACHER_LIST_REQUEST_FAILURE = 'teacher_list_request_failure';

export const UPDATE_SCHOOL_DATA = 'update_school_data';
export const UPDATE_SCHOOL_DATA_SUCCESS = 'update_school_data_success';
export const UPDATE_SCHOOL_DATA_SUCCESS_TEACHER = 'update_school_data_success_teacher';
export const UPDATE_SCHOOL_DATA_FAILURE = 'update_school_data_failure';
export const UPDATE_SCHOOL_ADMIN_DATA_SUCCESS = 'update_school_admin_data_success';

export const UPDATE_CLASS_DATA = 'update_class_data';
export const UPDATE_CLASS_DATA_SUCCESS = 'update_class_data_success';
export const UPDATE_CLASS_DATA_FAILURE = 'update_class_data_failure';

export const UPDATE_USER_DATA = 'update_user_data';
export const UPDATE_USER_DATA_SUCCESS = 'update_user_data_success';
export const UPDATE_USER_DATA_FAILURE = 'update_user_data_failure';

export const UPDATE_GROUP_DATA = 'update_group_data';
export const UPDATE_GROUP_DATA_SUCCESS = 'update_group_data_success';
export const UPDATE_GROUP_DATA_FAILURE = 'update_group_data_failure';

export const UPDATE_STUDENT_DATA = 'update_student_data';
export const UPDATE_STUDENT_DATA_SUCCESS = 'update_student_data_success';
export const UPDATE_STUDENT_DATA_FAILURE = 'update_student_data_failure';

export const UPDATE_TEACHER_DATA = 'update_teacher_data';
export const UPDATE_TEACHER_DATA_SUCCESS = 'update_teacher_data_success';
export const UPDATE_TEACHER_DATA_FAILURE = 'update_teacher_data_failure';

export const UPDATE_GRADE_DATA = 'update_grade_data';
export const UPDATE_GRADE_DATA_SUCCESS = 'update_grade_data_success';
export const UPDATE_GRADE_DATA_FAILURE = 'update_grade_data_failure';

export const UPDATE_PROFILE_SCHOOL_DATA_SUCCESS = 'update_profile_school_data_success';
export const UPDATE_PROFILE_GRADE_DATA_SUCCESS = 'update_profile_grade_data_success';
export const UPDATE_PROFILE_TEACHER_DATA_SUCCESS = 'update_profile_teacher_data_success';
export const UPDATE_PROFILE_CLASS_DATA_SUCCESS = 'update_profile_class_data_success';
export const UPDATE_PROFILE_GROUP_DATA_SUCCESS = 'update_profile_group_data_success';
export const UPDATE_PROFILE_STUDENT_DATA_SUCCESS = 'update_profile_student_data_success';
export const UPDATE_PROFILE_PAGE_DATA_FAILURE = 'update_profile_page_data_failure';

export const UPDATE_SMART_BAR_EXPAND_COLLAPSE_STATUS = 'update_smart_bar_expand_collapse_status';
export const UPDATE_SMART_BAR_EXPAND_COLLAPSE_FAILURE = 'update_smart_bar_expand_collapse_failure';

// TODO: Convert all user type literals in the app to use this constant
export const USER_TYPE = {
  Administrator: 'Administrator',
  Student: 'Student',
  Teacher: 'Teacher',
  Tech: 'Tech',
};

export const SLMS_DATE_FORMAT = 'MM/DD/YYYY';

export const USER_ORG = {
  District: 'District',
  School: 'School',
};

export const COHORT_TYPE = {
  Class: 'Class',
  District: 'District',
  Grade: 'Grade',
  School: 'School',
  Student: 'Student',
  Group: 'Group',
  Teacher: 'Teacher',
};

export const PASSWORD_TYPES = {
  Complex: 'Complex',
  Medium: 'Medium',
  Simple: 'Simple',
};

export const PROGRAM_AVAILABLE_DATA = 'program_available_data';
export const PROGRAM_AVAILABLE_REQUEST_SUCCESS = 'program_available_request_success';
export const PROGRAM_AVAILABLE_REQUEST_FAILURE = 'program_available_request_failure';

export const USAGE_SUMMARY_REQUEST = 'usage_summary_request';
export const USAGE_SUMMARY_REQUEST_SUCCESS = 'usage_summary_request_success';
export const USAGE_SUMMARY_REQUEST_FAILURE = 'usage_summary_request_failure';

export const GENERAL_FAILURE = 'general_failure';

export const PERMISSION_REQUEST = 'permission_request';
export const PERMISSION_REQUEST_SUCCESS = 'permission_request_success';
export const PERMISSION_REQUEST_FAILURE = 'permission_request_failure';

export const UPDATE_PROFILE_REQUEST_SUCCESS = 'update_profile_request_success';

export const PASSWORD_CONFIG_REQUEST_SUCCESS = 'password_config_request_success';

export const SCHOOLS_AND_CLASSES_REQUEST_SUCCESS = 'schools_and_classes_request_success';

export const PROGRAM_LIST = {
  CDX: {
    code: 'CDX',
    name: 'Common Core Code X',
  },
  DTM: {
    code: 'DTM',
    name: 'Progress Space',
  },
  DTM2: {
    code: 'DTM2',
    name: 'Do The Math',
  },
  E3D: {
    code: 'E3D',
    name: 'English 3D',
  },
  FAD: {
    code: 'FAD',
    name: 'Fraction Nation',
  },
  FM: {
    code: 'FM',
    name: 'FASTT Math',
  },
  FMNG: {
    code: 'FMNG',
    name: 'FASTT Math Next Generation',
  },
  M180: {
    code: 'M180',
    name: 'MATH 180 Course I',
  },
  M180Y2: {
    code: 'M180Y2',
    name: 'MATH 180 Course II',
  },
  R180: {
    code: 'R180',
    name: 'READ 180 Enterprise Edition',
  },
  R180NG: {
    code: 'R180NG',
    name: 'READ 180 Next Generation',
  },
  R180U: {
    code: 'R180U',
    name: 'READ 180 Universal',
  },
  RT: {
    code: 'RT',
    name: 'rSkills Tests Enterprise Edition',
  },
  RTNG: {
    code: 'RTNG',
    name: 'rSkills Tests: College & Career',
  },
  S44: {
    code: 'S44',
    name: 'System 44',
  },
  S44JR: {
    code: 'S44JR',
    name: 'iRead',
  },
  S44NG: {
    code: 'S44NG',
    name: 'System 44 NG',
  },
  SMI: {
    code: 'SMI',
    name: 'Math Inventory',
  },
  SPI: {
    code: 'SPI',
    name: 'Phonics Inventory',
  },
  SRC: {
    code: 'SRC',
    name: 'Reading Counts!',
  },
  SRI: {
    code: 'SRI',
    name: 'Reading Inventory',
  },
  XT: {
    code: 'XT',
    name: 'Expert 21',
  },
};
