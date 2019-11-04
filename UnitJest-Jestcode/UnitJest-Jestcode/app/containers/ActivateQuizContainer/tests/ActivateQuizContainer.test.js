import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ActivateQuizContainer } from '../ActivateQuizContainer';

describe('<ActivateQuizContainer />', () => {
  let wrapper = null;
  let props = null;
  let props1 = null;
  let wrapper1 = null;
  beforeEach(() => {
    props = {
      activateQuizRequest: jest.fn(),
      hideModal: jest.fn(),
      handleCancel: jest.fn(),
      searchResultsContainer: {
        selectedItems: [],
      },
      showMessageLogModal: jest.fn(),
    };
    wrapper = shallow(<ActivateQuizContainer {...props} />);
  });
  props1 = {
    activateQuizRequest: jest.fn(),
    hideModal: jest.fn(),
    handleCancel: jest.fn(),
    searchResultsContainer: {
      selectedItems: ['iii'],
    },
    showMessageLogModal: jest.fn(),
  };
  wrapper1 = shallow(<ActivateQuizContainer {...props1} />);
  it('should render correctly for if', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call activateQuiz if ', () => {
    wrapper.instance().activateQuiz();
    expect(wrapper.instance().props.searchresultsselectedData).toMatchSnapshot();
  });
  it('Expect to call escFunc', () => {
    const event = {
      keyCode: 27,
    };
    wrapper.instance().escFunc(event);
    expect(wrapper.instance().props.hideModal).toBeCalled();
  });
  it('Expect to call escFunc', () => {
    const event = {
      keyCode: 26,
    };
    wrapper.instance().escFunc(event);
    expect(wrapper.instance().props.hideModal).not.toBeCalled();
  });
  it('should call activateQuiz else ', () => {
    wrapper1.instance().activateQuiz();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
});
