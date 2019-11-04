import API from 'utils/request';

/**
 * Gets report list from SLMS
 *
 * @param sessionId
 * @param cohortType
 * @param cohortId
 */
export const getReportList = (sessionId, cohortType, cohortId) =>
  API.get('/SlmsReport', {
    params: {
      command: 'get_list',
      sid: sessionId,
      cohort_type: cohortType,
      cohort_id: cohortId,
    },
  }).then(response => response.output_data[0].reports[0].report);

export const getReportId = (typeId, baseUrl, url, pdfQs, callBack) =>
  API.get(url).then(response => {
    window.open(
      `${baseUrl}/SlmsReportPdf/${response.output_data[0].report[0].$.id}/${typeId}.pdf${pdfQs}`,
      '_blank'
    );
    callBack(1);
    return response.output_data[0].report[0].$.id;
  });
