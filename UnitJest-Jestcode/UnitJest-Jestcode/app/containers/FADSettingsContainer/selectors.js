import { createSelector } from 'reselect';

/**
 * Direct selector to the fadsettingsContainer state domain
 */
const selectFADSettingsContainerDomain = state => state.get('FADSettingsContainer');
/**
 * Default selector used by FADSettingsContainer
 */

const makeSelectFADSettingsContainer = () =>
  createSelector(selectFADSettingsContainerDomain, substate => substate);

export default makeSelectFADSettingsContainer;
export { selectFADSettingsContainerDomain };
