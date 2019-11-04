import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import ClassForm from 'components/ClassForm';
import * as Constants from '../constants';

describe('<ClassForm />', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      change: jest.fn(),
      handleCancel: jest.fn(),
      handleSubmit: jest.fn(),
      handleSave: jest.fn(),
      isOpen: true,
      title: 'Foo Title',
    };
  });
  it('Expect to render correctly', () => {
    const wrapper = shallow(<ClassForm {...mockProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect tabs to render correctly when student roster tab clicked', () => {
    const wrapper = shallow(<ClassForm {...mockProps} />);
    wrapper
      .find('NavItem')
      .last()
      .simulate('click', {
        currentTarget: { id: Constants.TAB_STUDENT_ROSTER },
        preventDefault: () => {},
      });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handleSave instance method to call the handleSave prop', () => {
    const wrapper = shallow(<ClassForm {...mockProps} />);
    wrapper.instance().handleSave();
    expect(mockProps.handleSave).toHaveBeenCalled();
  });
  it('Expect to render validation errors', () => {
    const wrapper = shallow(
      <ClassForm {...mockProps} submitFailed validationErrors={fromJS({ foo: 'error' })} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render server errors', () => {
    const wrapper = shallow(
      <ClassForm {...mockProps} submitFailed serverErrors="foo server error" />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
