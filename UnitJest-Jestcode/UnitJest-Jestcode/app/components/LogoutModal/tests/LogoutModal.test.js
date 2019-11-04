import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LogoutModal from '../index';

describe('<LogoutModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<LogoutModal isOpen />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
