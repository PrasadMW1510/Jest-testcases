import { COHORT_TYPE, USER_ORG, USER_TYPE } from 'containers/App/constants';

// Actions
export const GET_INACTIVE_COHORT_MEMBERS_REQUEST =
  'ManageInactiveAccounts/get_inactive_cohort_members_request';
export const GET_INACTIVE_COHORT_MEMBERS_REQUEST_SUCCESS =
  'ManageInactiveAccounts/get_inactive_cohort_members_request_success';
export const GET_INACTIVE_COHORT_MEMBERS_REQUEST_FAILURE =
  'ManageInactiveAccounts/get_inactive_cohort_members_request_failure';

// Binary image data
export const CHECKMARK_IMAGE_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyODU0NTk0N0ZDOTYxMUU3QUIzQjkwOEM2RUE1NzcyNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyODU0NTk0OEZDOTYxMUU3QUIzQjkwOEM2RUE1NzcyNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NTQ1OTQ1RkM5NjExRTdBQjNCOTA4QzZFQTU3NzI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4NTQ1OTQ2RkM5NjExRTdBQjNCOTA4QzZFQTU3NzI1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eRcH0gAAASxJREFUeNpi/P//PwMtARMDrQGVfaAJxAuBeDkQW4PNpqIFAUD8DuRmIC4DhQ41LeiCGgzCCSihQ6EFHNDg+I/kcgZqWcAHxAeQDJ+GNX7JtIAfiE8gGb4DW4ok1wJeID6KZPhjIBbHmUJJtAAU5oeQDP8HxE54swCSBcpA7E3AgmVIhoNwDcE8BrXACohvQzX1QF2KDvrQDN9JVCaGWgDy5mskzZeBWBdJbTaa4R+BWIUUC0DAA82Qr0CcAsRmQPwDTS6V6GIILZJb0Az6A8Sf0cQ2kVTOoVnAjJa+0TGorJGjxAIQ0AHiLzgsKCa5pMaRD9KxGH4ciBmpZQEIbEAy/C8Qm5NV1+CxAJQMP0EtmEh2ZUagqMiBpiIxWlkAKthcKamOGYd8qwIgwABICdj/4N1ZdQAAAABJRU5ErkJggg==';

// Dropdown placeholder
export const ACTION_SELECTION_CHOOSE_OPTION = 'SelectAnOption';

// dropdown options Student, Teacher, Class, School
export const ACCOUNT_DELETE_OPTION = 'Delete';
export const ASSIGN_TO_A_CLASS_OPTION = 'Assign to a Class';
export const ASSIGN_TO_A_DISTRICT_OPTION = 'Assign To a District';
export const ASSIGN_TO_A_SCHOOL_OPTION = 'Assign To a School';
export const UNENROLL = 'Unenroll';

export const CLASS_ASSIGN_DEFAULT_OPTION = '- Select an Option -';

// Field names used by react-table
export const TABLE_FIELDS = {
  DistrictUserId: 'districtUserId',
  Enrollment: 'enrollment',
  Grade: 'grade',
  Name: 'name',
  School: 'schoolName',
  SchoolId: 'schoolId',
  Status: 'status',
  StudentId: 'studentId',
  UserName: 'userName',
  UserID: 'user_id',
  OrgID: 'org_id',
  ClassId: 'class_id',
  FirstName: 'first_name',
  LastName: 'last_name',
};

// Numerics
export const ITEMS_PER_PAGE = 250;
export const UNINITIALIZED_ITEM_COUNT = -1;

export const MIA_OPTIONS = {
  [COHORT_TYPE.Class]: {
    Actions: [
      { label: 'Assign To a School', value: 'Assign To a School' },
      { label: 'Delete', value: 'Delete' },
    ],
    Columns: [
      {
        Header: 'Name',
        accessor: TABLE_FIELDS.Name,
        defaultSort: true,
        queryParam: 'name',
      },
      {
        Header: 'School',
        accessor: TABLE_FIELDS.School,
        queryParam: 'school_name',
      },
      {
        Header: 'Grades',
        accessor: TABLE_FIELDS.Grade,
        queryParam: 'grade',
      },
    ],
  },
  [COHORT_TYPE.School]: {
    Actions: [
      { label: 'Assign To a District', value: 'Assign To a District' },
      { label: 'Delete', value: 'Delete' },
    ],
    Columns: [
      {
        Header: 'Name',
        accessor: TABLE_FIELDS.Name,
        defaultSort: true,
        queryParam: 'name',
      },
      {
        Header: 'School ID',
        accessor: TABLE_FIELDS.SchoolId,
        queryParam: 'school_number',
      },
      {
        Header: 'Grades',
        accessor: TABLE_FIELDS.Grade,
        queryParam: 'grade',
      },
    ],
  },
  [COHORT_TYPE.Student]: {
    Actions: [
      { label: 'Assign To a Class', value: 'Assign To a Class' },
      { label: 'Delete', value: 'Delete' },
      { label: 'Unenroll', value: 'Unenroll' },
    ],
    Columns: [
      {
        Header: 'Name',
        accessor: TABLE_FIELDS.Name,
        defaultSort: true,
        queryParam: 'last_name',
        width: 200,
      },
      {
        Header: 'Student ID',
        accessor: TABLE_FIELDS.StudentId,
        queryParam: 'sis_id',
        width: 180,
      },
      {
        Header: 'Username',
        accessor: TABLE_FIELDS.UserName,
        queryParam: 'user_name',
        width: 180,
      },
      {
        Header: 'Status',
        accessor: TABLE_FIELDS.Status,
        queryParam: 'is_attached',
        width: 65,
      },
      {
        Header: 'Enrollment',
        accessor: TABLE_FIELDS.Enrollment,
        className: 'rt-td__enrollment',
        queryParam: 'is_enrolled',
      },
    ],
  },
  [COHORT_TYPE.Teacher]: {
    Actions: [
      { label: 'Assign To a Class', value: 'Assign To a Class' },
      { label: 'Delete', value: 'Delete' },
    ],
    Columns: [
      {
        Header: 'Teacher Name',
        accessor: TABLE_FIELDS.Name,
        queryParam: 'last_name',
        width: 200,
      },
      {
        Header: 'District User ID',
        accessor: TABLE_FIELDS.DistrictUserId,
        queryParam: 'district_user_id',
      },
      {
        Header: 'Username',
        accessor: TABLE_FIELDS.UserName,
        queryParam: 'user_name',
      },
      {
        Header: 'School',
        accessor: TABLE_FIELDS.School,
        queryParam: 'school_name',
      },
    ],
  },
};

export const USER_ORG_USER_TYPE_OPTIONS = {
  [USER_ORG.District]: {
    [USER_TYPE.Administrator]: [
      COHORT_TYPE.Student,
      COHORT_TYPE.Teacher,
      COHORT_TYPE.Class,
      COHORT_TYPE.School,
    ],
  },
  [USER_ORG.School]: {
    [USER_TYPE.Administrator]: [COHORT_TYPE.Student, COHORT_TYPE.Teacher, COHORT_TYPE.Class],
    [USER_TYPE.Teacher]: [COHORT_TYPE.Student, COHORT_TYPE.Class],
  },
};
