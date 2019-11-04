import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { PSSettingContainer } from '../index';

describe('<PSSettingContainer />', () => {
  let wrapper = null;

  let mockCohortObj = null;
  let mockPSSettingsContainerRequest = null;
  let mockPSSettingsSave = null;
  let mockEnrollmentCount = null;
  let mockPSSettingData = null;

  beforeEach(() => {
    mockCohortObj = fromJS({
      cohortType: 'mockCohType',
    });

    mockPSSettingsContainerRequest = jest.fn();
    mockPSSettingsSave = jest.fn();
    mockEnrollmentCount = 10;
    mockPSSettingData = fromJS({
      loading: false,
      settings: {},
    });

    wrapper = shallow(
      <PSSettingContainer
        cohortObj={mockCohortObj}
        psSettingsContainerRequest={mockPSSettingsContainerRequest}
        psSettingsSave={mockPSSettingsSave}
        enrollmentCount={mockEnrollmentCount}
        psSettingData={mockPSSettingData}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect psSettingsContainerRequest to have been called', () => {
    expect(mockPSSettingsContainerRequest).toHaveBeenCalled();
  });

  it('handleSave to have called psSettingsSave', () => {
    const mockUpdatedSettings = 'mockUpdatedSettings';
    wrapper.instance().handleSave(mockUpdatedSettings);

    expect(mockPSSettingsSave).toHaveBeenCalledWith(mockUpdatedSettings);
  });
});
