import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { CatchAllClassContainer, mapDispatchToProps } from '../CatchAllClassContainer';

describe('CatchAllClassContainer', () => {
  let wrapper = null;
  const mockpostSaveNewAssignment = jest.fn();
  const mockdata = {};
  beforeEach(() => {
    wrapper = shallow(
      <CatchAllClassContainer
        postSaveNewAssignment={mockpostSaveNewAssignment}
        getStudentsSubmissionMetadata={jest.fn()}
        getStudentDetails={jest.fn()}
        hideModal={jest.fn()}
        data={mockdata}
        setRead180ngAssignmentRequest={jest.fn()}
      />
    );
  });
  it('Should render CatchAllClassContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should call addNewAssignment', () => {
    const data = {};
    wrapper.instance().addNewAssignment(data);
    expect(wrapper.instance().props.postSaveNewAssignment).toBeCalled();
  });
  it('Should call savePostData', () => {
    const assignmentData = {};
    wrapper.instance().savePostData(assignmentData);
    expect(wrapper.instance().props.setRead180ngAssignmentRequest).toBeCalled();
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const data = 'hi';
    const node = [
      [
        {
          classId: 'jjj_ii',
          createdForClass: 'jjj_ii',
        },
      ],
    ];
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.hideModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentDetails(data, node).mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.postSaveNewAssignment().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentsSubmissionMetadata().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setRead180ngAssignmentRequest().mock.calls.length).toBe(0);
  });
});
