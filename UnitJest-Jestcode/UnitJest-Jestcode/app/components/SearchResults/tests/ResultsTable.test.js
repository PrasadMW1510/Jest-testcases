import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BooksTable from 'components/BooksTable';
import ResultsTable from '../ResultsTable';

jest.mock('react-router-dom');

describe('<ResultsTable />', () => {
  let wrapper = null;

  const props = {
    searchDetailModal: jest.fn(),
    handleSortResultsOnClick: jest.fn(),
    selectAll: true,
    searchResultsIdsChecked: [],
    handleRowCheckboxOnChange: jest.fn(),
    handleRowSelections: jest.fn(),
    toggleAllCheckboxes: jest.fn(),
    searchResults: {
      results: [
        {
          ID: 1,
          Title: ['title'],
        },
      ],
      Author: [
        {
          LastName: '',
          FirstName: '',
        },
      ],
      Type: ['1'],
      paginationData: {
        current_page: 3,
        items_per_page: 10,
      },
      itemCount: '5',
    },
  };
  const items = [
    {
      Author: [
        {
          LastName: 'ghft',
          FirstName: 'fghfd',
        },
      ],
      Type: ['1'],
    },
    {
      Author: [
        {
          LastName: 'ghft',
          FirstName: 'fghfd',
        },
      ],
      Type: ['1'],
    },
  ];
  beforeEach(() => {
    wrapper = shallow(<ResultsTable {...props} resultsData={items} key={[]} />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render empty table', () => {
    props.allTeacherMadeQuizData = [];
    wrapper = shallow(<ResultsTable {...props} key={[]} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect calculateRowCount table', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: {
          current_page: '3',
          items_per_page: '0',
        },
        itemCount: '5',
      },
    };
    wrapper = shallow(<ResultsTable {...props1} key={[]} />);
    wrapper.instance().calculateRowCount();
    expect(wrapper.instance().calculateRowCount()).toEqual(0);
  });
  it('Expect calculateRowCount table', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: {
          current_page: '3',
          items_per_page: '5',
        },
        itemCount: ['5'],
      },
    };
    wrapper = shallow(<ResultsTable {...props1} key={[]} />);
    wrapper.instance().calculateRowCount();
    expect(wrapper.instance().calculateRowCount()).toEqual(-10);
  });
  it('Expect renderEmptySearchTable  table', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: {
          current_page: '0',
          items_per_page: '5',
        },
        itemCount: ['0'],
      },
    };
    wrapper = shallow(<ResultsTable {...props1} key={[]} />);
    wrapper.instance().renderEmptySearchTable();
    expect(wrapper.instance().props.searchResults.itemCount).toEqual(['0']);
  });
  it('Expect renderEmptySearchTable  table', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: {
          current_page: '0',
          items_per_page: ['-5'],
        },
      },
    };
    wrapper = shallow(<ResultsTable {...props1} key={[]} />);
    wrapper.instance().renderEmptySearchTable();
    expect(wrapper.instance().props.selectAll).toBe(true);
  });
  it('should call checkData ', () => {
    const th = {};
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper = shallow(<ResultsTable {...props} key={[]} />);
    wrapper.instance().checkData(event, th);
    expect(wrapper.instance().props.searchDetailModal).toBeCalled();
  });
  it('should call handleColumnSorting  ', () => {
    const state = [
      {
        desc: false,
      },
    ];
    wrapper = shallow(<ResultsTable {...props} key={[]} />);
    wrapper.instance().handleColumnSorting(state);
    expect(wrapper.instance().props.handleSortResultsOnClick).toBeCalled();
  });
  it('should populate the BooksTable with the right columns', () => {
    const props1 = {
      ...props,
      searchResults: {
        results: [],
        paginationData: {
          current_page: '0',
          items_per_page: '250',
        },
        itemCount: '0',
      },
      hasCheckboxes: false,
    };
    const mockData = {
      enabled: 1,
      cd_name: 'item-0001',
      supplimental: 0,
      topic_name: 'Item 1',
    };
    const mockRowData = {
      original: mockData,
    };
    wrapper = shallow(<ResultsTable {...props1} resultsData={items} key={[]} />);
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Book/Quiz Title');
    const itemRowWrapper = shallow(idColumn.Cell(mockRowData));
    expect(shallowToJson(itemRowWrapper)).toMatchSnapshot();
  });
});
