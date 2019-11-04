import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { S44SettingContainer } from '../index';

describe('<S44SettingContainer />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockS44SettingsContainerRequest = null;
  let mockS44SettingsSave = null;
  let mockCohortObj = null;
  let mockEnrollmentCount = null;
  let mockS44SettingsData = null;

  beforeEach(() => {
    mockS44SettingsContainerRequest = jest.fn();
    mockS44SettingsSave = jest.fn();
    mockCohortObj = fromJS({
      cohortType: 'mockCohType',
    });
    mockEnrollmentCount = 10;
    mockS44SettingsData = fromJS({
      settings: {
        data: 'mockSettingsData',
      },
      loading: false,
    });

    wrapper = shallow(
      <S44SettingContainer
        s44SettingsContainerRequest={mockS44SettingsContainerRequest}
        s44SettingsSave={mockS44SettingsSave}
        cohortObj={mockCohortObj}
        enrollmentCount={mockEnrollmentCount}
        s44SettingData={mockS44SettingsData}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect s44SettingsContainerRequest to have been called', () => {
    expect(mockS44SettingsContainerRequest).toHaveBeenCalled();
  });

  it('expect handleSave to call S44SettingsSave with updated settings', () => {
    wrapperInstance.handleSave('mockUpdatedSettings');
    expect(mockS44SettingsSave).toHaveBeenCalledWith('mockUpdatedSettings');
  });
});
