import API from '../../utils/request';

/**
 * Gets certificate Print Pdf from SLMS Certificate
 *
 * @param sessionId
 */
export const getCertificatePrintPdf = (sessionId, requestParams) =>
  API.post('/SlmsCertificate', requestParams, {
    params: {
      command: 'generate_certificate',
      sid: sessionId,
    },
  }).then(response => response.output_data[0].certificate);
