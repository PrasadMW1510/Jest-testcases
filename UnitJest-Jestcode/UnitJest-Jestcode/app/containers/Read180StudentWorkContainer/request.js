import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const getRead180StudentWorksAction = (read180Params, sessionId, userID) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, read180Params, {
    params: {
      command: 'get_student_submissions',
      cohort_type: 'teacher',
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      sid: sessionId,
      cohort_id: userID,
    },
  }).then(response => response);

export const setRead180SwDataRequestAction = (read180Data, sessionId) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, read180Data, {
    params: {
      command: 'evaluate_student_submissions',
      app_id: 'RTNG',
      sid: sessionId,
    },
  }).then(response => response);
