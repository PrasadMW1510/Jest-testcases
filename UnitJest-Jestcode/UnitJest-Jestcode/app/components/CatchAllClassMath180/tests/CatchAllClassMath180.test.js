import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CatchAllClassMath180 from '../index';

describe('<CatchAllClassMath180  />', () => {
  let wrapper = null;
  const props = {
    handleDatachange: jest.fn(),
  };
  wrapper = shallow(<CatchAllClassMath180 {...props} />);
  it('should render ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
