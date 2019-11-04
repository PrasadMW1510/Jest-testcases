import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMBody from '../index';

describe('<SAMBody />', () => {
  let wrapper = null;
  let bgColor = null;

  beforeEach(() => {
    bgColor = 'cream';
    wrapper = shallow(<SAMBody bgColor={bgColor} />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
