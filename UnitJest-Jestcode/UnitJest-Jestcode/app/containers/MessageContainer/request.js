import API from '../../utils/request';

/**
 * Gets the messages for the message table
 *
 * @param sessionId
 * @param userId
 * @returns {PromiseLike<{}> | Promise<{}> | *}
 */
export const getMessageData = (sessionId, userId) =>
  API.get('/SlmsMessage', {
    params: {
      command: 'get_message',
      sid: sessionId,
      user_id: userId,
    },
  }).then(response => response.output_data[0].messages[0]);

/**
 * Deletes message(s) from the message table
 *
 * @param sessionId
 * @param messageXML
 * @returns {PromiseLike<{login: {}[]}> | Promise<{login: {}[]}> | *}
 */
export const postDeleteMessages = (sessionId, messageXML) =>
  API.post('/SlmsMessage', messageXML, {
    params: {
      command: 'remove_messages',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);
