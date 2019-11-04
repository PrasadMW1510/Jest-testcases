import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMTable from 'components/SAMTable';
import ManageTopicTable from '../ManageTopicTable';

describe('<ManageTopicTable />', () => {
  let mockToggle = jest.fn();
  const mockSecondColumnHeader = '';
  const mockTopics = [];
  beforeEach(() => {
    mockToggle = jest.fn();
  });

  it('Should render correctly with no data', () => {
    const wrapper = mount(
      <ManageTopicTable
        topics={mockTopics}
        handleToggle={mockToggle}
        secondColumnHeader={mockSecondColumnHeader}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should populates the SAMTable with no data', () => {
    const wrapper = shallow(<ManageTopicTable topics={[]} handleToggleEnabled={mockToggle} />);
    const table = wrapper.find(SAMTable);
    const { data } = table.props();
    expect(data).toEqual([]);
  });

  it('Should render correctly with data', () => {
    const items = [
      {
        _id: 'item0001',
        cd_name: 'item0001',
        enabled: undefined,
        globally_enabled: undefined,
        supplimental: '0',
        topic_name: 'Item 1',
      },
    ];
    const mockData = [
      {
        _id: 'i',
        cd_name: 'i',
        enabled: undefined,
        globally_enabled: undefined,
        supplimental: '0',
        topic_name: 'I',
      },
    ];

    const wrapper = shallow(
      <ManageTopicTable
        topics={items}
        handleToggleEnabled={mockToggle}
        secondColumnHeader={'A01'}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    const mockRowData = {
      original: mockData,
    };
    const mockRow = { original: { enabled: '0', globally_enabled: '0' } };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Enabled');
    const itemRowWrapper = shallow(idColumn.Cell(mockRowData));
    expect(idColumn.getHeaderProps().className).toEqual('manage-topic-table__header-enabled');
    expect(shallowToJson(itemRowWrapper)).toMatchSnapshot();

    it('verify handle save', () => {
      wrapper.setProps({
        row: { original: { enabled: '0', globally_enabled: '0' } },
      });
      wrapper.instance().getCheckBoxStatus(mockRow);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
