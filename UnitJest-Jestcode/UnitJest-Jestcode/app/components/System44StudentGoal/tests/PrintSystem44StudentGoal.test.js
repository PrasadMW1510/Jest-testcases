import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PrintSystem44StudentGoal from '../PrintSystem44StudentGoal';

describe('<PrintSystem44StudentGoal />', () => {
  let wrapper = null;
  let wrapper1 = null;

  const props = {
    lastAssementDateAcademicGoal: '',
    system44StudentGoalDecoding: [],
    system44StudentGoalSpelling: [],
    system44StudentGoalReading: [],
    behaviouralGoalsControls: [
      {
        goal_name: 'yamini',
        whole_group_score: ['0'],
        small_group_score: ['0'],
        independent_reading_score: ['0'],
        software_score: ['0'],
        total: '5',
      },
    ],
    data: {
      metaData: [
        {
          date: '2015-05-15T',
        },
      ],
    },
    currentPageIndex: 0,
  };
  const props1 = {
    lastAssementDateAcademicGoal: '',
    system44StudentGoalDecoding: [],
    system44StudentGoalSpelling: [],
    system44StudentGoalReading: [],
    behaviouralGoalsControls: [
      {
        goal_name: 'yamini',
        whole_group_score: [],
        small_group_score: [],
        independent_reading_score: [],
        software_score: [],
      },
    ],
    data: {
      metaData: [
        {
          date: '',
        },
      ],
    },
    currentPageIndex: 0,
  };
  wrapper = shallow(<PrintSystem44StudentGoal {...props} />);
  wrapper1 = shallow(<PrintSystem44StudentGoal {...props1} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
});
