import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { StudentGoalContainer, mapDispatchToProps } from '../StudentGoalContainer';

describe('<StudentGoalContainer />', () => {
  let wrapper = null;
  const mockstudentGoalContainer = {
    selectedSGClassGoals: [],
  };
  const mocktreeList = [];
  wrapper = shallow(
    <StudentGoalContainer
      studentGoalContainer={mockstudentGoalContainer}
      treeList={mocktreeList}
      setSGClassRequestSuccess={jest.fn()}
      showSystem44StudentGoalsModal={jest.fn()}
    />
  );
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.getSGClassesDataRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getClassStudentGoalRequest().mock.calls.length).toBe(0);
    // expect(mapDispatchToPropscomp.showSystem44StudentGoalsModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setSGClassRequestSuccess().mock.calls.length).toBe(0);
  });
});
