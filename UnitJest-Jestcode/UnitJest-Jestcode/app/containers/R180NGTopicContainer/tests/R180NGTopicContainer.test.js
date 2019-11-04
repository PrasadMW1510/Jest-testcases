import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { shallowToJson } from 'enzyme-to-json';
import { R180NGTopicContainer } from 'containers/R180NGTopicContainer/R180NGTopicContainer';

describe('<R180NGTopicContainer/>', () => {
  let wrapper = null;
  let mockSmartBarSelections = null;
  let mockShowR180NGTopicsStageModal = null;
  let mockHandleTabsReset = null;
  let mockHandleToggle = null;
  let mockIsolateTab = null;
  let mockR180NGTopicsRequest = null;
  let mockR180NGTopicsInstalledStagesRequest = null;
  let mockR180ngTopics = null;
  let mockProgramEnrollmentCount = null;
  let mockR180NGTopicsSaveRequest = null;
  let mockR180ngSettings = null;
  let mockR180NGProgramSettingsRequest = null;
  let mockShowR180NGTopicsSkipModal = null;
  let mockShowR180NGSkipSegmentModal = null;
  let mockEffectCohortObject = null;

  beforeEach(() => {
    mockShowR180NGTopicsStageModal = jest.fn();
    mockHandleTabsReset = jest.fn();
    mockHandleToggle = jest.fn();
    mockIsolateTab = false;
    mockR180NGTopicsRequest = jest.fn();
    mockR180NGTopicsInstalledStagesRequest = jest.fn();
    mockR180NGTopicsSaveRequest = jest.fn();
    mockR180NGProgramSettingsRequest = jest.fn();
    mockShowR180NGTopicsSkipModal = jest.fn();
    mockShowR180NGSkipSegmentModal = jest.fn();
    mockEffectCohortObject = fromJS({
      cohortType: 'Student',
    });
    mockSmartBarSelections = fromJS({ selectedCohType: 'Student' });
    mockR180ngTopics = fromJS({
      r180ngTopics: {
        topic_cd: [
          {
            enabled: '1',
            cds: ['R180NG'],
            name: 'READ 180 NG Stage B',
            students: [{ total: ['1'] }],
          },
          {
            $: { type: 'SUBPRODUCT' },
            'application.id': ['R180NG'],
            name: 'READ 180 NG Stage A Teacher',
            students: [{ total: ['1'] }],
          },
        ],
      },
    });
    mockProgramEnrollmentCount = fromJS({
      programEnrollmentSetting: [
        {
          name: 'READ 180 NG Stage A',
          students: [{ total: ['5'] }],
        },
        {
          name: 'READ 180 NG Stage B',
          students: [{ total: ['1'] }],
        },
        {
          name: 'READ 180 NG Stage C',
          students: [{ total: ['2'] }],
        },
      ],
    });
    mockR180ngSettings = { auto_level: ['1'], second_language_id: ['1'], student_level: ['1'] };
    wrapper = shallow(
      <R180NGTopicContainer
        smartBarSelections={mockSmartBarSelections}
        handleTabsReset={mockHandleTabsReset}
        handleToggle={mockHandleToggle}
        isolateTab={mockIsolateTab}
        r180ngTopics={mockR180ngTopics}
        R180NGTopicsInstalledStagesRequest={mockR180NGTopicsInstalledStagesRequest}
        R180NGProgramSettingsRequest={mockR180NGProgramSettingsRequest}
        R180NGTopicsRequest={mockR180NGTopicsRequest}
        showR180NGTopicsStageModal={mockShowR180NGTopicsStageModal}
        programEnrollmentCount={mockProgramEnrollmentCount}
        R180NGTopicsSaveRequest={mockR180NGTopicsSaveRequest}
        r180ngSettings={mockR180ngSettings}
        showR180NGSkipSegmentModal={mockShowR180NGSkipSegmentModal}
        showR180NGTopicsSkipModal={mockShowR180NGTopicsSkipModal}
        effectCohortObject={mockEffectCohortObject}
      />
    );
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect R180NGTopicsRequest to have been called', () => {
    expect(mockR180NGTopicsRequest).toHaveBeenCalled();
  });
  it('Expect R180NGTopicsInstalledStagesRequest to have been called', () => {
    expect(mockR180NGTopicsInstalledStagesRequest).toHaveBeenCalled();
  });
  it('Expect R180NGProgramSettingsRequestto have been called', () => {
    expect(mockR180NGProgramSettingsRequest).toHaveBeenCalled();
  });

  it('getStudentLevel to have called r180ngSettings', () => {
    wrapper.setProps({ r180ngSettings: fromJS({ programSetting: 'mockprogramSetting' }) });
    expect(wrapper.instance().getStudentLevel()).toMatchSnapshot();
  });

  it('getCohortId to have called effectCohortObject', () => {
    expect(wrapper.instance().getCohortId()).toMatchSnapshot();
  });

  it('getStudentId to have called smartBarSelections', () => {
    expect(wrapper.instance().getStudentId()).toMatchSnapshot();
  });

  it('getEnrollmentCount to have called ', () => {
    expect(wrapper.instance().getEnrollmentCount()).toMatchSnapshot();
  });

  it('to verify handleSaveClick for saving r180ng topics', () => {
    expect(wrapper.instance().handleSaveClick()).toMatchSnapshot();
  });
  it('to verify getTopicInstalledStages', () => {
    expect(wrapper.instance().getTopicInstalledStages()).toMatchSnapshot();
  });

  it('to verify getSelectedTopicManager', () => {
    expect(wrapper.instance().getSelectedTopicManager()).toMatchSnapshot();
  });
  it(' to have called handleSetTopicsStageClick', () => {
    const mockEvent = jest.fn();
    wrapper.instance().handleSetTopicsStageClick(mockEvent);

    expect(mockShowR180NGTopicsStageModal).toHaveBeenCalledWith(mockEvent);
  });

  it(' to have called handleSetTopicsSkipClick', () => {
    const mockEvent = jest.fn();
    wrapper.instance().handleSetTopicsSkipClick(mockEvent);

    expect(mockShowR180NGTopicsSkipModal).toHaveBeenCalledWith(mockEvent);
  });

  it(' to have called handleSegmentSkipClick ', () => {
    const mockEvent = jest.fn();
    wrapper.instance().handleSegmentSkipClick(mockEvent);
    expect(mockShowR180NGSkipSegmentModal).toHaveBeenCalledWith(mockEvent);
  });
});
