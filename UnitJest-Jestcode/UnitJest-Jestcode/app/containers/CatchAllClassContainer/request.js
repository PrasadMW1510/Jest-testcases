import API, { getBaseUrlWithoutSlms } from 'utils/request';
export const getStudentDetails = (sessionId, classId) =>
  API.post(`/SlmsClass`, '', {
    params: {
      command: 'get_enrollment',
      class_id: classId,
      sid: sessionId,
    },
  }).then(response => response);

export const postNewAssignment = (sessionId, requestData) =>
  API.post(`/SlmsSdp`, requestData, {
    params: {
      command: 'create_class_assignment',
      sid: sessionId,
    },
  }).then(response => response);

export const setRead180DataRequestAction = (read180Data, sessionId) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, read180Data, {
    params: {
      command: 'create_class_assignment',
      sid: sessionId,
    },
  }).then(response => response);
