import API, { getFormAPIObject } from 'utils/request';

/**
 * Get grade data for the district
 * @param sessionId
 * @param districtId
 */
export const getGradeListForDistrict = (sessionId, districtId) =>
  API.get('/SlmsDistrict', {
    params: {
      command: 'get_grades',
      sid: sessionId,
      district_id: districtId,
    },
  }).then(response => response.output_data[0].grades[0].grade);

/**
 * Add a new school
 *
 * @param sessionId
 * @param schoolObj
 * @returns {PromiseLike<{login: {}[]}> | Promise<{login: {}[]}> | *}
 */
export const postAddSchool = (sessionId, schoolObj) =>
  getFormAPIObject
    .post('/SlmsSchool', schoolObj, {
      params: {
        command: 'add',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);

/**
 * Edit a school
 *
 * @param sessionId
 * @param schoolObj
 */
export const postEditSchool = (sessionId, schoolObj) =>
  getFormAPIObject
    .post('/SlmsSchool', schoolObj, {
      params: {
        command: 'update',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);
