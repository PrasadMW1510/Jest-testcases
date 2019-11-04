import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { InboxContainer, mapDispatchToProps } from '../InboxContainer';

describe('InboxContainer', () => {
  let wrapper = null;
  const mockgridData = ['hi'];
  const mockinBoxcount = {};
  const mockassignmentCount = {};
  const mockinboxContainer = {};
  const mockshowAssignment = true;
  beforeEach(() => {
    wrapper = shallow(
      <InboxContainer
        showInboxProgram={jest.fn()}
        showSystem44Modal={jest.fn()}
        showRead180NgModal={jest.fn()}
        showIreadModal={jest.fn()}
        showRead180StudentWorkModal={jest.fn()}
        setGridData={jest.fn()}
        setTempGridData={jest.fn()}
        setInBoxGridRequestSuccess={jest.fn()}
        gridData={mockgridData}
        inBoxcount={mockinBoxcount}
        assignmentCount={mockassignmentCount}
        inboxContainer={mockinboxContainer}
        showAssignment={mockshowAssignment}
      />
    );
  });
  it('Should render InboxContainer', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('setDefaultGridData  ', () => {
    const newProps = {
      gridData: [
        {
          graded: 'false',
          kind: 'SoftwareSubmission',
        },
      ],
      inBoxcount: {
        submissionCount: 5,
      },
      assignmentCount: {
        submissionCount: 5,
      },
      showAssignment: ['hi'],
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().setDefaultGridData(newProps));
    expect(wrapper.instance().setDefaultGridData(newProps)).toEqual([
      { graded: 'false', kind: 'SoftwareSubmission' },
    ]);
  });
  it('setDefaultGridData  ', () => {
    const newProps = {
      gridData: [
        {
          graded: 'false',
          kind: 'SoftwareSubmion',
        },
      ],
      inBoxcount: {
        submissionCount: 5,
      },
      assignmentCount: {
        submissionCount: 5,
      },
      showAssignment: ['hi'],
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().setDefaultGridData(newProps));
    expect(wrapper.instance().setDefaultGridData(newProps)).toEqual([]);
  });
  it('setDefaultGridData if length is 0 ', () => {
    const newProps = {
      gridData: [],
      inBoxcount: {
        submissionCount: 5,
      },
      assignmentCount: {
        submissionCount: 5,
      },
      showAssignment: ['hi'],
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().setDefaultGridData(newProps));
    expect(wrapper.instance().setDefaultGridData(newProps)).toEqual([]);
  });
  it('setTreeStructure ', () => {
    const newProps = {
      inBoxcount: {
        submissionCount: 5,
        newCount: 2,
        unReadCount: 6,
      },
      assignmentCount: {
        submissionCount: 5,
      },
      showAssignment: true,
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
      gridData: [
        {
          graded: 'false',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().setTreeStructure(newProps));
  });
  it('setTreeStructure ', () => {
    const response = [
      {
        children: [
          {
            data: undefined,
            kind: 'SoftwareSubmission',
            name: 'Unread (6)',
            type: 'ssUnread',
          },
          {
            data: undefined,
            kind: 'SoftwareSubmission',
            name: 'New This Week (2)',
            type: 'ssnewThisWeek',
          },
        ],
        name: 'Software Submissions (5)',
        toggled: true,
      },
    ];
    const newProps = {
      inBoxcount: {
        submissionCount: 5,
        newCount: 2,
        unReadCount: 6,
      },
      assignmentCount: {
        submissionCount: 5,
      },
    };
    expect(wrapper.instance().setTreeStructure(newProps)).toEqual(response);
  });
  it('setTreeStructure ', () => {
    const response = [
      {
        children: [
          {
            data: undefined,
            kind: 'SoftwareSubmission',
            name: 'Unread (6)',
            type: 'ssUnread',
          },
          {
            data: undefined,
            kind: 'SoftwareSubmission',
            name: 'New This Week (2)',
            type: 'ssnewThisWeek',
          },
          {
            data: undefined,
            kind: 'SoftwareSubmission',
            type: 'teacher-inbox-sf',
          },
        ],
        name: 'Software Submissions (5)',
        toggled: true,
      },
    ];
    const newProps = {
      inBoxcount: {
        submissionCount: 5,
        newCount: 2,
        unReadCount: 6,
      },
      assignmentCount: {
        submissionCount: 5,
      },
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().setTreeStructure(newProps));
    expect(wrapper.instance().setTreeStructure(newProps)).toEqual(response);
  });
  it('componentWillReceiveProps grid data length is 0', () => {
    const nextProps = {
      gridData: [],
      inBoxcount: {
        submissionCount: 5,
      },
      assignmentCount: {
        submissionCount: 5,
      },
      showAssignment: true,
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().componentWillReceiveProps(nextProps));
    expect(wrapper.instance().props.setInBoxGridRequestSuccess).toBeCalled();
  });
  it('componentWillReceiveProps when grid data is having length', () => {
    const nextProps = {
      gridData: [
        {
          graded: 'false',
          kind: 'SoftwareSubmission',
        },
      ],
      inBoxcount: {
        submissionCount: 5,
        newCount: 2,
        unReadCount: 6,
      },
      assignmentCount: {
        submissionCount: 5,
      },
      showAssignment: 'hhh',
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().componentWillReceiveProps(nextProps));
    expect(wrapper.instance().props.setInBoxGridRequestSuccess).toBeCalled();
  });
  it('componentWillReceiveProps when grid data is having length', () => {
    const nextProps = {
      gridData: [],
      inBoxcount: {
        submissionCount: 5,
        newCount: 2,
        unReadCount: 6,
      },
      assignmentCount: {
        submissionCount: 5,
      },
      showAssignment: 'hhh',
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().componentWillReceiveProps(nextProps));
    expect(wrapper.instance().props.setInBoxGridRequestSuccess).toBeCalled();
  });
  it('componentWillReceiveProps when grid data is having no length', () => {
    const nextProps = {
      gridData: [],
      inBoxcount: 0,
      assignmentCount: 0,
      showAssignment: 'hhh',
      treeList: [
        {
          type: 'teacher-inbox-sf',
          kind: 'SoftwareSubmission',
        },
      ],
    };
    expect(wrapper.instance().componentWillReceiveProps(nextProps));
    expect(wrapper.instance().props.setInBoxGridRequestSuccess).toMatchSnapshot();
  });

  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.getInboxClassesDataRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getClassStudentList().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.getStudentsSubmissionMetadata().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setGridData().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setInboxTreeData().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setInboxTreeDataWithTreeList().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setInBoxGridRequestSuccess().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.setTempGridData().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showInboxProgram().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.showIreadModal().mock.calls.length).toBe(0);
  });
});
