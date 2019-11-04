import API from '../../utils/request';

/**
 * Teacher - Gets usage summary
 *
 * @param sessionId
 * @param userId
 */
export const getUsageSummaryDataForTeacher = (sessionId, userId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_usage',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].Teacher[0]);

/**
 * Districts - gets the usage summary (schools)
 * @param sessionId - session id
 * @param userId - logged in district admin id
 */
export const getUsageSummaryDataForDistAdmin = (sessionId, districtId) =>
  API.get('/SlmsDistrict', {
    params: {
      command: 'get_usage',
      sid: sessionId,
      district_id: districtId,
    },
  }).then(response => response.output_data[0].district[0]);

/**
 * Gets a specific schools usage summary data for a district admin
 * @param sessionId - session id
 * @param schoolId - school id
 */
export const getUsageSummaryDataForSchoolAdmin = (sessionId, schoolId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_usage',
      sid: sessionId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].school[0]);

/**
 * Gets a specific grades usage summary data for a district admin
 * @param sessionId - session id
 * @param schoolId - school id
 */
export const getGradeUsageSummaryData = (sessionId, gradeId, schoolId) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_usage',
      sid: sessionId,
      grade: gradeId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].grade[0]);

/**
 * Gets a class usage summary data
 * @param sessionId - session id
 * @param classId - class id
 */
export const getClassUsageSummaryData = (sessionId, classId) =>
  API.get('/SlmsClass', {
    params: {
      command: 'get_usage',
      sid: sessionId,
      class_id: classId,
    },
  }).then(response => response.output_data[0].class[0]);

/**
 * Gets a group usage summary data
 * @param sessionId - session id
 * @param groupId - group id
 */
export const getGroupUsageSummaryData = (sessionId, groupId) =>
  API.get('/SlmsGroup', {
    params: {
      command: 'get_usage',
      sid: sessionId,
      group_id: groupId,
    },
  }).then(response => response.output_data[0].group[0]);

/**
 * Gets a student usage summary data
 * @param sessionId - session id
 * @param userId - user id
 */
export const getStudentUsageSummaryData = (sessionId, userId) =>
  API.get('/SlmsStudent', {
    params: {
      command: 'get_usage',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].student[0]);
