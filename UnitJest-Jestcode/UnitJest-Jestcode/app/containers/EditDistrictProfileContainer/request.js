import API, { getFormAPIObject } from 'utils/request';

export const getTimeZones = sessionId =>
  API.get('/SlmsConfig', {
    params: {
      command: 'get_time_zones',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);

export const updateDistrictProfile = (sessionId, updateData) =>
  getFormAPIObject
    .post('/SlmsDistrict', updateData, {
      params: {
        command: 'update',
        sid: sessionId,
      },
    })
    .then(response => response.output_data[0]);
