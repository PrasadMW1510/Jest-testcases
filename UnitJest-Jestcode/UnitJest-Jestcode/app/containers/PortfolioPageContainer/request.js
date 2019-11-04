import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const getPortfolioClassData = (sessionId, userid, messageObject) =>
  API.post('/SlmsTeacher', messageObject, {
    params: {
      command: 'get_classes_by_communityId',
      sid: sessionId,
      user_id: userid,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
    },
  }).then(response => response);

export const getPortfolioGradeData = (sessionId, userid, messageObject, schoolid) =>
  API.post('/SlmsSchool', messageObject, {
    params: {
      command: 'get_grades_by_communityId',
      sid: sessionId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      school_id: schoolid.schoolid[0],
    },
  }).then(response => response);

export const getPortfolioTeacherData = (sessionId, userid, schoolid, gradeid, messageObject) =>
  API.post('/SlmsGrade', messageObject, {
    params: {
      command: 'get_teachers_by_communityId',
      sid: sessionId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      school_id: schoolid,
      grade: gradeid,
    },
  }).then(response => response);

export const getPortfolioClassDataRequest = (sessionId, teacherid, messageObject) =>
  API.post('/SlmsTeacher', messageObject, {
    params: {
      command: 'get_classes_by_communityId',
      sid: sessionId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      user_id: teacherid.teacherId[0],
    },
  }).then(response => response);

export const getStudentSubmissionDataRequest = (sessionId, userId, classId, messageObject) =>
  API.post('/SlmsSdp', messageObject, {
    params: {
      command: 'get_student_submissions_metadata',
      sid: sessionId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      user_id: userId,
      cohort_type: 'teacher',
      cohort_id: classId,
      graded: false,
    },
  }).then(response => response);

export const getAssignmentMetaData = (sessionId, userId, classId, messageObject) =>
  API.post('/SlmsSdp', messageObject, {
    params: {
      command: 'get_class_assignments_metadata',
      sid: sessionId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      user_id: userId,
      cohort_type: 'teacher',
      cohort_id: classId,
      graded: false,
    },
  }).then(response => response);

export const getStudentSubmissionsData = (sessionId, userId, userType) =>
  API.get(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, {
    params: {
      sid: sessionId,
      command: 'get_student_submissions_metadata',
      user_id: userId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      cohort_id: userId,
      cohort_type: userType,
      graded: false,
    },
  }).then(response => response);

export const getClassCommunityData = (sessionId, userId) =>
  API.get(`${getBaseUrlWithoutSlms()}/slms/SlmsTeacher`, {
    params: {
      sid: sessionId,
      command: 'get_classes_by_communityId',
      user_id: userId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
    },
  }).then(response => response);

export const getClassByCommunityId = (sessionId, userId, messageObject) =>
  API.post('/SlmsTeacher', messageObject, {
    params: {
      sid: sessionId,
      command: 'get_classes_by_communityId',
      user_id: userId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
    },
  }).then(response => response);

export const getEnrolmentByCommunityId = (sessionId, classId, messageObject) =>
  API.post('/SlmsClass', messageObject, {
    params: {
      sid: sessionId,
      command: 'get_enrollment',
      class_id: classId,
    },
  }).then(response => response);

export const getRubricData = (sessionId, userId, messageObject) =>
  API.post('/SlmsSdp', messageObject, {
    params: {
      sid: sessionId,
      command: 'get_rubric_definitions',
      cohort_id: userId,
    },
  }).then(response => response);
