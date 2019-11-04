import axios from 'axios';
import { parseString, Builder } from 'xml2js';
import { getSSOReferrer } from './cookieManager';
import getErrorMsg from './slmsErrors';
/**
 * Gets the base URL for all API calls.
 */
export const getBaseUrl = () => {
  let baseUrl = window.location.origin;
  const REFERRER_BASE_URL = getSSOReferrer();
  // if the referrer cookie base URL actually has a value, then use it
  if (REFERRER_BASE_URL) {
    baseUrl = REFERRER_BASE_URL;
  } else if (process.env.NODE_ENV !== 'development' && baseUrl.indexOf('localhost') === -1) {
    // otherwise, if we're not running locally, warn about it.
    // TODO: Find a more graceful exit here.
  } else {
    // otherwise, we're running locally, so use a hard-coded value
    baseUrl = 'https://h511000002.education.scholastic.com/slms';
  }
  return baseUrl;
};
/**
 * Divides the given string using delemiter '/'
 * @param url String
 * @return first String
 */
// const deleteSlash = url => url.split('/', 3);

export const getServerName = () => getBaseUrlWithoutSlms();

/**
 * Get SAM Resource Url
 */
export const getBaseResourceUrl = () => 'https://samresources.education.scholastic.com';

/**
 * Get Base Url without slms
 * getBaseUrl().slice(0, 43); // getBaseUrl().substr(0, getBaseUrl().length - 5);
 */

export const getBaseUrlWithoutSlms = () => {
  const splitstring = getBaseUrl()
    .replace('//', '/')
    .split('/', 2);
  const result = `${splitstring[0]}//${splitstring[1]}`;
  return result;
};

/**
 * Parses XML to JSON in a promise
 *
 * @param xmlString
 * @returns {Promise.<JSON>}
 */
export const xmlToJSON = xmlString =>
  new Promise((resolve, reject) => {
    parseString(xmlString, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

/**
 * Parse error messages from bundle into something more readable
 *
 * @param output
 * @returns {*} user-friendly error message
 */
export const parseErrorMessage = output => {
  const errCode = output.command_status[0].error_data[0].error_code[0];
  const serverErrMsg = output.command_status[0].error_data[0].error_message[0];

  return getErrorMsg(errCode, serverErrMsg);
};

export const parseFormErrorMessage = output => {
  const errorArray = output.command_status[0].error_data[0].error;
  const errorResponseObj = {};

  if (errorArray) {
    errorArray.forEach(errorObj => {
      const errorMsg = getErrorMsg(errorObj.error_code[0], errorObj.error_message[0]);
      if (errorMsg === '') {
        errorResponseObj[errorObj.error_source[0]] = true;
      } else {
        errorResponseObj[errorObj.error_source[0]] = errorMsg;
      }
      // also check for any meta-data (e.g. suggestions on valid form values)
      const errorMetaList = errorObj.error_meta;
      if (errorMetaList) {
        errorResponseObj.errorMeta = errorMetaList[0];
      }
    });

    return errorResponseObj;
  }

  // If there is no errorArray we want to return the normal error.
  const errCode = output.command_status[0].error_data[0].error_code[0];
  const serverErrMsg = output.command_status[0].error_data[0].error_message[0];

  return { error: getErrorMsg(errCode, serverErrMsg) };
};

/**
 * SAM server always return's 200 as status.
 * We need to look into the response bundle to see if the API call was okay.
 *
 * @param res
 */
const isResponseOk = res => res.command_status[0].result_code[0] === '0';

/**
 * Intercept HTTP responses before they're handled.
 *
 * @param res
 */
export const responseInterceptor = res =>
  xmlToJSON(res.data).then(
    ({ output }) => (isResponseOk(output) ? output : Promise.reject(parseErrorMessage(output)))
  );

export const formResponseInterceptor = res =>
  xmlToJSON(res.data).then(
    ({ output }) => (isResponseOk(output) ? output : Promise.reject(parseFormErrorMessage(output)))
  );

/**
 * Intercept HTTP request.
 * If there is data being sent it will convert it to XML.
 *
 * @param config
 * @returns {*}
 */
export const requestInterceptor = config => {
  const configObj = config;

  // We only want to convert data if it is an object
  if (typeof configObj.data === 'object') {
    configObj.data = new Builder({ headless: true }).buildObject(config.data);
  }

  return configObj;
};

/**
 * Return a custom Axios object that handles common API behavior.
 *
 * @returns {AxiosInstance}
 */
const getAPIObject = (() => {
  const API = axios.create({
    baseURL: getBaseUrl(),
  });

  // Content-Type for posts need to be in the format of application/xml
  API.defaults.headers.post['Content-Type'] = 'application/xml; charset=UTF-8';

  API.interceptors.response.use(responseInterceptor);

  API.interceptors.request.use(requestInterceptor);

  return API;
})();

export const getFormAPIObject = (() => {
  const API = axios.create({
    baseURL: getBaseUrl(),
  });

  // Content-Type for posts need to be in the format of application/xml
  API.defaults.headers.post['Content-Type'] = 'application/xml; charset=UTF-8';

  API.interceptors.response.use(formResponseInterceptor);

  API.interceptors.request.use(requestInterceptor);

  return API;
})();

/**
 * Intercept HTTP responses for Resource before they're handled.
 */
export const resourceResponseInterceptor = response => {
  const sanitize = response.data.replace(' & ', ' &amp; ');
  return xmlToJSON(sanitize).then(res => res);
};

/**
 * Return a custom Axios object for Resource API.
 */
export const getResourceObject = (() => {
  const ResourceAPI = axios.create({
    baseURL: getBaseResourceUrl(),
  });

  ResourceAPI.defaults.headers.post['Content-Type'] = 'application/xml; charset=UTF-8';

  ResourceAPI.interceptors.response.use(resourceResponseInterceptor);
  ResourceAPI.interceptors.request.use(requestInterceptor);

  return ResourceAPI;
})();

/**
 * Intercept HTTP responses for Resource before they're handled.
 */
export const baseUrlWithoutSlms = response => {
  const sanitize = response.data.replace(' & ', ' &amp; ');
  return xmlToJSON(sanitize).then(res => res);
};

/**
 * Return a custom Axios object for Resource API.
 */
export const getBaseUrlWithoutSlmsObject = (() => {
  const BaseUrlWithoutSlmsAPI = axios.create({
    baseURL: getBaseUrlWithoutSlms(),
  });
  BaseUrlWithoutSlmsAPI.defaults.headers.post['Content-Type'] = 'application/xml; charset=UTF-8';
  BaseUrlWithoutSlmsAPI.interceptors.response.use(baseUrlWithoutSlms);
  BaseUrlWithoutSlmsAPI.interceptors.request.use(requestInterceptor);
  return BaseUrlWithoutSlmsAPI;
})();

export default getAPIObject;

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @return {object}           The response data
 */
export function getUrl(url) {
  return getBaseUrlWithoutSlmsObject.get(url).then(response => response);
}

/**
 * Post to a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @return {object}           The response data
 */
export function postUrl(url, data) {
  return getBaseUrlWithoutSlmsObject.post(url, data).then(response => response);
}

/**
 * Parses axios response
 * @param response
 * @returns {Error}
 */
export function parseResponse(response) {
  if (response.status === '204' || response.status === '205') {
    const error = new Error(response.status, response.statusText);
    error.response = response;
    return error;
  }

  return response.data;
}

export const getSkillQuestionURL = () => 'https://sam-nonprod-cdn.education.scholastic.com';
