import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SearchTabBar from '../index';

describe('<SearchTabBar />', () => {
  let wrapper = null;
  let mockItemHandler = null;
  let mocklinkHandler = null;

  beforeEach(() => {
    mockItemHandler = jest.fn();
    mocklinkHandler = true;

    wrapper = shallow(<SearchTabBar checkSearch={mockItemHandler} setLink={mocklinkHandler} />);
  });

  it('Expect to render tab 1 correctly', () => {
    const bookTabBar1 = wrapper.find('.tab-bar__tab--adv-search');
    expect(bookTabBar1.exists()).toBe(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to render tab 2 correctly', () => {
    const bookTabBar2 = wrapper.find('.tab-bar__tab--results');
    expect(bookTabBar2.exists()).toBe(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render tab 3 correctly', () => {
    const bookTabBar2 = wrapper.find('.tab-bar__tab--custom');
    expect(bookTabBar2.exists()).toBe(true);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
