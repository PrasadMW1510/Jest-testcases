import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoginBody from '../index';

describe('<LoginBody />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<LoginBody />);
  });

  it('Expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render children', () => {
    wrapper = shallow(<LoginBody> hello </LoginBody>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
