import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import IReadStudentWork from '../index';

describe('<IReadStudentWork />', () => {
  let wrapper = null;
  const props = {
    handleCancel: jest.fn(),
    isOpen: true,
    data: {},
    handleSave: jest.fn(),
    handleDelete: jest.fn(),
    studentworkprogramscontainer: {
      openSaveSuccessModal: true,
      showDeleteModal: jest.fn(),
    },
    openSaveSuccessModal: true,
    showDeleteModal: jest.fn(),
  };
  wrapper = shallow(<IReadStudentWork {...props} />);
  it('Expect to render correctly', () => {
    wrapper.setState({
      dataOfWCPM: '0',
      commentsVal: '1',
    });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render componentWillReceiveProps correctly', () => {
    const nextProps = {
      studentworkprogramscontainer: {
        iReadStudentWorkData: {
          average: '',
          comment: '',
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render onWCPMChange  correctly', () => {
    const event = {
      target: {
        value: '0',
      },
    };
    wrapper.instance().onWCPMChange(event);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('Expect to render onCommentsChange   correctly', () => {
    const event = {
      target: {
        value: '1',
      },
    };
    wrapper.instance().onCommentsChange(event);
    expect(wrapper.state('disableSave')).toBeFalsy();
  });
  it('Expect to render onPrintIreadStudentWork correctly', () => {
    wrapper.instance().onPrintIreadStudentWork();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render onSaveIreadStudentWork  correctly', () => {
    wrapper.instance().onSaveIreadStudentWork();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render onDeleteIreadStudentWork  correctly', () => {
    wrapper.instance().onDeleteIreadStudentWork();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to render onConfirmDelete correctly', () => {
    wrapper.instance().onConfirmDelete();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('onChange', () => {
    const changeButton = wrapper.find('.iread-student-work__wcpm--textbox');
    wrapper.find('.iread-student-work__wcpm--textbox').simulate('change', {
      target: {
        value: '0',
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('onChange', () => {
    const changeButton = wrapper.find('.iread-student-work__comments--textbox');
    wrapper.find('.iread-student-work__comments--textbox').simulate('change', {
      target: {
        value: '1',
      },
    });
    expect(changeButton.exists()).toBeTruthy();
  });
});
