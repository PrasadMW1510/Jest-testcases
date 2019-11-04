import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DeactivateSchoolModal from '../index';

describe('<DeactivateSchoolModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<DeactivateSchoolModal isOpen />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
