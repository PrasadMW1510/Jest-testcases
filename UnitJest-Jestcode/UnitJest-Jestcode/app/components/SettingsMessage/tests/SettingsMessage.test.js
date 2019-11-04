import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SettingsMessage from '../index';

describe('<SettingsMessage />', () => {
  let wrapper = null;

  it('Should render correctly', () => {
    wrapper = shallow(<SettingsMessage />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
