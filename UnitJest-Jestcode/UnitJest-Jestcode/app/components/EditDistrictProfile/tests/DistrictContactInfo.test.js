import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DistrictContactInfo from '../DistrictContactInfo';

describe('<DistrictContactInfo />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<DistrictContactInfo />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
