import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoginErrorBox from '../index';

describe('<LoginErrorBox />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<LoginErrorBox />);
  });

  it('Should be empty if there is no error', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should not be empty if there is an error', () => {
    wrapper = shallow(<LoginErrorBox error="invalid credentials" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
