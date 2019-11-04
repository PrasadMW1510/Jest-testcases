import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { shallowToJson } from 'enzyme-to-json';
import ClassesWithGroupsControl from '../ClassesWithGroupsControl';

describe('<ClassesWithGroupsControl />', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      change: jest.fn(),
      classesAll: [{ class_id: ['foo-class'] }],
      groupsAll: [
        { group_id: ['foo-group'], owner_id: ['foo-class'] },
        { group_id: ['bah-group'], owner_id: ['bah-class'] },
      ],
    };
  });
  it('Expect to render correctly', () => {
    const wrapper = shallow(<ClassesWithGroupsControl {...mockProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to handleClassToggle instance method to call the change() prop', () => {
    const wrapper = shallow(<ClassesWithGroupsControl {...mockProps} />);
    wrapper.instance().handleClassToggle({
      currentTarget: { id: 'foo' },
      preventDefault: () => {},
    });
    expect(mockProps.change).toHaveBeenCalled();
  });
  it('Expect to handleGroupToggle instance method to call the change() prop', () => {
    const wrapper = shallow(<ClassesWithGroupsControl {...mockProps} />);
    wrapper.instance().handleGroupToggle({
      currentTarget: { id: 'foo' },
      preventDefault: () => {},
    });
    expect(mockProps.change).toHaveBeenCalled();
  });
  it('Expect to handleGroupToggle instance method to remove an item from groups immutable map', () => {
    const wrapper = shallow(
      <ClassesWithGroupsControl {...mockProps} groups={fromJS({ 'foo-group': true })} />
    );
    wrapper.instance().handleGroupToggle({
      currentTarget: { id: 'foo-group' },
      preventDefault: () => {},
    });
    expect(mockProps.change).toHaveBeenCalled();
  });
  it('Expect to handleGroupToggle with auto-select of class checkbox', () => {
    const wrapper = shallow(<ClassesWithGroupsControl {...mockProps} />);
    wrapper.instance().handleGroupToggle({
      currentTarget: { id: 'foo-group', dataset: { classid: 'bar-class' } },
      preventDefault: () => {},
    });
    expect(mockProps.change).toHaveBeenCalled();
  });
  it('Expect to handleClassToggle instance method to remove an item from classes immutable map', () => {
    const wrapper = shallow(
      <ClassesWithGroupsControl {...mockProps} classes={fromJS({ 'foo-class': true })} />
    );
    wrapper.instance().handleClassToggle({
      currentTarget: { id: 'foo-class' },
      preventDefault: () => {},
    });
    expect(mockProps.change).toHaveBeenCalled();
  });
  it('Expect to handleClassToggle with auto-deselect associated groups', () => {
    const wrapper = shallow(
      <ClassesWithGroupsControl
        {...mockProps}
        classes={fromJS({ 'foo-class': true })}
        groups={fromJS({ 'foo-group': true })}
      />
    );
    wrapper.instance().handleClassToggle({
      currentTarget: { id: 'foo-class' },
      preventDefault: () => {},
    });
    expect(mockProps.change).toHaveBeenCalled();
  });
});
