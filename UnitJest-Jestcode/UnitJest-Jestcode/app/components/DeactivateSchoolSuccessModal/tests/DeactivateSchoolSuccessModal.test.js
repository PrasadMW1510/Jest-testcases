import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DeactivateSchoolSuccessModal from '../index';

describe('<DeactivateSchoolSuccessModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<DeactivateSchoolSuccessModal isOpen />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
