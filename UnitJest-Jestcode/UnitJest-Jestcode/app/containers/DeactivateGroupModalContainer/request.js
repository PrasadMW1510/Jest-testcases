/*
 *
 * DeactivateGroupModalContainer request
 *
 */

import API from '../../utils/request';

/**
 * Deactivate a Group
 *
 * @param sessionId
 * @param cohortId
 * @param cohortType
 * @param userId
 */
export const getDeactivateGroup = (sessionId, cohortId, cohortType, userId) =>
  API.get('/SlmsDeactivation', {
    params: {
      command: 'deactivate',
      sid: sessionId,
      cohort_id: cohortId,
      cohort_type: cohortType,
      user_id: userId,
    },
  }).then(response => response.output_data[0]);
