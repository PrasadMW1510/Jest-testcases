import { USER_ORG, USER_TYPE } from 'containers/App/constants';
import * as AdminConstants from 'components/ManageAdminAccounts/constants';

/**
 * Transform shape of raw student JSON from server into shape expected by forms
 *
 * @param props
 * @returns {{student_id: *, birth_date: *, preferred_name: *, district_user_id: *, email: *, enabled: *, first_name: *, last_name: *, middle_name: *, password: *, password_confirm: *, password_hint: *, prefix: *, sis_id: *, sps_id: *, ssn: *, subgroupings: *, suffix: *, title: *, user_id: *, user_name: *, user_type: *, groups: *|{}, classes: *|{}, grade: *}}
 */
export function transformStudentDataForForm({ ...props }) {
  const extendedUserData = extractValue(props.extended_user_data);
  const gradeExtendedData =
    extendedUserData &&
    extractValue(extendedUserData).grade &&
    extractValue(extendedUserData).grade[0];
  return {
    student_id: extractValue(props.studentId),
    birth_date: extractValue(props.birth_date),
    preferred_name: extendedUserData && extractValue(extendedUserData.preferred_name),
    district_user_id: extractValue(props.district_user_id),
    email: extractValue(props.email),
    enabled: extractBoolValue(props.enabled),
    first_name: extractValue(props.first_name),
    last_name: extractValue(props.last_name),
    middle_name: extractValue(props.middle_name),
    password: extractValue(props.password),
    password_confirm: extractValue(props.password),
    password_hint: extractValue(props.password_hint),
    prefix: extractValue(props.prefix),
    sis_id: extendedUserData && extractValue(extendedUserData.sis_id),
    sps_id: extractValue(props.sps_id),
    ssn: extractValue(props.ssn),
    subgroupings: extractValue(props.subgroupings),
    suffix: extractValue(props.suffix),
    title: extractValue(props.title),
    user_id: extractValue(props.user_id),
    user_name: extractValue(props.user_name),
    user_type: extractValue(props.user_type),
    groups:
      extractValue(props.selectedGroup) || extractIds(props.groups, 'group', 'group_id') || {},
    classes:
      extractValue(props.selectedClass) || extractIds(props.classes, 'class', 'class_id') || {},
    // Allow a grade to be passed-in directly. This helps when
    // the default is set based on smartbar selection.
    grade:
      extractValue(props.selectedGrade) ||
      extractValue(gradeExtendedData && gradeExtendedData.name),
  };
}

/** Transform Form Display User Type with a user type
 */
export function transformFormDisplayType(accountType) {
  let userType;
  switch (accountType) {
    case AdminConstants.DISTRICT_ADMINISTRATOR:
      userType = USER_TYPE.Administrator;
      break;
    case AdminConstants.DISTRICT_TECH:
      userType = USER_TYPE.Tech;
      break;
    case AdminConstants.SCHOOL_ADMINISTRATOR:
      userType = USER_TYPE.Administrator;
      break;

    case AdminConstants.SCHOOL_TECH:
      userType = USER_TYPE.Tech;
      break;

    case USER_TYPE.Teacher:
      userType = USER_TYPE.Teacher;
      break;

    default:
      userType = USER_TYPE.Tech;
  }
  return userType;
}

/**
 * Transform shape of raw class JSON from server into shape expected by forms
 *
 * @param name
 * @param classId
 * @param displayName
 * @param description
 * @param grades
 * @param applications
 * @param students
 * @param teachers
 * @returns {{name: *, class_id: *, display_name: *, description: *, grades: *|{}, rosterStudents: *|{}, applications: *|{}, teacher1: null, teacher2: null}}
 */
export function transformClassDataForForm({
  name = '',
  classId = '',
  displayName = '',
  description = '',
  grades = [],
  applications = [],
  students = [],
  teachers = [],
}) {
  // TODO: convert to OrderedMap
  const teachersObj = extractIds(teachers, 'user', 'user_id');
  const teacherList = teachersObj ? Object.keys(teachersObj) : [];
  return {
    name: extractValue(name),
    class_id: extractValue(classId),
    display_name: extractValue(displayName),
    description: extractValue(description),
    grades: extractIds(grades, 'grade', 'name') || {},
    rosterStudents: extractIds(students, 'user', 'user_id') || {},
    applications: extractIds(applications, 'application', 'community_id') || {},
    teacher1: teacherList.length ? teacherList[0] : null,
    teacher2: teacherList.length > 1 ? teacherList[1] : null,
    teacherList,
  };
}

/**
 * Transform immutable class data into a json structure that converts into the server-expected xml.
 *
 * @param immClassMap
 * @param classId
 * @param schoolId
 * @returns {{class: {class_id: *, name, display_name, description: string, owner_id: *, grades: {grade: string[]}, applications: {community_id: string[]}, teachers: {user_id: *[]}, students: {user_id: string[]}}}}
 */
export function transformClassMapForPost(immClassMap, classId, schoolId) {
  const classObj = immClassMap.toJS();
  const teachers = classObj.teacherList;
  // We want to replace the first two teachers with changes made by user.
  teachers[0] = classObj.teacher1;
  teachers[1] = classObj.teacher2;

  return {
    class: {
      ...{ class_id: classId },
      name: classObj.name,
      display_name: classObj.name,
      description: 'description', // Match Flash SAM
      owner_id: schoolId,
      grades: {
        grade: Object.keys(classObj.grades || {}),
      },
      applications: {
        community_id: Object.keys(classObj.applications || {}),
      },
      teachers: {
        // Filter out unwanted values (i.e. '' or null)
        user_id: teachers.filter(id => typeof id === 'string' && id.length > 0),
      },
      students: {
        user_id: Object.keys(classObj.rosterStudents || {}),
      },
    },
  };
}

/**
 * Extract the value from an array
 *
 * @param val
 * @returns {*}
 */
export function extractValue(val) {
  return Array.isArray(val) && val.length === 1 ? val[0] : val;
}

/**
 * Extract the bool value from an array
 *
 * @param val
 * @returns {boolean}
 */
export function extractBoolValue(val) {
  return Array.isArray(val) && val.length === 1 ? val[0] === 'true' : val;
}

/**
 * Convert server returned array into a shape used by forms. Omits any data not needed, just returns ids.
 *
 * @param arr
 * @param childId
 * @param key
 * @returns {*}
 */
export function extractIds(arr, childId, key) {
  const items = arr && arr.length === 1 ? arr[0][childId] : null;
  return (
    items && key && items.reduce((obj, item) => ({ ...obj, [extractValue(item[key])]: true }), {})
  );
}

/**
 * Creates an object used for adding profiles.
 *
 * @param profileData
 * @param permissionIds
 * @param userOrgId
 * @param userOrg

 * @returns {{user: {district_user_id, email, first_name, last_name, organizations: {org_id: *}, password, password_hint, permissions: {permission}, prefix, sps_id, suffix, title, user_id: *, user_name, user_type}}}
 */
export function transformDataForProfileAdd(profileData, permissionIds, userOrgId, userOrg) {
  const permissions = createPermissionFromIds(permissionIds);

  const accountTypeToAdd = profileData.get('user_type');

  const isSchoolAdminForm =
    accountTypeToAdd === AdminConstants.SCHOOL_ADMINISTRATOR ||
    accountTypeToAdd === AdminConstants.SCHOOL_TECH;

  const userType = transformFormDisplayType(accountTypeToAdd);

  const dataObj = {
    user: {
      district_user_id: profileData.get('district_user_id'),
      email: profileData.get('email'),
      first_name: profileData.get('first_name'),
      last_name: profileData.get('last_name'),
      organizations: {
        org_id: userOrgId,
      },
      password: profileData.get('password'),
      password_hint: profileData.get('password_hint'),
      permissions,
      prefix: profileData.get('prefix'),
      sps_id: profileData.get('sps_id'),
      suffix: profileData.get('suffix'),
      title: profileData.get('title'),
      user_name: profileData.get('user_name'),
      user_type: userType,
    },
  };

  if (isSchoolAdminForm) {
    const schoolId = profileData.get('school_name');
    const orgId = userOrg === USER_ORG.District ? schoolId : userOrgId;

    dataObj.user.organizations.org_id = orgId;

    dataObj.user.schools = { school_id: orgId };
  }

  // This will be used for when saving Teacher Profile
  if (profileData.get('classes')) {
    dataObj.user.classes = {
      class_id: [],
    };

    Object.keys(profileData.get('classes').toJS()).forEach(key => {
      dataObj.user.classes.class_id.push(key);
    });
  }

  if (userOrg === USER_ORG.School) {
    dataObj.user.schools = {
      school_id: userOrgId,
    };
  }

  return dataObj;
}

/**
 * Creates an object used for saving profiles.
 *
 * @param profileData
 * @param permissions
 * @param userId
 * @param userOrg
 * @param userOrgId
 * @returns {{user: {district_user_id, email, first_name, last_name, organizations: {org_id: *}, password, password_hint, permissions: {permission}, prefix, sps_id, suffix, title, user_id: *, user_name, user_type}}}
 */
export function transformDataForProfileUpdate(
  profileData,
  permissions,
  userId,
  userOrg,
  userOrgId
) {
  const dataObj = {
    user: {
      district_user_id: profileData.get('district_user_id'),
      email: profileData.get('email'),
      first_name: profileData.get('first_name'),
      last_name: profileData.get('last_name'),
      organizations: {
        org_id: userOrgId,
      },
      password: profileData.get('password'),
      password_hint: profileData.get('password_hint'),
      permissions,
      prefix: profileData.get('prefix'),
      sps_id: profileData.get('sps_id'),
      suffix: profileData.get('suffix'),
      title: profileData.get('title'),
      user_id: userId,
      user_name: profileData.get('user_name'),
      user_type: profileData.get('user_type'),
    },
  };

  // This will be used for when saving Teacher Profile
  if (profileData.get('classes')) {
    dataObj.user.classes = {
      class_id: [],
    };

    Object.keys(profileData.get('classes').toJS()).forEach(key => {
      dataObj.user.classes.class_id.push(key);
    });
  }

  if (userOrg === USER_ORG.School) {
    dataObj.user.schools = {
      school_id: userOrgId,
    };
  }

  return dataObj;
}

export function createPermissionFromIds(permissionIds) {
  const permission = [];

  permissionIds.forEach(currentId => {
    const permissionId = {
      permission_id: currentId,
    };
    permission.push(permissionId);
  });

  return { permission };
}

/**
 * Creates an array in the correct format used to save permissions.
 *
 * @param permissionData
 * @returns {{permission: Array}}
 */
export function createPermissionsObj(permissionData) {
  const permission = [];
  permissionData.forEach(item => {
    const permissionId = {
      permission_id: item.getIn(['id', 0]),
    };

    permission.push(permissionId);
  });

  return { permission };
}
