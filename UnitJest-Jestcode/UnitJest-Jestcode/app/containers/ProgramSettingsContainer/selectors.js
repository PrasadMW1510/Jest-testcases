import { createSelector } from 'reselect';

/**
 * Direct selector to the programSettingsContainer state domain
 */
const selectProgramSettingsContainerDomain = state => state.get('programSettingsContainer');

/**
 * Default selector used by ProgramSettingsContainer
 */
const makeSelectProgramSettingsContainer = () =>
  createSelector(selectProgramSettingsContainerDomain, substate => substate);

/**
 * Other specific selectors
 */
const isProgramSettingsLoading = () =>
  createSelector(
    selectProgramSettingsContainerDomain,
    settings => (settings ? settings.get('loading') : true)
  );

const makeSelectEnrollmentList = () =>
  createSelector(selectProgramSettingsContainerDomain, settings => settings.get('enrollmentList'));

export { isProgramSettingsLoading, makeSelectProgramSettingsContainer, makeSelectEnrollmentList };
