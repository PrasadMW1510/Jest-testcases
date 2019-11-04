import { createSelector } from 'reselect';
import { FORM_TEACHER_PROFILE } from './constants';

/**
 * Direct selector to the form state domain
 */
const selectForms = state => state.get('form');

const makeSelectFormErrors = () =>
  createSelector(
    selectForms,
    formState => formState && formState.getIn([FORM_TEACHER_PROFILE, 'syncErrors'])
  );

const makeSelectSubmitErrors = () =>
  createSelector(
    selectForms,
    formState => formState && formState.getIn([FORM_TEACHER_PROFILE, 'submitErrors'])
  );

/**
 * Direct selector to the addEditTeacherContainer state domain
 */
const selectAddEditTeacherContainer = state => state.get('addEditTeacherContainer');

const makeSelectAddEditTeacherContainer = () =>
  createSelector(selectAddEditTeacherContainer, substate => substate && substate.toJS());

/**
 * Selector to get profile details for Add Edit Teacher
 */
const makeSelectAddEditTeacherProfileDetails = () =>
  createSelector(
    selectAddEditTeacherContainer,
    substate => substate && substate.get('profileDetails')
  );

const makeSelectAddEditTeacherPermissionsData = () =>
  createSelector(
    selectAddEditTeacherContainer,
    substate =>
      substate && substate.get('permissionsData').map(permission => Number(permission.id[0]))
  );

const makeSelectAddEditTeacherSchoolsAndClassesData = () =>
  createSelector(
    selectAddEditTeacherContainer,
    substate => substate && substate.get('schoolsAndClassesDetails')
  );

const makeSelectAddEditTeacherPasswordConfigData = () =>
  createSelector(
    selectAddEditTeacherContainer,
    substate => substate && substate.get('passwordConfig')
  );

// export the below selectors
export {
  makeSelectFormErrors,
  makeSelectSubmitErrors,
  makeSelectAddEditTeacherProfileDetails,
  makeSelectAddEditTeacherPermissionsData,
  makeSelectAddEditTeacherSchoolsAndClassesData,
  makeSelectAddEditTeacherPasswordConfigData,
  makeSelectAddEditTeacherContainer,
};
