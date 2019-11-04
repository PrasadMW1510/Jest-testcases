import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavItem } from 'components/NavBar';

describe('<NavItem />', () => {
  it('Should render correctly', () => {
    const wrapper = shallow(
      <NavItem
        className="custom-class"
        style={{
          foo: 'test-if-custom-prop-gets-passed-through-to-dom-element',
        }}
      >
        navitem content
      </NavItem>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with a custom component specified', () => {
    const wrapper = shallow(<NavItem component="a">navitem content</NavItem>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when flagged as active', () => {
    const wrapper = shallow(<NavItem active>navitem content</NavItem>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when flagged with errors', () => {
    const wrapper = shallow(<NavItem hasErrors>navitem content</NavItem>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
