import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import InputControl from 'components/forms/InputControl';

describe('<InputControl />', () => {
  it('Should render correctly with a custom class', () => {
    const wrapper = shallow(<InputControl className="my-custom-class" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with a custom props', () => {
    const wrapper = shallow(
      <InputControl style={{ foo: 'custom-props-passed-to-input-dom-element' }} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with a label', () => {
    const wrapper = shallow(<InputControl label="Some Label" required type="password" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with a custom type', () => {
    const wrapper = shallow(<InputControl type="password" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with the name used as autocomplete', () => {
    const wrapper = shallow(<InputControl input={{ name: 'foo' }} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly with the required flag set', () => {
    const wrapper = shallow(<InputControl required />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when a submission fails with errors', () => {
    const wrapper = shallow(
      <InputControl meta={{ error: 'An error happened on this item.', submitFailed: true }} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Component focuses as expected', () => {
    const mockDomElement = {
      focus: jest.fn(),
    };
    const wrapper = shallow(<InputControl />);
    wrapper.instance().inputElement = mockDomElement;
    wrapper.instance().focus();
    expect(mockDomElement.focus).toHaveBeenCalled();
  });
  it('Assign first field as expected', () => {
    const mockRef = true;
    const wrapper = shallow(<InputControl />);
    wrapper.instance().assignRef(mockRef);
    expect(wrapper.instance().inputElement).toBe(true);
  });
});
