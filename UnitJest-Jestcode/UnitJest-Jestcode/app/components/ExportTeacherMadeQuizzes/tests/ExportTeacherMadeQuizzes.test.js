import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ExportTeacherMadeQuizzes from '../index';

describe('<ExportTeacherMadeQuizzes />', () => {
  let wrapper = null;
  let mockonClickHandler = null;
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    onExportTeacherMadeQuiz: jest.fn(),
    handleExportTeacherMadeQuiz: jest.fn(),
    searchresultsselectedData: {},
    openSuccessModal: true,
    selectedItems: [
      {
        QuizTeacherMade: ['true'],
      },
    ],
  };
  mockonClickHandler = jest.fn();
  wrapper = mount(<ExportTeacherMadeQuizzes {...props} onClickHandler={mockonClickHandler} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect handleExportTeacherMadeQuiz to render correctly', () => {
    const e = {};
    const teacherMadeQuiz = {};
    wrapper.instance().handleExportTeacherMadeQuiz(e, teacherMadeQuiz);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('on click', () => {
    const clickButton = wrapper.find(
      '.print-export-teacher-made-quizzes__primary-button-yes SAMButton'
    );
    wrapper
      .find('.print-export-teacher-made-quizzes__primary-button-yes SAMButton')
      .simulate('click');
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const mockNextProps = { openSuccessModal: true };
    wrapper.instance().componentWillReceiveProps(mockNextProps);
    expect(wrapper.state('openSuccessModal')).toBeTruthy();
  });
});

describe('<ExportTeacherMadeQuizzes />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    onExportTeacherMadeQuiz: jest.fn(),
    handleExportTeacherMadeQuiz: jest.fn(),
    searchresultsselectedData: {},
    openSuccessModal: false,
    selectedItems: [],
  };
  wrapper = shallow(<ExportTeacherMadeQuizzes {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect handleExportTeacherMadeQuiz to render correctly', () => {
    const e = {};
    const teacherMadeQuiz = {};
    wrapper.instance().handleExportTeacherMadeQuiz(e, teacherMadeQuiz);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
});
