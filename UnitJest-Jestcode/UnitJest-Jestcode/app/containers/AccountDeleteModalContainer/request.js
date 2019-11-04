import API from 'utils/request';
import { COHORT_TYPE } from 'containers/App/constants';

export const postAccountsDelete = (sessionId, deletePayload) => {
  const result = API.post('/SlmsStudent', deletePayload, {
    params: {
      command: 'disable_if_unattached',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);
  return result;
};

export const postAccountsMIADelete = (sessionId, deletePayload, cohortType) => {
  let request = '';
  let command = 'disable_if_unattached';
  switch (cohortType) {
    case COHORT_TYPE.Student:
      request = '/SlmsStudent';
      break;
    case COHORT_TYPE.Teacher:
      request = '/SlmsTeacher';
      break;
    case COHORT_TYPE.Class:
      request = '/SlmsClass';
      command = 'delete';
      break;
    case COHORT_TYPE.School:
      request = '/SlmsSchool';
      command = 'delete';
      break;
    default:
      request = '/SlmsStudent';
      break;
  }

  const result = API.post(request, deletePayload, {
    params: {
      command,
      sid: sessionId,
    },
  }).then(response => (response.output_data[0] ? response.output_data[0] : response));

  return result;
};

export const postAccountsUnenroll = (sessionId, unenrollPayload) => {
  const result = API.post('/SlmsStudent', unenrollPayload, {
    params: {
      command: 'unenroll_if_unattached',
      sid: sessionId,
    },
  }).then(response => response.output_data[0]);
  return result;
};
