import React from 'react';
import { shallow } from 'enzyme';

import { BooksPage, mapDispatchToProps } from '../BooksPage';
import BooksTabBar from '../../../components/BooksTabBar/BooksTabBar';

describe('<BooksPage />', () => {
  let wrapper = null;
  let mockDispatchFn = null;
  let props = {};

  beforeEach(() => {
    mockDispatchFn = jest.fn();
    props = {
      match: {
        path: '',
      },
    };
    wrapper = shallow(<BooksPage dispatch={mockDispatchFn} {...props} />);
  });

  it('Should show Two Tabs', () => {
    const bookTabs = wrapper.find(BooksTabBar);
    expect(bookTabs.exists()).toBe(true);
  });

  it('Should pass dispatch to props', () => {
    const { dispatch: actualDispatch } = mapDispatchToProps(mockDispatchFn);
    expect(actualDispatch).toEqual(mockDispatchFn);
  });
});
