import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { S44NGSettingContainer } from '../index';

describe('<S44NGSettingContainer />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockS44NGSettingsContainerRequest = null;
  let mockS44NGSettingsSave = null;
  let mockCohortObj = null;
  let mockEnrollmentCount = null;
  let mockS44NGSettingsData = null;

  beforeEach(() => {
    mockS44NGSettingsContainerRequest = jest.fn();
    mockS44NGSettingsSave = jest.fn();
    mockCohortObj = fromJS({
      cohortType: 'mockCohType',
    });
    mockEnrollmentCount = 10;
    mockS44NGSettingsData = fromJS({
      settings: {
        data: 'mockSettingsData',
      },
      loading: false,
    });

    wrapper = shallow(
      <S44NGSettingContainer
        s44NGSettingsContainerRequest={mockS44NGSettingsContainerRequest}
        s44NGSettingsSave={mockS44NGSettingsSave}
        cohortObj={mockCohortObj}
        enrollmentCount={mockEnrollmentCount}
        s44NGSettingsData={mockS44NGSettingsData}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect s44NGSettingsContainerRequest to have been called', () => {
    expect(mockS44NGSettingsContainerRequest).toHaveBeenCalled();
  });

  it('expect handleSave to call s44NGSettingsSave with updated settings', () => {
    wrapperInstance.handleSave('mockUpdatedSettings');
    expect(mockS44NGSettingsSave).toHaveBeenCalledWith('mockUpdatedSettings');
  });
});
