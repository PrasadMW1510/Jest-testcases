import API, { getBaseUrlWithoutSlms, getBaseUrl } from 'utils/request';

export const getPrintQuizAndAnswerData = (sessionId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, data, {
    params: {
      sid: sessionId,
      command: 'print_quiz',
    },
  }).then(response => {
    window.open(
      `${getBaseUrl()}/SlmsReportPdf/${response.output_data[0].report[0].$.id}/qm_02.pdf`,
      '_blank'
    );
  });

export const getQuizWithQuestions = (sessionId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, data, {
    params: {
      command: 'get_quiz_with_questions',
      sid: sessionId,
    },
  }).then(() => {});
