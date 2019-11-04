//  import axios from 'axios';
import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const getPfStudentGoalRequest = (sessionId, userid, messageObject) =>
  API.post(`/SlmsTeacher`, messageObject, {
    params: {
      command: 'get_classes_by_communityId',
      sid: sessionId,
      user_id: userid,
      communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
    },
  }).then(response => response);

// export const getPfSGGridRequest = (sessionId, userid, classId, messageObject) =>
// API.post(`/SlmsSdp`, messageObject, {
//   params: {
//     command: 'get_class_assignments_metadata',
//     sid: sessionId,
//     user_id:userid,
//     communityIds: 'R180NG,S44NG,S44JR,M180,M180Y2',
//     cohort_type:'class',
//     cohort_id:classId.classid,
//   },
// }).then(response => response);

export const getPfSGGridRequest = (sessionId, userid, classId, messageObject) =>
  API.post(`${getBaseUrlWithoutSlms()}/S44NG/s44ngProductCtrls.cd`, messageObject, {
    params: {
      command: 'GetStudentGoalsSummary',
      sid: sessionId,
      class_id: classId.classid,
    },
  }).then(response => response);
