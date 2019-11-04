import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Math180Questions from '../index';

describe('<Math180Questions />', () => {
  let wrapper = null;
  const props = {
    questionData: {
      answer: ['abc'],
      evaluation: [
        {
          comment: '',
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
    index: 1,
    handleChange: jest.fn(),
    question: 'test',
    buttonChange: jest.fn(),
    scoreToggle: jest.fn(),
    date: moment('06/22/2018', 'MM/DD/YYYY', true).format(),
    submitDate: moment('06/22/2018', 'MM/DD/YYYY', true).format(),
    rubicScore: ['0'],
  };
  wrapper = shallow(<Math180Questions {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render scoreChange as expected', () => {
    const item = 1;
    const qNumber = 2;
    const e = {
      target: {
        value: '0',
      },
    };
    wrapper.instance().scoreChange(item, qNumber, e);
    expect(wrapper.state('rubicScoreValue')).toEqual('0');
  });
  it('Should render handleCommentChange as expected', () => {
    const index = 1;
    const questionIndex = 2;
    const e = {
      target: {
        value: '0',
      },
    };
    wrapper.instance().handleCommentChange(index, questionIndex, e);
    expect(wrapper.instance().props.handleChange).toHaveBeenCalled();
  });
  it('Should render rubicScoreSelection  as expected', () => {
    const teachScore = '0';
    wrapper.setState({ rubicScoreValue: '0' });
    wrapper.instance().rubicScoreSelection(teachScore);
    expect(wrapper.instance().props.index).toBe(1);
  });
  it('Should render commentData  as expected', () => {
    wrapper.instance().commentData();
    expect(wrapper.instance().props.index).toEqual(1);
  });
  it('Should render onclick as expected', () => {
    wrapper.instance().scoreChange = jest.fn();
    wrapper
      .find('.pull-right button')
      .at(0)
      .simulate('click', {
        target: {
          value: '0',
        },
      });
    expect(wrapper.instance().scoreChange).toHaveBeenCalled();
  });
  it('Should render onchange as expected', () => {
    wrapper.instance().handleCommentChange = jest.fn();
    wrapper.find('.block-scrltw textarea').simulate('change', {
      target: {
        value: '0',
      },
    });
    expect(wrapper.instance().handleCommentChange).toHaveBeenCalled();
  });
});

describe('<Math180Questions />', () => {
  let wrapper = null;
  const props = {
    questionData: {
      answer: ['abc'],
      evaluation: [
        {
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
    index: 1,
    handleChange: jest.fn(),
    question: 'test',
    buttonChange: jest.fn(),
    scoreToggle: jest.fn(),
    date: moment('06/22/2018', 'MM/DD/YYYY', true).format(),
    submitDate: moment('06/22/2018', 'MM/DD/YYYY', true).format(),
    rubicScore: ['1'],
  };
  wrapper = shallow(<Math180Questions {...props} />);
  it('Should render as expected', () => {
    wrapper.setState({
      comments: 'abc',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render scoreChange as expected', () => {
    const item = 1;
    const qNumber = 2;
    const e = {
      target: {
        value: 1,
      },
    };
    wrapper.instance().scoreChange(item, qNumber, e);
    expect(wrapper.state('rubicScoreValue')).toEqual(1);
  });
  it('Should render rubicScoreSelection  as expected', () => {
    const teachScore = '1';
    wrapper.setState({ rubicScoreValue: '1' });
    wrapper.instance().rubicScoreSelection(teachScore);
    expect(wrapper.instance().props.index).toBe(1);
  });
  it('Should render onclick as expected', () => {
    wrapper.instance().scoreChange = jest.fn();
    wrapper
      .find('.pull-right button')
      .at(1)
      .simulate('click', {
        target: {
          value: '0',
        },
      });
    expect(wrapper.instance().scoreChange).toHaveBeenCalled();
  });
});

describe('<Math180Questions />', () => {
  let wrapper = null;
  const props = {
    questionData: {
      answer: ['abc'],
      evaluation: [
        {
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
    index: 1,
    handleChange: jest.fn(),
    question: 'test',
    buttonChange: jest.fn(),
    scoreToggle: jest.fn(),
    date: moment('06/22/2018', 'MM/DD/YYYY', true).format(),
    submitDate: moment('06/22/2018', 'MM/DD/YYYY', true).format(),
    rubicScore: ['2'],
  };
  wrapper = shallow(<Math180Questions {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render scoreChange as expected', () => {
    const item = 1;
    const qNumber = 2;
    const e = {
      target: {
        value: 1,
      },
    };
    wrapper.instance().scoreChange(item, qNumber, e);
    expect(wrapper.state('rubicScoreValue')).toEqual(1);
  });
  it('Should render rubicScoreSelection  as expected', () => {
    const teachScore = '2';
    wrapper.setState({ rubicScoreValue: '2' });
    wrapper.instance().rubicScoreSelection(teachScore);
    expect(wrapper.instance().props.index).toBe(1);
  });
  it('Should render onclick as expected', () => {
    wrapper.instance().scoreChange = jest.fn();
    wrapper
      .find('.pull-right button')
      .at(2)
      .simulate('click', {
        target: {
          value: '0',
        },
      });
    expect(wrapper.instance().scoreChange).toHaveBeenCalled();
  });
});
