import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { FORM_SCHOOL_PROFILE, META_DATA_GRADES } from './constants';

const selectForm = state => state.getIn(['form', FORM_SCHOOL_PROFILE]);

// TODO: See if the following definition can supplant the 'selectForms' definition above,
// the following selectors adjusting accordingly.
const selectSchoolForm = formValueSelector(FORM_SCHOOL_PROFILE);

/**
 * Direct selector to the addSchoolContainer state domain
 */

const makeSelectGradesForDistrict = () =>
  createSelector(
    selectForm,
    formState => formState && formState.getIn(['values', 'metaData', META_DATA_GRADES])
  );

const makeSelectFormErrors = () =>
  createSelector(selectForm, formState => formState && formState.getIn(['syncErrors']));

const makeSelectFormServerErrors = () =>
  createSelector(selectForm, formState => formState && formState.getIn(['values', 'serverErrors']));

const makeSelectSubmitErrors = () =>
  createSelector(selectForm, formState => formState && formState.get('submitErrors'));

const makeSelectAllFormMetaData = () =>
  createSelector(makeSelectGradesForDistrict(), grades => fromJS({ grades }));

const makeSelectSchoolYearDates = () => schoolFormState =>
  selectSchoolForm(schoolFormState, 'schoolYearStart', 'schoolYearEnd');

export {
  selectForm,
  makeSelectFormErrors,
  makeSelectAllFormMetaData,
  makeSelectFormServerErrors,
  makeSelectGradesForDistrict,
  makeSelectSchoolYearDates,
  makeSelectSubmitErrors,
};
