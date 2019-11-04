import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DeactivateClassModal from '../index';

describe('<DeactivateClassModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<DeactivateClassModal isOpen />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
