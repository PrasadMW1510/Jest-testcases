import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PortfolioTreeMenu from '../index';

describe('<PortfolioTreeMenu  />', () => {
  let wrapper = null;
  const props = {
    getClassAssignmentRequest: jest.fn(),
    getClassStudentGoalRequest: jest.fn(),
    getGradeDetailsRequest: jest.fn(),
    getTeachersDetailsRequest: jest.fn(),
    getPortfolioClassDetailsRequest: jest.fn(),
    getStudentsSubmissionMetadataSW: jest.fn(),
    getStudentsSubmissionTreeList: jest.fn(),
    getStudentsSubmissionNodeList: jest.fn(),
    userType: '',
    makeSelectLoginUserOrg: '',
    setInboxTreeData: jest.fn(),
    setInboxTreeDataWithTreeList: jest.fn(),
  };

  wrapper = shallow(<PortfolioTreeMenu {...props} />);
  it('Expect to render correctly', () => {
    wrapper.setState({
      data: [
        {
          type: 'PfStudentGoal',
          name: 'A',
        },
        {
          type: 'PfAsignment',
          name: 'QWE',
        },
      ],
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const newProps = {
      schoolData: [
        {
          hasOwnProperty() {
            return false;
          },
          children: 'Here be dragons',
        },
      ],
      classData: [],
    };
    wrapper.instance().componentWillReceiveProps(newProps);
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const newProps = {
      schoolData: [
        {
          hasOwnProperty: 'children1',
        },
      ],
      classData: [],
    };
    wrapper.instance().componentWillReceiveProps(newProps);
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const newProps = {
      classData: [],
    };
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper.state('data')).toEqual([]);
  });
  it('Expect componentWillReceiveProps to render correctly', () => {
    const newProps = {};
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(wrapper.state('data')).toEqual([]);
  });
  it('Expect getSsUnread to render correctly', () => {
    const nodeData = [
      {
        kind: 'selectedKind',
        graded: 'false',
        read: 'false',
      },
    ];
    const kind = 'ClassAssignment';
    wrapper.instance().getSsUnread(nodeData, kind);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect getSsUnread to render correctly', () => {
    const nodeData = [
      {
        kind: 'selectedKind',
        graded: 'false',
        read: 'false',
      },
    ];
    const kind = 'ClassAssignment1';
    wrapper.instance().getSsUnread(nodeData, kind);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect getSSnewThisWeek to render correctly', () => {
    const nodeData = [
      {
        kind: 'selectedKind',
        graded: 'false',
        read: 'false',
      },
    ];
    const kind = 'ClassAssignment';
    wrapper.instance().getSSnewThisWeek(nodeData, kind);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect getSSnewThisWeek to render correctly', () => {
    const nodeData = [
      {
        kind: 'selectedKind',
        graded: 'false',
        read: 'false',
      },
    ];
    const kind = 'ClassAssignment1';
    wrapper.instance().getSSnewThisWeek(nodeData, kind);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect getTeacherData to render correctly', () => {
    const nodeData = [
      {
        kind: 'selectedKind',
        graded: 'false',
        community_id: 1,
      },
    ];
    const kind = 'SoftwareSubmission';
    wrapper.instance().getTeacherData(nodeData, kind);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect getTeacherData to render correctly', () => {
    const nodeData = [
      {
        kind: 'selectedKind',
        graded: 'false',
        community_id: 1,
      },
    ];
    const kind = 'ClassAssignment';
    wrapper.instance().getTeacherData(nodeData, kind);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect getTeacherData to render correctly', () => {
    const nodeData = [
      {
        kind: 'selectedKind',
        graded: 'false',
        community_id: 1,
      },
    ];
    const kind = 'ClassAssignment1';
    wrapper.instance().getTeacherData(nodeData, kind);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      type: 'ssUnread',
      data: [],
      kind: 'ClassAssignment',
    };
    const toggled = '';
    wrapper.instance().onToggle(node, toggled);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      type: 'ssnewThisWeek',
      data: [],
      kind: 'ClassAssignment',
    };
    const toggled = '';
    wrapper.instance().onToggle(node, toggled);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      type: 'teacher-inbox-sf',
      data: [],
      kind: 'SoftwareSubmission',
    };
    const toggled = '';
    wrapper.instance().onToggle(node, toggled);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(0);
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      type: 'PfAsignment',
      data: [],
      kind: 'SoftwareSubmission',
    };
    const toggled = '';
    wrapper.instance().onToggle(node, toggled);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(1);
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      type: 'PfStudentGoal',
      data: [],
      kind: 'SoftwareSubmission',
    };
    const toggled = '';
    wrapper.instance().onToggle(node, toggled);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(1);
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      type: 'default',
      data: [],
      kind: 'SoftwareSubmission',
    };
    const toggled = '';
    wrapper.instance().onToggle(node, toggled);
    expect(props.getClassAssignmentRequest.mock.calls.length).toBe(1);
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      hasOwnProperty() {
        return false;
      },
      org_id: 'vyp',
      children: '',
    };
    const toggled = {};
    wrapper.setState({
      cursor: {
        active: false,
      },
    });
    wrapper.instance().onToggle(node, toggled);
    expect(wrapper.instance().props.getGradeDetailsRequest).toBeCalled();
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      hasOwnProperty() {
        return false;
      },
      full_name: 'vyp',
      children: '',
    };
    const toggled = {};
    wrapper.instance().onToggle(node, toggled);
    expect(wrapper.instance().props.getGradeDetailsRequest).toBeCalled();
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      hasOwnProperty() {
        return false;
      },
      user_id: 'vyp',
      children: '',
    };
    const toggled = {};
    wrapper.instance().onToggle(node, toggled);
    expect(wrapper.instance().props.getTeachersDetailsRequest).toBeCalled();
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      hasOwnProperty() {
        return false;
      },
      class_id: 'vyp',
      children: true,
      page: 'student_work',
    };
    const toggled = {};
    wrapper.instance().onToggle(node, toggled);
    expect(wrapper.instance().props.getTeachersDetailsRequest).toBeCalled();
  });
  it('Expect onToggle to render correctly', () => {
    const node = {
      hasOwnProperty() {
        return false;
      },
      student_id: 'vyp',
    };
    const toggled = {};
    wrapper.instance().onToggle(node, toggled);
    expect(wrapper.instance().props.getPortfolioClassDetailsRequest).toBeCalled();
  });
});

describe('<PortfolioTreeMenu  />', () => {
  let wrapper = null;
  const props = {
    setUnreadData: jest.fn(),
    setNewData: jest.fn(),
    setInboxDataByCommunityId: jest.fn(),
    getClassAssignmentRequest: jest.fn(),
    getClassStudentGoalRequest: jest.fn(),
    getGradeDetailsRequest: jest.fn(),
    getTeachersDetailsRequest: jest.fn(),
    getPortfolioClassDetailsRequest: jest.fn(),
    getStudentsSubmissionMetadataSW: jest.fn(),
    getStudentsSubmissionTreeList: jest.fn(),
    getStudentsSubmissionNodeList: jest.fn(),
    userType: 'text',
    makeSelectLoginUserOrg: 'text1',
  };
  wrapper = shallow(<PortfolioTreeMenu {...props} />);
  it('Expect to render correctly', () => {
    wrapper.setState({
      data: [
        {
          type: 'student_work',
          name: 'QWERTYUIOP',
        },
        {
          type: 'PfAsignment',
          name: 'QWER',
        },
      ],
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
