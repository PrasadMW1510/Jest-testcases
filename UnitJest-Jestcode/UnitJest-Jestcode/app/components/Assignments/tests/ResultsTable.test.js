import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import moment from 'moment';
import SAMTable from 'components/SAMTable';
import ResultsTable from '../ResultsTable';

describe('<ResultsTable />', () => {
  let wrapper = null;
  const props = {
    handleClick: jest.fn(),
    toggleAllCheckboxes: jest.fn(),
    handleRowSelections: jest.fn(),
    handleRowCheckboxOnChange: jest.fn(),
    searchResultsIdsChecked: [],
    selectAll: true,
  };
  wrapper = shallow(<ResultsTable {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect setActiveTab to render correctly', () => {
    const e = {
      target: {
        text: 'abs',
      },
    };
    wrapper.instance().setActiveTab(e);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect calculateRowCount to render correctly', () => {
    wrapper.instance().calculateRowCount();
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
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns cell method Assignment', () => {
    const e = {
      value: '',
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Assignment');
    expect(idColumn.Cell(e)).toMatchSnapshot();
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const newProps = {
      data: [],
    };
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns accessor method Date', () => {
    const d = {
      date: moment('06/06/2018', 'MM/DD/YYYY', true).format(),
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Date');
    expect(idColumn.accessor(d)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns accessor method Program', () => {
    const d = {
      community_id: 1,
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Program');
    expect(idColumn.accessor(d)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns accessor method Graded', () => {
    const d = {
      graded: 'true',
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Graded');
    expect(idColumn.accessor(d)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns accessor method Graded', () => {
    const d = {
      graded: 'false',
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Graded');
    expect(idColumn.accessor(d)).toMatchSnapshot();
  });
});
