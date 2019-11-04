import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ClearRosterSuccessModal from '../index';

describe('<ClearRosterSuccessModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<ClearRosterSuccessModal isOpen />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
