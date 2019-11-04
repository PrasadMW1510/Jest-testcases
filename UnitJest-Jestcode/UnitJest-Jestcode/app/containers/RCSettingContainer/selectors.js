import { createSelector } from 'reselect';

/**
 * Direct selector to the rcSettingContainer state domain
 */
const selectRCSettingContainerDomain = state => state.get('rcSettingContainer');

/**
 * Default selector used by RCSettingContainer
 */
const makeSelectRCSettingContainer = () =>
  createSelector(selectRCSettingContainerDomain, substate => substate);

// TODO: Uncomment if your settings have a subproduct (stage) to choose from
/* const getSelectedStage = () =>
  createSelector(selectRCSettingContainerDomain, substate =>
    substate.getIn(['topicManager', 'selectedStage'])
  ); */

// TODO: Uncomment if your settings have a subproduct (stage) to choose from
export {
  makeSelectRCSettingContainer,
  // getSelectedStage
};
