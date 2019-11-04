import { createSelector } from 'reselect';

/**
 * Direct selector to the rSkillsCCSettingContainer state domain
 */
const selectRSkillsCCSettingContainerDomain = state =>
  state && state.get('rSkillsCCSettingContainer');

/**
 * Other specific selectors
 */

const makeDefaultProgramSetting = () =>
  createSelector(
    selectRSkillsCCSettingContainerDomain,
    substate => substate && substate.get('defaultProgramSettings')
  );

const makeProgramSetting = () =>
  createSelector(
    selectRSkillsCCSettingContainerDomain,
    substate => substate && substate.get('programSettings')
  );

const makeSelectTestAssignmentStages = () =>
  createSelector(
    selectRSkillsCCSettingContainerDomain,
    substate => substate && substate.get('stages')
  );

const makeSelectRSkillsCCSettingContainerLoading = () =>
  createSelector(
    selectRSkillsCCSettingContainerDomain,
    substate => substate && substate.get('loading')
  );

const makeSelectRSkillsCCSettingDefaultProgramSettingsLoading = () =>
  createSelector(
    selectRSkillsCCSettingContainerDomain,
    substate => substate && substate.get('defaultProgramSettingsLoading')
  );

/**
 * Default selector used by rSkillsCCSettingContainer
 */

const makeSelectRSkillsCCSettingContainer = () =>
  createSelector(selectRSkillsCCSettingContainerDomain, substate => substate);

export default makeSelectRSkillsCCSettingContainer;
export {
  makeDefaultProgramSetting,
  makeProgramSetting,
  makeSelectTestAssignmentStages,
  makeSelectRSkillsCCSettingDefaultProgramSettingsLoading,
  makeSelectRSkillsCCSettingContainerLoading,
  selectRSkillsCCSettingContainerDomain,
};
