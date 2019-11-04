import API, { getBaseUrlWithoutSlmsObject } from 'utils/request';
/**
 * Gets Program Group settings for R180NG
 *
 * @param sessionId
 * @param cohortId
 */

export const getGroupSettingsR180NG = (sessionId, cohortId, cohortType) =>
  getBaseUrlWithoutSlmsObject
    .get('/r180ng/r180ngProductCtrls', {
      params: {
        command: 'get_group_settings',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: cohortType,
      },
    })
    .then(response => response.output.output_data[0].group_settings[0]);

/**
 * Gets Program Grade settings for R180NG
 *
 * @param sessionId
 * @param cohortId
 */

export const getGradeSettingsR180NG = (sessionId, cohortId, cohortType, schoolId) =>
  getBaseUrlWithoutSlmsObject
    .get('/r180ng/r180ngProductCtrls', {
      params: {
        command: 'get_group_settings',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: cohortType,
        school_id: schoolId,
      },
    })
    .then(response => response.output.output_data[0].group_settings[0]);

/**
 * Gets Program Enrollment Count of a user District
 *
 * @param sessionId
 * @param districtId
 */
export const getEnrollmentCountDistrict = (sessionId, districtId) =>
  API.get('/SlmsDistrict', {
    params: {
      command: 'get_enrollment_count',
      sid: sessionId,
      district_id: districtId,
    },
  }).then(response => response.output_data[0].applications[0].application);

/**
 * Gets Program Enrollment Count of a user District
 *
 * @param sessionId
 * @param schoolId
 */
export const getEnrollmentCountSchool = (sessionId, schoolId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_enrollment_count',
      sid: sessionId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].applications[0].application);

/**
 * Gets Program Enrollment Count of a user Teacher
 *
 * @param sessionId
 * @param userId
 */
export const getEnrollmentCountTeacher = (sessionId, userId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_enrollment_count',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].applications[0].application);

/**
 * Gets Program Enrollment Count of a user Class
 *
 * @param sessionId
 * @param userId
 */
export const getEnrollmentCountClass = (sessionId, classId) =>
  API.get('/SlmsClass', {
    params: {
      command: 'get_enrollment_count',
      sid: sessionId,
      class_id: classId,
    },
  }).then(response => response.output_data[0].applications[0].application);
/**
 * Gets Program Enrollment Count of a Grade
 *
 * @param sessionId
 * @param userId
 */
export const getEnrollmentCountGrade = (sessionId, schoolId, gradeNo) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_enrollment_count',
      sid: sessionId,
      school_id: schoolId,
      grade: gradeNo,
    },
  }).then(response => response.output_data[0].applications[0].application);

/**
 * Gets Program Enrollment Count of a Group
 *
 * @param sessionId
 * @param userId
 */
export const getEnrollmentCountGroup = (sessionId, groupId) =>
  API.get('/SlmsGroup', {
    params: {
      command: 'get_enrollment_count',
      sid: sessionId,
      group_id: groupId,
    },
  }).then(response => response.output_data[0].applications[0].application);
/**
 * Gets Program Enrollment Count of a user Student
 *
 * @param sessionId
 * @param userId
 */
export const getEnrollmentCountStudent = (sessionId, userId) =>
  API.get('SlmsStudent', {
    params: {
      command: 'get_enrollment_count',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].applications[0].application);
/**
 *Changes Settings form Program Settings for R180NG
 *
 * @param sessionId
 * @param changesXML
 * @returns {PromiseLike<{login: {}[]}> | Promise<{login: {}[]}> | *}
 * r180ng/r180ngProductCtrls?sid=0uov9cg32e9jf4hlg4177bav_2efa7f0&command=set_group_settings
 */
export const postChangeSettingsR180NG = (sessionId, changesXML) =>
  getBaseUrlWithoutSlmsObject
    .post('/r180ng/r180ngProductCtrls', changesXML, {
      params: {
        command: 'set_group_settings',
        sid: sessionId,
      },
    })
    .then(response => response.output_data);
