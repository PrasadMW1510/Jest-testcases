import { createSelector } from 'reselect';

/**
 * Direct selector to the Student Enroll state domain
 */
const selectStudentEnrollTableContainerDomain = state => state.get('studentEnroll');

const selectStudentEnroll = studentEnrollInfo => studentEnrollInfo.get('studentsEnrolled').toJS();

const selectLoading = studentEnrollInfo => studentEnrollInfo.get('loading');

const selectPaginationData = studentEnrollInfo => ({
  itemCount: studentEnrollInfo.get('itemCount'),
  ...studentEnrollInfo.get('paginationData').toJS(),
});

/**
 * Default selector used by Student Enroll
 */
const makeSelectStudentEnrollTableContainer = () =>
  createSelector(selectStudentEnrollTableContainerDomain, substate => substate);

const makeSelectLoading = () =>
  createSelector(
    selectStudentEnrollTableContainerDomain,
    studentEnrollInfo => (studentEnrollInfo ? studentEnrollInfo.get('loading') : false)
  );

export default makeSelectStudentEnrollTableContainer;
export {
  selectStudentEnrollTableContainerDomain,
  makeSelectStudentEnrollTableContainer,
  selectLoading,
  makeSelectLoading,
  selectStudentEnroll,
  selectPaginationData,
};
