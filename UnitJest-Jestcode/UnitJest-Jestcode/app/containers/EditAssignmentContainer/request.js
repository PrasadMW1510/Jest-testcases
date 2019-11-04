import API from 'utils/request';

export const postAssignmentData = (sessionId, classId, requestData) =>
  API.post(`/SlmsSdp`, requestData, {
    params: {
      command: 'get_class_assignments',
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      cohort_id: classId,
      cohort_type: 'class',
      sid: sessionId,
    },
  }).then(response => response);

export const getStudentDetails = (sessionId, classId) =>
  API.post(`/SlmsClass`, '', {
    params: {
      command: 'get_enrollment',
      class_id: classId,
      sid: sessionId,
    },
  }).then(response => response);

export const saveAssignmentRequest = (sessionId, isStudentWorkItem, workItemId, payload) =>
  API.post(`/SlmsSdp`, payload, {
    params: {
      command: 'update_class_assignment',
      sid: sessionId,
      workItemId,
      isStudentWorkItem,
    },
  }).then(response => response);

export const deleteAssignmentRequest = (sessionId, isStudentWorkItem, workItemId) =>
  API.post(`/SlmsSdp`, '<>', {
    params: {
      command: 'delete_class_assignment',
      sid: sessionId,
      workItemId,
      isStudentWorkItem,
    },
  }).then(response => response);
