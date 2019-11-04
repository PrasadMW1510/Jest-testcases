import { createSelector } from 'reselect';
import { FORM_EDIT_ADMIN } from './constants';

/**
 * Direct selector to the editAdminContainer state domain
 */

const selectForms = state => state.get('form');

const makeSelectFormErrors = () =>
  createSelector(
    selectForms,
    formState => formState && formState.getIn([FORM_EDIT_ADMIN, 'syncErrors'])
  );

const makeSelectSubmitErrors = () =>
  createSelector(
    selectForms,
    formState => formState && formState.getIn([FORM_EDIT_ADMIN, 'submitErrors'])
  );

export { makeSelectFormErrors, makeSelectSubmitErrors };
