import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import HeaderImage from '../index';

describe('<HeaderImage />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<HeaderImage />);
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
