import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { USER_TYPE } from 'containers/App/constants';
import { RCSettingContainer } from '../index';

describe('<RCSettingContainer />', () => {
  let wrapper = null;

  let mockCohortObj = null;
  let mockRCSettingsContainerRequest = null;
  let mockRCSettingsSave = null;
  // let mockRCTopicSave = null;
  let mockEnrollmentCount = null;
  let mockRCSettingData = null;
  let mockShowModal = null;

  beforeEach(() => {
    mockCohortObj = fromJS({
      cohortType: 'mockCohType',
    });
    mockRCSettingsContainerRequest = jest.fn();
    mockRCSettingsSave = jest.fn();
    // mockRCTopicSave = jest.fn();
    mockEnrollmentCount = 10;
    mockRCSettingData = fromJS({
      immSettings: {
        data: 'mockSettingsData',
      },
      loading: false,
      topicManager: {
        installedStages: [],
        selectedStage: '',
        topics: [],
      },
    });
    mockShowModal = jest.fn();

    wrapper = shallow(
      <RCSettingContainer
        cohortObj={mockCohortObj}
        enrollmentCount={mockEnrollmentCount}
        immRcSettingData={mockRCSettingData}
        loggedInUserType={USER_TYPE.Administrator}
        programName="Reading Counts!"
        rcSettingsContainerRequest={mockRCSettingsContainerRequest}
        rcSettingsSave={mockRCSettingsSave}
        // rcTopicSave={mockRCTopicSave}
        showModal={mockShowModal}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  // TODO: Uncomment and update accordingly.

  /* it('Expect rcSettingsContainerRequest to have been called', () => {
    expect(mockRCSettingsContainerRequest).toHaveBeenCalled();
  });

  it('setStage to have called rcSetSelectedStage', () => {
    const mockSelectedStage = 'mockSelectedStage';
    wrapper.instance().setStage(mockSelectedStage);

    expect(mockRCSetSelectedStage).toHaveBeenCalledWith(mockSelectedStage);
  });

  it('handleSave to have called rcSettingsSave', () => {
    const mockUpdatedSettings = 'mockUpdatedSettings';
    wrapper.instance().handleSave(mockUpdatedSettings);

    expect(mockRCSettingsSave).toHaveBeenCalledWith(mockUpdatedSettings);
  });

  it('handleTopicSave to have called rcTopicSave', () => {
    const mockUpdatedTopic = 'mockUpdatedTopic';
    wrapper.instance().handleTopicSave(mockUpdatedTopic);

    expect(mockRCTopicSave).toHaveBeenCalledWith(mockUpdatedTopic);
  }); */
});
