import API from '../../utils/request';

/**
 * Gets Admins for Manage Account Admins
 *
 * @param sessionId
 * @param districtId
 * @returns {PromiseLike<{login: {}[]}> | Promise<{login: {}[]}> | *}
 */
export const getAdmins = (sessionId, districtId) =>
  API.get('/SlmsDistrict', {
    params: {
      command: 'get_admins',
      sid: sessionId,
      district_id: districtId,
    },
  }).then(response => response.output_data[0].organizations[0].organization);

export const getSchools = (sessionId, districtId) =>
  API.get('/SlmsSchool', {
    params: {
      command: 'get_admins',
      sid: sessionId,
      school_id: districtId,
    },
  }).then(response => response.output_data[0].organization);
