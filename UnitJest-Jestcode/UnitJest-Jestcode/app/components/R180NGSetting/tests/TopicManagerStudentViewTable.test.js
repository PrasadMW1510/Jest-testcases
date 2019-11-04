import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMTable from 'components/SAMTable';
import TopicManagerStudentViewTable from '../TopicManagerStudentViewTable';

describe('<TopicManagerStudentViewTable />', () => {
  let wrapper = null;
  let mockTopics = null;
  let mockHandleToggleEnabled = null;
  let mockCurrentTopicID = null;
  let mockTopicId = null;
  let mockTopicName = null;
  let mockSkipTopic = null;
  let mockSkippedLevel = null;
  let mockSkippedTopicId = null;
  let mockData = null;
  beforeEach(() => {
    mockHandleToggleEnabled = jest.fn();
    mockTopics = {
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
          current_segment: ['1'],
        },
      ],
    };
    mockCurrentTopicID = 'A02';
    mockTopicId = 'A02';
    mockTopicName = 'Predator';
    mockSkipTopic = 'A02';
    mockSkippedLevel = '2';
    mockSkippedTopicId = 'A02';
    mockData = [
      {
        _id: 'i',
        cd_name: 'i',
        enabled: undefined,
        globally_enabled: undefined,
        supplimental: '0',
        topic_name: 'I',
      },
    ];

    wrapper = mount(
      <TopicManagerStudentViewTable
        topics={mockTopics}
        handleToggleEnabled={mockHandleToggleEnabled}
        currentTopicID={mockCurrentTopicID}
        topicId={mockTopicId}
        topicName={mockTopicName}
        skipTopic={mockSkipTopic}
        skippedLevel={mockSkippedLevel}
        skippedTopicId={mockSkippedTopicId}
      />
    );
  });
  it('to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should populate the SAMTable with the right columns', () => {
    const mockRowData = {
      original: mockData,
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Enabled');
    const itemRowWrapper = shallow(idColumn.Cell(mockRowData));
    expect(idColumn.getHeaderProps().className).toEqual('manage-topic-table__header-enabled');
    expect(shallowToJson(itemRowWrapper)).toMatchSnapshot();
  });
  it('verify handle save', () => {
    wrapper.setProps({
      row: { original: { enabled: '0', globally_enabled: '0' } },
    });
    // wrapper.instance().getCheckBoxStatus('asdf');
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
