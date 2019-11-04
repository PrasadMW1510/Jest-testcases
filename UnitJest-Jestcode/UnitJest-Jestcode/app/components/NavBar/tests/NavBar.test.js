import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import NavBar from 'components/NavBar';

describe('<NavBar />', () => {
  it('Should render correctly', () => {
    const wrapper = shallow(
      <NavBar
        className="custom-class"
        style={{
          foo: 'test-if-custom-prop-gets-passed-through-to-dom-element',
        }}
      >
        <div>navbar item</div>
      </NavBar>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should not render if children are not valid', () => {
    const wrapper = shallow(<NavBar>text not valid as item</NavBar>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should mark a NavItem with `active` prop with appropriate class name', () => {
    const wrapper = shallow(
      <NavBar>
        <div active>navbar item</div>
      </NavBar>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should mark a NavItem matching the `activeItemId` prop with appropriate class name', () => {
    const wrapper = shallow(
      <NavBar activeItemId="foo">
        <div id="foo">navbar item</div>
      </NavBar>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render appropriate classes when there is an inset, theme or palette prop', () => {
    const wrapper = shallow(
      <NavBar theme="foo" palette="bar" inset>
        <div>navbar item</div>
      </NavBar>
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
