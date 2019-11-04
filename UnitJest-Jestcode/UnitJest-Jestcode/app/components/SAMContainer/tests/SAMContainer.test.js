import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMContainer from '../index';

describe('<SAMContainer />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<SAMContainer />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
