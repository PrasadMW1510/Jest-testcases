import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as Read180NgAssignmentConstants from '../constants';
import Read180NgAssaignment from '../index';

describe('<Read180NgAssaignment />', () => {
  const props = {
    isOpen: true,
    hideCancel: jest.fn(),
    onPreview: jest.fn(),
    addread180ngassaignmentcontainer: {
      studentDetails: {
        students: [
          {
            student: [
              {
                student_id: 0,
                student_last_name: 'lastname',
                student_first_name: 'firstname',
              },
            ],
          },
        ],
      },
    },
    addNewAssignment: jest.fn(),
    //  postSavedData: jest.fn(),
    data: {
      currentIndex: undefined,
      newassignment: {
        className: 'class',
      },
    },
  };
  const wrapper = shallow(<Read180NgAssaignment {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to call handleChange if index is 1', () => {
    const index = 1;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleChange if index is 2', () => {
    const index = 2;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleChange if index is 3', () => {
    const index = 3;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleChange if index is 3', () => {
    const index = 4;
    const event = {
      target: {
        checked: true,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'score',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'score',
        value: '',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'score',
        value: 'abc',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'total',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'average',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'score1',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'total1',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'average1',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'average11',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'assName',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'comment',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'comment1',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'desc',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'dateValue',
        value: '1234',
      },
    };
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeChanges', () => {
    const e = {
      target: {
        name: 'dateValue',
        value: '1234',
      },
    };
    wrapper.instance().setState({
      score: '100',
      total: '100',
    });
    wrapper.instance().gradeChanges(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleCancel', () => {
    wrapper.setState({
      disableSave: true,
    });
    wrapper.instance().handleCancel();
    expect(wrapper.state('showModal')).toBeFalsy();
  });
  it('Expect to call handleCancel', () => {
    wrapper.setState({
      disableSave: false,
    });
    wrapper.instance().handleCancel();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handlePreview', () => {
    wrapper.instance().handlePreview();
    expect(props.onPreview.mock.calls.length).toEqual(1);
  });
  it('Expect to call cancelWarningModalconClose ', () => {
    wrapper.instance().cancelWarningModalconClose();
    expect(wrapper.state('showModal')).toBeFalsy();
  });
  it('Expect to call yesWarningModalclose', () => {
    wrapper.instance().yesWarningModalclose();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleSubmit', () => {
    wrapper.setState({
      assName: '',
    });
    wrapper.instance().handleSubmit();
  });
  it('Expect to call handleSubmit', () => {
    wrapper.setState({
      assName: 'se',
    });
    wrapper.instance().handleSubmit();
  });
  it('Expect to call gradeValue', () => {
    wrapper.setState({
      score: 2,
      total: 4,
    });
    wrapper.instance().gradeValue();
  });
  it('Expect to call gradeValue', () => {
    wrapper.setState({
      score: '',
      total: '',
    });
    wrapper.instance().gradeValue();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call gradeValue', () => {
    wrapper.setState({
      score: 2,
      total: 3,
    });
    wrapper.instance().gradeValue();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('it should exists getFormattedDate', () => {
    const month = '0';
    const day = '7';
    const year = '2018';
    const date = {
      getMonth() {
        return month;
      },
      getDate() {
        return day;
      },
      getFullYear() {
        return year;
      },
    };
    wrapper.instance().getFormattedDate(date);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleChangeAll as expected', () => {
    const index = 1;
    const event = {
      target: {
        checked: false,
      },
    };
    wrapper.setState({
      checked: false,
      checked1: false,
    });
    wrapper.instance().handleChangeAll(index, event);
    expect(wrapper.state('checked')).toEqual(false);
  });
  it('Should render handleChangeAll as expected', () => {
    const index = 2;
    const event = {
      target: {
        checked: false,
      },
    };
    wrapper.setState({
      checked: false,
      checked1: true,
    });
    wrapper.instance().handleChangeAll(index, event);
    expect(wrapper.state('checked')).toEqual(false);
  });
  it('Should render handleDataChange as expected', () => {
    const e = {
      target: {
        name: Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_SCORE,
        value: '1234',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.state('assignmentNameError')).toEqual('');
  });
  it('Should render handleDataChange as expected', () => {
    const e = {
      target: {
        name: 'score1',
        value: '',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.state('assignmentNameError')).toEqual('');
  });
  it('Should render handleDataChange as expected', () => {
    const e = {
      target: {
        name: Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_SCORE,
        value: 'abc',
      },
    };
    wrapper.instance().handleDataChange(e);
    expect(wrapper.state('assignmentNameError')).toEqual('');
  });
  it('Expect to simulate onChange event handler1', () => {
    wrapper.instance().handleDataChange = jest.fn();
    wrapper.find('.print-read180ngassaignment-modal-assignment-textbox1').simulate('change', {
      target: {
        scoreDisable: true,
      },
    });
    expect(wrapper.instance().handleDataChange).toBeCalled();
  });
  it('Expect to simulate onChange event handler2', () => {
    wrapper.instance().handleDataChange = jest.fn();
    wrapper.find('.print-read180ngassaignment-modal-assignment-textbox2').simulate('change', {
      target: {
        scoreDisable: true,
      },
    });
    expect(wrapper.instance().handleDataChange).toBeCalled();
  });
  it('Expect to simulate onChange event handler2', () => {
    wrapper.instance().handleDataChange = jest.fn();
    wrapper.find('.print-read180ngassaignment-modal-assignment-textbox3').simulate('change', {
      target: {
        scoreDisable: true,
      },
    });
    expect(wrapper.instance().handleDataChange).toBeCalled();
  });
  it('Expect to simulate onChange event handler2', () => {
    wrapper.find('.print-read180ngassaignment-modal-select').simulate('change', {
      target: {
        checked: false,
      },
    });
  });
});
describe('<Read180NgAssaignment />', () => {
  const props = {
    data: {
      currentIndex: 1,
    },
    isOpen: true,
    hideCancel: jest.fn(),
    onPreview: jest.fn(),
    addread180ngassaignmentcontainer: {
      studentDetails: {
        students: [
          {
            student: [],
          },
        ],
      },
    },
    addNewAssignment: jest.fn(),
  };
  const wrapper = shallow(<Read180NgAssaignment {...props} />);
  it('Expect to render component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render handleSubmit as expected', () => {
    wrapper.instance().handleSubmit();
    expect(wrapper.state('disableSave')).toEqual(true);
  });
});
