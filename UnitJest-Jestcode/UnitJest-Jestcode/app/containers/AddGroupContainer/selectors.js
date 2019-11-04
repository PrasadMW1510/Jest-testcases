import { createSelector } from 'reselect';

/**
 * Direct selector to the addGroupContainer state domain
 */
const selectAddGroupContainerDomain = state => state.get('addGroupContainer');

/**
 * Other specific selectors
 */
const makeSelectClassInfoWithStudent = () =>
  createSelector(selectAddGroupContainerDomain, substate => substate.get('classesWithStudents'));

const makeSelectPostGroupId = () =>
  createSelector(selectAddGroupContainerDomain, substate => substate.getIn(['postGroupId', 0]));

const makeSelectPostGroupFailure = () =>
  createSelector(selectAddGroupContainerDomain, substate => substate.getIn(['errorPostGroupId']));

const makeSelectGroupInfo = () =>
  createSelector(selectAddGroupContainerDomain, substate =>
    substate.getIn(['getGroupInfoSuccess'])
  );

export {
  selectAddGroupContainerDomain,
  makeSelectClassInfoWithStudent,
  makeSelectPostGroupId,
  makeSelectPostGroupFailure,
  makeSelectGroupInfo,
};
