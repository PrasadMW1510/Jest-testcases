import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const getRead180DataRequestAction = (read180Params, sessionId, userID) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, read180Params, {
    params: {
      sid: sessionId,
      command: 'get_student_submissions',
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      cohort_type: 'teacher',
      cohort_id: userID,
    },
  }).then(response => response);

export const setRead180DataRequestAction = (read180Data, sessionId, workItemId) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, read180Data, {
    params: {
      sid: sessionId,
      command: 'update_class_assignment',
      isStudentWorkItem: true,
      workItemId,
    },
  }).then(response => response);

export const deleteRead180DataRequestAction = (read180Data, sessionId, workItemId) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, read180Data, {
    params: {
      command: 'delete_class_assignment',
      sid: sessionId,
      workItemId,
      isStudentWorkItem: true,
    },
  }).then(response => response);
