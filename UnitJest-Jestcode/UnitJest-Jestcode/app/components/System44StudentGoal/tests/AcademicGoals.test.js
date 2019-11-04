import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AcademicGoals from '../AcademicGoals';

describe('AcademicGoals ', () => {
  let wrapper = null;
  const props = {
    resetDefault: jest.fn(),
    handleGoalNameClick: jest.fn(),
    handleSaveGoals: jest.fn(),
    handleChange: jest.fn(),
    academicGoalsControls: [
      {
        goal_name: ['decoding'],
      },
    ],
    system44StudentGoalDecoding: [],
    system44StudentGoalSpelling: [],
    system44StudentGoalReading: [],
    defaultDecodingData: [],
    defaultSpellingData: [],
    defaultReadingData: [],
    showErrorDecoding: true,
    showErrorEmptyDecoding: true,
    showErrorProgressiveDecoding: true,
    showErrorSpelling: true,
    showErrorProgressiveSpelling: true,
    showErrorEmptySpelling: true,
    showErrorReading: true,
    showErrorProgressiveReading: true,
    showErrorEmptyReading: true,
    enableSaveGoals: true,
  };
  wrapper = shallow(<AcademicGoals {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('onclick', () => {
    const input = wrapper.find('.row a').at(0);
    input.simulate('click');
    expect(props.handleGoalNameClick).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(0);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(1);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(2);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(3);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
});

describe('AcademicGoals ', () => {
  let wrapper = null;
  const props = {
    resetDefault: jest.fn(),
    handleGoalNameClick: jest.fn(),
    handleSaveGoals: jest.fn(),
    handleChange: jest.fn(),
    academicGoalsControls: [
      {
        goal_name: ['spelling'],
      },
    ],
    system44StudentGoalDecoding: [],
    system44StudentGoalSpelling: [],
    system44StudentGoalReading: [],
    defaultDecodingData: [],
    defaultSpellingData: [],
    defaultReadingData: [],
    showErrorDecoding: true,
    showErrorEmptyDecoding: true,
    showErrorProgressiveDecoding: true,
    showErrorSpelling: true,
    showErrorProgressiveSpelling: true,
    showErrorEmptySpelling: true,
    showErrorReading: true,
    showErrorProgressiveReading: true,
    showErrorEmptyReading: true,
    enableSaveGoals: true,
  };
  wrapper = shallow(<AcademicGoals {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(0);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(1);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(2);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(3);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
});
describe('AcademicGoals ', () => {
  let wrapper = null;
  const props = {
    resetDefault: jest.fn(),
    handleGoalNameClick: jest.fn(),
    handleSaveGoals: jest.fn(),
    handleChange: jest.fn(),
    academicGoalsControls: [
      {
        goal_name: ['independent reading'],
      },
    ],
    system44StudentGoalDecoding: [],
    system44StudentGoalSpelling: [],
    system44StudentGoalReading: [],
    defaultDecodingData: [],
    defaultSpellingData: [],
    defaultReadingData: [],
    showErrorDecoding: true,
    showErrorEmptyDecoding: true,
    showErrorProgressiveDecoding: true,
    showErrorSpelling: true,
    showErrorProgressiveSpelling: true,
    showErrorEmptySpelling: true,
    showErrorReading: true,
    showErrorProgressiveReading: true,
    showErrorEmptyReading: true,
    enableSaveGoals: true,
  };
  wrapper = shallow(<AcademicGoals {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(0);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(1);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(2);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('onchange', () => {
    const input = wrapper.find('.print-system44-modal-listdata-element1 input').at(3);
    input.simulate('change');
    expect(props.handleChange).toHaveBeenCalled();
  });
});
