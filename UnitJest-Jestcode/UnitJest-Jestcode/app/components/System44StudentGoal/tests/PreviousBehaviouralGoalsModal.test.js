import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PreviousBehaviouralGoalsModal from '../PreviousBehaviouralGoalsModal';

describe('PreviousBehaviouralGoalsModal ', () => {
  let wrapper = null;
  const props = {
    data: {
      behaviour_goal: 'abc',
    },
    showLastAssesmentModal: true,
    lastAssementDateBehaviouralGoal: 'abc',
    previousAssesmentsData: {
      'Total Points Earned': ['1', '2'],
    },
    handleOpenLastAssesment: jest.fn(),
  };
  wrapper = shallow(<PreviousBehaviouralGoalsModal {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('PreviousBehaviouralGoalsModal ', () => {
  let wrapper = null;
  const props = {
    data: {
      behaviour_goal: 'abc',
    },
    showLastAssesmentModal: true,
    lastAssementDateBehaviouralGoal: 'abc',
    previousAssesmentsData: {
      'Total Points Earned1': ['1'],
    },
    handleOpenLastAssesment: jest.fn(),
  };
  wrapper = shallow(<PreviousBehaviouralGoalsModal {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
