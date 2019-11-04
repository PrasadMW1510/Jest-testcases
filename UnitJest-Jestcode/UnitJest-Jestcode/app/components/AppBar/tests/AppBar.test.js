import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AppBar from '../index';

describe('<AppBar />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<AppBar />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
