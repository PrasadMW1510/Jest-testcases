import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoginCopyrightFooter from '../index';

describe('<LoginCopyrightFooter />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<LoginCopyrightFooter />);
  });

  it('Should match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
