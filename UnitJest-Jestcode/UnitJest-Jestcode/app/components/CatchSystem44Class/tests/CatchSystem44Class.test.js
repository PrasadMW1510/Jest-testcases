import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CatchSystem44Class from '../index';

describe('<CatchSystem44Class  />', () => {
  let wrapper = null;
  let props = null;
  let wrapper1 = null;
  let props1 = null;
  props = {
    handleDatachange: jest.fn(),
    communityId: '',
    assignmentTypeError: '',
    name: '',
    gradeChanges: jest.fn(),
    assignmentNameError: '',
    desc: '',
    dateValue: '',
    dueDateError: '',
    studentError: '',
    checked: true,
    handleSelectChange: jest.fn(),
    handleInputChange: jest.fn(),
    handleAllSelectChange: jest.fn(),
    gradePercent: jest.fn(),
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
        total: ['100'],
        textdisable: true,
        average: ['100'],
        comment: ['100'],
        checked: true,
      },
    ],
    studentDetails: {
      students: [
        {
          student: [
            {
              student_id: 'Bl121155',
              student_first_name: ['vangaveeti'],
              student_last_name: ['priyanka'],
              applications: [
                {
                  application: [
                    {
                      app_id: ['S44NG'],
                    },
                  ],
                },
              ],
            },
          ],
          score: ['100'],
        },
      ],
    },
    handleCancel: jest.fn(),
    isOpen: true,
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
    ...props,
    students: null,
  };
  wrapper = shallow(<CatchSystem44Class {...props} />);
  wrapper1 = shallow(<CatchSystem44Class {...props1} />);

  it('should render ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(shallowToJson(wrapper1)).toMatchSnapshot();
  });
  it('should call getAssignmentRoaster ', () => {
    const index = 0;
    const student = [];
    wrapper.instance().getAssignmentRoaster(student, index);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('on change', () => {
    wrapper.instance().handleSelectChange = jest.fn();
    wrapper
      .find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig input')
    ).toHaveLength(4);
  });
  it('on change', () => {
    wrapper.instance().handleInputChange = jest.fn();
    wrapper
      .find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig input')
      .at(1)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig input')
    ).toHaveLength(4);
  });
  it('on change', () => {
    wrapper.instance().handleInputChange = jest.fn();
    wrapper
      .find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig .txt-center input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find(
        '.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig .txt-center input'
      )
    ).toHaveLength(3);
  });
  it('on change', () => {
    wrapper.instance().handleInputChange = jest.fn();
    wrapper
      .find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig .txt-center input')
      .at(1)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find(
        '.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig .txt-center input'
      )
    ).toHaveLength(3);
  });
  it('on change', () => {
    wrapper.instance().handleInputChange = jest.fn();
    wrapper
      .find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig .txt-center input')
      .at(2)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find(
        '.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig .txt-center input'
      )
    ).toHaveLength(3);
  });
  it('on change', () => {
    wrapper.instance().handleInputChange = jest.fn();
    wrapper
      .find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig input')
      .at(2)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig input')
    ).toHaveLength(4);
  });
  it('on change', () => {
    wrapper.instance().handleInputChange = jest.fn();
    wrapper
      .find('.catchall-modal-assignment-three .font-wei-normal .bord-top-bot-rig input')
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find('.catchall-modal-assignment-three .font-wei-normal .bord-top-bot-rig input')
    ).toHaveLength(1);
  });
  it('on change', () => {
    wrapper.instance().gradePercent = jest.fn();
    wrapper
      .find('.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig .txt-center button')
      .simulate('click', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find(
        '.catchall-modal-assignment-one .font-wei-normal .bord-top-bot-rig .txt-center button'
      )
    ).toHaveLength(1);
  });
  it('on change', () => {
    wrapper.instance().handleAllSelectChange = jest.fn();
    wrapper
      .find('.print-catchall-modal-assignment-wrapper1 input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(wrapper.find('.print-catchall-modal-assignment-wrapper1 input')).toHaveLength(6);
  });
});
