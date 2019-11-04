import { getBaseUrlWithoutSlmsObject } from 'utils/request';
import { COHORT_TYPE } from 'containers/App/constants';

/**
 * Gets MI settings for a given cohort that is not of type 'Grade'.
 */
export const getMISettings = ({ sessionId, cohortId, cohortType }) =>
  getBaseUrlWithoutSlmsObject
    .get('/smi/SMIProductControls', {
      params: {
        command: 'getSettings',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: cohortType.toLowerCase(),
      },
    })
    .then(response => response.output.output_data[0].getSettings[0]);

/**
 * Gets MI settings for a grade type cohort
 */
export const getMISettingsForGrade = ({ sessionId, cohortId, schoolId }) =>
  getBaseUrlWithoutSlmsObject
    .get('/smi/SMIProductControls', {
      params: {
        command: 'getSettings',
        sid: sessionId,
        cohort_id: cohortId,
        school_id: schoolId,
        cohort_type: COHORT_TYPE.Grade.toLowerCase(),
      },
    })
    .then(response => response.output.output_data[0].getSettings[0]);

/**
 * Gets the proficiency band data for MI
 *
 */
export const getMIProficiencyBandData = ({ cohortId, cohortType, sessionId }) =>
  getBaseUrlWithoutSlmsObject
    .get('/smi/SMIProductControls', {
      params: {
        cohort_id: cohortId,
        cohort_type: cohortType,
        command: 'getAdvancedSettings',
        sid: sessionId,
      },
    })
    .then(
      response => response.output.output_data[0].getAdvancedSettings[0].smi_proficiency_bands[0]
    );

/**
 * Update MI Program Settings
 *
 */
export const postMISettings = ({ cohortId, cohortType, programSettingsObj, sessionId }) =>
  getBaseUrlWithoutSlmsObject
    .post('/smi/SMIProductControls', programSettingsObj, {
      params: {
        cohort_id: cohortId,
        cohort_type: cohortType.toLowerCase(),
        command: 'setSettings',
        sid: sessionId,
      },
    })
    .then(response => response.output_data);

/**
 * Update MI Program Settings
 *
 */
export const postMISettingsForGrade = ({ cohortId, programSettingsObj, schoolId, sessionId }) =>
  getBaseUrlWithoutSlmsObject
    .post('/smi/SMIProductControls', programSettingsObj, {
      params: {
        cohort_id: cohortId,
        cohort_type: COHORT_TYPE.Grade.toLowerCase(),
        command: 'setSettings',
        school_id: schoolId,
        sid: sessionId,
      },
    })
    .then(response => response.output_data);

/**
 * Update MI Proficiency Band data
 *
 */
export const postMIProficiencyBandData = ({ districtId, proficiencyBandData, sessionId }) =>
  getBaseUrlWithoutSlmsObject
    .post('/smi/SMIProductControls', proficiencyBandData, {
      params: {
        cohort_id: districtId,
        cohort_type: COHORT_TYPE.District.toLowerCase(),
        command: 'setAdvancedSettings',
        sid: sessionId,
      },
    })
    .then(response => response.output_data);
