import { createSelector } from 'reselect';

/**
 * Direct selector to the r180EESettingContainer state domain
 */
const selectR180EESettingContainerDomain = state => state.get('r180EESettingContainer');

/**
 * Default selector used by R180EESettingContainer
 */
const makeSelectR180EESettingContainer = () =>
  createSelector(selectR180EESettingContainerDomain, substate => substate);

const getSelectedStage = () =>
  createSelector(selectR180EESettingContainerDomain, substate =>
    substate.getIn(['topicManager', 'selectedStage'])
  );

export { makeSelectR180EESettingContainer, getSelectedStage };
