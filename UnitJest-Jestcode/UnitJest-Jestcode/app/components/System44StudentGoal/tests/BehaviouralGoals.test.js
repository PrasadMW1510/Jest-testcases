import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BehaviouralGoals from '../BehaviouralGoals';

describe('BehaviouralGoals ', () => {
  let wrapper = null;
  const props = {
    data: {
      behaviour_goal: 'asd',
      location: {
        pathname: '/portfolio/studentGoals',
      },
    },
    behaviouralGoalsControls: [
      {
        goal_name: ['decode'],
        whole_group_score: [1],
        small_group_score: [1],
        independent_reading_score: [1],
        software_score: [1],
      },
    ],
    handleOpenLastAssesment: jest.fn(),
    enableSaveBehaviouralGoals: true,
    handleBehaviourInputChange: jest.fn(),
    handleSaveBehaviourGoals: jest.fn(),
  };
  wrapper = shallow(<BehaviouralGoals {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__hyper--link');
    input.simulate('click');
    expect(props.handleOpenLastAssesment).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(0);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(1);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(2);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(3);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(4);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
});
describe('BehaviouralGoals ', () => {
  let wrapper = null;
  const props = {
    data: {
      behaviour_goal: 'asd',
      location: {
        pathname: '/portfolio/studentGoals',
      },
    },
    behaviouralGoalsControls: [
      {
        goal_name: ['decode'],
        whole_group_score: [2],
        small_group_score: [2],
        independent_reading_score: [2],
        software_score: [2],
      },
    ],
    handleOpenLastAssesment: jest.fn(),
    enableSaveBehaviouralGoals: true,
    handleBehaviourInputChange: jest.fn(),
    handleSaveBehaviourGoals: jest.fn(),
  };
  wrapper = shallow(<BehaviouralGoals {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(5);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(6);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(7);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(8);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(9);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
});
describe('BehaviouralGoals ', () => {
  let wrapper = null;
  const props = {
    data: {
      behaviour_goal: 'asd',
      location: {
        pathname: '/portfolio/studentGoals',
      },
    },
    behaviouralGoalsControls: [
      {
        goal_name: ['decode'],
        whole_group_score: [3],
        small_group_score: [3],
        independent_reading_score: [3],
        software_score: [3],
      },
    ],
    handleOpenLastAssesment: jest.fn(),
    enableSaveBehaviouralGoals: true,
    handleBehaviourInputChange: jest.fn(),
    handleSaveBehaviourGoals: jest.fn(),
  };
  wrapper = shallow(<BehaviouralGoals {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(10);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(11);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(12);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(13);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(14);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
});
describe('BehaviouralGoals ', () => {
  let wrapper = null;
  const props = {
    data: {
      behaviour_goal: 'asd',
      location: {
        pathname: '/portfolio/studentGoals',
      },
    },
    behaviouralGoalsControls: [
      {
        goal_name: ['decode'],
        whole_group_score: [4],
        small_group_score: [4],
        independent_reading_score: [4],
        software_score: [4],
      },
    ],
    handleOpenLastAssesment: jest.fn(),
    enableSaveBehaviouralGoals: true,
    handleBehaviourInputChange: jest.fn(),
    handleSaveBehaviourGoals: jest.fn(),
  };
  wrapper = shallow(<BehaviouralGoals {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('onclick', () => {
    const input = wrapper.find('.print-system44__pull--right1 span').at(15);
    input.simulate('click');
    expect(props.handleBehaviourInputChange).toHaveBeenCalled();
  });
});
