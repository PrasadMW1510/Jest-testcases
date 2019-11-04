import API from 'utils/request';

export const getPortfolioClassData = (sessionId, userid, distId, messageObject) =>
  API.post('/SlmsDistrict', messageObject, {
    params: {
      command: 'get_schools_by_communityId',
      sid: sessionId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      district_id: distId.distId,
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
      cohort_type: 'class',
      cohort_id: classId,
    },
  }).then(response => response);

export const getPortfolioStudentTreeData = (sessionId, classId, messageObject) =>
  API.post('/SlmsClass', messageObject, {
    params: {
      command: 'get_enrollment',
      sid: sessionId,
      class_id: classId.data[0],
    },
  }).then(response => response);

export const getStudentSubmissionNodeRequest = (sessionId, userId, studentId, messageObject) =>
  API.post('/SlmsSdp', messageObject, {
    params: {
      command: 'get_student_submissions_metadata',
      sid: sessionId,
      user_id: userId,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
      cohort_type: 'student',
      cohort_id: studentId,
    },
  }).then(response => response);
