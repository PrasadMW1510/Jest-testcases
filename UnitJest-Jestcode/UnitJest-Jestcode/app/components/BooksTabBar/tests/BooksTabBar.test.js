import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BooksTabBar from '../index';

describe('<BooksTabBar />', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<BooksTabBar />);
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Should have an Book Expert tab', () => {
    expect(wrapper.find('Tab[to="/books/expert"]').length).toEqual(1);
  });

  it('Should have an Quiz Manager tab', () => {
    expect(wrapper.find('Tab[to="/books/quiz"]').length).toEqual(1);
  });
});
