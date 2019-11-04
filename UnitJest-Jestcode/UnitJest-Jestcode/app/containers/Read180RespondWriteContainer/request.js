import API from 'utils/request';
import { COHORT_TYPE } from 'containers/App/constants';

export const getRead180ResponseWrite = (read180Data, sessionId, userId) =>
  API.post('/SlmsSdp', read180Data, {
    params: {
      sid: sessionId,
      command: 'get_student_submissions',
      cohort_id: userId,
      cohort_type: COHORT_TYPE.Teacher.toLowerCase(),
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
    },
  }).then(response => response);

export const setRead180ResponseWrite = (read180Data, sessionId, appId) =>
  API.post('/SlmsSdp', read180Data, {
    params: {
      sid: sessionId,
      command: 'evaluate_student_submissions',
      app_id: appId,
    },
  }).then(response => response);
