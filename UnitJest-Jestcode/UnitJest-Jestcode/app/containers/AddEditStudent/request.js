import API, { getFormAPIObject } from '../../utils/request';

/**
 * Add a new student
 *
 * @param sessionId
 * @param studentObj
 */
export const postAddStudent = (sessionId, studentObj) =>
  getFormAPIObject
    .post('/SlmsStudent', studentObj, {
      params: {
        command: 'add',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);

/**
 * Edit a student
 *
 * @param sessionId
 * @param studentObj
 */
export const postEditStudent = (sessionId, studentObj) =>
  getFormAPIObject
    .post('/SlmsStudent', studentObj, {
      params: {
        command: 'update',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);

/**
 * Get all groups for a given school
 *
 * @param sessionId
 * @param schoolId
 */
export const getGroupDataBySchool = (sessionId, schoolId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_groups',
      sid: sessionId,
      school_id: schoolId,
    },
  }).then(response => response.output_data[0].groups[0].group);
