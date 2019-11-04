import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SmartBarTab from '../index';

describe('<SmartBarTab />', () => {
  let wrapper = null;
  let items = null;
  let mockItemHandler = null;
  let mockedForName = null;
  let mockSmartbarSelectedUpdateData = null;

  beforeEach(() => {
    mockItemHandler = jest.fn();
    items = [{ id: '1', text: 'Student 1' }, { id: '2', text: 'Student 2' }];
    mockedForName = 'a user';
    mockSmartbarSelectedUpdateData = jest.fn();
    wrapper = shallow(
      <SmartBarTab
        title="Students"
        items={items}
        onItemClick={mockItemHandler}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );
  });

  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should render for name', () => {
    wrapper = shallow(
      <SmartBarTab
        forName={mockedForName}
        title="Students"
        items={items}
        onItemClick={mockItemHandler}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should handle two item clicks', () => {
    wrapper
      .find('.tab__list-button')
      .first()
      .simulate('click');
    wrapper.setProps({ isTabActive: true, selectedItemId: '1' });
    wrapper
      .find('.tab__list-button')
      .first()
      .simulate('click');
    expect(mockItemHandler).toHaveBeenCalledTimes(2);
    expect(wrapper.state('showHighlight')).toBeTruthy();
  });

  it('when selectedItemId is empty', () => {
    wrapper.setProps({ selectedItemId: '' });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should handle one item click', () => {
    wrapper
      .find('.tab__list-button')
      .first()
      .simulate('click');
    expect(mockItemHandler).toHaveBeenCalledTimes(1);
    expect(wrapper.state('showHighlight')).toBeFalsy();
  });

  it('Should handle input clicks', () => {
    expect(wrapper.state('checked')).toBeFalsy();
    const inputElement = wrapper.find('.tab__input');
    inputElement.simulate('change');
    expect(wrapper.state('checked')).toBeTruthy();
  });

  it('Should reset if the props change for non default open tabs', () => {
    wrapper = shallow(
      <SmartBarTab
        forName={mockedForName}
        title="Students"
        onItemClick={mockItemHandler}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );

    expect(wrapper.state('checked')).toBeFalsy();

    const inputElement = wrapper.find('.tab__input');
    inputElement.simulate('change');

    expect(wrapper.state('checked')).toBeTruthy();

    wrapper.setProps({ forName: mockedForName });

    expect(wrapper.state('checked')).toBeFalsy();
  });

  it('Should close if the items become empty', () => {
    wrapper = shallow(
      <SmartBarTab
        items={items}
        forName={mockedForName}
        title="Students"
        onItemClick={mockItemHandler}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );

    const inputElement = wrapper.find('.tab__input');
    inputElement.simulate('change');

    expect(wrapper.state('checked')).toBeTruthy();

    wrapper.setProps({ forName: 'different', items });

    wrapper.setProps({ forName: 'different', items: null });

    expect(wrapper.state('checked')).toBeFalsy();
  });

  it('Should open if the props do change for default open tabs', () => {
    wrapper = shallow(
      <SmartBarTab
        forName={mockedForName}
        title="Students"
        onItemClick={mockItemHandler}
        defaultChecked
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );

    expect(wrapper.state('checked')).toBeTruthy();

    const inputElement = wrapper.find('.tab__input');
    inputElement.simulate('change');

    expect(wrapper.state('checked')).toBeFalsy();

    wrapper.setProps({ items });

    expect(wrapper.state('checked')).toBeTruthy();
  });

  it('Should accept a default checked state', () => {
    wrapper = shallow(
      <SmartBarTab
        defaultChecked
        forName={mockedForName}
        title="Students"
        items={items}
        onItemClick={mockItemHandler}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );
    expect(wrapper.state('checked')).toBeTruthy();
  });

  it('Should handle no items', () => {
    wrapper = shallow(
      <SmartBarTab
        title="Students"
        onItemClick={mockItemHandler}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should handle empty items', () => {
    wrapper = shallow(
      <SmartBarTab
        title="Students"
        items={[]}
        onItemClick={mockItemHandler}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should handle lots of items', () => {
    const lotsOfItems = Array.from({ length: 25 }, (v, i) => ({
      id: String(i),
      text: `Student ${i}`,
    }));
    wrapper = shallow(
      <SmartBarTab
        defaultChecked
        title="Students"
        items={lotsOfItems}
        onItemClick={mockItemHandler}
        smartbarSelectedUpdateData={mockSmartbarSelectedUpdateData}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
