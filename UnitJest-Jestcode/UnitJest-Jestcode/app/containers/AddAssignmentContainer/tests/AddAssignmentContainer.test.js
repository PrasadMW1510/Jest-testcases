import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { AddAssignmentContainer, mapDispatchToProps } from '../AddAssignmentContainer';

describe('AddAssignmentContainer', () => {
  let wrapper = null;
  const mockdata = {};

  beforeEach(() => {
    wrapper = shallow(
      <AddAssignmentContainer
        hideModal={jest.fn()}
        getStudentDetails={jest.fn()}
        postSaveNewAssignment={jest.fn()}
        getStudentsSubmissionMetadata={jest.fn()}
        data={mockdata}
      />
    );
  });
  it('Should render TeacherMadeQuizContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should call addNewAssignment', () => {
    const assignmentData = {};
    wrapper.instance().addNewAssignment(assignmentData);
    expect(wrapper.instance().props.getStudentDetails).toBeCalled();
  });
  it('map Dispatch To Props', () => {
    const data = {};
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp).toMatchSnapshot();
    expect(mapDispatchToPropscomp.hideModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentDetails(data).mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.postSaveNewAssignment(data).mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentsSubmissionMetadata().mock.calls.length).toBe(0);
  });
});
