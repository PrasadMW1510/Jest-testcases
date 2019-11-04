import API from 'utils/request';

export const postReactivateSchool = (sessionId, reactivateSchoolPayload) => {
  const result = API.post('/SlmsSchool', reactivateSchoolPayload, {
    params: {
      command: 'set_district',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);
  return result;
};
