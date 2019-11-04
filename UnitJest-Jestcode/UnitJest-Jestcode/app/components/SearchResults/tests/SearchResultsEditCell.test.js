import React from 'react';
import { shallow } from 'enzyme';

import SearchEditCell from '../SearchResultsEditCell';

describe('<SearchEditCell />', () => {
  let wrapper = null;
  const props = {
    rowData: {},
    deactivate: true,
    clickHandler: jest.fn(),
  };
  wrapper = shallow(<SearchEditCell {...props} />);
  it('Expect to render img tags correctly', () => {
    const rowData = {
      Title: 'hjgfj',
      QuizActive: true,
      QuizTeacherMade: true,
    };
    wrapper = shallow(<SearchEditCell rowData={rowData} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Expect to render img tags correctly', () => {
    const rowData = {
      Title: 'hjgfj',
      QuizActive: true,
      QuizTeacherMade: false,
    };
    wrapper = shallow(<SearchEditCell rowData={rowData} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Expect to render img tags correctly', () => {
    const rowData = {
      Title: 'hjgfj',
      QuizActive: false,
      QuizTeacherMade: false,
    };
    wrapper = shallow(<SearchEditCell rowData={rowData} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Expect to render img tags correctly', () => {
    const rowData = {
      Title: 'hjgfj',
      QuizActive: false,
      QuizTeacherMade: true,
    };
    wrapper = shallow(<SearchEditCell rowData={rowData} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Expect to render anchor tags correctly', () => {
    const rowData = {
      Title: 'hjgfj',
      QuizActive: false,
      QuizTeacherMade: false,
    };
    const props5 = {
      clickHandler: jest.fn(),
    };
    wrapper = shallow(<SearchEditCell rowData={rowData} {...props5} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('on click', () => {
    const clickButton = wrapper.find('.search-results-table__result-td-cell a');
    expect(clickButton.exists()).toBeTruthy();
    expect(clickButton.simulate('click'));
    expect(clickButton.exists()).toBeTruthy();
  });
});
