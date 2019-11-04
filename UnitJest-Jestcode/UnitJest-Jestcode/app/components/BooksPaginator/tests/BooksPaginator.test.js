import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import BooksPaginator from '../index';

describe('<BooksPaginator />', () => {
  const NAVIGATION_DIV = '.book-paginator__navigator-item-div';
  let wrapper = null;
  let wrapper1 = null;
  const mockHandlePaginatedSearch = jest.fn();

  const mockPaginationData = {
    current_page: ['0'],
    items_per_page: ['250'],
    page_count: ['11'],
    paginate: ['false'],
  };
  const mockPaginationData1 = {
    current_page: ['9'],
    items_per_page: ['250'],
    page_count: ['11'],
    paginate: ['false'],
  };
  beforeEach(() => {
    wrapper = shallow(
      <BooksPaginator data={mockPaginationData} handlePaginatedSearch={mockHandlePaginatedSearch} />
    );
    wrapper1 = shallow(
      <BooksPaginator
        data={mockPaginationData1}
        handlePaginatedSearch={mockHandlePaginatedSearch}
      />
    );
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });

  describe('When PageCount is 2 and current page is first page', () => {
    const mockTwoPageData = {
      current_page: ['0'],
      items_per_page: ['250'],
      page_count: ['2'],
      paginate: ['false'],
    };
    // consts for readability below
    const NEXT_PAGE = Number(mockTwoPageData.current_page[0] + 1);
    const LAST_PAGE = Number(mockTwoPageData.page_count[0] - 1);
    const PAGE_TWO_INDEX = 1;
    beforeEach(() => {
      wrapper = shallow(
        <BooksPaginator data={mockTwoPageData} handlePaginatedSearch={mockHandlePaginatedSearch} />
      );
    });

    it('Should render as expected', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should have 3 navigation divs', () => {
      // total Divs: first, prev, 1, 2, next, last (first, prev and 1 are not navigable)
      const navigationDivs = wrapper.find(NAVIGATION_DIV);
      expect(navigationDivs).toHaveLength(3);
    });

    it('Should handle the paginate navigation div clicks', () => {
      let navigationDiv = wrapper.find(NAVIGATION_DIV).at(0);
      navigationDiv.simulate('click');
      expect(mockHandlePaginatedSearch).toHaveBeenCalledWith(PAGE_TWO_INDEX);

      navigationDiv = wrapper.find(NAVIGATION_DIV).at(1);
      navigationDiv.simulate('click');
      expect(mockHandlePaginatedSearch).toHaveBeenCalledWith(NEXT_PAGE);

      navigationDiv = wrapper.find(NAVIGATION_DIV).at(2);
      navigationDiv.simulate('click');
      expect(mockHandlePaginatedSearch).toHaveBeenCalledWith(LAST_PAGE);
    });
  });

  describe('When PageCount is 2 and current page is second page', () => {
    const mockTwoPageData = {
      current_page: ['1'],
      items_per_page: ['250'],
      page_count: ['2'],
      paginate: ['false'],
    };
    // consts for readability below
    const FIRST_PAGE = 0;
    const PREV_PAGE = 0;
    const PAGE_ONE_INDEX = 0;
    beforeEach(() => {
      wrapper = shallow(
        <BooksPaginator data={mockTwoPageData} handlePaginatedSearch={mockHandlePaginatedSearch} />
      );
    });

    it('Should render as expected', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should have 3 navigation divs', () => {
      // total Divs: first, prev, 1, 2, next, last (2, next, last  are not navigable)
      const navigationDivs = wrapper.find(NAVIGATION_DIV);
      expect(navigationDivs).toHaveLength(3);
    });

    it('Should handle the paginate navigation div clicks', () => {
      let navigationDiv = wrapper.find(NAVIGATION_DIV).at(0);
      navigationDiv.simulate('click');
      expect(mockHandlePaginatedSearch).toHaveBeenCalledWith(FIRST_PAGE);

      navigationDiv = wrapper.find(NAVIGATION_DIV).at(1);
      navigationDiv.simulate('click');
      expect(mockHandlePaginatedSearch).toHaveBeenCalledWith(PREV_PAGE);

      navigationDiv = wrapper.find(NAVIGATION_DIV).at(2);
      navigationDiv.simulate('click');
      expect(mockHandlePaginatedSearch).toHaveBeenCalledWith(PAGE_ONE_INDEX);
    });
  });

  describe('When PageCount is 0', () => {
    const mockZeroPageData = {
      current_page: ['0'],
      items_per_page: ['250'],
      page_count: ['0'],
      paginate: ['false'],
    };
    beforeEach(() => {
      wrapper = shallow(
        <BooksPaginator data={mockZeroPageData} handlePaginatedSearch={mockHandlePaginatedSearch} />
      );
    });

    it('Should render as expected', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should not have navigation divs', () => {
      expect(wrapper.find(NAVIGATION_DIV).exists()).toEqual(false);
    });
  });
});
