import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CatchiReadClass from '../index';

describe('<CatchiReadClass  />', () => {
  let wrapper = null;
  let props = null;
  props = {
    handleChange: jest.fn(),
    handleDatachange: jest.fn(),
    handleChangeAll: jest.fn(),
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
  wrapper = shallow(<CatchiReadClass {...props} />);

  it('should render ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call getNewAssignmentRoaster ', () => {
    const i = 0;
    const student = [];
    wrapper.instance().getNewAssignmentRoaster(student, i);
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
      wrapper.find('.catchall-modal-assignment-three .font-wei-normal .bord-top-bot-rig input')
    ).toHaveLength(1);
  });
  it('on change', () => {
    wrapper.instance().handleDatachange = jest.fn();
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
    ).toHaveLength(1);
  });
  it('on change', () => {
    wrapper.instance().handleDatachange = jest.fn();
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
    wrapper
      .find('.catchall-modal-assignment-one .font-wei-normal .bord-bot input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(
      wrapper.find('.catchall-modal-assignment-one .font-wei-normal .bord-bot input')
    ).toHaveLength(1);
  });
});
