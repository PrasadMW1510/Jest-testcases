import API, { getBaseUrlWithoutSlms } from 'utils/request';

export const postDeactivateQuizRequest = (sessionId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, data, {
    params: {
      sid: sessionId,
      command: 'set_quiz_activation',
    },
  }).then(() => {});
