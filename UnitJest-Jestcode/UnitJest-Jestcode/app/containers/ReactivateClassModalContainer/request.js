import API from 'utils/request';

export const postReactivateClass = (sessionId, reactivateClassPayload) => {
  const result = API.post('/SlmsClass', reactivateClassPayload, {
    params: {
      command: 'set_school',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);
  return result;
};
