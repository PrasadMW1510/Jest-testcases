import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ClearRosterModal from '../index';

describe('<ClearRosterModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<ClearRosterModal isOpen />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
