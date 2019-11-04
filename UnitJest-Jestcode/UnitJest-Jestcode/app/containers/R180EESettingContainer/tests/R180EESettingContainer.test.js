import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { R180EESettingContainer } from '../index';

describe('<R180EESettingContainer />', () => {
  let wrapper = null;

  let mockCohortObj = null;
  let mockEnrollmentDetails = null;
  let mockR180EESetSelectedStage = null;
  let mockR180EESettingsContainerRequest = null;
  let mockR180EESettingsSave = null;
  let mockR180EETopicSave = null;
  let mockEnrollmentCount = null;
  let mockR180EESettingData = null;
  let mockShowModal = null;

  beforeEach(() => {
    mockCohortObj = fromJS({
      cohortType: 'mockCohType',
    });

    mockEnrollmentDetails = [
      {
        applicationId: 'R180_A',
        enrollmentCount: 10,
      },
      {
        applicationId: 'R180_A_Upsell',
        enrollmentCount: 0,
      },
      {
        applicationId: 'R180_B',
        enrollmentCount: 20,
      },
      {
        applicationId: 'R180_B_Upsell',
        enrollmentCount: 0,
      },
      {
        applicationId: 'R180_C',
        enrollmentCount: 2,
      },
      {
        applicationId: 'R180_C_Upsell',
        enrollmentCount: 0,
      },
    ];

    mockR180EESetSelectedStage = jest.fn();
    mockR180EESettingsContainerRequest = jest.fn();
    mockR180EESettingsSave = jest.fn();
    mockR180EETopicSave = jest.fn();
    mockEnrollmentCount = 10;
    mockR180EESettingData = fromJS({
      settings: {
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
      <R180EESettingContainer
        cohortObj={mockCohortObj}
        enrollmentDetails={mockEnrollmentDetails}
        r180EESetSelectedStage={mockR180EESetSelectedStage}
        r180EESettingsContainerRequest={mockR180EESettingsContainerRequest}
        r180EESettingsSave={mockR180EESettingsSave}
        r180EETopicSave={mockR180EETopicSave}
        enrollmentCount={mockEnrollmentCount}
        r180EESettingData={mockR180EESettingData}
        showModal={mockShowModal}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect r180EESettingsContainerRequest to have been called', () => {
    expect(mockR180EESettingsContainerRequest).toHaveBeenCalled();
  });

  it('setStage to have called r180EESetSelectedStage', () => {
    const mockSelectedStage = 'mockSelectedStage';
    wrapper.instance().setStage(mockSelectedStage);

    expect(mockR180EESetSelectedStage).toHaveBeenCalledWith(mockSelectedStage);
  });

  it('handleSave to have called r180EESettingsSave', () => {
    const mockUpdatedSettings = 'mockUpdatedSettings';
    wrapper.instance().handleSave(mockUpdatedSettings);

    expect(mockR180EESettingsSave).toHaveBeenCalledWith(mockUpdatedSettings);
  });

  it('handleTopicSave to have called r180EETopicSave', () => {
    const mockUpdatedTopic = 'mockUpdatedTopic';
    wrapper.instance().handleTopicSave(mockUpdatedTopic);

    expect(mockR180EETopicSave).toHaveBeenCalledWith(mockUpdatedTopic);
  });
});
