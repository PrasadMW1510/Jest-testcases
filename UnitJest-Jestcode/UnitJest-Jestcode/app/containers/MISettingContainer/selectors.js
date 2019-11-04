import { createSelector } from 'reselect';

/**
 * Direct selector to the state domain
 */
const selectProgramSetting = state => state.get('miProgramSettingData');

/**
 * Simple Selectors
 *
 * These methods are too basic to memoize, and return quick properties off of the local Redux state.
 *
 */
const selectImmProgramSettingsObj = immMISettingData => immMISettingData.get('programSettingsObj');
const selectImmProficiencyBandData = immMISettingData =>
  immMISettingData.get('proficiencyBandData');
const selectIsLoading = immMISettingData => immMISettingData.get('loading');

const makeProgramSetting = () => createSelector(selectProgramSetting, substate => substate);

export {
  makeProgramSetting,
  selectIsLoading,
  selectImmProficiencyBandData,
  selectImmProgramSettingsObj,
};
