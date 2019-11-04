import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import TopicManagerStudentViewTab from '../TopicManagerStudentViewTab';
import { CHOICE_TYPE_STUDENT } from '../constants';

describe('<TopicManagerStudentViewTab />', () => {
  let wrapper = null;
  // const mockToggle = null;
  // const mockTabsReset = null;
  // let mockDataSkipTopic = {};
  // let mockDataSkipSegment = {};
  let mockR180ngTopics = null;
  let mockState = null;
  let mockStudentLevel = null;
  let mockHandleTabsReset = null;
  let mockHandleToggle = null;
  let mockShowR180NGTopicsSkipModal = null;
  let mockShowR180NGSegmentSkipModal = null;
  let mockR180ngSaveTopics = null;
  beforeEach(() => {
    mockHandleToggle = jest.fn();
    mockHandleTabsReset = jest.fn();

    mockShowR180NGTopicsSkipModal = jest.fn();
    mockShowR180NGSegmentSkipModal = jest.fn();
    mockR180ngSaveTopics = jest.fn();
    mockStudentLevel = fromJS({ student_level: ['1'] });
    mockR180ngTopics = fromJS({
      student_level: ['1'],
      topic_cd: [
        {
          enable: ['1'],
          cd_name: ['A01'],
          supplimental: ['0'],
          topic_name: ['Can You Believe It?'],
          globally_enabled: ['1'],
          student_level: ['2'],
          segment1_name: ['segment1_name'],
          segment2_name: ['segment2_name'],
          segment3_name: ['segment3_name'],
          segment4_name: ['segment4_name'],
          topic_complete_levels: [{ topic_complete_level: [] }],
          current_segment: ['1'],
        },
        {
          enable: ['1'],
          cd_name: ['A02'],
          supplimental: ['0'],
          topic_name: ['Predator'],
          globally_enabled: ['1'],
          student_level: ['2'],
          segment1_name: ['segment1_name'],
          segment2_name: ['segment2_name'],
          segment3_name: ['segment3_name'],
          segment4_name: ['segment4_name'],
          current_segment: ['2'],
        },
      ],
    });
    mockState = {
      completionLevel: '',
      currentSegment: 'segment1_name',
      currentSegmentId: '1',
      currentTopic: 'Can You Believe It?',
      currentTopicID: 'A01',
      r180ngTopicsObj: {
        student_level: ['1'],
        topic_cd: [
          {
            enable: ['1'],
            cd_name: ['A01'],
            supplimental: ['0'],
            topic_name: ['Can You Believe It?'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            topic_complete_levels: [{ topic_complete_level: [] }],
            current_segment: ['1'],
          },
          {
            enable: ['1'],
            cd_name: ['A02'],
            supplimental: ['0'],
            topic_name: ['Predator'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            current_segment: ['2'],
          },
        ],
      },
      saveOptions: true,
      skipLevel: true,
      skipSegment: false,
      skipTopic: false,
      skipTopicObj: {},
      studentLevel: { student_level: ['1'] },
      studentLevelToggle: true,
    };

    //  mockDataSkipTopic = { data: 'Predators', skipTopic: jest.fn() };
    //  mockDataSkipSegment = { data: 'Predators', skipSegment: jest.fn() };
    wrapper = shallow(
      <TopicManagerStudentViewTab
        r180ngTopics={mockR180ngTopics}
        studentLevel={mockStudentLevel}
        handleTabsReset={mockHandleTabsReset}
        handleToggle={mockHandleToggle}
        showR180NGTopicsSkipModal={mockShowR180NGTopicsSkipModal}
        showR180NGSegmentSkipModal={mockShowR180NGSegmentSkipModal}
        r180ngSaveTopics={mockR180ngSaveTopics}
      />
    );
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handle handleSetInitialValues ', () => {
    wrapper.instance().handleSetInitialValues();
    expect(wrapper.state('saveOptions')).toEqual(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handle showSaveOptions ', () => {
    wrapper.instance().showSaveOptions();
    expect(wrapper.state('saveOptions')).toEqual(false);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handle hideSaveOptions ', () => {
    wrapper.instance().hideSaveOptions();
    expect(wrapper.state('saveOptions')).toEqual(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('verify handleSaveAndReturn ', () => {
    wrapper.instance().handleSaveAndReturn();
    expect(mockR180ngSaveTopics).toBeCalledWith(mockState);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleSubmit', () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockR180ngSaveTopics).toHaveBeenCalledWith(mockState);
  });
  it('getTopicsSkipModal', () => {
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.instance().getTopicsSkipModal(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockShowR180NGTopicsSkipModal).toHaveBeenCalled();
  });

  it('getSegmentSkipModal', () => {
    const mockEvent = { preventDefault: jest.fn() };

    wrapper.instance().getSegmentSkipModal(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockShowR180NGSegmentSkipModal).toHaveBeenCalled();
  });

  it('handleCheckBoxChange when checked value is true', () => {
    const mockEvent = { target: { id: 'A01', enable: ['0'], value: 'A01', checked: true } };

    wrapper.instance().handleCheckBoxChange(mockEvent);

    wrapper.setState({
      r180ngTopicsObj: {
        student_level: ['1'],
        topic_cd: [
          {
            enable: ['1'],
            cd_name: ['A01'],
            supplimental: ['0'],
            topic_name: ['Can You Believe It?'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            topic_complete_levels: [{ topic_complete_level: [] }],
            current_segment: ['3'],
          },
          {
            enable: ['1'],
            cd_name: ['A04'],
            supplimental: ['0'],
            topic_name: ['Predator'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            current_segment: ['4'],
          },
        ],
      },
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleCheckBoxChange when checked value is false', () => {
    const mockEvent = { target: { id: 'A01', value: 'A01', enable: ['1'], checked: false } };

    wrapper.instance().handleCheckBoxChange(mockEvent);

    wrapper.setState({
      r180ngTopicsObj: {
        student_level: ['1'],
        topic_cd: [
          {
            enable: ['0'],
            cd_name: ['A01'],
            supplimental: ['0'],
            topic_name: ['Can You Believe It?'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            topic_complete_levels: [{ topic_complete_level: [] }],
            current_segment: ['3'],
          },
          {
            enable: ['1'],
            cd_name: ['A04'],
            supplimental: ['0'],
            topic_name: ['Predator'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            current_segment: ['4'],
          },
        ],
      },
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('getSegment', () => {
    wrapper.setProps({ segment: '0', currentSegment: 'segment_1' });
    expect(wrapper.instance().getSegment()).toMatchSnapshot();
  });
  it('setSkipTopic', () => {
    expect(wrapper.instance().setSkipTopic()).toMatchSnapshot();
  });
  it('setSkipSegment', () => {
    wrapper.setState({ currentSegmentId: '3' });
    expect(wrapper.instance().setSkipSegment()).toMatchSnapshot();
  });
  it('setSkipSegment', () => {
    wrapper.setState({ currentSegmentId: '0' });
    expect(wrapper.instance().setSkipSegment()).toMatchSnapshot();
  });
  it('setSkipSegment', () => {
    wrapper.setState({ currentSegmentId: '1' });
    expect(wrapper.instance().setSkipSegment()).toMatchSnapshot();
  });
  it('setSkipSegment', () => {
    wrapper.setState({ currentSegmentId: '2' });
    expect(wrapper.instance().setSkipSegment()).toMatchSnapshot();
  });
  it('setSkipSegment', () => {
    wrapper.setState({ currentSegmentId: '4' });
    expect(wrapper.instance().setSkipSegment()).toMatchSnapshot();
  });
  it('setSkipSegment', () => {
    wrapper.setState({ skipSegment: true, skipsSegmentData: { skippedSegmentId: '1' } });
    expect(wrapper.instance().setSkipSegment()).toMatchSnapshot();
  });
  it('getSegmentName', () => {
    wrapper.setState({ skipData: { skipTopicName: CHOICE_TYPE_STUDENT } });
    expect(wrapper.instance().getSegmentName()).toMatchSnapshot();
  });
  it('getSegmentName', () => {
    wrapper.setState({ skipData: { skipSegmentName: 'segment1_name' } });
    expect(wrapper.instance().getSegmentName()).toMatchSnapshot();
  });
  it('getCurrentTopicData', () => {
    expect(wrapper.instance().getCurrentTopicData(CHOICE_TYPE_STUDENT, 'A01')).toMatchSnapshot();
  });
  it('getCurrentTopic', () => {
    expect(wrapper.instance().getCurrentTopic()).toMatchSnapshot();
  });
  it('componentWillReceiveProps', () => {
    const mockNextProps = {
      r180ngTopics: fromJS({
        student_level: ['1'],
        topic_cd: [
          {
            enable: ['1'],
            cd_name: ['A01'],
            supplimental: ['0'],
            topic_name: ['Can You Believe It?'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            topic_complete_levels: [{ topic_complete_level: [] }],
            current_segment: ['2'],
          },
          {
            enable: ['1'],
            cd_name: ['A02'],
            supplimental: ['0'],
            topic_name: ['Predator'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            current_segment: ['1'],
          },
        ],
      }),
      studentLevel: fromJS({ student_level: ['1'] }),
    };
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('setSkipTopic to student choice', () => {
    const mockR180ngTopicsObj = {
      r180ngTopicsObj: fromJS({
        student_level: ['1'],
        topic_cd: [
          {
            enable: ['1'],
            cd_name: ['A01'],
            supplimental: ['0'],
            topic_name: ['Can You Believe It?'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            topic_complete_levels: [{ topic_complete_level: [] }],
            current_segment: ['2'],
          },
          {
            enable: ['1'],
            cd_name: ['A02'],
            supplimental: ['0'],
            topic_name: ['Predator'],
            globally_enabled: ['1'],
            student_level: ['2'],
            segment1_name: ['segment1_name'],
            segment2_name: ['segment2_name'],
            segment3_name: ['segment3_name'],
            segment4_name: ['segment4_name'],
            current_segment: ['1'],
          },
        ],
      }),
      studentLevel: fromJS({ student_level: ['2'] }),
    };
    wrapper.setState(...mockR180ngTopicsObj);
    expect(wrapper.instance().setSkipTopic()).toMatchSnapshot();
  });
});
