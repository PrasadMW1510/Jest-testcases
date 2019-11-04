import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { RSkillsCCSettingContainer } from '../RSkillsCCSettingContainer';

describe('<RSkillsCCSettingContainer />', () => {
  let wrapper = null;
  const mockEffectiveCohortObject = { cohortType: 'School', id: 'guidSchool54321' };
  const mockRSkillsCCSettingsTestAssignmentRequest = jest.fn();
  const mockTestAssignmentStages = fromJS([]);
  const mockImmProgramSettingData = {};
  const mockImmDefaultProgramSettingData = {};
  const mockSaveRequest = jest.fn();
  const mockSettingsSaveRequest = jest.fn();
  const mockRSkillsCCDefaultSettingsRequest = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <RSkillsCCSettingContainer
        effectiveCohortObject={mockEffectiveCohortObject}
        immDefaultProgramSettingData={mockImmDefaultProgramSettingData}
        immProgramSettingData={mockImmProgramSettingData}
        rSkillsCCDefaultSettingsRequest={mockRSkillsCCDefaultSettingsRequest}
        rSkillsCCSettingsSaveRequest={mockSettingsSaveRequest}
        rSkillsCCSettingsTestAssignmentRequest={mockRSkillsCCSettingsTestAssignmentRequest}
        testAssignmentStages={mockTestAssignmentStages}
        rSkillsCCTestAssignmentSaveRequest={mockSaveRequest}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('makes call to handle the Default Settings Request', () => {
    wrapper.instance().handleRSkillsCCGetDefaultSettings();
    expect(mockRSkillsCCDefaultSettingsRequest).toHaveBeenCalled();
  });

  it('makes call to handle the Test Assignment Save Request', () => {
    wrapper.instance().handleTestAssignmentSave();
    expect(mockRSkillsCCSettingsTestAssignmentRequest).toHaveBeenCalled();
  });

  it('makes call to handle the Settings Save Request', () => {
    wrapper.instance().handleSettingsSave();
    expect(mockSettingsSaveRequest).toHaveBeenCalled();
  });
});
