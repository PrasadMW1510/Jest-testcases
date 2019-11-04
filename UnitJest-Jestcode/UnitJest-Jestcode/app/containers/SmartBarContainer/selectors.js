import { createSelector } from 'reselect';
import * as AppSelectors from 'containers/App/selectors';
import { COHORT_TYPE, USER_ORG } from 'containers/App/constants';

/**
 * Direct selector to the smartBarContainer state domain
 */
const selectSmartBarContainerDomain = state => state.get('smartBar');

/**
 * Other specific selectors
 */

/**
 * Default selector used by SmartBarContainer
 */

const makeSelectSmartBarContainer = () =>
  createSelector(selectSmartBarContainerDomain, substate => substate);

const makeSelectedActiveSchoolId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('activeSchoolId'));

const makeSelectedActiveGradeId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('activeGradeId'));

const makeSelectedActiveTeacherId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('activeTeacherId'));

const makeSelectedActiveClassId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('activeClassId'));

const makeSelectedActiveGroupId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('activeGroupId'));

const makeSelectedActiveStudentId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('activeStudentId'));

/**
 * Returns the selected school id
 * @returns {*}
 */
const makeSelectSchoolId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('selectedSchoolId'));

/**
 * Returns the selected grade id
 * @returns {*}
 */
const makeSelectGradeId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('selectedGradeId'));

/**
 * Returns the selected teacher id
 * @returns {*}
 */
const makeSelectTeacherId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('selectedTeacherId'));

/**
 * Returns the selected group id
 * @returns {*}
 */
const makeSelectGroupId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('selectedGroupId'));

/**
 * Returns the selected student id
 * @returns {*}
 */
const makeSelectStudentId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('selectedStudentId'));

/**
 * Returns the selected class id
 * @returns {*}
 */
const makeSelectClassId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('selectedClassId'));

/**
 * Returns the selected cohort type
 * @returns {*}
 */
const makeSelectCohortType = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('selectedCohType'));

/**
 * Returns the clicked school id
 * @returns {*}
 */
const makeSelectClickedSchoolId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('clickedSchoolId'));

/**
 * Returns the clicked grade id
 * @returns {*}
 */
const makeSelectClickedGradeId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('clickedGradeId'));

/**
 * Returns the clicked teacher id
 * @returns {*}
 */
const makeSelectClickedTeacherId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('clickedTeacherId'));

/**
 * Returns the clicked group id
 * @returns {*}
 */
const makeSelectClickedGroupId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('clickedGroupId'));

/**
 * Returns the clicked student id
 * @returns {*}
 */
const makeSelectClickedStudentId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('clickedStudentId'));

/**
 * Returns the clicked class id
 * @returns {*}
 */
const makeSelectClickedClassId = () =>
  createSelector(makeSelectSmartBarContainer(), substate => substate.get('clickedClassId'));

/**
 * Returns the selected school data
 * @returns {*}
 */
const makeSelectSelectedSchoolData = () =>
  createSelector(
    makeSelectedActiveSchoolId(),
    AppSelectors.makeSelectProfileSchoolsDataMap(),
    (schoolId, schoolData) => (schoolData ? schoolData.get(schoolId) : null)
  );

/**
 * Returns the selected grade data
 * @returns {*}
 */
const makeSelectSelectedGradeData = () =>
  createSelector(
    makeSelectedActiveGradeId(),
    AppSelectors.makeSelectProfileGradesDataMap(),
    (gradeId, gradeData) => (gradeData ? gradeData.get(gradeId) : null)
  );

/**
 * Returns the selected teacher data
 * @returns {*}
 */
const makeSelectSelectedTeacherData = () =>
  createSelector(
    makeSelectedActiveTeacherId(),
    AppSelectors.makeSelectProfileTeachersDataMap(),
    (teacherId, teacherData) => (teacherData ? teacherData.get(teacherId) : null)
  );

/**
 * Returns the selected group data
 * @returns {*}
 */
const makeSelectSelectedGroupData = () =>
  createSelector(
    makeSelectedActiveGroupId(),
    AppSelectors.makeSelectProfileGroupsDataMap(),
    (groupId, groupData) => (groupData ? groupData.get(groupId) : null)
  );

/**
 * Returns the selected student data
 * @returns {*}
 */
const makeSelectSelectedStudentData = () =>
  createSelector(
    makeSelectedActiveStudentId(),
    AppSelectors.makeSelectProfileStudentsDataMap(),
    (studentId, studentData) => (studentData ? studentData.get(studentId) : null)
  );

/**
 * Returns the selected class data
 * @returns {*}
 */
const makeSelectSelectedClassData = () =>
  createSelector(
    makeSelectedActiveClassId(),
    AppSelectors.makeSelectProfileClassesDataMap(),
    (classId, classData) => (classData ? classData.get(classId) : null)
  );

/**
 * Returns the clicked school data
 * @returns {*}
 */
const makeSelectClickedSchoolData = () =>
  createSelector(
    makeSelectClickedSchoolId(),
    AppSelectors.makeSelectSchoolsDataMap(),
    (schoolId, schoolData) => (schoolData ? schoolData.get(schoolId) : null)
  );

/**
 * Returns the clicked grade data
 * @returns {*}
 */
const makeSelectClickedGradeData = () =>
  createSelector(
    makeSelectClickedGradeId(),
    AppSelectors.makeSelectGradesDataMap(),
    (gradeId, gradeData) => (gradeData ? gradeData.get(gradeId) : null)
  );

/**
 * Returns the clicked teacher data
 * @returns {*}
 */
const makeSelectClickedTeacherData = () =>
  createSelector(
    makeSelectClickedTeacherId(),
    AppSelectors.makeSelectTeachersDataMap(),
    (teacherId, teacherData) => (teacherData ? teacherData.get(teacherId) : null)
  );

/**
 * Returns the clicked group data
 * @returns {*}
 */
const makeSelectClickedGroupData = () =>
  createSelector(
    makeSelectClickedGroupId(),
    AppSelectors.makeSelectGroupsDataMap(),
    (groupId, groupData) => (groupData ? groupData.get(groupId) : null)
  );

/**
 * Returns the clicked student data
 * @returns {*}
 */
const makeSelectClickedStudentData = () =>
  createSelector(
    makeSelectClickedStudentId(),
    AppSelectors.makeSelectStudentsDataMap(),
    (studentId, studentData) => (studentData ? studentData.get(studentId) : null)
  );

/**
 * Returns the clicked class data
 * @returns {*}
 */
const makeSelectClickedClassData = () =>
  createSelector(
    makeSelectClickedClassId(),
    AppSelectors.makeSelectClassesDataMap(),
    (classId, classData) => (classData ? classData.get(classId) : null)
  );

/**
 * Returns the selected cohort type and its id. if no selectedCohortType it returns empty obj
 * @returns { selectedCohortType: string, id: string }
 */
const makeSelectCohortTypeCohortId = () =>
  createSelector(
    [
      makeSelectCohortType(),
      makeSelectSchoolId(),
      makeSelectGradeId(),
      makeSelectTeacherId(),
      makeSelectClassId(),
      makeSelectGroupId(),
      makeSelectStudentId(),
    ],
    (
      selectedCohortType,
      selectedSchoolId,
      selectedGradeId,
      selectedTeacherId,
      selectedClassId,
      selectedGroupId,
      selectedStudentId
    ) => {
      switch (selectedCohortType) {
        case COHORT_TYPE.School:
          return { selectedCohortType, id: selectedSchoolId };
        case COHORT_TYPE.Grade:
          return { selectedCohortType, id: selectedGradeId };
        case COHORT_TYPE.Teacher:
          return { selectedCohortType, id: selectedTeacherId };
        case COHORT_TYPE.Class:
          return { selectedCohortType, id: selectedClassId };
        case COHORT_TYPE.Group:
          return { selectedCohortType, id: selectedGroupId };
        case COHORT_TYPE.Student:
          return { selectedCohortType, id: selectedStudentId };
        default:
          return {};
      }
    }
  );

/**
 * Returns the effective cohort object { cohortType: string, id: string }. if no selectedCohortType it looks into loginUserOrg
 * @returns {*}
 */
// TODO some cohorts will need the schoolId, team is figuring out best way to do that. selectedSchoolId might not always reflect the schoolId of another cohort.
const makeSelectEffectiveCohortObject = () =>
  createSelector(
    [
      makeSelectCohortType(),
      makeSelectSchoolId(),
      makeSelectGradeId(),
      makeSelectTeacherId(),
      makeSelectClassId(),
      makeSelectGroupId(),
      makeSelectStudentId(),
      makeSelectedActiveSchoolId(),
      AppSelectors.makeSelectLoginUserOrg(),
      AppSelectors.makeSelectProfileUserOrgId(),
      AppSelectors.makeSelectProfileUserType(),
      AppSelectors.makeSelectProfileUserId(),
    ],
    (
      selectedCohortType,
      selectedSchoolId,
      selectedGradeId,
      selectedTeacherId,
      selectedClassId,
      selectedGroupId,
      selectedStudentId,
      activeSchoolId,
      appSelectLoginUserOrg,
      appSelectProfileUserOrgId,
      appSelectProfileUserType,
      appSelectProfileUserId
    ) => {
      let result = {};
      // appSelectProfileUserOrgId is for SA/STA: these cannot select a school
      const schoolId = selectedSchoolId || activeSchoolId || appSelectProfileUserOrgId;
      // first look for anything that has been specifically selected in
      // the smart bar
      switch (selectedCohortType) {
        case COHORT_TYPE.School:
          result = { cohortType: selectedCohortType, id: selectedSchoolId };
          break;
        case COHORT_TYPE.Grade:
          result = {
            cohortType: selectedCohortType,
            id: selectedGradeId,
            schoolId,
          };
          break;
        case COHORT_TYPE.Teacher:
          result = { cohortType: selectedCohortType, id: selectedTeacherId, schoolId };
          break;
        case COHORT_TYPE.Class:
          result = { cohortType: selectedCohortType, id: selectedClassId, schoolId };
          break;
        case COHORT_TYPE.Group:
          result = { cohortType: selectedCohortType, id: selectedGroupId, schoolId };
          break;
        case COHORT_TYPE.Student:
          result = { cohortType: selectedCohortType, id: selectedStudentId, schoolId };
          break;
        default:
          // if we get here, then nothing has been selected in the smart bar,
          // so look for what the default cohort is for the logged-in user type
          switch (appSelectLoginUserOrg) {
            case USER_ORG.District:
              // district administrator and  district tech
              result = {
                cohortType: COHORT_TYPE.District,
                id: appSelectProfileUserOrgId,
              };
              break;
            case USER_ORG.School:
              // school administrator and  school tech
              result = {
                cohortType: COHORT_TYPE.School,
                id: appSelectProfileUserOrgId,
              };
              break;
            default:
              // teachers don't have user_org so this is for them
              result = {
                cohortType: appSelectProfileUserType,
                id: appSelectProfileUserId,
                schoolId,
              };
          }
      }
      return result;
    }
  );

const makeSelectSelectedCohortName = () =>
  createSelector(
    [
      makeSelectEffectiveCohortObject(),
      makeSelectSelectedSchoolData(),
      makeSelectSelectedGradeData(),
      makeSelectSelectedTeacherData(),
      makeSelectSelectedClassData(),
      makeSelectSelectedGroupData(),
      makeSelectSelectedStudentData(),
    ],
    (selectedCohortObj, schoolData, gradeData, teacherData, classData, groupData, studentData) => {
      switch (selectedCohortObj.cohortType) {
        case COHORT_TYPE.School:
          return schoolData ? schoolData.getIn(['name', 0]) : '';
        case COHORT_TYPE.Grade:
          return gradeData ? gradeData.getIn(['full_name', 0]) : '';
        case COHORT_TYPE.Class:
          return classData ? classData.getIn(['display_name', 0]) : '';
        case COHORT_TYPE.Teacher: {
          if (teacherData) {
            const firstName = teacherData.getIn(['first_name', 0]);
            const lastName = teacherData.getIn(['last_name', 0]);
            return `${lastName}, ${firstName}`;
          }
          return '';
        }
        case COHORT_TYPE.Group:
          return groupData ? groupData.getIn(['display_name', 0]) : '';
        case COHORT_TYPE.Student: {
          if (studentData) {
            const firstName = studentData.getIn(['first_name', 0]);
            const lastName = studentData.getIn(['last_name', 0]);
            return `${lastName}, ${firstName}`;
          }
          return '';
        }
        default:
          return '';
      }
    }
  );

const makeSelectActiveSchoolId = () =>
  createSelector(
    [makeSelectSchoolId(), AppSelectors.makeSelectProfileOrganizationData()],
    (smartbarSchoolId, profileOrgData) => {
      let schoolId = null;
      if (smartbarSchoolId) {
        schoolId = smartbarSchoolId;
      } else {
        // Check the Profile Orgs
        const firstProfileOrg = profileOrgData && profileOrgData.getIn([0, 'organization', 0]);
        const orgType = firstProfileOrg && firstProfileOrg.getIn(['type', 0]);
        // Cover school admins
        if (
          typeof orgType === 'string' &&
          orgType.toLowerCase() === COHORT_TYPE.School.toLowerCase()
        ) {
          // Org is a school, return its id
          schoolId = firstProfileOrg.getIn(['org_id', 0]);
        }
      }
      return schoolId;
    }
  );

export default makeSelectSmartBarContainer;
export {
  selectSmartBarContainerDomain,
  makeSelectActiveSchoolId,
  makeSelectSchoolId,
  makeSelectGradeId,
  makeSelectTeacherId,
  makeSelectGroupId,
  makeSelectStudentId,
  makeSelectClassId,
  makeSelectCohortType,
  makeSelectSelectedCohortName,
  makeSelectSelectedSchoolData,
  makeSelectSelectedGradeData,
  makeSelectSelectedTeacherData,
  makeSelectSelectedGroupData,
  makeSelectSelectedStudentData,
  makeSelectSelectedClassData,
  makeSelectSmartBarContainer,
  makeSelectClickedSchoolId,
  makeSelectClickedGradeId,
  makeSelectClickedTeacherId,
  makeSelectClickedGroupId,
  makeSelectClickedStudentId,
  makeSelectClickedClassId,
  makeSelectClickedSchoolData,
  makeSelectClickedGradeData,
  makeSelectClickedTeacherData,
  makeSelectClickedGroupData,
  makeSelectClickedStudentData,
  makeSelectClickedClassData,
  makeSelectCohortTypeCohortId,
  makeSelectEffectiveCohortObject,
  makeSelectedActiveSchoolId,
  makeSelectedActiveGradeId,
  makeSelectedActiveTeacherId,
  makeSelectedActiveClassId,
  makeSelectedActiveGroupId,
  makeSelectedActiveStudentId,
};
