import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LogoutBox from '../index';

describe('<LogoutBox />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<LogoutBox />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
