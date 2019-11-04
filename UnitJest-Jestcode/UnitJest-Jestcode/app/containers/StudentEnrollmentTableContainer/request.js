import API from '../../utils/request';

/**
 * Get Student enrollment from SLMS for District
 *
 * @param sessionId
 * @param districtId
 */
export const getStudentEnrollmentForDistrict = (
  sessionId,
  districtId,
  { currentPage = 0, itemsPerPage = 500 }
) =>
  API.get('/SlmsDistrict', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      district_id: districtId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
    },
  }).then(response => response);

/**
 * Get Student enrollment from SLMS for School
 *
 * @param sessionId
 * @param districtId
 */
export const getStudentEnrollmentForSchool = (
  sessionId,
  schoolId,
  { currentPage = 0, itemsPerPage = 500 }
) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      school_id: schoolId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
    },
  }).then(response => response);

/**
 * Get Student enrollment from SLMS for Teacher
 *
 * @param sessionId
 * @param teacherId
 */
export const getStudentEnrollmentForTeacher = (
  sessionId,
  teacherId,
  { currentPage = 0, itemsPerPage = 500 }
) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      user_id: teacherId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
    },
  }).then(response => response);

/**
 * Get Student enrollment from SLMS for Grade
 *
 * @param sessionId
 * @param districtId
 */
export const getStudentEnrollmentForGrade = (
  sessionId,
  schoolId,
  gradeId,
  { currentPage = 0, itemsPerPage = 500 }
) =>
  API.get('/SlmsGrade', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      school_id: schoolId,
      grade: gradeId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
    },
  }).then(response => response);

/**
 * Get Student enrollment from SLMS for Class
 *
 * @param sessionId
 * @param classId
 */
export const getStudentEnrollmentForClass = (
  sessionId,
  classId,
  { currentPage = 0, itemsPerPage = 500 }
) =>
  API.get('/SlmsClass', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      class_id: classId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
    },
  }).then(response => response);

/**
 * Get Student enrollment from SLMS for Group
 *
 * @param sessionId
 * @param groupId
 */
export const getStudentEnrollmentForGroup = (
  sessionId,
  groupId,
  { currentPage = 0, itemsPerPage = 500 }
) =>
  API.get('/SlmsGroup', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      group_id: groupId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
    },
  }).then(response => response);

/**
 * Get Student enrollment from SLMS for student
 *
 * @param sessionId
 * @param studentId
 */
export const getStudentEnrollmentForStudent = (sessionId, studentId) =>
  API.get('/SlmsStudent', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      user_id: studentId,
    },
  }).then(response => response);

/**
 * Get Student Apps Usage from SLMS
 *
 * @param sessionId
 */
export const getStudentAppsUsage = sessionId =>
  API.get('/SlmsApplication', {
    params: {
      command: 'get_all_usage',
      sid: sessionId,
      seat_counts_only: true,
    },
  }).then(response => response.output_data[0].applications[0]);

/**
 * Get Student Apps Usage from SLMS
 *
 * @param sessionId
 */
export const getStudentAppsUsageForSchool = (sessionId, schoolId) =>
  API.get('/SlmsApplication', {
    params: {
      command: 'get_all_usage',
      sid: sessionId,
      school_id: schoolId,
      seat_counts_only: true,
    },
  }).then(response => response.output_data[0].applications[0]);

/**
 * Save Student Enrollment
 *
 * @param sessionId
 */
export const postStudentEnrollment = (sessionId, requestPayload) =>
  API.post('/SlmsApplication', requestPayload, {
    params: {
      command: 'set_enrollment',
      sid: sessionId,
    },
  }).then(response => response);

/**
 * Save Student Enrollment
 *
 * @param sessionId
 */
export const getEnrollmentMigration = (sessionId, requestPayload) =>
  API.post('/SlmsApplication', requestPayload, {
    params: {
      command: 'get_enrollment_migration',
      sid: sessionId,
    },
  }).then(response => response);

/**
 * get_list
 *
 * @param sessionId
 */
export const getListOfStudentsEnrollment = sessionId =>
  API.get('/SlmsApplication', {
    params: {
      command: 'get_list',
      sid: sessionId,
    },
  }).then(response => response.output_data[0].applications[0]);

/**
 * get_list
 *
 * @param sessionId
 */
export const getSamCentralStatus = sessionId =>
  API.get('/SlmsSamCentral', {
    params: {
      command: 'get_sam_central_status',
      sid: sessionId,
      output_format: 'raw',
    },
  }).then(response => response.output_data[0].samCentralStatus[0]);
