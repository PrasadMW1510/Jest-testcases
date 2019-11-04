import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
import { RISettingContainer } from '../index';

describe('<RISettingContainer />', () => {
  const mockImmProgramSettingData = fromJS({
    proficiencyBandData: {},
    programSetting: {},
  });
  const mockRICancel = jest.fn();
  const mockRIProgramSettingsRequest = jest.fn();
  const mockRISaveRequest = jest.fn();
  const mockShowModal = jest.fn();
  const mockSelectedCohortTypeAndId = {
    cohortType: COHORT_TYPE.Student,
  };
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <RISettingContainer
        immProgramSettingData={mockImmProgramSettingData}
        loggedInUserType={USER_TYPE.Teacher}
        programDisplayName="Reading Inventory"
        RICancel={mockRICancel}
        RIProgramSettingsRequest={mockRIProgramSettingsRequest}
        RISaveRequest={mockRISaveRequest}
        selectedCohortTypeAndId={mockSelectedCohortTypeAndId}
        showModal={mockShowModal}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect handleSave to work correctly', () => {
    const activeTabId = 'some tab';
    const changedSettings = {
      key1: 'value1',
    };
    wrapper.instance().handleSave(activeTabId, changedSettings);
    expect(mockRISaveRequest).toHaveBeenCalledWith(activeTabId, changedSettings);
  });

  it('Expect to render correctly with truthy selectedCohortName', () => {
    const localWrapper = shallow(
      <RISettingContainer
        immProgramSettingData={mockImmProgramSettingData}
        loggedInUserType={USER_TYPE.Teacher}
        programDisplayName="Reading Inventory"
        RICancel={mockRICancel}
        RIProgramSettingsRequest={mockRIProgramSettingsRequest}
        RISaveRequest={mockRISaveRequest}
        selectedCohortName="Student Last Name, Student First Name"
        selectedCohortTypeAndId={mockSelectedCohortTypeAndId}
        showModal={mockShowModal}
      />
    );
    expect(shallowToJson(localWrapper)).toMatchSnapshot();
  });
});
