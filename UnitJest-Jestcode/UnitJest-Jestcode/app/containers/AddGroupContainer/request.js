import API, { getFormAPIObject } from 'utils/request';

/**
 * Get the SlmsTeacher data with the student information to be updated for groups
 * @param sisId
 * @param schoolId
 * @param userId
 * @returns {Promise|*|PromiseLike<T>|Promise<T>}
 */
export const getClassDataWithStudents = (sisId, schoolId, userId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_classes',
      include_students: true,
      sid: sisId,
      school_id: schoolId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].classes[0].class);

/**
 * Get the SlmsTeacher data with Student information irrespective of the school the teacher is associated with.
 * @param sisId
 * @param userId
 * @returns {Promise|*|PromiseLike<T>|Promise<T>}
 */
export const getClassesAssosiatedWithTeacher = (sisId, userId) =>
  API.get('/SlmsTeacher', {
    params: {
      command: 'get_classes',
      include_students: true,
      sid: sisId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].classes[0].class);

/**
 * Add A Group with the list of students selected
 * @param sessionId
 * @param groupInfo
 * @returns {Promise|*|PromiseLike<T>|Promise<T>}
 */
export const postCreateAGroup = (sessionId, groupInfo) =>
  getFormAPIObject
    .post('/SlmsGroup', groupInfo, {
      params: {
        command: 'add',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);

export const updateGroupInfo = (sessionId, groupInfo) =>
  getFormAPIObject
    .post('SlmsGroup', groupInfo, {
      params: {
        command: 'update',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);
