import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ManageTeacherLicenses from '../index';

describe('<ManageTeacherLicenses />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<ManageTeacherLicenses />);
  });

  it('should match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
