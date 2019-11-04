import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Checkbox from 'components/forms/Checkbox';

describe('<Checkbox />', () => {
  // The Checkbox state is passed-in as an immutable object (via redux-form)
  let mockCheckedState = null;
  let mockUncheckedState = null;

  beforeEach(() => {
    mockCheckedState = {
      onChange: jest.fn(),
      value: {
        get: jest.fn().mockReturnValue(true),
        set: jest.fn(),
        delete: jest.fn(),
      },
    };
    mockUncheckedState = {
      onChange: jest.fn(),
      value: {
        get: jest.fn().mockReturnValue(null),
        set: jest.fn(),
        delete: jest.fn(),
      },
    };
  });
  it('Should render correctly with a custom class', () => {
    const wrapper = shallow(<Checkbox id="123" className="my-custom-class" label="my label" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when unchecked', () => {
    const wrapper = shallow(<Checkbox id="123" label="my label" input={mockUncheckedState} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when checked', () => {
    const wrapper = shallow(<Checkbox id="123" label="my label" input={mockCheckedState} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render correctly when checked and clicked', () => {
    const wrapper = shallow(<Checkbox id="123" label="my label" input={mockCheckedState} />);
    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(mockCheckedState.onChange).toHaveBeenCalled();
    expect(mockCheckedState.value.get).toHaveBeenCalled();
    expect(mockCheckedState.value.delete).toHaveBeenCalled();
    expect(mockCheckedState.value.set).not.toHaveBeenCalled();
  });
  it('Should render correctly when unchecked and clicked', () => {
    const wrapper = shallow(<Checkbox id="123" label="my label" input={mockUncheckedState} />);
    wrapper.find('button').simulate('click', { preventDefault: () => {} });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(mockUncheckedState.onChange).toHaveBeenCalled();
    expect(mockUncheckedState.value.get).toHaveBeenCalled();
    expect(mockUncheckedState.value.delete).not.toHaveBeenCalled();
    expect(mockUncheckedState.value.set).toHaveBeenCalled();
  });
});
