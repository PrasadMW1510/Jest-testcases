import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const postExportTeacherMadeQuizReq = (sessionId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, data, {
    params: {
      sid: sessionId,
      command: 'export_teacher_made_quiz',
    },
  }).then(() => {});
