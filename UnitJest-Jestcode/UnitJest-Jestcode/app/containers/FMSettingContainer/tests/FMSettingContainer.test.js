import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { FMSettingContainer } from '../index';

describe('<FMSettingContainer />', () => {
  let wrapper = null;

  let mockCohortObj = null;
  let mockFMAdvancedSettingsSave = null;
  let mockFMSettingsContainerRequest = null;
  let mockFMSettingsSave = null;
  let mockEnrollmentCount = null;
  let mockFMSettingData = null;

  beforeEach(() => {
    mockCohortObj = fromJS({
      cohortType: 'mockCohType',
    });

    mockFMAdvancedSettingsSave = jest.fn();
    mockFMSettingsContainerRequest = jest.fn();
    mockFMSettingsSave = jest.fn();
    mockEnrollmentCount = 10;
    mockFMSettingData = fromJS({
      loading: false,
      settings: {},
      advancedSettings: {},
    });

    wrapper = shallow(
      <FMSettingContainer
        cohortObj={mockCohortObj}
        fmAdvancedSettingsSave={mockFMAdvancedSettingsSave}
        fmSettingsContainerRequest={mockFMSettingsContainerRequest}
        fmSettingsSave={mockFMSettingsSave}
        enrollmentCount={mockEnrollmentCount}
        fmSettingData={mockFMSettingData}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect fmSettingsContainerRequest to have been called', () => {
    expect(mockFMSettingsContainerRequest).toHaveBeenCalled();
  });

  it('handleSettingsSave to have called fmSettingsSave', () => {
    const mockUpdatedSettings = 'mockUpdatedSettings';
    wrapper.instance().handleSettingsSave(mockUpdatedSettings);

    expect(mockFMSettingsSave).toHaveBeenCalledWith(mockUpdatedSettings);
  });

  it('handleAdvancedSettingsSave to have called handleAdvancedSettingsSave', () => {
    const mockUpdatedAdvancedSettings = 'mockUpdatedAdvancedSettings';
    wrapper.instance().handleAdvancedSettingsSave(mockUpdatedAdvancedSettings);

    expect(mockFMAdvancedSettingsSave).toHaveBeenCalledWith(mockUpdatedAdvancedSettings);
  });
});
