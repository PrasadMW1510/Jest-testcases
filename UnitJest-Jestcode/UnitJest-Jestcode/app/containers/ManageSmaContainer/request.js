import API from 'utils/request';

/**
 * Get media servers for the given district
 * @param sessionId
 * @param districtId
 */
export const getMediaServers = (sessionId, districtId) =>
  API.get('/SlmsMediaServer', {
    params: {
      command: 'getMediaServers',
      sid: sessionId,
      district_id: districtId,
    },
  }).then(response => response.output_data[0].media_servers[0].media_server);
