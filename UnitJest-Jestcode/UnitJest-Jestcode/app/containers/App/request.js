import API, { getFormAPIObject, getBaseUrlWithoutSlmsObject } from 'utils/request';

/**
 * Global APIS (login, profile, students, groups, classes, etc)
 * In general:
 *  1) SlmsTeacher APIs require sessionId, schoolId, and userId
 *  2) SlmsClass APIs require sessionId and classId
 *  3) SlmsGroup APIs require sessionId and groupId
 *  4) SlmsSchool APIs require sessionId and schoolId
 *  5) SlmsGrade APIs require sessionId, schoolId, and gradeId
 *  6) SlmsDistrict APIs require sessionId and districtId
 */

/**
 * Gets login data for a given username and password
 *
 * @param username
 * @param password
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const getLoginData = (username, password) =>
  API.get('/SlmsLogin', {
    params: {
      command: 'validate',
      LYC_USERNAME: username,
      LYC_PASSWORD: password,
      LYC_APP: 'slms',
    },
  }).then(response => response.output_data[0].login[0]);

/**
 * Gets login data for a given slms id
 * @param slmsId
 */
export const getLoginDataSLMSID = slmsId =>
  API.get('/SlmsLogin', {
    params: {
      command: 'validate',
      sid: slmsId,
    },
  }).then(response => response.output_data[0].login[0]);

/**
 * Gets profile data for a given user
 *
 * @param sessionId
 * @param userId
 */
export const getProfileData = (sessionId, userId) =>
  API.get('/SlmsAccount', {
    params: {
      command: 'get_profile',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].user[0]);

/**
 * Gets class data for a given school and teacher
 *
 * @param sessionId
 * @param schoolId
 * @param userId
 */
export const getClassData = (sessionId, schoolId, userId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_classes',
      sid: sessionId,
      school_id: schoolId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].classes[0].class);

/**
 * Get school data for a given teacher
 * @param sessionId
 * @param userId
 */
export const getSchoolData = (sessionId, userId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_schools',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].organizations[0].organization);

/**
 * Get school data for a given district
 * @param sessionId
 * @param districtId
 */
export const getSchoolDataByDistrict = (sessionId, districtId) =>
  API.get('/SlmsDistrict', {
    params: {
      command: 'get_schools',
      sid: sessionId,
      district_id: districtId,
    },
  }).then(response => response.output_data[0].organizations[0].organization);

/**
 * Get all students for a given school and teacher
 *
 * @param sessionId
 * @param schoolId
 * @param userId
 */
export const getStudentDataBySchool = (sessionId, schoolId, userId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_students',
      sid: sessionId,
      school_id: schoolId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].users[0].user);

/**
 * Get all students for a given school and grade
 *
 * @param sessionId
 * @param schoolId
 * @param gradeId
 */
export const getStudentDataByGradeSchool = (sessionId, schoolId, gradeId) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_students',
      sid: sessionId,
      school_id: schoolId,
      grade: gradeId,
    },
  }).then(response => response.output_data[0].users[0].user);

/**
 * Get all students for a given class
 * @param sessionId
 * @param classId
 */
export const getStudentDataByClass = (sessionId, classId) =>
  API.get('/SlmsClass', {
    params: {
      command: 'get_students',
      sid: sessionId,
      class_id: classId,
    },
  }).then(response => response.output_data[0].users[0].user);

/**
 * Get all students for a given group
 * @param sessionId
 * @param groupId
 */
export const getStudentDataByGroup = (sessionId, groupId) =>
  API.get('/SlmsGroup', {
    params: {
      command: 'get_students',
      sid: sessionId,
      group_id: groupId,
    },
  }).then(response => response.output_data[0].users[0].user);

/**
 * Get all groups for a given school and teacher
 *
 * @param sessionId
 * @param schoolId
 * @param userId
 */
export const getGroupDataBySchool = (sessionId, schoolId, userId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_groups',
      sid: sessionId,
      school_id: schoolId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].groups[0].group);

/**
 * Get all groups for a given class
 *
 * @param sessionId
 * @param classId
 */
export const getGroupDataByClass = (sessionId, classId) =>
  API.get('/SlmsClass', {
    params: {
      command: 'get_groups',
      sid: sessionId,
      class_id: classId,
    },
  }).then(response => response.output_data[0].groups[0].group);

/**
 * Gets servers app list from SLMS
 *
 * @param sessionId
 */

export const getProgramList = sessionId =>
  API.get('/SlmsServerAssets', {
    params: {
      command: 'get_app_list',
      sid: sessionId,
    },
  }).then(response => response.output_data[0].server_assets[0].application);

/**
 * Get grade data for a given school
 * @param sessionId
 * @param schoolId
 */
export const getGradeDataBySchool = (sessionId, schoolId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_grades',
      sid: sessionId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].grades[0].grade);

/**
 * Get teacher data for a given school
 * @param sessionId
 * @param schoolId
 */
export const getTeacherDataBySchool = (sessionId, schoolId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_teachers',
      sid: sessionId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].users[0].user);

/**
 * Get teacher data for a given grade and school
 * @param sessionId
 * @param schoolId
 * @param gradeId
 */
export const getTeacherDataByGradeSchool = (sessionId, schoolId, gradeId) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_teachers',
      sid: sessionId,
      school_id: schoolId,
      grade: gradeId,
    },
  }).then(response => response.output_data[0].users[0].user);

/**
 * Get class data for a given school
 * @param sessionId
 * @param schoolId
 */
export const getClassDataBySchool = (sessionId, schoolId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_classes',
      sid: sessionId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].classes[0].class);

/**
 * Get class data for a given grade and school
 * @param sessionId
 * @param schoolId
 * @param gradeId
 */
export const getClassDataByGradeSchool = (sessionId, schoolId, gradeId) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_classes',
      sid: sessionId,
      school_id: schoolId,
      grade: gradeId,
    },
  }).then(response => response.output_data[0].classes[0].class);

/**
 * Get the list of permissions for the user.
 * @param sessionId
 * @param userId
 * @returns {PromiseLike<Array> | Promise<Array> | *}
 */
export const getPermissions = (sessionId, userId) =>
  API.get('/SlmsAccount', {
    params: {
      command: 'get_permissions',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].permissions[0].permission);

/**
 * Get the password config for the user
 * @param sessionId
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const getPasswordConfig = sessionId =>
  API.get('/SlmsConfig', {
    params: {
      command: 'get_password_config',
      sid: sessionId,
    },
  }).then(response => response.output_data[0].password_config[0]);

/**
 * Add admin
 *
 * @param sessionId
 * @param addData
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const postAddSLMSAccount = (sessionId, adminData) =>
  getFormAPIObject
    .post('/SlmsAccount', adminData, {
      params: {
        command: 'add',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);
/**
 * Save updated account data for the user
 *
 * @param sessionId
 * @param updateData
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const postUpdateSLMSAccount = (sessionId, updateData) =>
  getFormAPIObject
    .post('/SlmsAccount', updateData, {
      params: {
        command: 'update',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);

/**
 * Get the school and classes by user
 *
 * @param sessionId
 * @param userId
 * @param districtId
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const getSchoolsAndClasses = (sessionId, userId, districtId) =>
  API.get('/SlmsCohortAccess', {
    params: {
      command: 'get_school_and_classes_by_user',
      sid: sessionId,
      user_id: userId,
      district_id: districtId,
    },
  }).then(response => response.output_data[0].schools[0]);

/**
 * This is used to make a more generic get api call.
 * This will add /slms before the URL.
 *
 * @param url
 * @param params
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const genericGetAPICall = (url, params) =>
  API.get(url, {
    params,
  }).then(response => response.output_data[0]);

/**
 * This is used to make a more generic get api call without the /slms before the URL
 *
 * @param url
 * @param params
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const genericNonSLMSGetAPICall = (url, params) =>
  getBaseUrlWithoutSlmsObject
    .get(url, {
      params,
    })
    .then(response => response);

/**
 * This is used to make a more generic post api call without the /slms before the URL
 *
 * @param url
 * @param params
 * @param data
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const genericNonSLMSPostAPICall = (url, params, data) =>
  getBaseUrlWithoutSlmsObject
    .post(url, data, {
      params,
    })
    .then(response => response);
