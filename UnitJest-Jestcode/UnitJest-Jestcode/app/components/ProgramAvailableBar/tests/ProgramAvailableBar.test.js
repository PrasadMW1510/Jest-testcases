import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ProgramAvailableBar from 'components/ProgramAvailableBar';

describe('<ProgramAvailableBar />', () => {
  let wrapper = null;
  let items = null;
  beforeEach(() => {
    items = [{ array: 'images/cdx.jpg' }, { array: 'images/FM.jpg' }];
    wrapper = shallow(<ProgramAvailableBar items={items} />);
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
