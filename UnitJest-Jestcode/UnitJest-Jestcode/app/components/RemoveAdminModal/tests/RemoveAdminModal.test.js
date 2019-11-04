import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import RemoveAdminModal from '../index';

describe('<RemoveAdminModal />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<RemoveAdminModal isOpen />);
  });

  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
