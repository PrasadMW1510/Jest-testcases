import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { SearchResultsContainer } from '../SearchResultsContainer';
jest.mock('react-router-dom');

describe('<SearchResultsContainer />', () => {
  let wrapper = null;
  let wrapper1 = null;
  const props = {
    searchResultsContainer: {
      collectionName: [
        {
          Name: [''],
        },
      ],
      searchOpts: {
        SrcSearchReq: {
          BookInfo: {
            Author: '',
          },
          Collection: [],
          SortTerms: {
            curPage: '45',
            SortTerm: {
              Term: 'Author',
            },
          },
        },
      },
    },
    getAllTeacherMadeQuizDataRequest: jest.fn(),
    getSearchResultDetailsRequest: jest.fn(),
    clearSelectedCustomList: jest.fn(),
    getCollectionsNameRequest: jest.fn(),
    searchResultsContainerselectedrows: [],
    history: {
      push: () => '/books/quiz/advanced',
    },
    getChangeCollectionResultsRequest: jest.fn(),
    makeSelectedbookresults: jest.fn(),
    postSaveRequest: jest.fn(),
    showMessageLogModal: jest.fn(),
    global: '0',
  };
  const props1 = {
    searchResultsContainer: {
      collectionName: [
        {
          Name: [''],
        },
      ],
      searchOpts: {
        SrcSearchReq: {
          Collection: [],
          SortTerms: {
            curPage: '45',
          },
        },
      },
    },
    getAllTeacherMadeQuizDataRequest: jest.fn(),
    searchResultsContainerselectedrows: [],
    getSearchResultDetailsRequest: jest.fn(),
    clearSelectedCustomList: jest.fn(),
    getCollectionsNameRequest: jest.fn(),
    history: {
      push: () => '/books/quiz/custom',
    },
    getChangeCollectionResultsRequest: jest.fn(),
    makeSelectedbookresults: jest.fn(),
    postSaveRequest: jest.fn(),
    showMessageLogModal: jest.fn(),
    global: '20',
  };
  beforeEach(() => {
    wrapper = shallow(<SearchResultsContainer {...props} />);
    wrapper1 = shallow(<SearchResultsContainer {...props1} />);
  });

  describe('render', () => {
    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(shallowToJson(wrapper1)).toMatchSnapshot();
    });
    it('should call handleSaveOnClick ', () => {
      wrapper.instance().handleSaveOnClick();
      expect(wrapper.instance().props.searchResultsContainerselectedrows).toEqual([]);
    });
    it('should call handleChange  ', () => {
      const collectionOpts = {};
      wrapper.instance().handleChange(collectionOpts);
      expect(wrapper.instance().props.searchResultsContainer.searchOpts).toEqual({
        SrcSearchReq: {
          BookInfo: { Author: '' },
          Collection: {},
          SortTerms: { SortTerm: { Term: 'Author' }, curPage: '45' },
        },
      });
    });
    it('should call handleResultMessageModal', () => {
      const e = {};
      wrapper.instance().handleResultMessageModal(e);
      expect(wrapper.instance().props.showMessageLogModal).toBeCalled();
    });
    it('should call handlePageClick ', () => {
      const searchTerm = {};
      wrapper.instance().handlePageClick(searchTerm);
      expect(wrapper.instance().props.getAllTeacherMadeQuizDataRequest).toBeCalled();
    });
    it('should call handleSortResultsOnClick ', () => {
      const sortState = {
        id: 1,
        curPage: 2,
        desc: true,
      };
      wrapper.instance().handleSortResultsOnClick(sortState);
      expect(wrapper.instance().props.getAllTeacherMadeQuizDataRequest).toBeCalled();
    });
    it('should call handleSortResultsOnClick ', () => {
      const sortState = {
        id: 1,
        curPage: 2,
        desc: false,
      };
      wrapper.instance().handleSortResultsOnClick(sortState);
      expect(wrapper.instance().props.searchResultsContainerselectedrows).toEqual([]);
    });
    it('should call handleSelectedItems  ', () => {
      const bookItems = {
        book1: 'harry',
      };
      const selIds = {};
      wrapper.instance().handleSelectedItems(bookItems, selIds);
      expect(wrapper.state('selectedItems')).toEqual({
        book1: 'harry',
      });
    });
  });
});
