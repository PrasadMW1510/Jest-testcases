import { getBaseUrlWithoutSlmsObject } from 'utils/request';
import { COHORT_TYPE } from 'containers/App/constants';

/**
 * Gets RI settings for a given cohort that is not of type 'Grade'.
 */
export const getRISettings = ({ sessionId, cohortId, cohortType }) =>
  getBaseUrlWithoutSlmsObject
    .get('/sri/SRIProductCtrls', {
      params: {
        command: 'get_settings',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: cohortType.toLowerCase(),
      },
    })
    .then(response => response.output.output_data);

/**
 * Gets RI settings for a grade type cohort
 */
export const getRISettingsForGrade = ({ sessionId, cohortId, schoolId }) =>
  getBaseUrlWithoutSlmsObject
    .get('/sri/SRIProductCtrls', {
      params: {
        command: 'get_settings',
        sid: sessionId,
        cohort_id: cohortId,
        school_id: schoolId,
        cohort_type: COHORT_TYPE.Grade.toLowerCase(),
      },
    })
    .then(response => response.output.output_data);

/**
 * Gets the proficiency band data for RI
 *
 * @param sessionId
 */
export const getRIProficiencyBandData = sessionId =>
  getBaseUrlWithoutSlmsObject
    .get('/sri/SRIProductCtrls', {
      params: {
        command: 'get_proficiency_bands',
        sid: sessionId,
      },
    })
    .then(response => response.output.output_data[0].sri_proficiency_bands[0]);

/**
 * Update RI Program Settings
 *
 */
export const postRISettings = ({ cohortId, cohortType, programSettingsObj, sessionId }) =>
  getBaseUrlWithoutSlmsObject
    .post('/sri/SRIProductCtrls', programSettingsObj, {
      params: {
        cohort_id: cohortId,
        cohort_type: cohortType.toLowerCase(),
        command: 'set_settings',
        sid: sessionId,
      },
    })
    .then(response => response.output_data);

/**
 * Update RI Program Settings
 *
 */
export const postRISettingsForGrade = ({ cohortId, programSettingsObj, schoolId, sessionId }) =>
  getBaseUrlWithoutSlmsObject
    .post('/sri/SRIProductCtrls', programSettingsObj, {
      params: {
        cohort_id: cohortId,
        cohort_type: COHORT_TYPE.Grade.toLowerCase(),
        command: 'set_settings',
        school_id: schoolId,
        sid: sessionId,
      },
    })
    .then(response => response.output_data);

/**
 * Update RI Proficiency Band data
 *
 */
export const postRIProficiencyBandData = ({ districtId, proficiencyBandData, sessionId }) =>
  getBaseUrlWithoutSlmsObject
    .post('/sri/SRIProductCtrls', proficiencyBandData, {
      params: {
        cohort_id: districtId,
        cohort_type: COHORT_TYPE.District.toLowerCase(),
        command: 'set_proficiency_bands',
        sid: sessionId,
      },
    })
    .then(response => response.output_data);
