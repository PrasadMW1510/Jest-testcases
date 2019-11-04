import API, { getFormAPIObject } from '../../utils/request';

/**
 * Get Teacher enrollment from SLMS for District
 *
 * @param sessionId
 * @param districtId
 */
export const getTeacherEnrollmentForDistrict = (
  sessionId,
  districtId,
  { currentPage = 0, itemsPerPage = 250 }
) =>
  API.get('/SlmsDistrict', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      district_id: districtId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
      license_category: 'Teacher',
    },
  }).then(response => response);

/**
 * Get Teacher enrollment from SLMS for School
 *
 * @param sessionId
 * @param districtId
 */
export const getTeacherEnrollmentForSchool = (
  sessionId,
  schoolId,
  { currentPage = 0, itemsPerPage = 250 }
) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      school_id: schoolId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
      license_category: 'Teacher',
    },
  }).then(response => response);

/**
 * Get Teacher enrollment from SLMS for Teacher
 *
 * @param sessionId
 * @param teacherId
 */
export const getTeacherEnrollmentForTeacher = (
  sessionId,
  schoolId,
  teacherId,
  { currentPage = 0, itemsPerPage = 250 }
) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      school_id: schoolId,
      user_id: teacherId,
      paginate: true,
      cur_pg: currentPage,
      ipp: itemsPerPage,
      license_category: 'Teacher',
    },
  }).then(response => response);

/**
 * Get Teacher enrollment from SLMS for Grade
 *
 * @param sessionId
 * @param districtId
 */
export const getTeacherEnrollmentForGrade = (
  sessionId,
  schoolId,
  gradeId,
  { currentPage = 0, itemsPerPage = 250 }
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
      license_category: 'Teacher',
    },
  }).then(response => response);

/**
 * Get Teacher Apps Usage from SLMS
 *
 * @param sessionId
 */
export const getTeacherAppsUsage = sessionId =>
  API.get('/SlmsApplication', {
    params: {
      command: 'get_usage_for_teacher_apps',
      sid: sessionId,
      seat_counts_only: true,
    },
  }).then(response => response.output_data[0].applications[0]);

/**
 * Get Teacher Apps Usage from SLMS
 *
 * @param sessionId
 */
export const getTeacherAppsUsageForSchool = (sessionId, schoolId) =>
  API.get('/SlmsApplication', {
    params: {
      command: 'get_usage_for_teacher_apps',
      sid: sessionId,
      school_id: schoolId,
      seat_counts_only: true,
    },
  }).then(response => response.output_data[0].applications[0]);

/**
 * Save Teacher Enrollment
 *
 * @param sessionId
 */
export const postTeacherEnrollment = (sessionId, requestPayload) =>
  getFormAPIObject
    .post('/SlmsApplication', requestPayload, {
      params: {
        command: 'set_enrollment',
        sid: sessionId,
        license_category: 'Teacher',
      },
    })
    .then(response => response);
