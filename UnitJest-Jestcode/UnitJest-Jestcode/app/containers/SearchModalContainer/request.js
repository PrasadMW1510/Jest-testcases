import API from '../../utils/request';
/**
 * Gets the schools for search table
 *
 * @param sessionId
 * @param userId
 * @returns {PromiseLike<{}> | Promise<{}> | *}
 */
export const getSchoolListForSearch = (sessionId, userId) =>
  API.get('/SlmsSearch', {
    params: {
      command: 'get_school_list_for_search',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].schools[0]);

export const getGradesForSearch = (sessionId, userId) =>
  API.get('/SlmsSearch', {
    params: {
      command: 'get_grades_list_for_search',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].grades[0]);

export const getTeachersForSearch = (sessionId, userId) =>
  API.get('/SlmsSearch', {
    params: {
      command: 'get_teachers_list_for_search',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].teachers[0]);

export const getClassesForSearch = (sessionId, userId) =>
  API.get('/SlmsSearch', {
    params: {
      command: 'get_classes_list_for_search',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].classes[0]);

export const getAppsForSearch = sessionId =>
  API.get('/SlmsServerAssets', {
    params: {
      command: 'get_app_list',
      sid: sessionId,
    },
  }).then(response => response.output_data[0].server_assets[0]);

/**
 * gets the Search results when Search Students
 *
 * @param sessionId
 * @param searchFilters
 * @param itemsPerPage
 * @param curPage
 *
 */
export const getStudentSearchResults = (sessionId, searchOpts, itemsPerPage = 250, curPage = 0) =>
  API.post('/SlmsSearch', searchOpts, {
    params: {
      command: 'get_student_search_list',
      sid: sessionId,
      ipp: itemsPerPage,
      cur_pg: curPage,
    },
  }).then(response => response);

/**
 * gets the Search results when Search Teachers
 *
 * @param sessionId
 * @param searchFilters
 * @param itemsPerPage
 * @param curPage
 *
 */
export const getTeacherSearchResults = (sessionId, searchOpts, itemsPerPage = 250, curPage = 0) =>
  API.post('/SlmsSearch', searchOpts, {
    params: {
      command: 'get_teacher_search_list',
      sid: sessionId,
      ipp: itemsPerPage,
      cur_pg: curPage,
    },
  }).then(response => response);
