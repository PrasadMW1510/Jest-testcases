import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SearchResults from '../index';

describe('<SearchResults />', () => {
  let wrapper = null;
  let wrapper2 = null;
  let wrapper3 = null;

  const props = {
    searchResults: {
      results: '',
      paginationData: {
        current_page: 2,
        items_per_page: 2,
        page_count: 2,
      },
      itemCount: 2,
    },
    collectionsList: [],
    onCollectionsChange: jest.fn(),
    handleSelectedItems: jest.fn(),
    onSearch: jest.fn(),
    handleSaveOnClick: jest.fn(),
    searchOpts: {
      SrcSearchReq: {
        Topics: '',
        Themes: '',
        Programs: '',
        InterestLevels: '',
        Genres: '',
        Cultures: '',
        ComprehensionSkills: [],
        Awards: [],
        SortTerms: {
          SortTerm: {
            Term: 'Title',
          },
        },
        BookInfo: {
          Title: '',
          Type: '',
          Language: '',
          Accessibility: '',
          Author: '',
        },
        BookLevel: {
          LexileLevel: '',
          ReadingLevel: '',
          GuidedReadingLevel: '',
          PointLimit: '',
        },
      },
    },
    searchResultDetailsRequest: jest.fn(),
    showSearchResultDetailsRequest: jest.fn(),
    getselectedbookresults: jest.fn(),
    searchResultsContainersearchResultsIdsChecked: [],
    searchResultsContainerselectedrows: [],
    handleSortResultsOnClick: jest.fn(),
  };
  const props2 = {
    searchResults: {
      results: '',
      paginationData: {
        current_page: 2,
        items_per_page: 2,
        page_count: 2,
      },
      itemCount: 2,
    },
    collectionsList: [],
    onCollectionsChange: jest.fn(),
    handleSelectedItems: jest.fn(),
    onSearch: jest.fn(),
    handleSaveOnClick: jest.fn(),
    searchOpts: {
      SrcSearchReq: {
        SortTerms: {
          SortTerm: {
            Term: 'Author',
          },
        },
        BookInfo: {
          Title: '',
          Type: '',
          Language: '',
          Accessibility: '',
          Author: '',
        },
        BookLevel: {
          LexileLevel: '',
          ReadingLevel: '',
          GuidedReadingLevel: '',
          PointLimit: '',
        },
      },
    },
    searchResultDetailsRequest: jest.fn(),
    showSearchResultDetailsRequest: jest.fn(),
    getselectedbookresults: jest.fn(),
    searchResultsContainersearchResultsIdsChecked: [],
    searchResultsContainerselectedrows: [],
    handleSortResultsOnClick: jest.fn(),
  };
  const props3 = {
    searchResults: {
      results: '',
      paginationData: {
        current_page: 2,
        items_per_page: 2,
        page_count: 2,
      },
      itemCount: 2,
    },
    collectionsList: [],
    onCollectionsChange: jest.fn(),
    handleSelectedItems: jest.fn(),
    onSearch: jest.fn(),
    handleSaveOnClick: jest.fn(),
    searchOpts: {
      SrcSearchReq: {
        SortTerms: {
          SortTerm: {
            Term: 'Author',
          },
        },
        BookInfo: {
          Title: '',
          Type: '',
          Language: '',
          Accessibility: '',
          Author: '',
        },
        BookLevel: {
          LexileLevel: '',
          ReadingLevel: '',
          GuidedReadingLevel: '',
          PointLimit: '',
        },
      },
    },
    searchResultDetailsRequest: jest.fn(),
    showSearchResultDetailsRequest: jest.fn(),
    getselectedbookresults: jest.fn(),
    searchResultsContainersearchResultsIdsChecked: [],
    searchResultsContainerselectedrows: [],
    handleSortResultsOnClick: jest.fn(),
  };
  wrapper = shallow(<SearchResults {...props} />);
  wrapper2 = shallow(<SearchResults {...props2} />);
  wrapper3 = shallow(<SearchResults {...props3} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
    expect(shallowToJson(wrapper3)).toMatchSnapshot();
  });
  it('Expect to call getDataArrayIndex else', () => {
    const resultSet = ['1'];
    const dataID = ['11122'];
    wrapper.instance().getDataArrayIndex(resultSet, dataID);
    expect(wrapper.instance().getDataArrayIndex(resultSet, dataID)).toEqual(-1);
  });
  it('Expect to call getDataArrayIndex if', () => {
    const resultSet = ['1'];
    const dataID = ['1'];
    wrapper.instance().getDataArrayIndex(resultSet, dataID);
    expect(wrapper.instance().getDataArrayIndex(resultSet, dataID)).toEqual(0);
  });
  it('should call SearchResultDetailsRequest', () => {
    const rowData = {};
    const page = 1;
    wrapper.instance().setState({
      searchResultsIdsChecked: ['Author', ''],
    });
    wrapper.instance().searchResultDetailsRequest(rowData, page);
    expect(wrapper.instance().props.searchResultDetailsRequest).toBeCalled();
  });
  it('should call renderCountResultsIdsChecked', () => {
    wrapper.instance().setState({
      searchResultsIdsChecked: ['Author', ''],
    });
    wrapper.instance().renderCountResultsIdsChecked();
    expect(props.searchResults.itemCount).toBe(2);
  });
  it('Expect to call getSelecedDataArrayIndex else', () => {
    const resultSet = ['1'];
    const dataID = ['11122'];
    wrapper.instance().getSelecedDataArrayIndex(resultSet, dataID);
    expect(wrapper.instance().getDataArrayIndex(resultSet, dataID)).toEqual(-1);
  });
  it('Expect to call getSelecedDataArrayIndex if', () => {
    const resultSet = ['1'];
    const dataID = ['1'];
    wrapper.instance().getSelecedDataArrayIndex(resultSet, dataID);
    expect(wrapper.instance().getDataArrayIndex(resultSet, dataID)).toEqual(0);
  });
  it('should call handleRowCheckboxOnChange', () => {
    const isChecked = true;
    const itemId = 1;
    wrapper.instance().handleRowCheckboxOnChange(isChecked, itemId);
    expect(wrapper.instance().props.searchResults.itemCount).toEqual(2);
  });
  it('should call handleRowCheckboxOnChange', () => {
    const isChecked = false;
    const itemId = 1;
    wrapper.instance().handleRowCheckboxOnChange(isChecked, itemId);
    expect(wrapper.instance().props.searchResults.itemCount).toEqual(2);
  });
  it('should call handleRowSelections', () => {
    const isChecked = true;
    const itemId = 1;
    const row = 2;
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.instance().props.searchResultsContainerselectedrows).toEqual([2]);
  });
  it('should call handleRowSelections', () => {
    const isChecked = false;
    const itemId = -1;
    const row = 2;
    wrapper.instance().handleRowSelections(isChecked, itemId, row);
    expect(wrapper.instance().props.searchResultsContainerselectedrows).toEqual([]);
  });
  it('should call handleselectedRow', () => {
    const selRows = {};
    const selIDs = {};
    wrapper.instance().handleselectedRow(selRows, selIDs);
    expect(props.handleSelectedItems.mock.calls.length).toBe(1);
  });
  it('should call toggleAllCheckboxes', () => {
    const isChecked = true;
    const selectedRows = [
      {
        ID: 2,
      },
    ];
    const itemIds = [1, 2];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds, selectedRows);
    expect(wrapper.state('selectAll')).toBeTruthy();
  });
  it('should call toggleAllCheckboxes', () => {
    const isChecked = true;
    const selectedRows = [
      {
        ID: 1,
      },
    ];
    const itemIds = [1, 2];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds, selectedRows);
    expect(wrapper.state('selectAll')).toBeTruthy();
  });
  it('should call toggleAllCheckboxes', () => {
    const isChecked = true;
    const selectedRows = [];
    const itemIds = [];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds, selectedRows);
    expect(wrapper.state('selectAll')).toBeTruthy();
  });
  it('should call toggleAllCheckboxes', () => {
    const isChecked = false;
    const selectedRows = [
      {
        ID: 1,
      },
    ];
    const itemIds = [1, 2];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds, selectedRows);
    expect(wrapper.state('selectAll')).toBeFalsy();
  });
  it('should call toggleAllCheckboxes', () => {
    const isChecked = false;
    const selectedRows = [
      {
        ID: 3,
      },
    ];
    const itemIds = [1, 2];
    wrapper.instance().toggleAllCheckboxes(isChecked, itemIds, selectedRows);
    expect(wrapper.state('selectAll')).toBeFalsy();
  });

  it('should call createSearchFilters', () => {
    const resetCurPage = true;
    wrapper.instance().setState({
      searchBy: 'Author',
    });
    wrapper.instance().createSearchFilters(resetCurPage);
    expect(props.searchResults.itemCount).toBe(2);
  });

  it('should call createSearchFilters', () => {
    wrapper.instance().setState({
      searchBy: 'Title',
    });
    expect(wrapper.instance().createSearchFilters()).toMatchSnapshot();
  });
  it('should call handlePaginateSearch', () => {
    const pageNum = 6;
    wrapper.instance().handlePaginateSearch(pageNum);
    expect(wrapper.state('curPage')).not.toEqual(6);
  });
  it('should call handlePaginatedSearchClick', () => {
    wrapper.instance().handlePaginatedSearchClick();
    expect(wrapper.instance().props.onSearch).toBeCalled();
  });
  it('should call handleSaveTableRow', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      searchResultsIdsChecked: [1, 2],
    });
    wrapper.instance().handleSaveTableRow(e);
    expect(wrapper.instance().props.handleSaveOnClick).toBeCalled();
  });
  it('should call handleSaveTableRow', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().setState({
      searchResultsIdsChecked: [],
    });
    wrapper.instance().handleSaveTableRow(e);
    expect(wrapper.instance().props.handleSaveOnClick).toBeCalled();
  });
  it('Expect renderCountInfo table', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: { current_page: 3 },
        itemCount: 'fdg',
      },
    };
    wrapper = shallow(<SearchResults {...props1} />);
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
  it('Expect renderCountInfotable', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: { current_page: '3' },
        itemCount: -2,
      },
    };
    wrapper = shallow(<SearchResults {...props1} />);
    expect(wrapper.instance().renderCountInfo()).toMatchSnapshot();
  });
  it('Expect renderCountInfotable', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: {
          current_page: '3',
          items_per_page: '7',
        },
      },
    };
    wrapper = shallow(<SearchResults {...props1} />);
    expect(wrapper.instance().renderCountInfo()).toMatchSnapshot();
  });
  it('Expect renderCountInfotable', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: {
          current_page: '3',
          items_per_page: '7',
        },
        itemCount: '5',
      },
    };
    wrapper = shallow(<SearchResults {...props1} />);
    expect(wrapper.instance().renderCountInfo()).toMatchSnapshot();
  });
  it('Expect renderCountInfotable', () => {
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
    wrapper = shallow(<SearchResults {...props1} />);
    expect(wrapper.instance().renderCountInfo()).toMatchSnapshot();
  });
  it('Expect renderCountInfotable', () => {
    const props1 = {
      ...props,
      searchResults: {
        paginationData: { current_page: '3' },
        itemCount: '0',
      },
    };
    wrapper = shallow(<SearchResults {...props1} />);
    expect(props.searchResults.itemCount).toBe(2);
  });
  it('should call showAwards', () => {
    wrapper.instance().showAwards();
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
  it('should call showComprehensionSkills', () => {
    wrapper.instance().showComprehensionSkills();
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
  it('should call showCultures', () => {
    wrapper.instance().showCultures();
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
  it('should call showGenres', () => {
    wrapper.instance().showGenres();
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
  it('should call showInterestLevels', () => {
    wrapper.instance().showInterestLevels();
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
  it('should call showPrograms', () => {
    wrapper.instance().showPrograms();
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
  it('should call showThemes', () => {
    wrapper.instance().showThemes();
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
  it('should call showTopics', () => {
    wrapper.instance().showTopics();
    expect(wrapper.instance().props.collectionsList).toEqual([]);
  });
});

describe('<SearchResults />', () => {
  let wrapper = null;
  const props = {
    searchResults: {
      paginationData: {
        current_page: 2,
        items_per_page: 2,
        page_count: 2,
      },
      itemCount: 2,
    },
    collectionsList: [],
    onCollectionsChange: jest.fn(),
    handleSelectedItems: jest.fn(),
    onSearch: jest.fn(),
    handleSaveOnClick: jest.fn(),
    searchOpts: {
      SrcSearchReq: {
        Topics: [[{ Topic: 'sddg' }]],
        Themes: [[{ Theme: 'sddg' }]],
        Programs: [[{ Program: 'sddg' }]],
        InterestLevels: [[{ InterestLevel: 'sddg' }]],
        Genres: [[{ Genre: 'sddg' }]],
        Cultures: [[{ Culture: 'sddg' }]],
        ComprehensionSkills: [[{ ComprehensionSkill: 'sddg' }]],
        Awards: [[{ Award: 'sddg' }]],
        SortTerms: {
          SortTerm: {
            Term: 'Title',
          },
        },
        BookInfo: {
          Title: '',
          Type: '',
          Language: '',
          Accessibility: '',
          Author: '',
        },
        BookLevel: {
          LexileLevel: '',
          ReadingLevel: '',
          GuidedReadingLevel: '',
          PointLimit: '',
        },
      },
    },
    searchResultDetailsRequest: jest.fn(),
    showSearchResultDetailsRequest: jest.fn(),
    getselectedbookresults: jest.fn(),
    searchResultsContainersearchResultsIdsChecked: [],
    searchResultsContainerselectedrows: [],
    handleSortResultsOnClick: jest.fn(),
  };
  wrapper = shallow(<SearchResults {...props} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect renderCountInfotable', () => {
    const props4 = {
      ...props,
      searchResults: {
        paginationData: { current_page: '3' },
        itemCount: '0',
        results: ['result1', 'result2'],
      },
    };
    wrapper = shallow(<SearchResults {...props4} />);
    expect(wrapper.instance().resultSelectAll()).toMatchSnapshot();
  });
  it('Expect handleSortResultsClick ', () => {
    const sortState = 'state';
    const props4 = {
      ...props,
      handleSortResultsOnClick: jest.fn(),
      searchResults: {
        paginationData: { current_page: '3' },
        itemCount: '0',
        results: ['result1', 'result2'],
      },
    };
    wrapper = shallow(<SearchResults {...props4} />);
    expect(wrapper.instance().handleSortResultsClick(sortState)).toMatchSnapshot();
  });
});
