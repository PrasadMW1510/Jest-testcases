import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TimeRangeDropdownControl from '../index';

describe('<TimeRangeDropdownControl />', () => {
  let wrapper = null;

  it('should render correctly with defaults', () => {
    wrapper = shallow(<TimeRangeDropdownControl />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
