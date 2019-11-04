import API from '../../utils/request';

/**
 * Get Certifcate Info from SLMS
 *
 * @param sessionId
 * @param cohortType
 * @param cohortId
 */
export const getCertificateInfo = (sessionId, cohortId, cohortType) =>
  API.get('/SlmsCertificate', {
    params: {
      command: 'get_certificate_info',
      sid: sessionId,
      cohort_id: cohortId,
      cohort_type: cohortType.toLowerCase(),
    },
  }).then(response => response.output_data[0].certificate_info[0]);
