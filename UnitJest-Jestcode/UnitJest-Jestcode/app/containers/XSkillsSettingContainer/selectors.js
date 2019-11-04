import { createSelector } from 'reselect';

/**
 * Direct selector to the xSkillsSettingContainer state domain
 */
const selectXSkillsSettingContainerDomain = state => state.get('xSkillsSettingContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by XSkillsSettingContainer
 */
const makeSelectXSkillsSettingContainer = () =>
  createSelector(selectXSkillsSettingContainerDomain, substate => substate);

export { makeSelectXSkillsSettingContainer };
