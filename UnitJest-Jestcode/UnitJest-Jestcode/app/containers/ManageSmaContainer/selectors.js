import { createSelector } from 'reselect';

/**
 * Direct selector to the manageSmaContainer state domain
 */
const selectManageSmaContainerDomain = state => state.get('manageSmaContainer');

/**
 * Default selector used by ManageSmaContainer
 */
const makeSelectManageSmaContainer = () =>
  createSelector(selectManageSmaContainerDomain, substate => substate.toJS());

/**
 * Selector to get media servers for Manage SMA
 */
const makeSelectManageSmaContainerGetMediaServers = () =>
  createSelector(
    selectManageSmaContainerDomain,
    substate => substate && substate.get('mediaServers')
  );

export {
  selectManageSmaContainerDomain,
  makeSelectManageSmaContainer,
  makeSelectManageSmaContainerGetMediaServers,
};
