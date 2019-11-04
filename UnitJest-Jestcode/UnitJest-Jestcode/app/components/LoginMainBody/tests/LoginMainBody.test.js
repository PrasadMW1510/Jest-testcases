import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoginMainBody from '../index';

describe('<LoginMainBody />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<LoginMainBody />);
  });

  it('Expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render children', () => {
    wrapper = shallow(<LoginMainBody> hello </LoginMainBody>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
