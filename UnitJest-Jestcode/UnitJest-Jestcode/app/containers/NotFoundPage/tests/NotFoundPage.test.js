import React from 'react';
import { shallow } from 'enzyme';

import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<NotFoundPage />);
  });

  it('should render the page message', () => {
    expect(wrapper.contains('Page not found!')).toBeTruthy();
  });
});
