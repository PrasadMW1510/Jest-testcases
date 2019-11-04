import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';
import TabStudentRoster from '../TabStudentRoster';

describe('<TabStudentRoster />', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      change: jest.fn(),
      hide: false,
      metaData: {},
      selectedStudents: fromJS({}),
    };
  });
  it('Expect to render correctly when visible', () => {
    const wrapper = shallow(<TabStudentRoster {...mockProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render correctly when hidden', () => {
    const wrapper = shallow(<TabStudentRoster {...mockProps} hide />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handle student checkbox rendering', () => {
    const wrapper = shallow(<TabStudentRoster {...mockProps} />);
    wrapper.instance().handleToggleStudent(true, 'foo');
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handle toggle all checkbox rendering', () => {
    const wrapper = shallow(<TabStudentRoster {...mockProps} />);
    wrapper.instance().toggleAllCheckboxes(true, ['foo']);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handle student checkbox rendering - uncheck', () => {
    const wrapper = shallow(<TabStudentRoster {...mockProps} />);
    wrapper.instance().handleToggleStudent(false, 'foo');
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handle toggle all checkbox rendering - uncheck', () => {
    const wrapper = shallow(<TabStudentRoster {...mockProps} />);
    wrapper.instance().toggleAllCheckboxes(false, ['foo']);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
