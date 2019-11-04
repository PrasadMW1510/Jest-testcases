import API from 'utils/request';

export const getInBoxGridRequest = (sessionId, userid, messageObject) =>
  API.post(`/SlmsTeacher`, messageObject, {
    params: {
      command: 'get_classes_by_communityId',
      sid: sessionId,
      user_id: userid,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
    },
  }).then(response => response);

export const getStudentSubmissionDataRequest = (sessionId, userId, classId, messageObject) =>
  API.post(`/SlmsSdp`, messageObject, {
    params: {
      command: 'get_student_submissions_metadata',
      sid: sessionId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      user_id: userId,
      cohort_type: 'class',
      cohort_id: classId,
    },
  }).then(response => response);

export const getPortfolioStudentTreeData = (sessionId, classId, messageObject) =>
  API.post(`/SlmsClass`, messageObject, {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      class_id: classId.data[0],
    },
  }).then(response => response);

export const getStudentListClassData = (sessionId, classId, userId, messageObject) =>
  API.post(`/SlmsSdp`, messageObject, {
    params: {
      command: 'get_student_submissions_metadata',
      sid: sessionId,
      class_id: 'fvapln81ed0c1mfgkt25s0pq_2efa7f0',
      user_id: userId,
      cohort_id: 'fvapln81ed0c1mfgkt25s0pq_2efa7f0',
      cohort_type: 'teacher',
      graded: false,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
    },
  }).then(response => response);
