import { createSelector } from 'reselect';
import { List } from 'immutable';

/**
 * Direct selector to the profilePageData state domain
 */
const selectProfilePageData = state => state.get('profilePage');

/**
 * Default selector used by ProfilePageContainer
 */
export const makeSelectProfilePageData = () =>
  createSelector(selectProfilePageData, substate => substate);

/*
 Profile details
 */
const makeSelectProfilePageDetails = () =>
  createSelector(
    makeSelectProfilePageData(),
    profilePageData => (profilePageData ? profilePageData.getIn(['profileDetails']) : undefined)
  );

/*
 Classes data
 */
const makeSelectProfilePageClassesDataMap = () =>
  createSelector(
    makeSelectProfilePageData(),
    profilePageData =>
      profilePageData ? profilePageData.getIn(['profileDetails', 'classes']) : undefined
  );

const makeSelectProfilePageClassesData = () =>
  createSelector(
    makeSelectProfilePageClassesDataMap(),
    classesData => (classesData ? List(classesData.values()) : undefined)
  );

/*
 Allowed Permissions data
 */
const makeSelectProfilePagePermissionsDataMap = () =>
  createSelector(
    makeSelectProfilePageData(),
    profilePageData =>
      profilePageData ? profilePageData.getIn(['profileDetails', 'permissions']) : undefined
  );

const makeSelectProfilePagePermissionsData = () =>
  createSelector(
    makeSelectProfilePagePermissionsDataMap(),
    permissionsData => (permissionsData ? List(permissionsData.values()) : undefined)
  );

export default makeSelectProfilePageData;
export {
  selectProfilePageData,
  makeSelectProfilePageClassesData,
  makeSelectProfilePagePermissionsData,
  makeSelectProfilePageDetails,
};
