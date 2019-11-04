import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddAssignmentComponent from '../index';

describe('<AddAssignmentComponent />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    hideCancel: jest.fn(),
    data: {
      currentIndex: undefined,
      newassignment: {
        className: '',
      },
    },
    addassignmentcontainer: {
      studentDetails: {
        students: [
          {
            student: [
              {
                student_id: '0',
                student_first_name: '',
                student_last_name: '',
              },
            ],
          },
        ],
      },
    },
    addNewAssignment: jest.fn(),
  };
  wrapper = shallow(<AddAssignmentComponent {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
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
    expect(wrapper.instance().props.isOpen).toBeTruthy();
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
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleDatachange as expected', () => {
    const e = {
      target: {
        name: 'score',
        value: '1234',
      },
    };
    wrapper.instance().handleDatachange(e);
    expect(wrapper.state('assignmentNameError')).toEqual('');
  });
  it('Should render handleDatachange as expected', () => {
    const e = {
      target: {
        name: 'score1',
        value: '',
      },
    };
    wrapper.instance().handleDatachange(e);
    expect(wrapper.state('assignmentNameError')).toEqual('');
  });
  it('Should render handleDatachange as expected', () => {
    const e = {
      target: {
        name: 'score',
        value: 'abc',
      },
    };
    wrapper.instance().handleDatachange(e);
    expect(wrapper.state('assignmentNameError')).toEqual('');
  });
  it('Should render handleSubmit as expected', () => {
    wrapper.setState({
      assignmentName: '',
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state('disableSave')).toEqual(false);
  });
  it('Should render handleSubmit as expected', () => {
    wrapper.setState({
      assignmentName: 'a',
    });
    wrapper.instance().handleSubmit();
    expect(wrapper.state('disableSave')).toEqual(true);
  });
  it('Should render handleCancel as expected', () => {
    wrapper.setState({
      disableSave: false,
    });
    wrapper.instance().handleCancel();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Should render handleCancel as expected', () => {
    wrapper.setState({
      disableSave: true,
    });
    wrapper.instance().handleCancel();
    expect(wrapper.instance().props.hideCancel).toBeCalled();
  });
  it('Should render yesWarningModalclose as expected', () => {
    wrapper.instance().yesWarningModalclose();
    expect(wrapper.instance().props.hideCancel).toBeCalled();
  });
  it('Should render cancelWarningModalconClose as expected', () => {
    wrapper.setState({
      cancelWarningModal: true,
    });
    wrapper.instance().cancelWarningModalconClose();
    expect(wrapper.state('cancelwarningModal')).toEqual(false);
  });
  it('Should render closeAssignmentUpdate as expected', () => {
    wrapper.setState({
      assignmentName: 'a',
    });
    wrapper.instance().closeAssignmentUpdate();
    expect(wrapper.state('showAssignmentUpdate')).toEqual(false);
  });
  it('Should render handleChange as expected', () => {
    const index = 0;
    const event = {
      target: {
        checked: false,
      },
    };
    wrapper.instance().handleChange(index, event);
    expect(wrapper.state('disableSave')).toEqual(false);
  });
  it('Should render getNewAssignmentRoaster as expected', () => {
    const i = 0;
    const student = '';
    wrapper.instance().getNewAssignmentRoaster(student, i);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('on change', () => {
    wrapper.instance().handleChange = jest.fn();

    wrapper
      .find('.iread-modal-assignment-one .font-wei-normal .bord-top-bot-rig input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(wrapper.instance().handleChange).toHaveBeenCalled();
  });
  it('on change', () => {
    wrapper.instance().handleDatachange = jest.fn();

    wrapper
      .find('.iread-modal-assignment-one .font-wei-normal .bord-top-bot-rig input')
      .at(1)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(wrapper.instance().handleDatachange).toBeCalled();
  });
  it('on change', () => {
    wrapper.instance().handleChangeAll = jest.fn();

    wrapper
      .find('.iread-modal-assignment-one .font-wei-normal .bord-bot input')
      .at(0)
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(wrapper.instance().handleChangeAll).toHaveBeenCalled();
  });
  it('on change', () => {
    wrapper.instance().handleDatachange = jest.fn();

    wrapper
      .find('.iread-modal-assignment-three .font-wei-normal .bord-top-bot-rig input')
      .simulate('change', {
        target: {
          checked: false,
        },
      });
    expect(wrapper.instance().handleDatachange).toBeCalled();
  });
});

describe('<AddAssignmentComponent />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    hideCancel: jest.fn(),
    data: {
      currentIndex: 1,
      newassignment: {
        className: '',
      },
    },
    addassignmentcontainer: {
      studentDetails: {
        students: [
          {
            student: [
              {
                student_id: '0',
                student_first_name: '',
                student_last_name: '',
              },
            ],
          },
        ],
      },
    },
    addNewAssignment: jest.fn(),
  };
  wrapper = shallow(<AddAssignmentComponent {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render handleSubmit as expected', () => {
    wrapper.instance().handleSubmit();
    expect(wrapper.state('disableSave')).toEqual(true);
  });
});
