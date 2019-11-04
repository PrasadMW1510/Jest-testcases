import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BooksTable from 'components/BooksTable';
import ResultsTable from '../ResultsTable';
jest.mock('react-router-dom');

describe('ResultsTable', () => {
  let wrapper = null;
  let mocksearchResults = null;
  let mocksearchDetailModal = null;
  let mockremoveListRow = null;
  const mockHasCheckBoxes = true;
  mocksearchResults = {
    selectedItems: [
      {
        _id: ['7bj95dlpefk21ljc2o399idb_2efa7f0'],
        QuizAuthor: [''],
        GuidedReadingLevel: ['Z'],
        LexileSort: ['900'],
        QuizTeacherMade: ['true'],
        Points: ['22'],
        Lexile: ['900'],
        QuizInstalled: ['true'],
        CollectionName: [''],
        Words: ['150000'],
        Author: [{ FirstName: ['Cassandra'], LastName: ['Lease'] }],
        QuizID: ['7bj95dlpefk21ljc2o399idb_2efa7f0'],
        Copies: ['0'],
        ReadingLevel: [6.2],
        Title: ['Monsterhearts'],
        Type: ['1'],
        ID: ['7bj95dlpefk21ljc2o399idb_2efa7f0'],
        QuizActive: ['true'],
      },
      {
        _id: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
        QuizAuthor: [''],
        GuidedReadingLevel: ['Z'],
        LexileSort: ['1000'],
        QuizTeacherMade: ['true'],
        Points: ['30'],
        Lexile: ['1000'],
        QuizInstalled: ['true'],
        CollectionName: [''],
        Words: ['150000'],
        Author: [{ FirstName: ['Cassandra'], LastName: ['Lease'] }],
        QuizID: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
        Copies: ['0'],
        ReadingLevel: ['6.2'],
        Title: ['Monsterhearts'],
        Type: ['1'],
        ID: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
        QuizActive: ['true'],
      },
      {
        QuizID: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
      },
      {
        QuizID: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
      },
      {
        QuizID: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
      },
      {
        QuizID: ['9lkbr2621suruvmapib0tn1j_2efa7f0'],
      },
      {
        ReadingLevel: ['6.2'],
      },
      {
        QuizActive: ['true'],
      },
      {
        Title: ['Monsterhearts'],
      },
      {
        ReadingLevel: ['6.2'],
      },
      {
        Lexile: ['1000'],
      },
    ],
  };

  mocksearchDetailModal = jest.fn();
  mockremoveListRow = jest.fn();
  const props = {
    searchResults: mocksearchResults,
    searchDetailModal: mocksearchDetailModal,
    removeListRow: mockremoveListRow,
    hasCheckboxes: true,
    handleRowCheckboxOnChange: jest.fn(),
    handleRowSelections: jest.fn(),
    toggleAllCheckboxes: jest.fn(),
    pageSize: 0,
  };
  wrapper = shallow(<ResultsTable {...props} />);
  it('else calculateRowCount if else else ', () => {
    mocksearchResults = {
      selectedItems: undefined,
    };
    wrapper = shallow(
      <ResultsTable
        searchResults={mocksearchResults}
        searchDetailModal={jest.fn()}
        removeListRow={mockremoveListRow}
        hasCheckboxes={mockHasCheckBoxes}
        handleRowCheckboxOnChange={jest.fn()}
        handleRowSelections={jest.fn()}
        toggleAllCheckboxes={jest.fn()}
        pageSize={0}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns', () => {
    const event = {
      preventDefault: jest.fn(),
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
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Book/Quiz Title');
    const itemRowWrapper = shallow(idColumn.Cell(mockRowData));
    expect(idColumn.getProps().className).toEqual('book-title-table__results-td');
    expect(
      itemRowWrapper
        .find('.search-result-table__group')
        .props()
        .children.props.clickHandler(event)
    );
    expect(shallowToJson(itemRowWrapper)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns sortmethod ', () => {
    const d = 'hh';
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === '');
    expect(idColumn.accessor(d)).toEqual('hh');
  });
  it('should populate the BooksTable with the right columns sortmethod LEXILe', () => {
    const a = '9';
    const b = '7';
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Lexile\u00ae');
    expect(idColumn.sortMethod(a, b)).toEqual(2);
  });
  it('should populate the BooksTable with the right columns sortmethod RL', () => {
    const a = '9';
    const b = '7';
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'RL');
    expect(idColumn.sortMethod(a, b)).toEqual(2);
  });
  it('should populate the BooksTable with the right columns sortmethod Points', () => {
    const a = '9';
    const b = '7';
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Points');
    expect(idColumn.sortMethod(a, b)).toEqual(2);
  });
  it('should populate the BooksTable with the right columns sortmethod Words', () => {
    const a = '9';
    const b = '7';
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Words');
    expect(idColumn.sortMethod(a, b)).toEqual(2);
  });
  it('should populate the BooksTable with the right columns sortmethod Type', () => {
    const a = '9';
    const b = '7';
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Type');
    expect(idColumn.sortMethod(a, b)).toEqual(2);
  });
  it('should populate the BooksTable with the right columns sortmethod Copies', () => {
    const a = '9';
    const b = '7';
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Copies');
    expect(idColumn.sortMethod(a, b)).toEqual(2);
  });
  it('should populate the BooksTable with the right columns sortmethod Author', () => {
    const d = {
      Author: [
        {
          LastName: 'sss',
          FirstName: 'fdfd',
        },
      ],
    };
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === 'Quiz Author');
    expect(idColumn.accessor(d)).toMatchSnapshot();
  });
  it('should populate the BooksTable with the right columns sortmethod ""', () => {
    const d = 'fd';
    const mockData = {
      enabled: 1,
      cd_name: 'item-0001',
      supplimental: 0,
      topic_name: 'Item 1',
    };
    const mockRowData = {
      original: mockData,
    };
    const table = wrapper.find(BooksTable);
    const { columns } = table.props();
    const idColumn = columns.find(row => row.Header === '');
    const itemRowWrapper = shallow(idColumn.Cell(mockRowData));
    expect(shallowToJson(itemRowWrapper)).toMatchSnapshot();
    expect(
      itemRowWrapper
        .find('.search-result-table__group')
        .props()
        .children.props.onRemoveClick()
    );
    expect(idColumn.accessor(d)).toEqual('fd');
  });
  it('should render correctly renderTableData if if ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('else calculateRowCount if else ', () => {
    mocksearchResults = undefined;
    wrapper = shallow(
      <ResultsTable
        searchResults={mocksearchResults}
        searchDetailModal={mocksearchDetailModal}
        removeListRow={jest.fn()}
        hasCheckboxes={mockHasCheckBoxes}
        handleRowCheckboxOnChange={jest.fn()}
        handleRowSelections={jest.fn()}
        toggleAllCheckboxes={jest.fn()}
        pageSize={0}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('else renderEmptyTable if else ', () => {
    wrapper = shallow(
      <ResultsTable
        searchResults={mocksearchResults}
        searchDetailModal={mocksearchDetailModal}
        removeListRow={jest.fn()}
        hasCheckboxes={mockHasCheckBoxes}
        handleRowCheckboxOnChange={jest.fn()}
        handleRowSelections={jest.fn()}
        toggleAllCheckboxes={jest.fn()}
        pageSize={0}
      />
    );
    expect(
      wrapper
        .find(BooksTable)
        .props()
        .renderEmptyTable()
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('else renderEmptyTable if else ', () => {
    mocksearchResults = {
      selectedItems: [],
    };
    wrapper = shallow(
      <ResultsTable
        searchResults={mocksearchResults}
        searchDetailModal={mocksearchDetailModal}
        removeListRow={jest.fn()}
        hasCheckboxes={mockHasCheckBoxes}
        handleRowCheckboxOnChange={jest.fn()}
        handleRowSelections={jest.fn()}
        toggleAllCheckboxes={jest.fn()}
        pageSize={0}
      />
    );
    expect(
      wrapper
        .find(BooksTable)
        .props()
        .renderEmptyTable()
    );
  });
  it('else calculateRowCount if else ', () => {
    wrapper = shallow(
      <ResultsTable
        searchResults={mocksearchResults}
        searchDetailModal={mocksearchDetailModal}
        removeListRow={jest.fn()}
        hasCheckboxes={mockHasCheckBoxes}
        handleRowCheckboxOnChange={jest.fn()}
        handleRowSelections={jest.fn()}
        toggleAllCheckboxes={jest.fn()}
        pageSize={0}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('else calculateRowCount if else ', () => {
    mocksearchResults = {
      selectedItems: [
        {
          QuizActive: ['true'],
        },
        {
          Title: ['Monsterhearts'],
        },
        {
          ReadingLevel: ['6.2'],
        },
        {
          Lexile: ['1000'],
        },
      ],
    };
    wrapper = shallow(<ResultsTable searchResults={mocksearchResults} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
