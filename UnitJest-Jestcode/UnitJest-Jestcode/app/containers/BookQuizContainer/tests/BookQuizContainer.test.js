import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AdvancedSearchContainer from 'containers/AdvancedSearchContainer';
import SearchResultsContainer from 'containers/SearchResultsContainer';
import Custom from 'components/CustomList';
import { BookQuizContainer } from '../BookQuizContainer';

describe('BookQuizContainer', () => {
  let wrapper = null;
  const mockgetSearchResultsRequest = jest.fn();
  const mockresetSearchResultsData = jest.fn();
  const mockgetBookResult = jest.fn();
  const mockhistory = {
    push: () => '/books/quiz/results',
  };

  beforeEach(() => {
    const props = {
      match: {
        path: '',
      },
      setSearchTerm: jest.fn(),
    };
    wrapper = shallow(
      <BookQuizContainer
        getSearchResultsRequest={mockgetSearchResultsRequest}
        resetSearchResultsData={mockresetSearchResultsData}
        getBookResult={mockgetBookResult}
        history={mockhistory}
        {...props}
      />
    );
  });
  it('to render', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(wrapper.contains(<AdvancedSearchContainer />)).not.toBeTruthy();
    expect(wrapper.contains(<SearchResultsContainer />)).not.toBeTruthy();
    expect(wrapper.contains(<Custom />)).not.toBeTruthy();
  });
  it('handleSearch', () => {
    const opts = {};
    wrapper.instance().handleSearch(opts);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleResetSearchResults', () => {
    wrapper.instance().handleResetSearchResults();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleCheckSearch', () => {
    wrapper.instance().handleCheckSearch();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleclose', () => {
    wrapper.instance().handleClose();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleSearchtermChange ', () => {
    wrapper.instance().handleSearchtermChange();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
