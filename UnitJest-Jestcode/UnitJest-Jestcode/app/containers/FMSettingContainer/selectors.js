import { createSelector } from 'reselect';

/**
 * Direct selector to the fmSettingContainer state domain
 */
const selectFMSettingContainerDomain = state => state.get('fmSettingContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by FMSettingContainer
 */

const makeSelectFMSettingContainer = () =>
  createSelector(selectFMSettingContainerDomain, substate => substate);

export { makeSelectFMSettingContainer };
