import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { makeSelectProgramAvailableData } from 'containers/App/selectors';
import {
  FORM_CLASS_PROFILE,
  META_DATA_GRADES,
  META_DATA_STUDENTS,
  META_DATA_TEACHERS,
} from './constants';

const selectForm = state => state.getIn(['form', FORM_CLASS_PROFILE]);

const makeSelectFormErrors = () =>
  createSelector(selectForm, formState => formState && formState.getIn(['syncErrors']));

const makeSelectFormServerErrors = () =>
  createSelector(selectForm, formState => formState && formState.getIn(['values', 'serverErrors']));

const makeSelectFormMetaDataGrades = () =>
  createSelector(
    selectForm,
    formState => formState && formState.getIn(['values', 'metaData', META_DATA_GRADES])
  );

const makeSelectFormMetaDataTeachers = () =>
  createSelector(
    selectForm,
    formState => formState && formState.getIn(['values', 'metaData', META_DATA_TEACHERS])
  );

const makeSelectFormMetaDataStudents = () =>
  createSelector(
    selectForm,
    formState => formState && formState.getIn(['values', 'metaData', META_DATA_STUDENTS])
  );

const makeSelectFormMetaData = () =>
  createSelector(
    makeSelectProgramAvailableData(),
    makeSelectFormMetaDataGrades(),
    makeSelectFormMetaDataTeachers(),
    makeSelectFormMetaDataStudents(),
    (applications, grades, teachers, students) =>
      fromJS({ applications, grades, students, teachers })
  );

export {
  selectForm,
  makeSelectFormErrors,
  makeSelectFormMetaData,
  makeSelectFormMetaDataGrades,
  makeSelectFormMetaDataStudents,
  makeSelectFormMetaDataTeachers,
  makeSelectFormServerErrors,
};
