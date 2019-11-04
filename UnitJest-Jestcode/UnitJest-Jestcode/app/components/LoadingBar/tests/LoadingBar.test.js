import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoadingBar from '../index';

describe('<LoadingBar />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<LoadingBar />);
  });
  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
