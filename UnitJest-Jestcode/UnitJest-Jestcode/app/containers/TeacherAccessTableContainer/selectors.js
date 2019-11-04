import { createSelector } from 'reselect';

/**
 * Direct selector to the Teacher Access state domain
 */
const selectTeacherAccessTableContainerDomain = state => state.get('teacherEnroll');

const selectTeacherAccess = teacherAccessInfo => teacherAccessInfo.get('teachersEnrolled').toJS();

const selectLoading = teacherAccessInfo => teacherAccessInfo.get('loading');

const selectSaveSuccess = teacherAccessInfo => teacherAccessInfo.get('saveSuccess');

const selectPaginationData = teacherAccessInfo => ({
  itemCount: teacherAccessInfo.get('itemCount'),
  ...teacherAccessInfo.get('paginationData').toJS(),
});

/**
 * Default selector used by Teacher Access
 */
const makeSelectTeacherAccessTableContainer = () =>
  createSelector(selectTeacherAccessTableContainerDomain, substate => substate);

const makeSelectLoading = () =>
  createSelector(
    selectTeacherAccessTableContainerDomain,
    teacherAccessInfo => (teacherAccessInfo ? teacherAccessInfo.get('loading') : false)
  );

const makeSelectAppLoading = () =>
  createSelector(
    selectTeacherAccessTableContainerDomain,
    teacherAccessInfo => (teacherAccessInfo ? teacherAccessInfo.get('loadingApps') : false)
  );

export default makeSelectTeacherAccessTableContainer;
export {
  selectTeacherAccessTableContainerDomain,
  makeSelectTeacherAccessTableContainer,
  selectLoading,
  makeSelectLoading,
  makeSelectAppLoading,
  selectSaveSuccess,
  selectTeacherAccess,
  selectPaginationData,
};
