import { getBaseUrlWithoutSlmsObject } from 'utils/request';
/**
 * Gets Installed stages for R180NG products
 *
 * @param sessionId
 * @param cohortId
 */

export const geInstalledStagesR180NG = sessionId =>
  getBaseUrlWithoutSlmsObject
    .get('/r180ng/r180ngProductCtrls', {
      params: {
        command: 'get_installed_stages',
        sid: sessionId,
      },
    })
    .then(response => response.output.output_data[0].installed_stages[0].stage);

/**
 * Gets District Topic Settings for R180NG
 *
 * @param sessionId
 * @param cohortId
 */

export const getDistrictTopicsR180NG = (sessionId, stageId) =>
  getBaseUrlWithoutSlmsObject
    .get('/r180ng/r180ngProductCtrls', {
      params: {
        command: 'get_district_topics',
        sid: sessionId,
        stage_id: stageId,
      },
    })
    .then(response => response.output.output_data[0].topic_cds[0]);

/**
 * Gets Group Topic Settings for R180NG
 *
 * @param sessionId
 * @param cohortId
 */

export const getGroupTopicsR180NG = (sessionId, stageId, cohortType, cohortId) =>
  getBaseUrlWithoutSlmsObject
    .get('/r180ng/r180ngProductCtrls', {
      params: {
        command: 'get_group_topics',
        sid: sessionId,
        stage_id: stageId,
        cohort_type: cohortType,
        cohort_id: cohortId,
      },
    })
    .then(response => response.output.output_data[0].topic_cds[0].topic_cd);
