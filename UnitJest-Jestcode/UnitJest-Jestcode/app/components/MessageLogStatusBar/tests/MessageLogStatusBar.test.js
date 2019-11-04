import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MessageLogStatusBar from '../index';

describe('<MessageLogStatusBar />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<MessageLogStatusBar />);
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
