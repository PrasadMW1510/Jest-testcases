import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as Constants from '../constants';
import QuickSearch from '../index';

describe('<QuickSearch />', () => {
  const props = {
    state: {
      searchResultsIdsChecked: [],
      searchBy: Constants.SEARCH_TITLE,
      order: 'asc',
      term: '',
      itemsPerPage: Constants.DEFAULT_ITEMS_PER_PAGE,
      curPage: Constants.PAGE_ZERO,
      selectAll: false,
    },
    onResetSearchResults: jest.fn(),
    onSearchtermChange: jest.fn(),
    onSearch: jest.fn(),
    location: {
      href: Constants.SEARCH_URL,
    },
  };
  const wrapper = shallow(<QuickSearch {...props} />);

  it('Expect to have unit tests specified', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleChange ', () => {
    const e = {
      target: {
        name: 'searchBy',
        value: 'Title',
      },
    };
    wrapper.instance().handleChange(e);
    expect(props.state.searchBy).toBe('Title');
  });
  it('handleChange ', () => {
    const e = {
      target: {
        name: 'By',
        value: 'Title',
      },
    };
    wrapper.instance().handleChange(e);
    expect(props.state.searchBy).toBe('Title');
  });
  it('handleSearchByChange  ', () => {
    const targetVal = 'Title';
    wrapper.instance().handleSearchByChange(targetVal);
    expect(props.state.searchBy).toBe('Title');
  });
  it('handleSearchClick  ', () => {
    wrapper.instance().handleSearchClick();
    expect(wrapper.instance().props.onSearch).toBeCalled();
  });
  it('handleSearchByChange  ', () => {
    const targetVal = 'Tgdfgitle';
    wrapper.instance().handleSearchByChange(targetVal);
    expect(wrapper.instance().props.onResetSearchResults).toBeCalled();
  });
  it('handleSearchClick  ', () => {
    wrapper.instance().handleSearchClick();
    expect(wrapper.instance().props.onSearch).toBeCalled();
  });
  it('handleSearchByChange  ', () => {
    const targetVal = 'Author';
    wrapper.instance().handleSearchByChange(targetVal);
    expect(wrapper.instance().props.onResetSearchResults).toBeCalled();
  });
  it('handleSearchClick  ', () => {
    wrapper.instance().handleSearchClick();
    expect(wrapper.instance().props.onSearch).toBeCalled();
  });
  it('handleSearchByChange  ', () => {
    const targetVal = 'Tgdfgitle';
    wrapper.instance().handleSearchByChange(targetVal);
    expect(wrapper.instance().props.onResetSearchResults).toBeCalled();
  });
  it('handleSearchClick  ', () => {
    wrapper.instance().handleSearchClick();
    expect(wrapper.instance().props.onSearch).toBeCalled();
  });
});
