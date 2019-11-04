import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import {
  Read180NgAssaignmentContainer,
  mapDispatchToProps,
} from '../Read180NgAssaignmentContainer';

describe('Read180NgAssaignmentContainer ', () => {
  let wrapper = null;
  let wrapper1 = null;
  const mockassignmentContainerData = {
    classAssignmentForClass: ['class'],
  };
  const mockdata = {
    classId: 'classid',
    newclassId: 'nc',
  };
  beforeEach(() => {
    wrapper = shallow(
      <Read180NgAssaignmentContainer
        postSaveNewAssignment={jest.fn()}
        hideModal={jest.fn()}
        getClassAssignmentRequest={jest.fn()}
        data={mockdata}
        getStudentsSubmissionMetadata={jest.fn()}
        getStudentDetails={jest.fn()}
        read180ngAssaignmentRequest={jest.fn()}
        setRead180ngAssignmentRequest={jest.fn()}
        getRead180ngAssignmentRequest={jest.fn()}
        assignmentContainerData={mockassignmentContainerData}
      />
    );
    wrapper1 = shallow(
      <Read180NgAssaignmentContainer
        postSaveNewAssignment={jest.fn()}
        hideModal={jest.fn()}
        getClassAssignmentRequest={jest.fn()}
        data={mockdata}
        getStudentsSubmissionMetadata={jest.fn()}
        getStudentDetails={jest.fn()}
        read180ngAssaignmentRequest={jest.fn()}
        setRead180ngAssignmentRequest={jest.fn()}
        getRead180ngAssignmentRequest={jest.fn()}
        assignmentContainerData={mockassignmentContainerData}
      />
    );
  });
  it('Should render Read180NgAssaignmentContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
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
  });
});
