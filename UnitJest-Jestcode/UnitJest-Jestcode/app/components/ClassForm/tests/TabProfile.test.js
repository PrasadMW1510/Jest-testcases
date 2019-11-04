import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TabProfile from '../TabProfile';

describe('<TabProfile />', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      hide: false,
      metaData: {},
    };
  });
  it('Expect to render correctly when visible', () => {
    const wrapper = shallow(<TabProfile {...mockProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly when hidden', () => {
    const wrapper = shallow(<TabProfile {...mockProps} hide />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
