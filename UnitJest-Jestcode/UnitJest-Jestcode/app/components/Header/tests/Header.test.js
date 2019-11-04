import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Header from '../index';

describe('<Header />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
