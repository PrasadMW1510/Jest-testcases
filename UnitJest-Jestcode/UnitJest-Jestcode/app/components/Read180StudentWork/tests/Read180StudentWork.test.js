import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Read180StudentWork from '../index';

describe('<Read180StudentWork />', () => {
  const props = {
    handleCancel: jest.fn(),
    readStudentWork180Data: {
      results: {
        workItems: [
          {
            rSkillsWorkItem: [
              {
                student: {},
                workshop: ['qwertyu'],
                testName: ['asdf'],
                $: {
                  dateSubmitted: 11 / 11 / 2018,
                },
                multichoiceResults: [
                  {
                    correct: ['qwerty'],
                    total: ['qwer'],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    savePostAssesment: jest.fn(),
    data: {
      row: {
        student: '',
      },
    },
  };
  const wrapper = shallow(<Read180StudentWork {...props} />);
  it('Expect to render component', () => {
    wrapper.instance().setState({
      saveClass: true,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const nextProps = {
      readStudentWork180Data: {
        results: {
          workItems: [
            {
              rSkillsWorkItem: [{}],
            },
          ],
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('cancel')).toBeFalsy();
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const nextProps = {
      readStudentWork180Data: {},
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('cancel')).toBeFalsy();
  });
  it('Expect updateData to render correctly', () => {
    const data = {
      openResponse1Submission: [
        {
          evaluation: [
            {
              comment: [{}],
              $: {
                submissionType: '',
                rubricType: '',
              },
              rubricScores: [
                {
                  score: [
                    {
                      teacherScore: [{}],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      openResponse2Submission: [
        {
          evaluation: [
            {
              comment: [{}],
              $: {
                submissionType: '',
                rubricType: '',
              },
              rubricScores: [
                {
                  score: [
                    {
                      teacherScore: [{}],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      writingPromptSubmission: [
        {
          evaluation: [
            {
              comment: [{}],
              $: {
                submissionType: '',
                rubricType: '',
              },
              rubricScores: [
                {
                  score: [
                    {
                      teacherScore: [{}],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    wrapper.instance().updateData(data);
    expect(wrapper.state('cancel')).toBeFalsy();
  });
  it('Expect print to render correctly', () => {
    wrapper.instance().print();
    expect(wrapper.state('cancel')).toBeFalsy();
  });
  it('Expect gradePercent print to render correctly', () => {
    wrapper.instance().gradePercent();
    expect(wrapper.state('cancel')).toBeFalsy();
  });
  it('Expect saveAssignment print to render correctly', () => {
    wrapper.instance().saveAssignment();
    expect(wrapper.state('cancel')).toBeFalsy();
  });
  it('Expect alertBox print to render correctly', () => {
    wrapper.setState({
      saveClass: true,
    });
    wrapper.instance().alertBox();
    expect(wrapper.state('alert')).toBeTruthy();
  });
  it('Expect alertBox print to render correctly', () => {
    wrapper.setState({
      saveClass: false,
    });
    wrapper.instance().alertBox();
    expect(wrapper.state('alert')).toBeTruthy();
  });
  it('Expect scoreToggle print to render correctly', () => {
    wrapper.instance().scoreToggle();
    expect(wrapper.state('scoreShown')).toBeTruthy();
  });
  it('Expect scoreToggleClose print to render correctly', () => {
    wrapper.instance().scoreToggleClose();
    expect(wrapper.state('scoreShown')).toBeFalsy();
  });
  it('Expect overToggle print to render correctly', () => {
    wrapper.instance().overToggle();
    expect(wrapper.state('scoreShown')).toBeFalsy();
  });
  it('Expect overToggleClose print to render correctly', () => {
    wrapper.instance().overToggleClose();
    expect(wrapper.state('scoreShown')).toBeFalsy();
  });
  it('Expect savewarningModalClose print to render correctly', () => {
    wrapper.instance().savewarningModalClose();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Expect withooutSavewarningModalCancel print to render correctly', () => {
    wrapper.instance().withooutSavewarningModalCancel();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Expect savewarningModalCancel print to render correctly', () => {
    wrapper.instance().savewarningModalCancel();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Expect savewarningModalProceed print to render correctly', () => {
    wrapper.instance().savewarningModalProceed();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Expect saveColor print to render correctly', () => {
    const type = 'OPEN_RESP1';
    const rubricType = '';
    const postScore = 1;
    const postComment = '';
    wrapper.instance().saveColor(type, rubricType, postScore, postComment);
    expect(wrapper.state('saveClass')).toBeTruthy();
  });
  it('Expect saveColor print to render correctly', () => {
    const type = 'OPEN_RESP2';
    const rubricType = '';
    const postScore = 1;
    const postComment = '';
    wrapper.instance().saveColor(type, rubricType, postScore, postComment);
    expect(wrapper.state('saveClass')).toBeTruthy();
  });
  it('Expect saveColor print to render correctly', () => {
    const type = 'WRITING_PROMPT';
    const rubricType = '';
    const postScore = 1;
    const postComment = '';
    wrapper.instance().saveColor(type, rubricType, postScore, postComment);
    expect(wrapper.state('saveClass')).toBeTruthy();
  });
});

describe('<Read180StudentWork else/>', () => {
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    readStudentWork180Data: {},
    savePostAssesment: jest.fn(),
    nextSerd: jest.fn(),
    prevSerd: jest.fn(),
    currentIndex: '',
    modalData: [],
    data: {},
  };
  const wrapper = shallow(<Read180StudentWork {...props} />);
  it('Expect to render component', () => {
    wrapper.instance().setState({
      saveClass: true,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect print to render correctly', () => {
    wrapper.instance().print();
    expect(wrapper.state('cancel')).toBeFalsy();
  });
  it('Expect gradePercent print to render correctly', () => {
    wrapper.instance().gradePercent();
    expect(wrapper.state('cancel')).toBeFalsy();
  });
});
