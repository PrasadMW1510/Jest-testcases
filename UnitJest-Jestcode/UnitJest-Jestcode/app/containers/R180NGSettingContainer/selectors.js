import { createSelector } from 'reselect';

const selectProgramSetting = state => state.get('r180NGProgramSettingData');

const makeProgramSetting = () => createSelector(selectProgramSetting, substate => substate);

const makeEnrollmentSetting = () => createSelector(selectProgramSetting, substate => substate);

export { selectProgramSetting, makeProgramSetting, makeEnrollmentSetting };
