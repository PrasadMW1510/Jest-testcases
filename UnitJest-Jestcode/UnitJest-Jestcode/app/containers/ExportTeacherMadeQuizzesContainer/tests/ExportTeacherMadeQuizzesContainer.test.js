import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ExportTeacherMadeQuizzesContainer } from '../ExportTeacherMadeQuizzesContainer';

describe('<ExportTeacherMadeQuizzesContainer />', () => {
  let wrapper = null;
  let props = null;
  beforeEach(() => {
    props = {
      hideModal: jest.fn(),
      searchresultsselectedData: {},
      exportTeacherMadeQuizRequest: jest.fn(),
      openSuccessModal: true,
      initialRequest: jest.fn(),
      exportTeacherMadeQuizzesContainer: {
        selectedItems: [],
      },
      searchResultsContainer: {},
      selectedItems: [],
    };
    wrapper = shallow(<ExportTeacherMadeQuizzesContainer {...props} />);
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call deactivateQuiz   ', () => {
    const quizData = {};
    wrapper.instance().handleExportTeacherMadeQuiz(quizData);
    expect(wrapper.instance().props.exportTeacherMadeQuizRequest).toMatchSnapshot();
  });
});
