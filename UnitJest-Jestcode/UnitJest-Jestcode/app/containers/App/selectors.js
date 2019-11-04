import { createSelector } from 'reselect';
import { List } from 'immutable';
import { USER_ORG } from './constants';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectGlobal = () => createSelector(selectGlobal, globalState => globalState);

const makeSelectGlobalUserData = () =>
  createSelector(selectGlobal, globalState => globalState.get('userData'));

const makeSelectGlobalError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const isGlobalLoading = () =>
  createSelector(selectGlobal, globalState => {
    let isLoading = true;
    if (globalState && !globalState.get('loading')) {
      isLoading = false;
      const loadingRequests = globalState.get('loadingRequests').toJS();
      Object.keys(loadingRequests).forEach(key => {
        if (loadingRequests[key]) {
          isLoading = true;
        }
      });
    }

    return isLoading;
  });

/*
  Server Assets data
 */
const makeSelectProgramAvailableData = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'serverAssets']));

/*
  Login Data
 */
const makeSelectLoginData = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'login']));

const makeSelectProfileSessionId = () =>
  createSelector(makeSelectLoginData(), loginData => loginData.getIn(['session_id', 0]));

const makeSelectProfileUserId = () =>
  createSelector(makeSelectLoginData(), loginData => loginData.getIn(['user_id', 0]));

const makeSelectProfileUserType = () =>
  createSelector(makeSelectLoginData(), loginData => loginData.getIn(['user_type', 0]));

const makeSelectLoginUserOrg = () =>
  createSelector(makeSelectLoginData(), loginData => loginData.getIn(['user_org', 0]));

const makeSelectProfileUserOrgId = () =>
  createSelector(makeSelectLoginData(), loginData => loginData.getIn(['user_org_id', 0]));

const makeSelectResetCredentials = () =>
  createSelector(makeSelectLoginData(), loginData => loginData.getIn(['reset_credentials', 0]));

const makeSelectUserOrgUserType = () =>
  createSelector(
    [makeSelectLoginUserOrg(), makeSelectProfileUserType()],
    (loginDataUserOrg, loginDataUserType) => ({
      // only admins have a user_org present; teachers should default to USER_ORG.School
      userOrg: loginDataUserOrg || USER_ORG.School,
      userType: loginDataUserType,
    })
  );

/*
  Profile data
 */
const makeSelectProfileData = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'profile']));

const makeSelectProfileOrganizationData = () =>
  createSelector(
    makeSelectProfileData(),
    profileState => profileState && profileState.get('organizations')
  );

const makeSelectProfileDistrictId = () =>
  createSelector(makeSelectProfileOrganizationData(), orgList => {
    const firstOrg = orgList && orgList.getIn([0, 'organization', 0]);
    return (
      firstOrg &&
      (firstOrg.getIn(['type', 0]) === 'school'
        ? firstOrg.getIn(['parent_org_id', 0])
        : firstOrg.getIn(['org_id', 0]))
    );
  });

/*
  Student data
 */
const makeSelectStudentsDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'students']));

const makeSelectStudentsData = () =>
  createSelector(
    makeSelectStudentsDataMap(),
    globalState => (globalState ? List(globalState.values()) : undefined)
  );

const makeSelectProfileStudentsDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['profileData', 'students']));

/*
  Groups data
 */
const makeSelectGroupsDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'groups']));

const makeSelectGroupsData = () =>
  createSelector(
    makeSelectGroupsDataMap(),
    globalState => (globalState ? List(globalState.values()) : undefined)
  );

const makeSelectProfileGroupsDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['profileData', 'groups']));

/*
  Schools data
 */
const makeSelectSchoolsDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'schools']));

const makeSelectSchoolsData = () =>
  createSelector(
    makeSelectSchoolsDataMap(),
    globalState => (globalState ? List(globalState.values()) : undefined)
  );

const makeSelectProfileSchoolsDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['profileData', 'schools']));

/*
  Grades data
 */
const makeSelectGradesDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'grades']));

const makeSelectGradesData = () =>
  createSelector(
    makeSelectGradesDataMap(),
    globalState => (globalState ? List(globalState.values()) : undefined)
  );

const makeSelectProfileGradesDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['profileData', 'grades']));

/*
  Teachers data
 */
const makeSelectTeachersDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'teachers']));

const makeSelectTeachersData = () =>
  createSelector(
    makeSelectTeachersDataMap(),
    globalState => (globalState ? List(globalState.values()) : undefined)
  );

const makeSelectProfileTeachersDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['profileData', 'teachers']));

/*
  Classes data
 */
const makeSelectClassesDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'classes']));

const makeSelectClassesData = () =>
  createSelector(
    makeSelectClassesDataMap(),
    globalState => (globalState ? List(globalState.values()) : undefined)
  );

const makeSelectProfileClassesDataMap = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['profileData', 'classes']));

/*
  Permissions data
 */
const makeSelectPermissionsData = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'permissions']));

/*
  Password Config data
 */
const makeSelectPasswordConfigData = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'passwordConfig']));

/*
  Schools and Classes data
 */
const makeSelectSchoolsAndClassesData = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['userData', 'schoolsAndClasses']));

const makeSelectSchoolExpandCollapseStatus = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['expandCollapseStatus', 'school'])
  );

const makeSelectGradeExpandCollapseStatus = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['expandCollapseStatus', 'grade']));

const makeSelectTeacherExpandCollapseStatus = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['expandCollapseStatus', 'teacher'])
  );

const makeSelectClassExpandCollapseStatus = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['expandCollapseStatus', 'class']));

const makeSelectGroupExpandCollapseStatus = () =>
  createSelector(selectGlobal, globalState => globalState.getIn(['expandCollapseStatus', 'group']));

const makeSelectStudentExpandCollapseStatus = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['expandCollapseStatus', 'student'])
  );
export {
  makeSelectGlobal,
  makeSelectLocation,
  makeSelectGlobalUserData,
  isGlobalLoading,
  makeSelectUserOrgUserType,
  makeSelectClassesData,
  makeSelectClassesDataMap,
  makeSelectLoginData,
  makeSelectProfileData,
  makeSelectStudentsData,
  makeSelectStudentsDataMap,
  makeSelectProfileDistrictId,
  makeSelectProfileUserType,
  makeSelectProfileUserId,
  makeSelectProfileOrganizationData,
  makeSelectProfileSessionId,
  makeSelectLoginUserOrg,
  makeSelectProfileUserOrgId,
  makeSelectGroupsData,
  makeSelectGroupsDataMap,
  makeSelectSchoolsData,
  makeSelectSchoolsDataMap,
  makeSelectProgramAvailableData,
  makeSelectGradesData,
  makeSelectGradesDataMap,
  makeSelectTeachersData,
  makeSelectTeachersDataMap,
  makeSelectGlobalError,
  makeSelectPermissionsData,
  makeSelectPasswordConfigData,
  makeSelectSchoolsAndClassesData,
  makeSelectProfileSchoolsDataMap,
  makeSelectProfileGradesDataMap,
  makeSelectProfileTeachersDataMap,
  makeSelectProfileClassesDataMap,
  makeSelectProfileGroupsDataMap,
  makeSelectProfileStudentsDataMap,
  makeSelectResetCredentials,
  makeSelectSchoolExpandCollapseStatus,
  makeSelectGradeExpandCollapseStatus,
  makeSelectTeacherExpandCollapseStatus,
  makeSelectClassExpandCollapseStatus,
  makeSelectGroupExpandCollapseStatus,
  makeSelectStudentExpandCollapseStatus,
};
