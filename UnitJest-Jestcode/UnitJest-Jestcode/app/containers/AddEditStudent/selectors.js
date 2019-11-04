import { createSelector } from 'reselect';
import { FIELD_SUBMIT_ERRORS } from 'components/StudentForm/constants';
import { FORM_STUDENT_PROFILE } from './constants';

const selectForm = state => state.getIn(['form', FORM_STUDENT_PROFILE]);

const makeSelectFormErrors = () =>
  createSelector(selectForm, formState => formState && formState.getIn(['syncErrors']));

const makeSelectFormServerErrors = () =>
  createSelector(selectForm, formState => formState && formState.get(FIELD_SUBMIT_ERRORS));

export { selectForm, makeSelectFormErrors, makeSelectFormServerErrors };
