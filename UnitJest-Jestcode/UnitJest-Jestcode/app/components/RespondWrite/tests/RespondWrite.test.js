import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import RespondWrite from '../index';

describe('<RespondWrite />', () => {
  let wrapper = null;
  const props = {
    data: {
      community_id: 'S44NG',
      respondWrite: {
        passage: [1],
        seriesNumber: [0],
        writingActivitySubmission: [
          {
            numberOfSessions: [1],
            draftResponse: [
              {
                topicSentence: [
                  {
                    fixedText1: [''],
                  },
                ],
              },
            ],
          },
        ],
        $: {
          level: '',
        },
        topicNumber: [],
      },
    },
    hideCancel: jest.fn(),
    saveRespondData: jest.fn(),
    isOpen: true,
    currentIndex: 0,
    tempGridData: [0],
    dispatchAction: jest.fn(),
  };
  wrapper = shallow(<RespondWrite {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render componentWillReceiveProps correctly', () => {
    const nextProps = {
      data: {
        respondWrite: {
          respondWriteSubmission: [
            {
              evaluation: [
                {
                  comment: [1],
                  rubricScores: [
                    {
                      score: [
                        {
                          selfScore: [1],
                          teacherScore: [2],
                          $: {
                            rubricOrder: '',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render componentWillReceiveProps correctly else', () => {
    const nextProps = {
      data: {
        respondWrite: {
          writingActivitySubmission: [
            {
              evaluation: [
                {
                  comment: [1],
                  rubricScores: [
                    {
                      score: [
                        {
                          selfScore: [1],
                          teacherScore: [2],
                          $: {
                            rubricOrder: '',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render componentWillReceiveProps correctly else', () => {
    const nextProps = {
      data: {
        respondWrite: {},
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render componentWillReceiveProps correctly else', () => {
    const nextProps = {
      data: {},
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render handlePrevious correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 0,
    });
    wrapper.instance().handlePrevious(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render handlePrevious correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 1,
    });
    wrapper.instance().handlePrevious(e);
    expect(wrapper.instance().props.dispatchAction.mock.calls.length).toBe(1);
  });
  it('Expect to render handleNext correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 0,
    });
    wrapper.instance().handleNext(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render handleNext correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 1,
    });
    wrapper.instance().handleNext(e);
    expect(wrapper.instance().props.dispatchAction.mock.calls.length).toBe(2);
  });
  it('Expect to render componentWillUnmount correctly', () => {
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render scoreToggleClose correctly', () => {
    wrapper.instance().scoreToggleClose();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render handleCancel correctly', () => {
    wrapper.instance().handleCancel();
    expect(wrapper.instance().props.hideCancel.mock.calls.length).toBe(1);
  });
  it('Expect to render handlePrint correctly', () => {
    wrapper.instance().handlePrint();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render saveResponseModal correctly', () => {
    wrapper.instance().saveResponseModal();
    expect(wrapper.instance().props.saveRespondData.mock.calls.length).toBe(1);
  });
  it('Expect to render UpdateComment correctly', () => {
    const event = {
      target: {
        value: 'teacher',
      },
    };
    wrapper.instance().updateComment(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render addRubric correctly', () => {
    const name = 'teacherScore1';
    const event = {
      target: {
        getAttribute() {
          return name;
        },
      },
    };
    wrapper.instance().addRubric(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render addRubric correctly', () => {
    const name = 'teacherScore2';
    const event = {
      target: {
        getAttribute() {
          return name;
        },
      },
    };
    wrapper.instance().addRubric(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render addRubric correctly', () => {
    const name = 'teacherScore3';
    const event = {
      target: {
        getAttribute() {
          return name;
        },
      },
    };
    wrapper.instance().addRubric(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render addRubric correctly', () => {
    const name = 'teacherScore4';
    const event = {
      target: {
        getAttribute() {
          return name;
        },
      },
    };
    wrapper.instance().addRubric(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render addRubric correctly', () => {
    const name = 'teacherScore5';
    const event = {
      target: {
        getAttribute() {
          return name;
        },
      },
    };
    wrapper.instance().addRubric(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render addRubric correctly', () => {
    const name = 'default';
    const event = {
      target: {
        getAttribute() {
          return name;
        },
      },
    };
    wrapper.instance().addRubric(event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__block-scrl-two--a');
    wrapper
      .find('.extended-writing__block-scrl-two--a')
      .at(0)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__block-scrl-two--a');
    wrapper
      .find('.extended-writing__block-scrl-two--a')
      .at(1)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__block-scrl-two--a');
    wrapper
      .find('.extended-writing__block-scrl-two--a')
      .at(2)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__block-scrl-two--a');
    wrapper
      .find('.extended-writing__block-scrl-two--a')
      .at(3)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore1"]');
    wrapper.setState({
      teacherScore1: '1',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore1"]')
      .at(0)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore1"]');
    wrapper.setState({
      teacherScore1: '2',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore1"]')
      .at(1)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore1"]');
    wrapper.setState({
      teacherScore1: '3',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore1"]')
      .at(2)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore1"]');
    wrapper.setState({
      teacherScore1: '4',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore1"]')
      .at(3)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore2"]');
    wrapper.setState({
      teacherScore2: '1',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore2"]')
      .at(0)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore2"]');
    wrapper.setState({
      teacherScore2: '2',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore2"]')
      .at(1)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore2"]');
    wrapper.setState({
      teacherScore2: '3',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore2"]')
      .at(2)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore2"]');
    wrapper.setState({
      teacherScore2: '4',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore2"]')
      .at(3)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore3"]');
    wrapper.setState({
      teacherScore3: '1',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore3"]')
      .at(0)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore3"]');
    wrapper.setState({
      teacherScore3: '2',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore3"]')
      .at(1)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore3"]');
    wrapper.setState({
      teacherScore3: '3',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore3"]')
      .at(2)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('Expect to render onclick correctly', () => {
    const clickButton = wrapper.find('.extended-writing__pull--right1 span[name="teacherScore3"]');
    wrapper.setState({
      teacherScore3: '4',
    });
    wrapper
      .find('.extended-writing__pull--right1 span[name="teacherScore3"]')
      .at(3)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
});
describe('<RespondWrite />', () => {
  let wrapper = null;
  const props = {
    data: {
      community_id: 'R180NG',
      respondWrite: {
        respondWriteSubmission: [
          {
            publishedResponse: [],
            numberOfSessions: [1],
            draftResponse: [
              {
                supportingDetail1: [
                  {
                    fixedText1: [],
                    studentResponse1: [],
                  },
                ],
                supportingDetail2: [
                  {
                    fixedText1: [],
                    studentResponse1: [],
                  },
                ],
                conclusion: [
                  {
                    fixedText1: [],
                    studentResponse1: [],
                  },
                ],
                topicSentence: [0],
              },
            ],
          },
        ],
        $: {
          level: '',
        },
        topicNumber: [],
        segmentNumber: [],
        topicTitle: [],
        segmentTitle: [],
      },
    },
    hideCancel: jest.fn(),
    saveRespondData: jest.fn(),
    isOpen: true,
    currentIndex: 0,
    tempGridData: [],
    dispatchAction: jest.fn(),
  };
  wrapper = shallow(<RespondWrite {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
describe('<RespondWrite />', () => {
  let wrapper = null;
  const props = {
    data: {
      community_id: 'R180NGelse',
      respondWrite: {
        respondWriteSubmission: [
          {
            publishedResponse: [],
            numberOfSessions: [1],
            draftResponse: [
              {
                supportingDetail1: [
                  {
                    fixedText1: [],
                    studentResponse1: [],
                  },
                ],
                supportingDetail2: [
                  {
                    fixedText1: [],
                    studentResponse1: [],
                  },
                ],
                conclusion: [
                  {
                    fixedText1: [],
                    studentResponse1: [],
                  },
                ],
                topicSentence: [0],
              },
            ],
          },
        ],
        $: {
          level: '',
        },
        topicNumber: [],
        segmentNumber: [],
        topicTitle: [],
        segmentTitle: [],
      },
    },
    hideCancel: jest.fn(),
    saveRespondData: jest.fn(),
    isOpen: true,
    currentIndex: 0,
    tempGridData: [],
    dispatchAction: jest.fn(),
  };
  wrapper = shallow(<RespondWrite {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
