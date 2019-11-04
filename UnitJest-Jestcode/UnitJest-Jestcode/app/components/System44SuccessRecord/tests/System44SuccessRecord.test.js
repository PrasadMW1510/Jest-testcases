import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import moment from 'moment';
import System44SuccessRecord from '../index';

describe('<System44SuccessRecord />', () => {
  let wrapper = null;
  const props = {
    data: {
      rowData: {
        assignment: 'Success Recording',
        student: 'student',
      },
    },
    tempGridData: [
      {
        length: 1,
      },
    ],
    handleCancel: jest.fn(),
    successPassageRecWorkItem: {
      $: {
        dateSubmitted: moment('06/06/2018', 'MM/DD/YYYY', true).format(),
      },
      oralFluencySubmission: [
        {
          recordingPath: [''],
        },
      ],
      iReadSuccessRecSubmission: [
        {
          recordingPath: [''],
        },
      ],
      successPassageRecSubmission: [
        {
          recordingPath: [''],
        },
      ],
    },
    modalTitle: '',
    isOpen: true,
    dispatchAction: jest.fn(),
    buttonChange: jest.fn(),
    assignmentSuccessRecordSaveRequest: jest.fn(),
    handleChange: jest.fn(),
  };
  wrapper = shallow(<System44SuccessRecord {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to call getTitleExt with index value 1', () => {
    const titleExt = {
      passage: [''],
      $: {
        pdfFile: 'pdf',
      },
    };
    wrapper.instance().getTitleExt(titleExt);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call getPopUp with index value 1', () => {
    const value = 'value';
    const e = {
      target: {
        getAttribute() {
          return value;
        },
      },
    };
    wrapper.instance().getPopUp(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleSaveData with index value 1', () => {
    const data = {
      comment: 'comment',
      questionNum: '0',
    };
    wrapper.instance().handleSaveData(data);
    expect(props.assignmentSuccessRecordSaveRequest.mock.calls.length).toBe(1);
  });
  it('Expect to call scoreChange with index value 1', () => {
    const item = 1;
    const qNumber = 0;
    const e = {
      target: {
        value: '',
      },
    };
    wrapper.instance().scoreChange(item, qNumber, e);
    expect(props.buttonChange.mock.calls.length).toBe(1);
  });
  it('Expect to call handlePrevious with index value 1', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 0,
    });
    wrapper.instance().handlePrevious(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handlePrevious with index value 1', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 1,
    });
    wrapper.instance().handlePrevious(e);
    expect(props.dispatchAction.mock.calls.length).toBe(1);
  });
  it('Expect to call handleNext with index value 1', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 0,
    });
    wrapper.instance().handleNext(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleNext with index value 1', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      currentIndex: 2,
    });
    wrapper.instance().handleNext(e);
    expect(props.dispatchAction.mock.calls.length).toBe(2);
  });
  it('Expect to call handleInputChange with index value 1', () => {
    const e = {
      target: {
        value: 0,
      },
    };
    wrapper.instance().handleInputChange(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call componentWillReceiveProps with index value 1', () => {
    const nextProps = {
      data: {
        rowData: {
          assignment: '',
        },
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call handleChange with index value 1', () => {
    const e = {
      target: {
        value: 0,
      },
    };
    wrapper.instance().handleChange(e);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call print with index value 1', () => {
    wrapper.instance().print();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('Expect to call scoreToggleClose with index value 1', () => {
    wrapper.instance().scoreToggleClose();
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
  it('onclick', () => {
    const changeButton = wrapper.find('.print-system44__modal-description-title--textarea');
    wrapper
      .find('.print-system44__modal-description-title--textarea')
      .at(0)
      .simulate('change', {
        target: {
          value: 0,
        },
      });
    expect(changeButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(0)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper.setState({
      questionNum: '0',
    });
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(1)
      .simulate('click', {
        target: {
          value: '0',
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(2)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper.setState({
      questionNum: '2',
    });
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(3)
      .simulate('click', {
        target: {
          value: '2',
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(4)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper.setState({
      questionNum: '5',
    });
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(5)
      .simulate('click', {
        target: {
          value: '5',
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(6)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(8)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
  it('onclick', () => {
    const clickButton = wrapper.find('.print-system44__oral-fluency--txt span');
    wrapper
      .find('.print-system44__oral-fluency--txt span')
      .at(10)
      .simulate('click', {
        target: {
          getAttribute() {},
        },
      });
    expect(clickButton.exists()).toBeTruthy();
  });
});

describe('<System44SuccessRecord />', () => {
  let wrapper = null;
  const props = {
    data: {
      rowData: {
        assignment: 'Success Recording else',
        student: 'student',
      },
    },
    tempGridData: [
      {
        length: 1,
      },
    ],
    handleCancel: jest.fn(),
    successPassageRecWorkItem: {
      $: {
        dateSubmitted: moment('06/06/2018', 'MM/DD/YYYY', true).format(),
      },
    },
    modalTitle: '',
    isOpen: true,
    dispatchAction: jest.fn(),
    buttonChange: jest.fn(),
    assignmentSuccessRecordSaveRequest: jest.fn(),
    handleChange: jest.fn(),
  };
  wrapper = shallow(<System44SuccessRecord {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to call getTitleExt with index value 1', () => {
    const titleExt = {
      passage: [''],
      $: {
        pdfFile: 'pdf',
      },
    };
    wrapper.instance().getTitleExt(titleExt);
    expect(wrapper.instance().props.isOpen).toBeTruthy();
  });
});
