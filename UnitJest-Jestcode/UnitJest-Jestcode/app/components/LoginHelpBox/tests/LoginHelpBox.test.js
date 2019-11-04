import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LoginHelpBox from '../index';

describe('<LoginHelpBox />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<LoginHelpBox />);
  });

  it('Should match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
