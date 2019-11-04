import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { DeactivateQuizContainer } from '../DeactivateQuizContainer';

describe('<DeactivateQuizContainer />', () => {
  let wrapper = null;
  let props = null;
  let props1 = null;
  let wrapper1 = null;
  beforeEach(() => {
    props = {
      deactivateQuizRequest: jest.fn(),
      hideModal: jest.fn(),
      searchResultsContainer: {
        selectedItems: [],
      },
      showMessageLogModal: jest.fn(),
    };
    wrapper = shallow(<DeactivateQuizContainer {...props} />);
  });
  props1 = {
    deactivateQuizRequest: jest.fn(),
    hideModal: jest.fn(),
    handleCancel: jest.fn(),
    searchResultsContainer: {
      selectedItems: ['iii'],
    },
    showMessageLogModal: jest.fn(),
  };
  wrapper1 = shallow(<DeactivateQuizContainer {...props1} />);
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call deactivateQuiz   ', () => {
    wrapper.instance().deactivateQuiz();
    expect(wrapper.instance().props.searchresultsselectedData).toMatchSnapshot();
  });
  it('should call deactivateQuiz else ', () => {
    wrapper1.instance().deactivateQuiz();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
});
