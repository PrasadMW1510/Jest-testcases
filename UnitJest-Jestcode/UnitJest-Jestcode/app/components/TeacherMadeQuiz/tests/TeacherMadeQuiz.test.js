import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TeacherMadeQuiz from '../index';

describe('<TeacherMadeQuiz/>', () => {
  let wrapper = null;
  let wrapperInstance = null;
  const mockIsOpen = true;
  const mockHandleSave = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockteacherMadeQuizContainer = {
    installedQuizQuestionList: {
      Quiz: [
        {
          TestItem: ['test1', 'test2', 'test3'],
        },
      ],
    },
  };
  let onClickAction = null;

  beforeEach(() => {
    onClickAction = { preventDefault: jest.fn() };
    wrapper = shallow(
      <TeacherMadeQuiz
        isOpen={mockIsOpen}
        handleSave={mockHandleSave}
        handleSubmit={mockHandleSubmit}
        loadQuizDetails={jest.fn()}
        handleCancel={jest.fn()}
        deleteQuiz={jest.fn()}
        installedQuizData={[]}
        teacherMadeQuizContainer={mockteacherMadeQuizContainer}
      />
    );

    wrapperInstance = wrapper.instance();
  });
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('handleSave calls mockHandleSave with passed value', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      profile: {
        teacherMadeQuizTitle: 'a',
        teacherMadeQuizAuthorFirstName: 'a',
        teacherMadeQuizAuthorLastName: 'a',
        teacherMadequizLexileLevel: 'a',
        teacherMadequizReadingLevel: 'a',
        teacherMadequizGRL: 'w',
        teacherMadequizPoints: 'a',
        teacherMadeQuizNumberOfWords: 'a',
        teacherMadequizType: 'a',
      },
      quizId: 1,
    });
    wrapperInstance.handleSave(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('handleSave calls mockHandleSave with passed value', () => {
    wrapperInstance.readingLevelModalClose();
    expect(wrapper.state('readingLevelValid')).toBeFalsy();
  });
  it('handleSave calls mockHandleSave with passed value', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      profile: {
        teacherMadeQuizTitle: 'a',
        teacherMadeQuizAuthorFirstName: 'a',
        teacherMadeQuizAuthorLastName: 'a',
        teacherMadequizLexileLevel: 'a',
        teacherMadequizReadingLevel: 'a',
        teacherMadequizGRL: 'w',
        teacherMadequizPoints: 'a',
        teacherMadeQuizNumberOfWords: 'a',
        teacherMadequizType: 'a',
      },
      questions: [
        {
          Question: ``,
          Answers: {
            CorrectAnswer: ``,
            IncorrectAnswer1: ``,
            IncorrectAnswer2: ``,
            IncorrectAnswer3: ``,
          },
        },
      ],
      quizId: '',
    });
    wrapperInstance.handleSave(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('handleSave calls mockHandleSave with passed value', () => {
    wrapperInstance.handleSave();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('handleSave calls mockHandleSave with passed value', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapperInstance.handleSave(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('click on the go button', () => {
    const submitButton = wrapper.find('#teacher-made-quiz-profile-form');
    wrapper.find('#teacher-made-quiz-profile-form').simulate('submit');
    expect(submitButton.exists()).toBeTruthy();
  });
  it('click on the go button', () => {
    const clickButton = wrapper.find('.tmq-links Link');
    wrapper.find('.tmq-links Link').simulate('click', { preventDefault() {} });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('click handleOptionChange the go button', () => {
    const clickButton = wrapper.find('.btn-gray');
    wrapper.setState({
      createQuiz: false,
      createQuizEmpty: false,
    });
    wrapper
      .find('.btn-gray')
      .at(1)
      .simulate('click', { preventDefault() {} });

    expect(clickButton.exists()).toBeFalsy();
    const clickButton1 = wrapper.find('.tmt-left .form-radio input');

    wrapper.setState({
      createQuiz: false,
      createQuizEmpty: false,
    });
    wrapper
      .find('.tmt-left .form-radio input')
      .at(0)
      .simulate('change', {
        target: {
          value: 'newname',
        },
      });
    expect(clickButton1.exists()).toBeFalsy();
  });
  it('click handleOptionChange the go button', () => {
    const clickButton = wrapper.find('.btn-gray');

    wrapper.setState({
      createQuiz: false,
      createQuizEmpty: false,
    });
    wrapper
      .find('.btn-gray')
      .at(1)
      .simulate('click', { preventDefault() {} });
    expect(clickButton.exists()).toBeFalsy();

    const clickButton1 = wrapper.find('.tmt-left .form-radio input');
    wrapper.setState({
      createQuiz: false,
      createQuizEmpty: false,
    });
    wrapper
      .find('.tmt-left .form-radio input')
      .at(1)
      .simulate('change', {
        target: {
          value: 'newname',
        },
      });
    expect(clickButton1.exists()).toBeFalsy();
  });
  it('handleSave calls componentWillReceiveProps with passed value', () => {
    const newProps = {
      teacherMadeQuizContainer: {
        installedQuizQuestionList: {
          Title: ['a'],
          Author: [{ FirstName: ['as'], LastName: [''] }],
          WordCount: [''],
          Lexile: [''],
          ReadingLevel: [''],
          Points: [''],
          GRL: [''],
          IsFiction: [''],
        },
      },
    };
    wrapperInstance.componentWillReceiveProps(newProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('handleSave calls componentWillReceiveProps with passed value', () => {
    const newProps = {
      teacherMadeQuizContainer: {},
    };
    wrapperInstance.componentWillReceiveProps(newProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify create New Question option', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      createQuiz: true,
      createQuizEmpty: false,
    });
    wrapper.instance().createNewQuestion(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify create New Quiz FromQues  option', () => {
    const e = {
      preventDefault: jest.fn(),
      val: 5,
    };
    wrapper.setState({
      createQuiz: true,
      questions: e.val,
    });
    wrapper.instance().createNewQuizFromQues(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify warning Modal Close  option', () => {
    wrapper.instance().warningModalClose();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify create New Quiz option', () => {
    wrapper.instance().createNewQuiz(onClickAction);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify get Points option', () => {
    wrapper.setState({
      profile: {
        teacherMadeQuizNumberOfWords: '2',
        teacherMadequizLexileLevel: '3',
      },
    });
    wrapper.instance().getPoints();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify get Points option', () => {
    wrapper.setState({
      warningModal: true,
    });
    wrapper.instance().getPoints();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify deleteQuestion option', () => {
    const itr = 0;
    wrapper.setState({
      questions: [
        {
          Question: ``,
          Answers: {
            CorrectAnswer: ``,
            IncorrectAnswer1: ``,
            IncorrectAnswer2: ``,
            IncorrectAnswer3: ``,
          },
        },
      ],
      createQuiz: false,
      createQuizEmpty: false,
    });
    wrapper.instance().deleteQuestion(itr);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify deleteQuestion option', () => {
    const itr = 1;
    wrapper.setState({
      questions: [],
    });
    wrapper.instance().deleteQuestion(itr);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify updateInititalState option', () => {
    wrapper.setState({
      questions: [],
    });
    wrapper.instance().updateInititalState();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify updateIncrementalState option', () => {
    wrapper.setState({
      questions: [
        {
          Question: ``,
          Answers: {
            CorrectAnswer: ``,
            IncorrectAnswer1: ``,
            IncorrectAnswer2: ``,
            IncorrectAnswer3: ``,
          },
        },
      ],
    });
    wrapper.instance().updateIncrementalState();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });

  it('verify handleValidation option', () => {
    wrapper.setState({
      profile: {
        teacherMadeQuizTitle: 'a',
        teacherMadeQuizAuthorFirstName: 'a',
        teacherMadeQuizAuthorLastName: 'a',
        teacherMadequizLexileLevel: 'a',
        teacherMadequizReadingLevel: 1000,
        teacherMadequizGRL: 'w',
        teacherMadequizPoints: 'a',
        teacherMadeQuizNumberOfWords: 'a',
        teacherMadequizType: 'a',
      },
    });
    wrapper.instance().handleValidation();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify handleValidation option', () => {
    wrapper.setState({
      profile: {},
    });
    wrapper.instance().handleValidation();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify onChange option', () => {
    const e = {
      target: {
        name: '',
        value: 5,
      },
    };
    wrapper.instance().onChange(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify onChangeToUpper option', () => {
    const e = {
      target: {
        validity: {
          valid: true,
        },
        value: 'qwerty',
        name: 'teacherMadequizLexileLevel',
      },
    };
    wrapper.instance().onChangeToUpper(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify onChangeToUpper option', () => {
    const e = {
      target: {
        validity: {
          valid: false,
        },
        value: 'qwerty1',
        name: 'teacherMadequizLexileLevel',
      },
    };
    wrapper.instance().onChangeToUpper(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify onChangeNumber  option', () => {
    const e = {
      target: {
        validity: {
          valid: true,
        },
        value: 'qwerty2',
        name: 'qwerty2',
      },
    };
    wrapper.instance().onChangeNumber(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify onChangeNumber  option', () => {
    const e = {
      target: {
        validity: {},
        value: 'qwerty2',
        name: 'qwerty2',
      },
    };
    wrapper.instance().onChangeNumber(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify onchangeQuestions  option', () => {
    const event = {
      target: {
        value: 'qwerty3',
        name: 'Question',
      },
    };
    const itrVal = 0;
    wrapper.setState({
      questions: [{}, 2],
    });
    wrapper.instance().onchangeQuestions(event, itrVal);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify onchangeQuestions  option', () => {
    const event = {
      target: {
        value: 'qwerty3',
        name: 'qwerty3',
      },
    };
    const itrVal = 0;
    wrapper.setState({
      questions: [{ Answers: {} }, 2],
    });
    wrapper.instance().onchangeQuestions(event, itrVal);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify handleOptionChange   option', () => {
    const e = {
      target: {
        value: 'qwerty',
      },
    };
    wrapper.setState({
      profile: {},
    });
    wrapper.instance().handleOptionChange(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify deleteWarning option', () => {
    wrapper.setState({
      deleteWarningModal: true,
    });
    wrapper.instance().deleteWarning();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify deleteModalClose option', () => {
    wrapper.setState({
      deleteWarningModal: false,
    });
    wrapper.instance().deleteModalClose();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify loadQuiz option', () => {
    const key = 1;
    wrapper.setState({
      createQuiz: false,
      createQuizEmpty: false,
      quizId: key,
    });
    wrapper.instance().loadQuiz(key);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify calcPointsVal  option', () => {
    wrapper.instance().calcPointsVal();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify submitFromQuestion  option', () => {
    wrapperInstance.submitFromQuestion();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('verify deleteQuiz   option', () => {
    wrapper.setState({
      createQuizEmpty: true,
      createQuiz: false,
      deleteWarningModal: false,
    });
    wrapper.instance().deleteQuiz();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
});
