import API from 'utils/request';

export const getPfAsignRequest = (sessionId, userid, messageObject) =>
  API.post(`/SlmsTeacher`, messageObject, {
    params: {
      command: 'get_classes_by_communityId',
      sid: sessionId,
      user_id: userid,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
    },
  }).then(response => response);

export const getPfAsignGridRequest = (sessionId, userid, classId, messageObject) =>
  API.post(`/SlmsSdp`, messageObject, {
    params: {
      command: 'get_class_assignments_metadata',
      sid: sessionId,
      user_id: userid,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      cohort_type: 'class',
      cohort_id: classId.data,
    },
  }).then(response => response);

export const saveAssignmentRequest = (sessionId, isStudentWorkItem, workItemId, messageObject) =>
  API.post(`/SlmsSdp`, messageObject, {
    params: {
      command: 'update_class_assignment',
      sid: sessionId,
      isStudentWorkItem,
      workItemId,
    },
  }).then(response => response);
