import API from '../../utils/request';

/**
 * Add a new class
 *
 * @param sessionId
 * @param classObj
 */
export const postAddClass = (sessionId, classObj) =>
  API.post('/SlmsClass', classObj, {
    params: {
      command: 'add',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);

/**
 * Edit a class
 *
 * @param sessionId
 * @param classObj
 */
export const postEditClass = (sessionId, classObj) =>
  API.post('/SlmsClass', classObj, {
    params: {
      command: 'update',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);

/**
 * Get all students for a given school
 *
 * @param sessionId
 * @param schoolId
 * @param userId
 */
export const getStudentDataBySchool = (sessionId, schoolId, userId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_students',
      sid: sessionId,
      school_id: schoolId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].users[0].user);
