import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SkillsAssestments from '../index';

describe('<SkillsAssestments />', () => {
  let wrapper = null;
  const props = {
    inboxmodalcontainer: {
      question: [
        {
          length: 2,
        },
        {
          length: 3,
        },
      ],
      studentProgram: {
        results: {
          workItems: [
            {
              mSkillsWorkItem: [
                {
                  testResults: [{}],
                  mSkillsQuestion1: [
                    {
                      evaluation: [
                        {
                          $: {
                            rubricType: '',
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
                  mSkillsQuestion2: [
                    {
                      evaluation: [
                        {
                          $: {
                            rubricType: '',
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
                  $: {
                    communityId: 's',
                  },
                  from: 'a',
                  blockTitle: 'd',
                },
              ],
            },
          ],
        },
      },
    },
    profileUserId: '',
    storeData: jest.fn(),
    showWarning: jest.fn(),
    tabIndex: 0,
  };
  wrapper = shallow(<SkillsAssestments {...props} />);
  it('Expect to render correctly', () => {
    wrapper.setState({
      scoreShown: true,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect scoreToggle to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().scoreToggle(e);
    expect(wrapper.state('scoreShown')).toBeTruthy();
  });
  it('Expect scoreToggleClose to render correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().scoreToggleClose(e);
    expect(wrapper.state('scoreShown')).toBeFalsy();
  });
  it('Expect handleTab to render correctly', () => {
    const tabIndex = 0;
    wrapper.instance().handleTab(tabIndex);
  });
  it('Expect buttonChange to render correctly', () => {
    const item = 1;
    const qNumber = '1';
    const e = {
      target: {
        value: 'qwe',
      },
    };
    wrapper.instance().buttonChange(item, qNumber, e);
    expect(wrapper.state('score')).toEqual('qwe');
  });
  it('Expect handleChange to render correctly', () => {
    const item = 1;
    const qNumber = '2';
    const e = {
      target: {
        value: 'qwe',
      },
    };
    wrapper.instance().handleChange(item, qNumber, e);
    expect(wrapper.state('score')).toEqual('qwe');
  });
  it('Expect handleEvaluationData to render correctly', () => {
    const item = 3;
    const qNumber = '3';
    const e = {
      target: {
        value: 'qwe',
      },
    };
    const datachange = 'score1';
    wrapper.instance().handleEvaluationData(item, qNumber, e, datachange);
    expect(wrapper.state('score')).toEqual('qwe');
  });
});

describe('<SkillsAssestments />', () => {
  let wrapper = null;
  const props = {
    inboxmodalcontainer: {
      question: [],
      studentProgram: {
        results: {
          workItems: [
            {
              mSkillsWorkItem: undefined,
            },
          ],
        },
      },
    },
    profileUserId: '',
    storeData: jest.fn(),
    showWarning: jest.fn(),
    tabIndex: 0,
  };
  wrapper = shallow(<SkillsAssestments {...props} />);
  it('Expect to render correctly', () => {
    wrapper.setState({
      scoreShown: true,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<SkillsAssestments />', () => {
  let wrapper = null;
  const props = {
    inboxmodalcontainer: {
      question: [1, 2],
      studentProgram: {
        results: {
          workItems: [
            {
              mSkillsWorkItem: [
                {
                  testResults: ['1', '2'],
                  mSkillsQuestion1: [{ val: '' }],
                  mSkillsQuestion2: [{ val: '' }],
                  $: {
                    communityId: 's',
                  },
                },
              ],
              testResults: [{}],
              mSkillsQuestion2: undefined,
            },
          ],
        },
      },
    },
    profileUserId: '',
    storeData: jest.fn(),
    showWarning: jest.fn(),
    tabIndex: 0,
  };
  wrapper = shallow(<SkillsAssestments {...props} />);
  it('Expect to render correctly', () => {
    wrapper.setState({
      scoreShown: true,
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
