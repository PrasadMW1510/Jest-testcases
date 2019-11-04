import API from '../../utils/request';

/**
 * Gets the classes and groups for a particular
 *
 * @param sessionId
 * @param districtId
 * @param userId
 * @returns {PromiseLike<{}> | Promise<{}> | *}
 */

export const getClassesAndGroupForSearch = (districtId, userId, sessionId) =>
  API.get('/SlmsSearch', {
    params: {
      command: 'get_school_classes_and_groups_for_search',
      district_id: districtId,
      user_id: userId,
      sid: sessionId,
    },
  }).then(response => response.output_data[0].schools[0].school);

/**
 * Assign to a class
 *
 * @param sessionId
 * @param assignPayload
 * @returns {PromiseLike<{login: {}[]}> | Promise<{login: {}[]}> | *}
 */
export const postAssignToClass = (sessionId, assignPayload) =>
  API.post('/SlmsStudent', assignPayload, {
    params: {
      command: 'add_classes_and_groups',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);
