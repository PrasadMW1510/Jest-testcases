import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { System44StudentGoalContainer, mapDispatchToProps } from '../System44StudentGoalContainer';

describe('System 44 Student Goal Container', () => {
  let wrapper = null;
  let wrapper1 = null;
  let wrapper2 = null;
  const mockgetCombinedStudentGoalsRequest = jest.fn();
  const mockgetAllStudentGoalsRequest = jest.fn();
  const mocksetStudentAcademicGoals = jest.fn();
  const mocksetStudentBehaviourGoals = jest.fn();
  const mockupdateStudentBehaviourGoals = jest.fn();
  const mockclearResponseStatus = jest.fn();
  const mocksystem44StudentGoalRequest = jest.fn();
  const mocksystem44StudentGoalContainer = {
    getCombinedStudentGoalsData: 'asd',
  };
  const mockdata = {
    location: {
      pathname: '/portfolio/studentWorks',
    },
    studentId: '',
  };
  const mockdata1 = {
    location: {
      pathname: '/portfolio/studentWork',
    },
    studentId: '',
  };
  const mockdata2 = {
    location: {
      pathname: '/portfolio/studentGoals',
    },
    studentId: '',
  };
  beforeEach(() => {
    wrapper = shallow(
      <System44StudentGoalContainer
        getCombinedStudentGoalsRequest={mockgetCombinedStudentGoalsRequest}
        getAllStudentGoalsRequest={mockgetAllStudentGoalsRequest}
        setStudentAcademicGoals={mocksetStudentAcademicGoals}
        setStudentBehaviourGoals={mocksetStudentBehaviourGoals}
        updateStudentBehaviourGoals={mockupdateStudentBehaviourGoals}
        clearResponseStatus={mockclearResponseStatus}
        handleCancel={jest.fn()}
        handleSaveGoals={jest.fn()}
        getStudentSubmissionsRequest={jest.fn()}
        handleSaveBehaviourGoals={jest.fn()}
        handleUpdateStudentBehaviourGoals={jest.fn()}
        data={mockdata}
        getCombinedStudentGoalsData="asd"
        system44studentgoalcontainer={mocksystem44StudentGoalContainer}
        system44StudentGoalRequest={mocksystem44StudentGoalRequest}
        clearState={jest.fn()}
      />
    );
    wrapper1 = shallow(
      <System44StudentGoalContainer
        getCombinedStudentGoalsRequest={mockgetCombinedStudentGoalsRequest}
        getAllStudentGoalsRequest={mockgetAllStudentGoalsRequest}
        setStudentAcademicGoals={mocksetStudentAcademicGoals}
        setStudentBehaviourGoals={mocksetStudentBehaviourGoals}
        updateStudentBehaviourGoals={mockupdateStudentBehaviourGoals}
        clearResponseStatus={mockclearResponseStatus}
        handleCancel={jest.fn()}
        handleSaveGoals={jest.fn()}
        getStudentSubmissionsRequest={jest.fn()}
        handleSaveBehaviourGoals={jest.fn()}
        handleUpdateStudentBehaviourGoals={jest.fn()}
        data={mockdata1}
        getCombinedStudentGoalsData="asd"
        system44studentgoalcontainer={mocksystem44StudentGoalContainer}
        system44StudentGoalRequest={mocksystem44StudentGoalRequest}
        clearState={jest.fn()}
      />
    );
    wrapper2 = shallow(
      <System44StudentGoalContainer
        getCombinedStudentGoalsRequest={mockgetCombinedStudentGoalsRequest}
        getAllStudentGoalsRequest={mockgetAllStudentGoalsRequest}
        setStudentAcademicGoals={mocksetStudentAcademicGoals}
        setStudentBehaviourGoals={mocksetStudentBehaviourGoals}
        updateStudentBehaviourGoals={mockupdateStudentBehaviourGoals}
        clearResponseStatus={mockclearResponseStatus}
        handleCancel={jest.fn()}
        handleSaveGoals={jest.fn()}
        getStudentSubmissionsRequest={jest.fn()}
        handleSaveBehaviourGoals={jest.fn()}
        handleUpdateStudentBehaviourGoals={jest.fn()}
        data={mockdata2}
        getCombinedStudentGoalsData="asd"
        system44studentgoalcontainer={mocksystem44StudentGoalContainer}
        system44StudentGoalRequest={mocksystem44StudentGoalRequest}
        clearState={jest.fn()}
      />
    );
  });
  it('Should render System44StudentGoalContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
    expect(shallowToJson(wrapper2)).toMatchSnapshot();
  });
  it('Should call handlePreview', () => {
    const opts = {};
    wrapper.instance().handlePreview(opts);
    expect(wrapper.instance().props.system44StudentGoalRequest).toMatchSnapshot();
  });
  it('Should call handleCloseModal', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.instance().props.handleCancel).toMatchSnapshot();
  });
  it('Should call handlePagination if', () => {
    const identifier = 'jh77ugkc01il7er8ul67bc73_2efa7f0';
    wrapper.instance().handlePagination(identifier);
    expect(wrapper.instance().props.clearResponseStatus).toMatchSnapshot();
  });
  it('Should call handlePagination elseif', () => {
    const identifier = 'jh77ugkc01il7er8ul67bc73_2efa7f0';
    wrapper2.instance().handlePagination(identifier);
    expect(wrapper2.instance().props.clearResponseStatus).toMatchSnapshot();
  });
  it('Should call handlePagination else', () => {
    const identifier = 'jh77ugkc01il7er8ul67bc73_2efa7f0';
    wrapper1.instance().handlePagination(identifier);
    expect(wrapper1.instance().props.clearResponseStatus).toMatchSnapshot();
  });
  it('Should render onPreview', () => {
    expect(
      wrapper
        .find('System44StudentGoal')
        .props()
        .onPreview()
    ).toMatchSnapshot();
    expect(wrapper.instance().props.system44StudentGoalRequest).toMatchSnapshot();
  });
  it('Should render closeStudentGoalModal', () => {
    expect(
      wrapper
        .find('System44StudentGoal')
        .props()
        .closeStudentGoalModal()
    ).toMatchSnapshot();
    expect(wrapper.instance().props.handleCancel).toMatchSnapshot();
  });
  it('Should render handlePagination', () => {
    expect(
      wrapper
        .find('System44StudentGoal')
        .props()
        .handlePagination()
    ).toMatchSnapshot();
    expect(wrapper.instance().props.clearResponseStatus).toMatchSnapshot();
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.getCombinedStudentGoalsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleCancel().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleSaveGoals().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleSaveBehaviourGoals().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getAllStudentGoalsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleUpdateStudentBehaviourGoals().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.clearResponseStatus().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentSubmissionsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.clearState().mock.calls.length).toBe(0);
  });
});
