import API, { getBaseUrlWithoutSlms, getBaseUrl } from 'utils/request';

export const getBookLabelData = (sessionId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, data, {
    params: {
      command: 'print_book_labels',
      sid: sessionId,
    },
  }).then(response => {
    window.open(
      `${getBaseUrl()}/SlmsReportPdf/${
        response.output_data[0].report[0].$.id
      }/be_02.pdf?sortOnElement=book&sortByElement=title&sortOrder=undefined`,
      '_blank'
    );
  });
