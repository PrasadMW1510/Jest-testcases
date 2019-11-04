import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { PortfolioPageContainer, mapDispatchToProps } from '../PortfolioPageContainer';
describe('PortfolioPageContainer   ', () => {
  let wrapper = null;
  let wrapper1 = null;

  const mockprofileUserType = 'Teacher';
  const mockprofileUserType1 = 'Teache';
  const mockmatch = {
    path: '',
  };
  const mockgetClassDetailsRequest = jest.fn();
  const mockportfoliopagecontainer = {
    programListforTabs: [],
    classData: [],
    selectedClassAssignments: [],
  };
  const mockgetStudentSubmissions = jest.fn();
  const mockgetRubricDefenitions = jest.fn();
  const mockportfoliopagecontainer1 = {
    programListforTabs: ['S44NG'],
    classData: [],
    selectedClassAssignments: [],
  };
  beforeEach(() => {
    wrapper = shallow(
      <PortfolioPageContainer
        profileUserType={mockprofileUserType}
        match={mockmatch}
        getClassDetailsRequest={mockgetClassDetailsRequest}
        showInboxProgram={jest.fn()}
        getInboxClassByCommunityId={jest.fn()}
        getStudentsSubmissionMetadata={jest.fn()}
        getAssignmentMetaData={jest.fn()}
        portfoliopagecontainer={mockportfoliopagecontainer}
        getGradeDetailsRequest={jest.fn()}
        getStudentSubmissions={mockgetStudentSubmissions}
        getRubricDefenitions={mockgetRubricDefenitions}
      />
    );
    wrapper1 = shallow(
      <PortfolioPageContainer
        profileUserType={mockprofileUserType1}
        match={mockmatch}
        getClassDetailsRequest={mockgetClassDetailsRequest}
        showInboxProgram={jest.fn()}
        getInboxClassByCommunityId={jest.fn()}
        getStudentsSubmissionMetadata={jest.fn()}
        getAssignmentMetaData={jest.fn()}
        portfoliopagecontainer={mockportfoliopagecontainer1}
        getStudentSubmissions={mockgetStudentSubmissions}
        getRubricDefenitions={mockgetRubricDefenitions}
      />
    );
  });
  it('Should render Read180NgContainer when data is present ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('should render StudentsWorkContainer on ', () => {
    const studentWorkRoute = wrapper.find({ path: '/studentWorks' });
    expect(studentWorkRoute.props().render()).toMatchSnapshot();
  });
  it('should render StudentsWorkContainer on ', () => {
    const studentWorkRoute = wrapper.find({ path: '/assignments' });
    expect(studentWorkRoute.props().render()).toMatchSnapshot();
  });
  it('should render StudentsWorkContainer on ', () => {
    const studentWorkRoute = wrapper.find({ path: '/studentGoals' });
    expect(studentWorkRoute.props().render()).toMatchSnapshot();
  });
  it('should render StudentsWorkContainer on ', () => {
    const studentWorkRoute = wrapper.find({ path: '/inbox' });
    expect(studentWorkRoute.props().render()).toMatchSnapshot();
  });
  it('Should call showAssignment ', () => {
    wrapper.instance().showAssignment();
    wrapper1.instance().showAssignment();
    expect(wrapper.instance().showAssignment()).toEqual(false);
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.getClassDetailsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getPortfolioClassDetailsRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentsSubmissionMetadata().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getInboxClassByCommunityId().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getAssignmentMetaData().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentSubmissions().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getRubricDefenitions().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showInboxProgram().mock.calls.length).toBe(0);
  });
});
