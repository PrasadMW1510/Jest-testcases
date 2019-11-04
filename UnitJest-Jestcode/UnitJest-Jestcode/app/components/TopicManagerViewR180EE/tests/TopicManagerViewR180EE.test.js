import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import React from 'react';

import { COHORT_TYPE } from 'containers/App/constants';
import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';

import TopicManagerViewR180EE from '../index';

describe('<TopicManagerViewR180EE />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockEnrollmentDetails = null;
  let mockHandleTopicSave = null;
  let mockSetIsolateTab = null;
  let mockSetStage = null;
  let mockShowModal = null;
  let mockTopicManager = null;

  let mockEvent = null;

  beforeEach(() => {
    mockHandleTopicSave = jest.fn();
    mockSetIsolateTab = jest.fn();
    mockSetStage = jest.fn();
    mockShowModal = jest.fn();

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

    mockTopicManager = fromJS({
      installedStages: [
        {
          name: ['READ 180 EE Stage A'],
          stage_id: ['R180_A'],
        },
        {
          name: ['READ180 Xtra Topic Software A'],
          stage_id: ['R180_A_Upsell'],
        },
        {
          name: ['READ 180 EE Stage B'],
          stage_id: ['R180_B'],
        },
        {
          name: ['READ180 Xtra Topic Software B'],
          stage_id: ['R180_B_Upsell'],
        },
        {
          name: ['READ 180 EE Stage C'],
          stage_id: ['R180_C'],
        },
        {
          name: ['READ180 Xtra Topic Software C'],
          stage_id: ['R180_C_Upsell'],
        },
      ],
      selectedStage: '',
      topics: [
        {
          cd_name: ['A01'],
          enable: ['0'],
          supplimental: ['0'],
          topic_name: ['Can You Believe It?'],
        },
        {
          cd_name: ['B01'],
          enable: ['1'],
          supplimental: ['0'],
          topic_name: ['Art Attack'],
        },
        {
          cd_name: ['C01'],
          enable: ['1'],
          supplimental: ['0'],
          topic_name: ['Believe & Achieve'],
        },
      ],
    });

    wrapper = shallow(
      <TopicManagerViewR180EE
        cohortType={COHORT_TYPE.District}
        enrollmentDetails={mockEnrollmentDetails}
        handleTopicSave={mockHandleTopicSave}
        isTabIsolated={false}
        setIsolateTab={mockSetIsolateTab}
        setStage={mockSetStage}
        showModal={mockShowModal}
        topicManager={mockTopicManager}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('expect it to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('tab is isolated and it render correctly', () => {
    wrapper.setProps({ isTabIsolated: true });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('handleInstalledStagesOnChange', () => {
    wrapperInstance.handleInstalledStagesOnChange({ target: { value: 'R180_A' } });
    expect(mockShowModal).toHaveBeenCalledWith(OK_CANCEL_MODAL, {
      cancelLabel: 'No',
      message: wrapperInstance.renderOkCancelModalMessage(),
      modalClassName: 'topic-manager-view-r180ee__modal',
      okLabel: 'Yes',
      onOk: wrapperInstance.modalHandleOnOk,
      onOkParam: 'R180_A',
    });
  });

  it('modalHandleOnOk', () => {
    wrapperInstance.modalHandleOnOk('R180_A');
    expect(mockSetStage).toHaveBeenCalledWith('R180_A');
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  describe('handleToggleEnabled', () => {
    it('checked is true', () => {
      mockEvent = {
        target: {
          id: 'A01',
          checked: true,
        },
      };

      wrapperInstance.handleToggleEnabled(mockEvent);
      const topicState = wrapper.state('topics');

      expect(topicState[0].enable).toEqual(['1']);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });

    it('checked is false', () => {
      mockEvent = {
        target: {
          id: 'B01',
          checked: false,
        },
      };

      wrapperInstance.handleToggleEnabled(mockEvent);
      const topicState = wrapper.state('topics');

      expect(topicState[1].enable).toEqual(['0']);
      expect(mockSetIsolateTab).toHaveBeenCalledWith(true);
    });
  });

  it('handleSave', () => {
    wrapperInstance.handleSave();
    const topicState = wrapper.state('topics');

    expect(mockHandleTopicSave).toHaveBeenCalledWith(topicState);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('handleSetInitialValues', () => {
    wrapperInstance.handleSetInitialValues();

    expect(mockSetStage).toHaveBeenCalledWith('');
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('handleSubmit', () => {
    const topicState = wrapper.state('topics');
    mockEvent = { preventDefault: jest.fn() };
    wrapperInstance.handleSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockHandleTopicSave).toHaveBeenCalledWith(topicState);
    expect(mockSetIsolateTab).toHaveBeenCalledWith(false);
  });

  it('renderOkCancelModalMessage', () => {
    expect(wrapperInstance.renderOkCancelModalMessage()).toMatchSnapshot();
  });

  describe('renderInstallStages', () => {
    it('cohortType is District', () => {
      wrapper.setProps({ cohortType: COHORT_TYPE.District });

      expect(wrapperInstance.renderInstalledStages()).toMatchSnapshot();
    });

    it('cohortType is School', () => {
      wrapper.setProps({ cohortType: COHORT_TYPE.School });

      expect(wrapperInstance.renderInstalledStages()).toMatchSnapshot();
    });

    it('cohortType is Teacher', () => {
      wrapper.setProps({ cohortType: COHORT_TYPE.Teacher });

      expect(wrapperInstance.renderInstalledStages()).toMatchSnapshot();
    });
  });
});
