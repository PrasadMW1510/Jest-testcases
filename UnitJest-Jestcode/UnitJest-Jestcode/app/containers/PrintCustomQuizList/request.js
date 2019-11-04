import API, { getBaseUrlWithoutSlms, getBaseUrl } from 'utils/request';

export const getPrintCustomQuizListPreviewData = (sessionId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, data, {
    params: {
      command: 'print_quiz_list',
      sid: sessionId,
    },
  }).then(response => {
    window.open(
      `${getBaseUrl()}/SlmsReportPdf/${
        response.output_data[0].report[0].$.id
      }/qm_01.pdf?sortOnElement=book&sortByElement=title&sortOrder=asc`,
      '_blank'
    );
  });
