import { COHORT_TYPE, USER_ORG } from 'containers/App/constants';

export function createEnrollmentURLObj(cohortObj, sessionId, userOrgType = null, userOrgId = null) {
  const cohortId = cohortObj.id;
  const command = 'get_enrollment_count';
  switch (cohortObj.cohortType) {
    case COHORT_TYPE.District:
      return {
        url: '/SlmsDistrict',
        params: {
          command,
          sid: sessionId,
          district_id: cohortId,
        },
      };
    case COHORT_TYPE.School:
      return {
        url: '/SlmsSchool',
        params: {
          command,
          sid: sessionId,
          school_id: cohortId,
        },
      };
    case COHORT_TYPE.Grade: {
      const gradeId = cohortId;
      let schoolId = cohortObj.schoolId;
      if (userOrgType === USER_ORG.School) {
        schoolId = userOrgId;
      }

      return {
        url: '/SlmsGrade',
        params: {
          command,
          sid: sessionId,
          school_id: schoolId,
          grade: gradeId,
        },
      };
    }
    case COHORT_TYPE.Teacher:
      return {
        url: '/SlmsTeacher',
        params: {
          command,
          sid: sessionId,
          user_id: cohortId,
        },
      };
    case COHORT_TYPE.Class:
      return {
        url: '/SlmsClass',
        params: {
          command,
          sid: sessionId,
          class_id: cohortId,
        },
      };
    case COHORT_TYPE.Group:
      return {
        url: '/SlmsGroup',
        params: {
          command,
          sid: sessionId,
          group_id: cohortId,
        },
      };
    default:
      // default case is Student
      return {
        url: '/SlmsStudent',
        params: {
          command,
          sid: sessionId,
          user_id: cohortId,
        },
      };
  }
}

/**
 * array with two keys to compare, and the comparator function to use (see maxComp)
 * @param arr
 * @param key
 * @param key2
 * @param comparatorFn
 * @returns {*}
 */
const findBy = (arr, key, key2, comparatorFn) => {
  if (arr.length === 0) return null;
  return arr.reduce(
    (prev, curr, index, ary) => (comparatorFn.call(ary, prev, curr, key, key2) ? prev : curr)
  );
};

/**
 * compares items by 'key' and returns item with the largest. if key are equal then return item with smaller 'key2'
 * @param prev
 * @param curr
 * @param key
 * @param key2
 * @returns {boolean}
 */
const maxComp = (prev, curr, key, key2) => {
  if (prev[key] === curr[key]) {
    return prev[key2] < curr[key2];
  }
  return prev[key] > curr[key];
};

export const getEnrollmentCount = (applicationIds, enrollmentList) => {
  const items = enrollmentList.toJS();
  // get the application entries from the API response that were identified in this function's param
  const targetAppsFromApiResponse = items.filter(
    item => applicationIds.indexOf(item['application.id'][0]) >= 0
  );
  return targetAppsFromApiResponse.reduce(
    (total, current) => total + Number(current.students[0].total[0]),
    0
  );
};

/**
 *  return an array with the details of the enrollment count.
 *  e.g.
 *  [{applicationId: "XT_I", enrollmentCount: 23 },
 *  {applicationId: "XT_II", enrollmentCount: 99 },
 *  {applicationId: "XT_III", enrollmentCount: 11 }]
 * @param applicationIds
 * @param enrollmentList
 * @returns {*}
 */
export const getEnrollmentCountDetails = (applicationIds, enrollmentList) => {
  const items = enrollmentList.toJS();
  // get the application entries from the API response that were identified in this function's param
  const targetAppsFromApiResponse = items.filter(
    item => applicationIds.indexOf(item['application.id'][0]) >= 0
  );
  return targetAppsFromApiResponse.map(app => ({
    applicationId: app['application.id'][0],
    enrollmentCount: Number(app.students[0].total[0]),
  }));
};

/**
 *
 * @param applicationIds
 * @param enrollmentList
 * @returns {*|{applicationId: string}}
 */
export const getMaxEnrolledProduct = (applicationIds, enrollmentList) => {
  const details = getEnrollmentCountDetails(applicationIds, enrollmentList);
  return findBy(details, 'enrollmentCount', 'applicationId', maxComp) || { applicationId: '' };
};
