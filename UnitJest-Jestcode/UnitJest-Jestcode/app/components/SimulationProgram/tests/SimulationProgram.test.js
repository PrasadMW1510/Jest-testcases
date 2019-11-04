import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import moment from 'moment';
import SimulationProgram from '../index';

describe('<SimulationProgram />', () => {
  let wrapper = null;
  let props = null;
  props = {
    storeData: jest.fn(),
    profileUserId: '',
    showWarning: jest.fn(),
    tabIndex: 1,
    questionTabIndex: 2,
    inboxmodalcontainer: {
      studentProgram: {
        results: {
          workItems: [
            {
              m180WorkItem: [
                {
                  $: {
                    dateSubmitted: moment('06-22-2018', 'MM/DD/YYYY', true)
                      .format()
                      .toString(),
                  },
                  testName: {},
                  from: {},
                  attempt: [
                    {
                      number: 2,
                      simulationTitle: 'abc',
                      question1: [
                        {
                          answer: ['qwerty'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 2,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      question2: [
                        {
                          answer: ['qwerty1'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 1,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      question3: [
                        {
                          answer: ['qwerty2'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 0,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      studentChoices: [
                        {
                          studentChoice: [
                            {
                              $: {
                                key: 'asdf',
                                value: 'abc2',
                              },
                              scIndex: 0,
                            },
                            {
                              $: {
                                key: 'asdf1',
                                value: 'abc22',
                              },
                              scIndex: 2,
                            },
                            {
                              $: {
                                key: 'asdf13',
                                value: 'abc222',
                              },
                              scIndex: 5,
                            },
                          ],
                        },
                      ],
                      index: 1,
                    },
                    {
                      number: 2,
                      simulationTitle: 'abc',
                      question1: [
                        {
                          answer: ['qwerty'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 2,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      question2: [
                        {
                          answer: ['qwerty1'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 1,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      question3: [
                        {
                          answer: ['qwerty2'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 0,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      studentChoices: [
                        {
                          studentChoice: [
                            {
                              $: {
                                key: 'asdf',
                                value: 'abc2',
                              },
                              scIndex: 0,
                            },
                            {
                              $: {
                                key: 'asdf1',
                                value: 'abc22',
                              },
                              scIndex: 2,
                            },
                            {
                              $: {
                                key: 'asdf13',
                                value: 'abc222',
                              },
                              scIndex: 5,
                            },
                          ],
                        },
                      ],
                      index: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  };
  wrapper = shallow(<SimulationProgram {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect toggle to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().toggle(e);
    expect(wrapper.state('shown')).toBeTruthy();
  });
  it('Expect scoreToggle to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().scoreToggle(e);
    expect(wrapper.state('scoreShown')).toBeTruthy();
  });
  it('Expect closeblock to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().closeblock(e);
    expect(wrapper.state('shown')).toBeFalsy();
  });
  it('Expect scoreToggleClose to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().scoreToggleClose(e);
    expect(wrapper.state('scoreShown')).toBeFalsy();
  });
  it('Expect buttonChange to render correctly', () => {
    const item = 1;
    const qNumber = 2;
    const e = {
      target: {
        value: 'qwerty',
      },
    };
    wrapper.instance().buttonChange(item, qNumber, e);
    expect(wrapper.state('score')).toEqual('qwerty');
  });
  it('Expect handleChange to render correctly', () => {
    const item = 1;
    const qNumber = 2;
    const e = {
      target: {
        value: 'qwerty',
      },
    };
    wrapper.instance().handleChange(item, qNumber, e);
    expect(wrapper.state('score')).toEqual('qwerty');
  });
  it('Expect handleEvaluationData to render correctly', () => {
    const item = 0;
    const qNumber = '1';
    const e = {
      target: {
        value: 'qwerty',
      },
    };
    const datachange = 'score';
    wrapper.instance().handleEvaluationData(item, qNumber, e, datachange);
    expect(wrapper.state('score')).toEqual('qwerty');
  });
  it('Expect handleEvaluationData to render correctly', () => {
    const item = 0;
    const qNumber = '2';
    const e = {
      target: {
        value: 'qwerty',
      },
    };
    const datachange = 'comment';
    wrapper.instance().handleEvaluationData(item, qNumber, e, datachange);
    expect(wrapper.state('score')).toEqual('qwerty');
  });
  it('Expect handleEvaluationData to render correctly', () => {
    const item = 0;
    const qNumber = '3';
    const e = {
      target: {
        value: 'qwerty',
      },
    };
    const datachange = 'score';
    wrapper.instance().handleEvaluationData(item, qNumber, e, datachange);
    expect(wrapper.state('score')).toEqual('qwerty');
  });
  it('Expect handleEvaluationData default case to render correctly', () => {
    const item = 0;
    const qNumber = '6';
    const e = {
      target: {
        value: 'qwerty',
      },
    };
    const datachange = 'Sample';
    wrapper.instance().handleEvaluationData(item, qNumber, e, datachange);
    expect(wrapper.state('score')).toEqual('qwerty');
  });
  it('Expect handleTab to render correctly', () => {
    const tabIndex = 1;
    wrapper.instance().handleTab(tabIndex);
    expect(props.showWarning.mock.calls.length).toBe(1);
  });
  it('Expect handleQuestionTab to render correctly', () => {
    const tabIndex = 1;
    wrapper.instance().handleQuestionTab(tabIndex);
    expect(props.showWarning.mock.calls.length).toBe(2);
  });
  it('Expect handleScoreCommentUpdate to render correctly', () => {
    const uStatus = 1;
    wrapper.instance().handleScoreCommentUpdate(uStatus);
    expect(props.tabIndex).toBe(1);
  });
});

describe('<SimulationProgram />', () => {
  let wrapper1 = null;
  let props1 = null;
  props1 = {
    storeData: jest.fn(),
    profileUserId: '',
    showWarning: jest.fn(),
    tabIndex: 1,
    questionTabIndex: 2,
    inboxmodalcontainer: {
      studentProgram: {
        results: {
          workItems: [
            {
              m180WorkItem: [
                {
                  $: {
                    dateSubmitted: moment('06-22-2018', 'MM/DD/YYYY', true)
                      .format()
                      .toString(),
                  },
                  testName: {},
                  from: {},
                  attempt: [
                    {
                      number: 2,
                      simulationTitle: 'abc',
                      question1: [
                        {
                          answer: ['qwerty'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 2,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      question2: [
                        {
                          answer: ['qwerty1'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 1,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      question3: [
                        {
                          answer: ['qwerty2'],
                          evaluation: [
                            {
                              $: {
                                rubricType: 'zx',
                                submissionType: 'asd',
                              },
                              rubricScores: [
                                {
                                  score: [
                                    {
                                      teacherScore: 0,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      studentChoices: [
                        {
                          studentChoice: [
                            {
                              $: {
                                key: 'asdf',
                                value: 'abc2',
                              },
                              scIndex: 2,
                            },
                          ],
                        },
                      ],
                      index: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  };
  wrapper1 = shallow(<SimulationProgram {...props1} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('Expect to render correctly with Question null', () => {
    const props2 = {
      ...props1,
      inboxmodalcontainer: {
        studentProgram: {
          results: {
            workItems: [
              {
                m180WorkItem: [
                  {
                    $: {
                      dateSubmitted: moment('06-22-2018', 'MM/DD/YYYY', true)
                        .format()
                        .toString(),
                    },
                    testName: {},
                    from: {},
                    attempt: [
                      {
                        number: 2,
                        simulationTitle: 'abc',
                        question1: [
                          {
                            answer: ['qwerty'],
                            evaluation: undefined,
                          },
                        ],
                        question2: [
                          {
                            answer: ['qwerty1'],
                            evaluation: undefined,
                          },
                        ],
                        question3: [
                          {
                            answer: ['qwerty2'],
                            evaluation: undefined,
                          },
                        ],
                        studentChoices: [
                          {
                            studentChoice: [
                              {
                                $: {
                                  key: 'asdf',
                                  value: 'abc2',
                                },
                                scIndex: 2,
                              },
                            ],
                          },
                        ],
                        index: 1,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    };
    wrapper1 = shallow(<SimulationProgram {...props2} />);
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
});
