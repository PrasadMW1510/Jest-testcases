import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const getCombinedStudentGoalsData = (studentId, sessionId) => {
  const data = '<>';
  return API.post(`${getBaseUrlWithoutSlms()}/S44NG/s44ngProductCtrls.cd`, data, {
    params: {
      command: 'GetCombinedStudentGoals',
      user_id: studentId,
      sid: sessionId,
    },
  }).then(response => response);
};

export const getAllStudentGoalsData = (studentId, sessionId) => {
  const data = '<>';
  return API.post(`${getBaseUrlWithoutSlms()}/S44NG/s44ngProductCtrls.cd`, data, {
    params: {
      command: 'GetStudentAcademicDefaultGoals',
      user_id: studentId,
      sid: sessionId,
    },
  }).then(response => response);
};

export const setStudentAcademicGoals = (studentId, sessionId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/S44NG/s44ngProductCtrls.cd`, data, {
    params: {
      command: 'SetStudentAcademicGoals',
      user_id: studentId,
      sid: sessionId,
    },
  }).then(response => response);

export const setStudentBehaviourGoals = (studentId, sessionId, isUpdate, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/S44NG/s44ngProductCtrls.cd`, data, {
    params: {
      command: 'SetStudentBehavioralGoals',
      user_id: studentId,
      sid: sessionId,
      is_update: isUpdate,
      work_item_id: null,
    },
  }).then(response => response);

export const updateStudentBehaviourGoals = (studentId, sessionId, isUpdate, workItemId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/S44NG/s44ngProductCtrls.cd`, data, {
    params: {
      command: 'SetStudentBehavioralGoals',
      user_id: studentId,
      sid: sessionId,
      is_update: isUpdate,
      work_item_id: workItemId,
    },
  }).then(response => response);

export const getStudentSubmissions = (sessionId, cohortId, communityIds, cohortType, data) =>
  API.post(`/SlmsSdp`, data, {
    params: {
      command: 'get_student_submissions',
      communityIds,
      cohort_type: cohortType,
      sid: sessionId,
      cohort_id: cohortId,
    },
  }).then(response => response);
