import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { IreadSettingsContainer } from '../index';

describe('<IreadSettingsContainer />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockIreadProgramSettingsRequest = null;
  let mockIreadSaveRequest = null;
  let mockProgramSettingData = null;
  let mockEnrollmentCount = null;
  let mockCohortObj = null;
  let mockShowModal = null;

  beforeEach(() => {
    mockIreadProgramSettingsRequest = jest.fn();
    mockIreadSaveRequest = jest.fn();
    mockProgramSettingData = fromJS({
      programSetting: {
        data: 'mockSettingsData',
      },
      loading: false,
    });
    mockEnrollmentCount = 10;
    mockCohortObj = fromJS({
      cohortType: 'mockCohType',
    });
    mockShowModal = jest.fn();

    wrapper = shallow(
      <IreadSettingsContainer
        cohortObj={mockCohortObj}
        enrollmentCount={mockEnrollmentCount}
        IreadProgramSettingsRequest={mockIreadProgramSettingsRequest}
        IreadSaveRequest={mockIreadSaveRequest}
        programSettingData={mockProgramSettingData}
        showModal={mockShowModal}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('expect componentDidMount functions called', () => {
    expect(mockIreadProgramSettingsRequest).toHaveBeenCalled();
  });

  it('handleSave calls IreadSaveRequest', () => {
    wrapperInstance.handleSave('mockSettingsData');
    expect(mockIreadSaveRequest).toHaveBeenCalledWith('mockSettingsData');
  });
});
