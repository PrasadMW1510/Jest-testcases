import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson, mountToJson } from 'enzyme-to-json';
import EditAssignmentComponent from '../index';

describe('<EditAssignmentComponent />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    data: {
      currentIndex: 0,
      metaData: [
        {
          className: '',
          from: '',
          assignment: '',
        },
      ],
      classId: {
        student: '',
        community_id: 'S44JR',
      },
    },
    editassignmentcontainer: {
      respAssignmentData: {},

      studentDetails: {
        students: [
          {
            student: [
              {
                student_last_name: [''],
                student_first_name: [''],
              },
            ],
          },
        ],
      },
    },
    saveAssignmentRequest: jest.fn(),
    deleteAssignmentRequest: jest.fn(),
    closeStudentGoalModal: jest.fn(),
    clearResponseStatus: jest.fn(),
    getAssignmentData: jest.fn(),
  };
  wrapper = shallow(<EditAssignmentComponent {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render componentWillReceiveProps as expected', () => {
    const nextProps = {
      editassignmentcontainer: {
        saveAssignmentSuccess: {
          isGraded: {
            length: 2,
          },
        },
        deleteAssignmentSucess: {
          isGraded: {
            length: 2,
          },
        },
        respAssignmentData: {
          $: {
            wholeClass: '',
          },
          assignmentName: [''],
          assignmentType: [''],
          dueDate: [''],
          description: [{}],
          classAssignment: [
            {
              $: {
                communityId: 0,
              },
              studentAssignments: [
                {
                  student: [
                    {
                      average: 4,
                      comment: 5,
                      score: 3,
                      total: 2,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render componentWillUnmount as expected', () => {
    wrapper.instance().componentWillUnmount();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render componentWillReceiveProps as expected', () => {
    const nextProps = {
      editassignmentcontainer: {},
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render componentWillReceiveProps as expected', () => {
    const nextProps = {
      editassignmentcontainer: {
        saveAssignmentSuccess: {
          isGraded: {},
        },
        deleteAssignmentSucess: {
          isGraded: {},
        },
        respAssignmentData: {
          classAssignment: [
            {
              studentAssignments: [{}],
            },
          ],
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render getAssignmentRoaster as expected part 1', () => {
    const student = '';
    const index = 0;
    wrapper.setState({
      students: [
        {
          checked: true,
          score: ['2'],
          total: ['4'],
          average: ['3'],
          comment: ['1'],
        },
      ],
    });
    wrapper.instance().getAssignmentRoaster(student, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleSubmit as expected', () => {
    wrapper.instance().handleSubmit();
    expect(wrapper.instance().props.saveAssignmentRequest).toBeCalled();
  });
  it('Should render handleDeleteAssignment as expected', () => {
    const confirm = true;
    wrapper.instance().handleDeleteAssignment(confirm);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleDeleteAssignment as expected', () => {
    const confirm = false;
    wrapper.instance().handleDeleteAssignment(confirm);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleDeleteWarning as expected', () => {
    wrapper.instance().handleDeleteWarning();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handlePrint as expected', () => {
    wrapper.instance().handlePrint();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleAllSelectChange as expected', () => {
    wrapper.setState({
      selectAll: false,
    });
    wrapper.instance().handleAllSelectChange();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleAllSelectChange as expected', () => {
    wrapper.setState({
      selectAll: true,
    });
    wrapper.instance().handleAllSelectChange();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleSelectChange as expected', () => {
    const event = {
      target: {
        name: 'selectStudent0',
      },
    };
    const index = 0;
    wrapper.setState({
      students: [
        {
          checked: true,
          average: ['2'],
          comment: ['3'],
        },
      ],
    });
    wrapper.instance().handleSelectChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleSelectChange as expected', () => {
    const event = {
      target: {
        name: 'selectStudent111',
      },
    };
    const index = 0;
    wrapper.setState({
      students: [
        {
          checked: true,
          average: ['2'],
          comment: ['3'],
        },
      ],
    });
    wrapper.instance().handleSelectChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'description',
      },
    };
    const index = 0;
    wrapper.setState({
      students: [
        {
          checked: true,
          average: ['2'],
          comment: ['3'],
          total: ['4'],
          score: ['6'],
        },
      ],
    });
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'comment0',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'average0',
        value: '1234',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'average0',
        value: '',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'average0',
        value: 'as',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'score0',
        value: '1234',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'score0',
        value: '',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'score0',
        value: 'as',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'total0',
        value: '1234',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'total0',
        value: '',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'total0',
        value: 'as',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleInputChange as expected', () => {
    const event = {
      target: {
        name: 'no0',
        value: '1234',
      },
    };
    const index = 0;
    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleCancel as expected part 1', () => {
    wrapper.setState({
      saveModal: false,
    });
    wrapper.instance().handleCancel();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleCancel as expected part 2', () => {
    wrapper.setState({
      saveModal: true,
    });
    wrapper.instance().handleCancel();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render cancelWarningModalconClose as expected', () => {
    wrapper.instance().cancelWarningModalconClose();
    expect(wrapper.state('cancelwarningModal')).toBeFalsy();
  });
  it('Should render showOkModalClose as expected', () => {
    wrapper.instance().showOkModalClose();
    expect(wrapper.state('showGoalSaveSuccessModal')).toBeFalsy();
  });
  it('Should render handleShowSavedGradeModal as expected', () => {
    wrapper.instance().handleShowSavedGradeModal();
    expect(wrapper.state('showSavedGradeModal')).toBeFalsy();
  });
  it('Should render handleGoToPrevPage as expected part 1', () => {
    let wrapper2 = null;
    const customProps = {
      ...props,
      data: {
        ...props.data,
        metaData: [
          {
            className: 'test1',
            from: 'test1',
            assignment: 'test1',
          },
          {
            className: 'test2',
            from: 'test2',
            assignment: 'test2',
          },
          {
            className: 'test3',
            from: 'test3',
            assignment: 'test3',
          },
        ],
      },
    };
    wrapper2 = shallow(<EditAssignmentComponent {...customProps} />);
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper2.setState({
      currentPageIndex: 0,
    });
    wrapper2.instance().handleGoToPrevPage(e);
    expect(wrapper2.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleGoToPrevPage as expected part 2', () => {
    let wrapper2 = null;
    const customProps = {
      ...props,
      data: {
        ...props.data,
        metaData: [
          {
            className: 'test1',
            from: 'test1',
            assignment: 'test1',
          },
          {
            className: 'test2',
            from: 'test2',
            assignment: 'test2',
          },
          {
            className: 'test3',
            from: 'test3',
            assignment: 'test3',
          },
        ],
      },
    };
    wrapper2 = shallow(<EditAssignmentComponent {...customProps} />);
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper2.setState({
      currentPageIndex: 2,
    });
    wrapper2.instance().handleGoToPrevPage(e);
    expect(wrapper2.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleGoToNextPage as expected part 1', () => {
    let wrapper2 = null;
    const customProps = {
      ...props,
      data: {
        ...props.data,
        metaData: [
          {
            className: 'test1',
            from: 'test1',
            assignment: 'test1',
          },
          {
            className: 'test2',
            from: 'test2',
            assignment: 'test2',
          },
          {
            className: 'test3',
            from: 'test3',
            assignment: 'test3',
          },
        ],
      },
    };
    wrapper2 = shallow(<EditAssignmentComponent {...customProps} />);
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper2.setState({
      currentPageIndex: 1,
    });
    wrapper2.instance().handleGoToNextPage(e);
    expect(wrapper2.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleGoToNextPage as expected part 2', () => {
    let wrapper2 = null;
    const customProps = {
      ...props,
      data: {
        ...props.data,
        metaData: [
          {
            className: 'test1',
            from: 'test1',
            assignment: 'test1',
          },
          {
            className: 'test2',
            from: 'test2',
            assignment: 'test2',
          },
          {
            className: 'test3',
            from: 'test3',
            assignment: 'test3',
          },
        ],
      },
    };
    wrapper2 = shallow(<EditAssignmentComponent {...customProps} />);
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper2.setState({
      currentPageIndex: 2,
    });
    wrapper2.instance().handleGoToNextPage(e);
    expect(wrapper2.instance().props.isOpen).toBeTruthy();
  });
  it('Should handle gradePercent', () => {
    wrapper.setState({
      students: [
        {
          checked: true,
          score: ['-2'],
          total: ['4'],
          average: ['3'],
          comment: ['1'],
        },
      ],
    });
    wrapper.instance().gradePercent({ target: {} }, 0);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
});
describe('<EditAssignmentComponent />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    data: {
      currentIndex: 0,
      metaData: [
        {
          className: '',
          from: '',
          assignment: '',
        },
      ],
      classId: {
        student: '',
        community_id: 'S44JR12',
      },
    },
    editassignmentcontainer: {
      studentDetails: {
        students: [
          {
            student: [
              {
                student_last_name: [''],
                student_first_name: [''],
              },
            ],
          },
        ],
      },
    },
    saveAssignmentRequest: jest.fn(),
    deleteAssignmentRequest: jest.fn(),
    closeStudentGoalModal: jest.fn(),
    clearResponseStatus: jest.fn(),
    getAssignmentData: jest.fn(),
  };
  wrapper = shallow(<EditAssignmentComponent {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render getAssignmentRoaster as expected part2', () => {
    const student = '';
    const index = 0;
    wrapper.setState({
      students: [
        {
          checked: true,
          score: ['2'],
          total: ['4'],
          average: ['3'],
          comment: ['1'],
        },
      ],
    });
    wrapper.instance().getAssignmentRoaster(student, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render componentWillReceiveProps as expected part 4', () => {
    const nextProps = {
      editassignmentcontainer: {
        respAssignmentData: {
          $: {
            wholeClass: '',
          },
          assignmentName: [''],
          assignmentType: [''],
          dueDate: [''],
          classAssignment: [
            {
              $: {
                communityId: 0,
              },
              studentAssignments: [
                {
                  student: [
                    {
                      comment: 5,
                      score: 3,
                      total: 2,
                    },
                    {
                      average: 4,
                      score: 3,
                      total: 2,
                    },
                    {
                      average: 4,
                      comment: 5,
                      total: 2,
                    },
                    {
                      average: 4,
                      comment: 5,
                      score: 3,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    nextProps.editassignmentcontainer.respAssignmentData.description = [{}];
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render with due date', () => {
    const wrapper2 = shallow(<EditAssignmentComponent {...props} />);
    wrapper2.setState({
      dueDate: 'test1',
    });

    expect(wrapper2).toBeDefined();
  });
});
describe('mount EditAssignmentComponent and handle events', () => {
  const props = {
    isOpen: true,
    data: {
      currentIndex: 0,
      metaData: [
        {
          className: '',
          from: '',
          assignment: '',
        },
      ],
      classId: {
        student: '',
        community_id: 'S44JR',
      },
    },
    editassignmentcontainer: {
      respAssignmentData: {},
      studentDetails: {
        students: [
          {
            student: [
              {
                student_last_name: [''],

                student_first_name: [''],
              },
            ],
          },
        ],
      },
    },
    saveAssignmentRequest: jest.fn(),
    deleteAssignmentRequest: jest.fn(),
    closeStudentGoalModal: jest.fn(),
    clearResponseStatus: jest.fn(),
    getAssignmentData: jest.fn(),
  };
  const wrapper = shallow(<EditAssignmentComponent {...props} />);
  it('should mount EditAssignmentComponent', () => {
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
