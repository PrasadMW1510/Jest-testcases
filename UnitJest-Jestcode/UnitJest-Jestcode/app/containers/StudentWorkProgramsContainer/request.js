import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const getIReadStudentWorkDataRequest = (sessionId, cohortId, studentobj) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, studentobj, {
    params: {
      command: 'get_student_submissions',
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      cohort_type: 'teacher',
      sid: sessionId,
      cohort_id: cohortId,
    },
  }).then(response => response);

export const postIReadStudentWorkData = (sessionId, workItemIdData, studentobj) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, studentobj, {
    params: {
      command: 'update_class_assignment',
      isStudentWorkItem: true,
      sid: sessionId,
      workItemId: workItemIdData,
    },
  }).then(response => response);

export const delIReadStudentWorkData = (sessionId, workItemIdData, studentobj) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, studentobj, {
    params: {
      command: 'delete_class_assignment',
      isStudentWorkItem: true,
      workItemId: workItemIdData,
      sid: sessionId,
    },
  }).then(response => response);
