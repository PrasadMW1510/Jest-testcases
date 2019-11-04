import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMTable from 'components/SAMTable';
import moment from 'moment';
import ResultsTable from '../ResultsTable';
jest.mock('react-router-dom');

describe('ResultsTable', () => {
  const props = {
    handleClick: jest.fn(),
    searchResultsIdsChecked: [],
    handleDetailProgram: jest.fn(),
  };
  const wrapper = mount(<ResultsTable {...props} />);
  it('should render correctly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call checkData', () => {
    const row = [];
    const selectedIndex = 1;
    const metaData = '';
    wrapper.instance().checkData(row, selectedIndex, metaData);
    expect(props.handleDetailProgram.mock.calls.length).toBe(1);
  });
  it('should call onRowClick ', () => {
    const rowInfo = {
      original: '',
      index: 0,
    };
    const state = {};
    const checkDataSpy = jest.fn();
    wrapper.instance().checkData = checkDataSpy;
    wrapper
      .instance()
      .onRowClick(state, rowInfo)
      .onClick();
    expect(checkDataSpy).toBeCalled();
  });
  it('should call setActiveTab  ', () => {
    const e = {
      target: {
        text: 'vyp',
      },
    };
    wrapper.instance().setActiveTab(e);
    expect(props.handleClick.mock.calls.length).toBe(1);
  });
  it('should call calculateRowCount   ', () => {
    wrapper.instance().calculateRowCount();
    expect(wrapper.state('data')).toEqual([]);
  });
  it('should call getData', () => {
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
  it('should call componentWillReceiveProps', () => {
    const newProps = {
      data: [],
    };
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper.state('data')).toEqual([]);
  });
  it('should populate the BooksTable with the right columns cell method Program', () => {
    const d = {
      community_id: '',
    };
    const e = {
      value: '',
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Program');
    expect(idColumn.accessor(d)).toMatchSnapshot();
    expect(idColumn.Cell(e)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns cell method Graded', () => {
    const d = {
      graded: 'true',
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Graded');
    expect(idColumn.accessor(d)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns cell method Graded', () => {
    const d = {
      graded: 'false',
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Graded');
    expect(idColumn.accessor(d)).toEqual('');
  });
  it('should populate the BooksTable with the right columns cell method Date', () => {
    const d = {
      date: moment('06-22-2018', 'MM/DD/YYYY', true).format(),
    };
    const table = wrapper.find(SAMTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Date');
    expect(idColumn.accessor(d)).toMatchSnapshot();
  });
});
