import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { PISettingContainer } from '../index';

describe('<PISettingContainer />', () => {
  let wrapper = null;

  let mockCohortObj = null;
  let mockPISettingsContainerRequest = null;
  let mockPISettingsSave = null;
  let mockEnrollmentCount = null;
  let mockPISettingData = null;

  beforeEach(() => {
    mockCohortObj = fromJS({
      cohortType: 'mockCohType',
    });

    mockPISettingsContainerRequest = jest.fn();
    mockPISettingsSave = jest.fn();
    mockEnrollmentCount = 10;
    mockPISettingData = fromJS({
      loading: false,
      settings: {},
    });

    wrapper = shallow(
      <PISettingContainer
        cohortObj={mockCohortObj}
        piSettingsContainerRequest={mockPISettingsContainerRequest}
        piSettingsSave={mockPISettingsSave}
        enrollmentCount={mockEnrollmentCount}
        piSettingData={mockPISettingData}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect piSettingsContainerRequest to have been called', () => {
    expect(mockPISettingsContainerRequest).toHaveBeenCalled();
  });

  it('handleSave to have called piSettingsSave', () => {
    const mockUpdatedSettings = 'mockUpdatedSettings';
    wrapper.instance().handleSave(mockUpdatedSettings);

    expect(mockPISettingsSave).toHaveBeenCalledWith(mockUpdatedSettings);
  });
});
