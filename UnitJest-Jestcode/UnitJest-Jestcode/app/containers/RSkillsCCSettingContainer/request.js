import { getBaseUrlWithoutSlmsObject } from 'utils/request';

/**
 * Gets RSkillCC test assignment meta for a given session ID.
 *
 * @param sessionId
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const getRSkillsCCTestAssignment = sessionId =>
  getBaseUrlWithoutSlmsObject
    .get('/rSkillsNG/RTNGProductCtrls', {
      params: {
        command: 'get_rskills_tests',
        output_format: 'raw',
        sid: sessionId,
      },
    })
    .then(response => response.output.output_data[0].stages[0]);

/**
 * Save RSkillsCC test assignments
 *
 * @param sessionId
 * @param data
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
export const postRSkillsCCSetTestAssignments = (sessionId, data) =>
  getBaseUrlWithoutSlmsObject
    .post('/rSkillsNG/RTNGProductCtrls', data, {
      params: {
        sid: sessionId,
        command: 'set_rskills_current_test',
        output_format: 'raw',
      },
    })
    .then(response => response.output.output_data[0].result[0]);
