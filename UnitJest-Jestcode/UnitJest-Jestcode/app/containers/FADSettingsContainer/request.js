import { getBaseUrlWithoutSlmsObject } from 'utils/request';

/**
 * Gets report list from SLMS
 *
 * @param sessionId
 * @param cohortType
 * @param cohortId
 */
export const setFADsettings = (sessionId, cohortType, cohortId, retake, reset) =>
  getBaseUrlWithoutSlmsObject
    .post(
      `/fn/FADProductControls?command=setSettings&sid=${sessionId}&cohort_type=${cohortType}&cohort_id=${cohortId}`,
      { params: { advanced_settings: { retake_final: retake, reset_to_initial: reset } } }
    )
    .then(response => response.output.output_data[0].setSettings[0].result);

export const getFADSettings = (sessionId, cohortType, cohortId) =>
  getBaseUrlWithoutSlmsObject
    .get('/fn/FADProductControls', {
      params: {
        command: 'getSettings',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: cohortType,
      },
    })
    .then(response => response.output.output_data[0].getSettings[0].advanced_settings[0]);
