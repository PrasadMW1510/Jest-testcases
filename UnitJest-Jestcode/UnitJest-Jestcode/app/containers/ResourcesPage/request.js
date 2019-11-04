import API, { getBaseUrl, xmlToJSON, getResourceObject } from 'utils/request';
import axios from 'axios';

/**
 * Gets list of applications.
 *
 * @param sessionId
 * @returns {Promise.<TResult>}
 */
export const getSlmsApplication = sessionId =>
  API.get('/SlmsApplication', {
    params: {
      sid: sessionId,
      command: 'get_products_for_search',
    },
  }).then(response => response.output_data[0].menu_options[0]);

/**
 * Get SAM build information (Input for the version number for further calls)
 * We are using plan axios and getting the base URL from the request method. Because there is no error code in this api.
 * @param epochTime
 * @returns {Promise|*|PromiseLike<T>|Promise<T>}
 * ToDo: verify not to use extensions since if belongs to the flash client.
 */
export const getBuildInfo = epochTime =>
  axios
    .get(`${getBaseUrl()}/extensions/build_info.xml`, {
      params: {
        cb: epochTime,
      },
    })
    .then(response => xmlToJSON(response.data));

/**
 * Perform post call to SAM resources server to get the standard based information.
 * @param epochtime
 * @param resource
 * @returns {Promise|*|PromiseLike<T>|Promise<T>}
 */
export const quickSearchPostResources = (epochtime, resource) =>
  getResourceObject
    .post('/ResourceManager/client.dll', resource, {
      params: {
        command: 'quicksearch',
        cb: epochtime,
      },
    })
    .then(response => response);
