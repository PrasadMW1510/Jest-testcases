import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ManageStudentLicenses from '../index';

describe('<ManageStudentLicenses />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<ManageStudentLicenses />);
  });

  it('should match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
