import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import TeacherMadeQuizQuestions from '../index';

describe('<TeacherMadeQuizQuestions />', () => {
  const props = {
    data: {
      teacherMadeQuizContainer: {
        installedQuizQuestionList: {
          Quiz: [
            {
              TestItem: [
                {
                  Question: ['jfvj'],
                  Answers: [
                    {
                      CorrectAnswer: [''],
                      IncorrectAnswer1: [''],
                      IncorrectAnswer2: [''],
                      IncorrectAnswer3: [''],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    handler: jest.fn(),
    stateData: {
      questions: [
        {
          Question: '',
          Answers: {
            CorrectAnswer: '',
            IncorrectAnswer1: '',
            IncorrectAnswer2: '',
            IncorrectAnswer3: '',
          },
        },
      ],
    },
    updateInititalState: jest.fn(),
    submitFromQuestion: jest.fn(),
    handleCancel: jest.fn(),
    updateIncrementalState: jest.fn(),
    onchangeQuestions: jest.fn(),
    deleteQuestion: jest.fn(),
  };
  const props1 = {
    data: {
      teacherMadeQuizContainer: {
        installedQuizQuestionList: {
          Quiz: [
            {
              TestItem: [],
            },
          ],
        },
      },
    },
    handler: jest.fn(),
    stateData: {
      questions: [],
    },
    updateInititalState: jest.fn(),
    submitFromQuestion: jest.fn(),
    handleCancel: jest.fn(),
    updateIncrementalState: jest.fn(),
    onchangeQuestions: jest.fn(),
    deleteQuestion: jest.fn(),
  };
  const props2 = {
    data: {
      teacherMadeQuizContainer: {
        installedQuizQuestionList: {
          Quiz: [
            {
              TestItem: [
                {
                  Question: ['jfvj'],
                  Answers: [
                    {
                      CorrectAnswer: [''],
                      IncorrectAnswer1: [''],
                      IncorrectAnswer2: [''],
                      IncorrectAnswer3: [''],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    handler: jest.fn(),
    stateData: {
      questions: [],
    },
    updateInititalState: jest.fn(),
    submitFromQuestion: jest.fn(),
    handleCancel: jest.fn(),
    updateIncrementalState: jest.fn(),
    onchangeQuestions: jest.fn(),
    deleteQuestion: jest.fn(),
  };

  it('Expect to render TeacherMadeQuizQuestions if', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render TeacherMadeQuizQuestions elseif', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render TeacherMadeQuizQuestions else', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props2} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render setQuestionState if', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props} />);
    const event = {
      target: {
        name: 'Question',
        value: '23',
      },
    };
    wrapper.instance().setQuestionState(event);
    expect(wrapper.instance().props.onchangeQuestions).toBeCalled();
  });
  it('Expect to render setQuestionState else', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props} />);
    const event = {
      target: {
        name: 'Quest',
        value: '23',
      },
    };
    wrapper.instance().setQuestionState(event);
    expect(wrapper.instance().props.onchangeQuestions).toBeCalled();
  });
  it('Expect to render handleValidation,increment,decrement allfalse if', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    const val = {};
    wrapper.setState({});
    wrapper.instance().handleValidation();
    wrapper.instance().handleValidationSubmit();
    wrapper.instance().increment();
    wrapper.instance().backToProfile(val);
    wrapper.instance().decrement();
    expect(wrapper.instance().props.stateData.questions).toEqual([]);
  });
  it('Expect to render handleValidation,increment,decrement true elseif', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    const val = {};
    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
        {
          Question: 'yami',
          Answers: {
            CorrectAnswer: 'prii',
            IncorrectAnswer1: 'vangavi',
            IncorrectAnswer2: 'vani',
            IncorrectAnswer3: 'yaminii',
          },
        },
      ],
    });
    wrapper.instance().handleValidation();
    wrapper.instance().increment();
    wrapper.instance().deleteQuestion();
    wrapper.instance().backToProfile(val);
    expect(wrapper.instance().props.stateData.questions).toEqual([]);
  });
  it('Expect to render handleValidation,increment,decrement true elseif', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
      ],
    });
    wrapper.instance().increment();
    expect(wrapper.instance().props.updateIncrementalState).toBeCalled();
  });
  it('Expect to render handleValidation,handleValidationSubmit  elseif', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
      ],
    });
    wrapper.instance().handleValidation();
    wrapper.instance().handleValidationSubmit();
    expect(wrapper.instance().props.stateData.questions).toEqual([]);
  });
  it('call decrement', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props2} />);
    wrapper.setState({
      errors: {},
      questionItration: 1,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
        {
          Question: 'yami',
          Answers: {
            CorrectAnswer: 'prii',
            IncorrectAnswer1: 'vangavi',
            IncorrectAnswer2: 'vani',
            IncorrectAnswer3: 'yaminii',
          },
        },
      ],
    });

    wrapper.instance().decrement();
    expect(wrapper.instance().props.stateData.questions).toEqual([]);
  });
  it('Expect to render handleValidation,increment,decrement true elseif', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    const val = {};
    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
        {
          Question: 'yami',
          Answers: {
            CorrectAnswer: 'prii',
            IncorrectAnswer1: 'vangavi',
            IncorrectAnswer2: 'vani',
            IncorrectAnswer3: 'yaminii',
          },
        },
      ],
    });
    wrapper
      .find('.tmq-btn .btn-gray')
      .at(0)
      .simulate('click');
    wrapper.instance().backToProfile(val);
    expect(wrapper.instance().props.stateData.questions).toEqual([]);
  });
  it('Expect to render setQuestionState if', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    const button = wrapper.find(
      '.modal__wrapper-content-main-form .padding-md .form-control textarea'
    );
    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
        {
          Question: 'yami',
          Answers: {
            CorrectAnswer: 'prii',
            IncorrectAnswer1: 'vangavi',
            IncorrectAnswer2: 'vani',
            IncorrectAnswer3: 'yaminii',
          },
        },
      ],
    });
    wrapper
      .find('.modal__wrapper-content-main-form .padding-md .form-control textarea')
      .at(0)
      .simulate('change', {
        target: {
          name: 'Question',
          value: 'newname',
        },
      });
    expect(button.exists()).toBeTruthy();
  });
  it('Expect to render setQuestionState if', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    const button = wrapper.find(
      '.modal__wrapper-content-main-form .padding-md .form-control textarea'
    );

    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
        {
          Question: 'yami',
          Answers: {
            CorrectAnswer: 'prii',
            IncorrectAnswer1: 'vangavi',
            IncorrectAnswer2: 'vani',
            IncorrectAnswer3: 'yaminii',
          },
        },
      ],
    });
    wrapper
      .find('.modal__wrapper-content-main-form .padding-md .form-control textarea')
      .at(1)
      .simulate('change', {
        target: {
          name: 'Question',
          value: 'newname',
        },
      });
    expect(button.exists()).toBeTruthy();
  });
  it('Expect to render setQuestionState if', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    const button = wrapper.find(
      '.modal__wrapper-content-main-form .padding-md .form-control textarea'
    );

    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
        {
          Question: 'yami',
          Answers: {
            CorrectAnswer: 'prii',
            IncorrectAnswer1: 'vangavi',
            IncorrectAnswer2: 'vani',
            IncorrectAnswer3: 'yaminii',
          },
        },
      ],
    });
    wrapper
      .find('.modal__wrapper-content-main-form .padding-md .form-control textarea')
      .at(2)
      .simulate('change', {
        target: {
          name: 'Question',
          value: 'newname',
        },
      });
    expect(button.exists()).toBeTruthy();
  });
  it('Expect to render setQuestionState if', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    const button = wrapper.find(
      '.modal__wrapper-content-main-form .padding-md .form-control textarea'
    );

    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
        {
          Question: 'yami',
          Answers: {
            CorrectAnswer: 'prii',
            IncorrectAnswer1: 'vangavi',
            IncorrectAnswer2: 'vani',
            IncorrectAnswer3: 'yaminii',
          },
        },
      ],
    });
    wrapper
      .find('.modal__wrapper-content-main-form .padding-md .form-control textarea')
      .at(3)
      .simulate('change', {
        target: {
          name: 'Question',
          value: 'newname',
        },
      });
    expect(button.exists()).toBeTruthy();
  });
  it('Expect to render setQuestionState if', () => {
    const wrapper = shallow(<TeacherMadeQuizQuestions {...props1} />);
    const button = wrapper.find(
      '.modal__wrapper-content-main-form .padding-md .form-control textarea'
    );

    wrapper.setState({
      errors: {},
      questionItration: 0,
      questions: [
        {
          Question: 'yam',
          Answers: {
            CorrectAnswer: 'pri',
            IncorrectAnswer1: 'vangav',
            IncorrectAnswer2: 'van',
            IncorrectAnswer3: 'yamini',
          },
        },
        {
          Question: 'yami',
          Answers: {
            CorrectAnswer: 'prii',
            IncorrectAnswer1: 'vangavi',
            IncorrectAnswer2: 'vani',
            IncorrectAnswer3: 'yaminii',
          },
        },
      ],
    });
    wrapper
      .find('.modal__wrapper-content-main-form .padding-md .form-control textarea')
      .at(4)
      .simulate('change', {
        target: {
          name: 'Question',
          value: 'newname',
        },
      });
    expect(button.exists()).toBeTruthy();
  });
});
