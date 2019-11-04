import API, { getBaseUrlWithoutSlms, getBaseUrl } from 'utils/request';

export const getExportCustomQuizListData = (sessionId, data) =>
  API.post(`${getBaseUrlWithoutSlms()}/src/SrcQuizManager`, data, {
    params: {
      command: 'export_titles_to_html',
      sid: sessionId,
    },
  }).then(response => {
    window.open(
      `${getBaseUrl()}/SlmsReportHtml/${
        response.output_data[0].report[0].$.id
      }/qm_04.html?sortOnElement=book&sortByElement=title&sortOrder=asc`,
      '_blank'
    );
  });
