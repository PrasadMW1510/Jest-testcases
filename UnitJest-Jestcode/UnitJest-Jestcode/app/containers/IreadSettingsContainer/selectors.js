import { createSelector } from 'reselect';

const selectProgramSetting = state => state.get('ireadSettingsContainerData');

const programSetting = () => createSelector(selectProgramSetting, substate => substate);

export { selectProgramSetting, programSetting };
