import API from 'utils/request';

export const getAssignmentSuccessRecordData = (
  sessionId,
  cohortId,
  communityIds,
  cohortType,
  xmlPayload
) =>
  API.post('/SlmsSdp', xmlPayload, {
    params: {
      command: 'get_student_submissions',
      sid: sessionId,
      cohort_id: cohortId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      cohort_type: cohortType,
    },
  }).then(response => response);

export const assignmentSaveSuccessRecordData = (sessionId, cohortId, xmlPayload) =>
  API.post('/SlmsSdp', xmlPayload, {
    params: {
      command: 'evaluate_student_submissions',
      sid: sessionId,
      app_id: cohortId,
    },
  }).then(response => response);
