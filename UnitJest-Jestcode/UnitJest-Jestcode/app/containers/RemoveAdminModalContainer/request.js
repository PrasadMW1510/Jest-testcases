import API from 'utils/request';

/**
 * disable admin Request
 *
 * @param sessionId
 * @param userId
 * @returns {PromiseLike<{login: {}[]}> | Promise<{login: {}[]}> | *}
 */
export const disableAdmin = (sessionId, userId) =>
  API.get('/SlmsAccount', {
    params: {
      sid: sessionId,
      command: 'disable',
      user_id: userId,
      allow_orphans: 1,
    },
  });
