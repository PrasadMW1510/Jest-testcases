import API from 'utils/request';

/**
 * Clear Roster Request
 *
 * @param userId
 * @param sessionId
 * @param schoolId
 * @returns {PromiseLike<{login: {}[]}> | Promise<{login: {}[]}> | *}
 */
export const deactivateAllClasses = (userId, sessionId, schoolId) =>
  API.get('/SlmsDeactivation', {
    params: {
      command: 'deactivate_all_classes',
      user_id: userId,
      sid: sessionId,
      school_id: schoolId,
    },
  });
