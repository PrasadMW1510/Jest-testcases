import { getResourceObject } from 'utils/request';

/**
 * Gets list of applications.
 *
 * @param sessionId
 * @returns {Promise.<TResult>}
 */
export const getAppResources = (appId, epochTime) =>
  getResourceObject
    .get('/ResourceManager/client.dll', {
      params: {
        command: 'initialize_search_page',
        program: appId,
        cb: epochTime,
      },
    })
    .then(response => response.page_init.resource_program[0]);

/**
 * List of ITS app information is listed.
 * @param epochTime
 * @returns {Promise|*|PromiseLike<{its_enabled_apps: {application: {}[]}[]}>|Promise<{its_enabled_apps: {application: {}[]}[]}>}
 */
export const getITSApps = epochTime =>
  getResourceObject
    .get('/its_config.xml', {
      params: {
        cb: epochTime,
      },
    })
    .then(response => response.output.output_data[0].its_data[0]);

/**
 * Perform post call to the SAM resources server based on the user selection.
 * @param epochtime
 * @param resource
 */
export const postResourcesObjectInfo = (epochtime, resource, activity) =>
  getResourceObject
    .post('/ResourceManager/client.dll', resource, {
      params: {
        command: `${activity}search`,
        cb: epochtime,
      },
    })
    .then(response => response);
