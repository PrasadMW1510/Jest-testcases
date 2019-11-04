import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SAMInfoLink from '../index';

describe('<SAMInfoLink />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<SAMInfoLink />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
