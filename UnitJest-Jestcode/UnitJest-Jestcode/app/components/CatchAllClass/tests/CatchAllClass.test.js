import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CatchAllClass from '../index';

describe('<CatchAllClass  />', () => {
  let wrapper = null;
  let wrapper1 = null;
  let props = null;
  let props1 = null;
  props = {
    handleCancel: jest.fn(),
    isOpen: true,
    catchallclasscontainer: {
      studentDetails: {
        students: [
          {
            student: [
              {
                student_id: 'Bl121155',
                student_first_name: ['vangaveeti'],
                student_last_name: ['priyanka'],
              },
            ],
            score: ['100'],
          },
        ],
      },
    },
    addNewAssignment: jest.fn(),
    postSavedData: jest.fn(),
    getStudentDetails: jest.fn(),
    data: {
      newassignment: {
        className: 'hhh',
      },
    },
  };
  props1 = {
    handleCancel: jest.fn(),
    isOpen: true,
    catchallclasscontainer: {
      studentDetails: undefined,
    },
    addNewAssignment: jest.fn(),
    postSavedData: jest.fn(),
    getStudentDetails: jest.fn(),
    data: {
      newassignment: {
        className: 'hhh',
      },
    },
  };
  wrapper = shallow(<CatchAllClass {...props} />);
  wrapper1 = shallow(<CatchAllClass {...props1} />);

  it('should render ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'description',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'assignmentType',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'comment0',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'average0',
        value: '',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'average0',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'score0',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'score0',
        value: '',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'total0',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'total0',
        value: '',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'assName',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleInputChange', () => {
    const event = {
      target: {
        name: 'dateValue',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });

    wrapper.instance().handleInputChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleSelectChange', () => {
    const event = {
      target: {
        name: 'checkbox_0',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: false,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });
    wrapper.instance().handleSelectChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleSelectChange', () => {
    const event = {
      target: {
        name: 'checkbox0',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: true,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });
    wrapper.instance().handleSelectChange(event, index);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call gradePercent', () => {
    const event = {
      target: {
        name: 'checkbox0',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: true,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });
    wrapper.instance().gradePercent(event, index);
    expect(wrapper.state('percentageAverageLimit')).toBeFalsy();
  });
  it('should call gradePercent', () => {
    const event = {
      target: {
        name: 'checkbox0',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: true,
          score: ['100000000000000'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });
    wrapper.instance().gradePercent(event, index);
    expect(wrapper.state('percentageAverageLimit')).toBeTruthy();
  });
  it('should call gradePercent else', () => {
    const event = {
      target: {
        name: 'checkbox0',
        value: 'uuu',
      },
    };
    const index = 0;
    wrapper.instance().setState({
      students: [
        {
          checked: true,
          score: '',
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });
    wrapper.instance().gradePercent(event, index);
    expect(wrapper.state('percentageAverageLimit')).toBeTruthy();
  });
  it('should call closeAssignmentUpdate', () => {
    wrapper.instance().closeAssignmentUpdate();
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call handleChange', () => {
    const event = {
      target: {
        checked: true,
      },
    };
    const index = 0;
    wrapper.instance().handleChange(index, event);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call handleChangeAll', () => {
    const event = {
      target: {
        checked: true,
      },
    };
    const index = 1;
    wrapper.instance().handleChangeAll(index, event);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call handleChangeAll', () => {
    const event = {
      target: {
        checked: true,
      },
    };
    const index = 0;
    wrapper.instance().handleChangeAll(index, event);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call handleDatachange', () => {
    const e = {
      target: {
        name: 'score',
        value: '',
      },
    };
    wrapper.instance().handleDatachange(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call handleDatachange', () => {
    const e = {
      target: {
        name: 'score',
        value: 'kjakjdhhk',
      },
    };
    wrapper.instance().handleDatachange(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call handleDatachange', () => {
    const e = {
      target: {
        name: 'communityId',
        value: 'S44JR',
      },
    };
    wrapper.instance().handleDatachange(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call handleDatachange', () => {
    const e = {
      target: {
        name: 'communityId',
        value: 'S44NG,R180NG',
      },
    };
    wrapper.instance().handleDatachange(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'score',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'score',
        value: 'ttt',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'average',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'average',
        value: 'ttt',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'scor',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'total',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'assName',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'comment',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'assignmentType',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'desc',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'date',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'dateValue',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('showAssignmentUpdate')).toBeFalsy();
  });
  it('should call gradeChanges', () => {
    const e = {
      target: {
        name: 'dateValue',
        value: '',
      },
    };
    wrapper.instance().setState({
      score: 100,
      total: 100,
    });
    wrapper.instance().gradeChanges(e);
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call gradeValue', () => {
    wrapper.instance().setState({
      score: 100,
      total: 100,
    });
    wrapper.instance().gradeValue();
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call gradeValue', () => {
    wrapper.instance().setState({
      score: '',
      total: '',
    });
    wrapper.instance().gradeValue();
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call handleSubmit', () => {
    wrapper.instance().setState({
      communityId: 'S44JR',
      assignmentName: '',
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call handleSubmit', () => {
    wrapper.instance().setState({
      communityId: 'S44JR',
      assignmentName: 'assign',
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call handleSubmit', () => {
    wrapper.instance().setState({
      communityId: 'S44NG,R180NG',
      selected: '',
      name: '',
      dateValue: '',
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call handleSubmit', () => {
    wrapper.instance().setState({
      communityId: 'S44NG,R180NG',
      selected: 'select',
      name: 'name',
      dateValue: 'date',
      students: [
        {
          checked: false,
        },
      ],
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call handleSubmit', () => {
    wrapper.instance().setState({
      communityId: 'S44NG,R180NG',
      selected: 'select',
      name: 'name',
      dateValue: 'date',
      students: [
        {
          checked: true,
        },
      ],
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call handleSubmit', () => {
    wrapper.instance().setState({
      communityId: 'S44NG',
      selected: 'select',
      name: 'name',
      dateValue: 'date',
      students: [
        {
          checked: false,
        },
      ],
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state('gradeClass')).toBeTruthy();
  });
  it('should call handleAllSelectChange', () => {
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().setState({
      students: [
        {
          checked: true,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });
    wrapper.instance().handleAllSelectChange(event);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleAllSelectChange else', () => {
    const event = {
      target: {
        checked: false,
      },
    };
    wrapper.instance().setState({
      students: [
        {
          checked: true,
          score: ['100'],
          total: ['100'],
          average: ['100'],
          textdisable: 'yes',
          comment: ['comment'],
          student: [
            {
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
            },
          ],
        },
      ],
    });
    wrapper.instance().handleAllSelectChange(event);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleReadChange else', () => {
    const index = 1;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleReadChange(index, event);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleReadChange else', () => {
    const index = 2;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleReadChange(index, event);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleReadChange else', () => {
    const index = 0;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleReadChange(index, event);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleCancel  else', () => {
    wrapper.instance().setState({
      disableSave: false,
    });
    wrapper.instance().handleCancel();
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('should call handleCancel  else', () => {
    wrapper.instance().setState({
      disableSave: true,
    });
    wrapper.instance().handleCancel();
    expect(wrapper.state('disableSave')).toBeTruthy();
  });
  it('should call yesWarningModalclose', () => {
    wrapper.instance().yesWarningModalclose();
    expect(wrapper.state('disableSave')).toBeTruthy();
  });
  it('should call cancelWarningModalconClose', () => {
    wrapper.instance().cancelWarningModalconClose();
    expect(wrapper.state('cancelwarningModal')).toBeFalsy();
  });
});
