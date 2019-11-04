import API, { getBaseUrlWithoutSlms, getSkillQuestionURL } from 'utils/request';
import Axios from 'axios';
import * as Constants from './constants';

/**
 * Get Profile Details for District Admin
 *
 * @param sessionId
 * @param districtId
 */
export const getStudentProgramDetailsDataRequestData = (searchopts, sessionId, userId, userType) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, searchopts, {
    params: {
      sid: sessionId,
      command: 'get_student_submissions',
      communityIds: Constants.COMMUNITY_ID,
      cohort_id: userId,
      cohort_type: userType,
    },
  }).then(response => response);

export const getStudentQuestionRequestData = filepath =>
  Axios.get(`${getSkillQuestionURL()}/slms-static/dev-2017-bts/${filepath}`, {
    params: {},
  }).then(response => response);

export const saveStudentEvaluationDataRequest = (sessionId, appID, postparams) =>
  API.post(`${getBaseUrlWithoutSlms()}/slms/SlmsSdp`, postparams, {
    params: {
      command: 'evaluate_student_submissions',
      app_id: appID,
      sid: sessionId,
    },
  }).then(response => response);
