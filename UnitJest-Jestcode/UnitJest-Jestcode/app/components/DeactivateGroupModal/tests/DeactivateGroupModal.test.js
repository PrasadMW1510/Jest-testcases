import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import DeactivateGroupModal from '../index';

describe('<DeactivateTeacherModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<DeactivateGroupModal isOpen />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
