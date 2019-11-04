import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { AssignmentContainer, mapDispatchToProps } from '../AssignmentContainer';

describe('AssignmentContainer', () => {
  let wrapper = null;
  const mockgetClassesDataRequest = jest.fn();
  const mockassignmentcontainer = {
    selectedClass: jest.fn(),
  };
  const mockdata = [];
  const mocktreeList = [
    {
      children: [],
    },
  ];
  beforeEach(() => {
    wrapper = shallow(
      <AssignmentContainer
        getClassesDataRequest={mockgetClassesDataRequest}
        assignmentcontainer={mockassignmentcontainer}
        setClassGridRequestSuccess={jest.fn()}
        treeList={mocktreeList}
        setClassRequestSuccess={jest.fn()}
        data={mockdata}
      />
    );
  });
  it('Should render TeacherMadeQuizContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
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
    expect(mapDispatchToPropscomp.getClassesDataRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getClassAssignmentRequest(data, node).mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showIreadModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setClassGridRequestSuccess().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setClassRequestSuccess().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showIreadAddModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showRead180NgAssaignmentModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showCatchAllClassModal().mock.calls.length).toBe(0);
  });
  it('map', () => {
    const data = [
      {
        graded: 'false',
        community_id: 'iii_uuu',
      },
    ];
    const kind = '';
    const id = [
      {
        community_id: 'iii_uuu',
      },
    ];
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.setInboxDataByCommunityId(data, id, kind).mock.calls.length).toBe(
      0
    );
  });
});
