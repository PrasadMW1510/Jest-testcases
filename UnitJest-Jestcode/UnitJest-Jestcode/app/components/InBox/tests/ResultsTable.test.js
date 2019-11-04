import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMTable from 'components/SAMTable';
import moment from 'moment';
import ResultsTable from '../ResultsTable';

describe('<ResultsTable />', () => {
  let wrapper = null;
  let wrapper1 = null;
  const items = [
    {
      name: 'Book 1',
      id: '5',
    },
  ];
  const props = {
    handleClick: jest.fn(),
    toggleAllCheckboxes: jest.fn(),
    handleRowSelections: jest.fn(),
    handleRowCheckboxOnChange: jest.fn(),
    searchResultsIdsChecked: [],
    selectAll: true,
    resultdata: {
      results: [
        {
          $: {
            workItemId: 1,
          },
        },
      ],
    },
    handleDetailProgram: jest.fn(),
  };
  wrapper = shallow(<ResultsTable {...props} results={items} key={[]} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect setActiveTab to render correctly', () => {
    const e = {
      target: {
        text: 'qwerty',
      },
    };
    wrapper.instance().setActiveTab(e);
    expect(wrapper.state('e')).toEqual();
  });
  it('Expect calculateRowCount to render correctly', () => {
    wrapper.instance().calculateRowCount();
    expect(wrapper.state('data')).toEqual([]);
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const newProps = {
      data: [],
    };
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper.state('data')).toEqual([]);
  });
  it('Expect calculateRowCount to render correctly', () => {
    const props1 = {
      handleClick: jest.fn(),
      toggleAllCheckboxes: jest.fn(),
      handleRowSelections: jest.fn(),
      handleRowCheckboxOnChange: jest.fn(),
      searchResultsIdsChecked: [],
      selectAll: true,
      resultdata: {},
      handleDetailProgram: jest.fn(),
    };
    wrapper1 = shallow(<ResultsTable {...props1} />);
    wrapper1.instance().calculateRowCount();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect getData to render correctly', () => {
    wrapper.setState({
      data: [
        {
          id: 1,
        },
      ],
    });
    wrapper.instance().getData();
    expect(wrapper.state('data')).toEqual([{ id: 1 }]);
  });
  it('Expect getData to render correctly', () => {
    wrapper.setState({
      data: undefined,
    });
    wrapper.instance().getData();
    expect(wrapper.state('data')).toEqual();
  });
  it('Expect checkData to render correctly', () => {
    const th = {};
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().checkData(event, th);
    expect(wrapper.state('event')).toEqual();
  });
  it('Expect onRowClick to render correctly', () => {
    const state = {};
    const rowInfo = {
      original: '',
    };
    const checkDataSpy = jest.fn();
    wrapper.instance().checkData = checkDataSpy;
    wrapper
      .instance()
      .onRowClick(state, rowInfo)
      .onClick();
    expect(checkDataSpy).toBeCalled();
  });
  it('should populate the SAMTable with the right columns', () => {
    const rows = {
      original: {},
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Program');
    expect(idColumn.Cell(rows)).toMatchSnapshot();
  });
  it('should populate the SAMTable with the right columns', () => {
    const d = {
      date: moment('06/06/2018', 'MM/DD/YYYY', true).format(),
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Date');
    expect(idColumn.accessor(d)).toMatchSnapshot();
  });
});
