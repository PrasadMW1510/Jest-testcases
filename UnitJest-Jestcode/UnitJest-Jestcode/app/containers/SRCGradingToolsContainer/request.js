import { getBaseUrlWithoutSlmsObject } from 'utils/request';

/**
 * Gets SRC points for a student.
 */
export const getSrcGradingPoints = ({ sessionId, cohortId }) =>
  getBaseUrlWithoutSlmsObject
    .get('/src/SrcProductCtrls', {
      params: {
        command: 'get_points',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: 'STUDENT',
      },
    })
    .then(response => response.output.output_data);

/**
 * Gets SRC scores for a student.
 */

export const getSrcGradingScores = ({ sessionId, cohortId }) =>
  getBaseUrlWithoutSlmsObject
    .get('/src/SrcProductCtrls', {
      params: {
        command: 'get_score',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: 'STUDENT',
      },
    })
    .then(response => response.output.output_data);

/**
 * Gets SRC quizzes for a teacher to add.
 */

export const getSrcStudentQuizzes = ({ sessionId, cohortId, searchFilter, curPg }) =>
  getBaseUrlWithoutSlmsObject
    .post('/src/SrcSearch', searchFilter, {
      params: {
        command: 'get_student_quizzes_for_teachers',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: 'STUDENT',
        paginate: true,
        cur_pg: curPg,
        ipp: 250,
      },
    })
    .then(response => response.output);

export const getSrcAddRemoveQuizScore = ({ sessionId, cohortId, searchFilter }) =>
  getBaseUrlWithoutSlmsObject
    .post('/src/SrcProductCtrls', searchFilter, {
      params: {
        command: 'set_score',
        sid: sessionId,
        cohort_id: cohortId,
        cohort_type: 'STUDENT',
      },
    })
    .then(response => response.output);
