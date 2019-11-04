import API from '../../utils/request';

/**
 * Get Profile Details for District Admin
 *
 * @param sessionId
 * @param districtId
 */
export const getProfileForDistrictAdmin = (sessionId, districtId) =>
  API.get('/SlmsDistrict', {
    params: {
      command: 'get_profile',
      sid: sessionId,
      district_id: districtId,
    },
  }).then(response => response.output_data[0].organization[0]);

/**
 * Get Profile Details for School Admin
 *
 * @param sessionId
 * @param schoolId
 */
// TODO: Consider renaming the following method to 'getSchoolProfile'
export const getProfileForSchoolAdmin = (sessionId, schoolId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_profile',
      sid: sessionId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].organization[0]);

/**
 * Teacher - Gets profile page
 *
 * @param sessionId
 * @param userId
 */
export const getStudentProfilePageData = (sessionId, userId) =>
  API.get('/SlmsStudent', {
    params: {
      command: 'get_profile',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].user[0]);

/**
 * Gets a group profile page data
 * @param sessionId - session id
 * @param groupId - group id
 */
export const getGroupProfilePageData = (sessionId, groupId) =>
  API.get('/SlmsGroup', {
    params: {
      command: 'get_profile',
      sid: sessionId,
      group_id: groupId,
    },
  }).then(response => response.output_data[0].group[0]);

/**
 * Gets a teacher profile page data
 * @param sessionId - session id
 * @param userId - user Id
 */
export const getTeacherProfilePageData = (sessionId, teacherId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_profile',
      sid: sessionId,
      user_id: teacherId,
    },
  }).then(response => response.output_data[0].user[0]);

/**
 * Gets a class profile page data
 * @param sessionId - session id
 * @param classId - class id
 */
export const getClassDetails = (sessionId, classId) =>
  API.get('/SlmsClass', {
    params: {
      command: 'get_profile',
      sid: sessionId,
      class_id: classId,
    },
  }).then(response => response.output_data[0].class[0]);

/**
 * Gets a School profile page data
 * @param sessionId - session id
 * @param schoolId - school id
 */
export const getSchoolProfilePageData = (sessionId, schoolId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_profile',
      sid: sessionId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].organization[0]);

/**
 * Gets Teachers By Grade
 * @param sessionId - session id
 * @param schoolId - school id
 * @param grade - grade
 */
export const getTeachersByGrade = (sessionId, grade, schoolId) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_teachers',
      sid: sessionId,
      grade,
      school_id: schoolId,
    },
  }).then(response => response.item_count[0]);

/**
 * Gets Classes By Grade
 * @param sessionId - session id
 * @param schoolId - school id
 * @param grade - grade
 */
export const getClassByGrade = (sessionId, grade, schoolId) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_classes',
      sid: sessionId,
      grade,
      school_id: schoolId,
    },
  }).then(response => response.item_count[0]);

/**
 * Gets Students By Grade
 * @param sessionId - session id
 * @param schoolId - school id
 * @param grade - grade
 */
export const getStudentsByGrade = (sessionId, grade, schoolId) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_students',
      sid: sessionId,
      grade,
      school_id: schoolId,
    },
  }).then(response => response.item_count[0]);
