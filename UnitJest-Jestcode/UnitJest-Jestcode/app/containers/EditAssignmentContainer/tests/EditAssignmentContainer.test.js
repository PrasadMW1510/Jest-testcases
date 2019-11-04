import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { EditAssignmentContainer, mapDispatchToProps } from '../EditAssignmentContainer';

describe('EditAssignmentContainer ', () => {
  let wrapper = null;
  const mockdata = {
    classId: {
      classId: 'fff',
    },
  };
  const mockeditassignmentcontainer = {};
  const mockgetStudentDetails = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <EditAssignmentContainer
        saveAssignmentRequest={jest.fn()}
        deleteAssignmentRequest={jest.fn()}
        clearResponseStatus={jest.fn()}
        getAssignmentData={jest.fn()}
        hideModal={jest.fn()}
        data={mockdata}
        editassignmentcontainer={mockeditassignmentcontainer}
        getStudentDetails={mockgetStudentDetails}
        clearState={jest.fn()}
        handleCancel={jest.fn()}
      />
    );
  });
  it('Should render TeacherMadeQuizContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call handleCloseModal', () => {
    wrapper.instance().handleCloseModal();
    expect(wrapper.instance().props.handleCancel).toBeCalled();
  });

  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.getAssignmentData().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.hideModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentDetails().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.saveAssignmentRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.clearResponseStatus().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.clearState().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.deleteAssignmentRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.handleCancel().mock.calls.length).toBe(0);
  });
});
