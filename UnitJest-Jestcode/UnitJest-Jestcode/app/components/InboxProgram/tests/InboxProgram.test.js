import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import InboxProgram from '../index';
describe('<InboxProgram />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    sName: '',
    assignment: 'Simulation',
    getQuestion: jest.fn(),
    saveQuestion: jest.fn(),
    data: {
      allData: {
        length: 1,
      },
    },
    currIndex: 1,
    prevSerd: jest.fn(),
    nextSerd: jest.fn(),
    profileUserId: '',
    previousDisable: '',
    nextDisable: '',
  };
  wrapper = shallow(<InboxProgram {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Should render toggle as expected', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().toggle(e);
    expect(wrapper.state('shown')).toBeTruthy();
  });
  it('Should render closeblock as expected', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().closeblock(e);
    expect(wrapper.state('shown')).toBeFalsy();
  });
  it('Should render renderQuestion  as expected', () => {
    const path = {};
    wrapper.instance().renderQuestion(path);
    expect(wrapper.instance().props.getQuestion).toBeCalled();
  });
  it('Should render print as expected', () => {
    window.print = jest.fn();
    wrapper.instance().print();
    expect(window.print).toBeCalled();
  });
  it('Should render storeData as expected', () => {
    const evUpdate = {};
    wrapper.instance().storeData(evUpdate);
    expect(wrapper.state('btnDisable')).toBeFalsy();
  });
  it('Should render resetSaveButton as expected', () => {
    wrapper.instance().resetSaveButton();
    expect(wrapper.state('btnDisable')).toBeTruthy();
  });
  it('Should render saveData as expected', () => {
    wrapper.setState({ evaluationData: [] });
    wrapper.instance().saveData();
    expect(wrapper.state('btnDisable')).toBeTruthy();
  });
  it('Should render saveWarningModalClose as expected', () => {
    wrapper.instance().saveWarningModalClose();
    wrapper.setState({ saveWarningModal: false });
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Should render saveWarningModalProceed as expected', () => {
    wrapper.instance().saveWarningModalProceed();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Should render saveWarningModalProceed as expected', () => {
    wrapper.setState({ modalOption: 'Cancel1' });
    wrapper.instance().saveWarningModalProceed();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Should render saveWarningModalProceed as expected', () => {
    wrapper.setState({ modalOption: 'Tabs' });
    wrapper.instance().saveWarningModalProceed();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Should render saveWarningModalProceed as expected', () => {
    wrapper.setState({ modalOption: 'QuestionTabs' });
    wrapper.instance().saveWarningModalProceed();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Should render saveWarningModalProceed as expected', () => {
    wrapper.setState({ modalOption: 'Previous' });
    wrapper.instance().saveWarningModalProceed();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Should render saveWarningModalProceed as expected', () => {
    wrapper.setState({ modalOption: 'Next' });
    wrapper.instance().saveWarningModalProceed();
    expect(wrapper.state('saveWarningModal')).toBeFalsy();
  });
  it('Should render handleModalCancel as expected', () => {
    wrapper.setState({ btnDisable: false });
    wrapper.instance().handleModalCancel();
    expect(wrapper.state('modalOption')).toEqual('Cancel');
  });
  it('Should render handleModalCancel as expected', () => {
    wrapper.setState({ btnDisable: true });
    wrapper.instance().handleModalCancel();
    expect(wrapper.state('modalOption')).toEqual('Cancel');
  });
  it('Should render showWarning as expected', () => {
    const tabIndex = 0;
    const tabOption = 'Tabs';
    wrapper.instance().showWarning(tabIndex, tabOption);
    expect(wrapper.state('modalOption')).toEqual('Tabs');
  });
  it('Should render showWarning as expected', () => {
    const tabIndex = 0;
    const tabOption = 'QuestionTabs';
    wrapper.instance().showWarning(tabIndex, tabOption);
    expect(wrapper.state('modalOption')).toEqual('QuestionTabs');
  });
  it('Should render showWarningModal as expected', () => {
    const tabOption = 'Tabs';
    const tabIndex = 0;
    wrapper.instance().showWarningModal(tabIndex, tabOption);
    expect(wrapper.state('saveWarningModal')).toBeTruthy();
  });
  it('Should render showWarningModal as expected', () => {
    const tabOption = 'QuestionTabs';
    const tabIndex = 0;
    wrapper.instance().showWarningModal(tabIndex, tabOption);
    expect(wrapper.state('saveWarningModal')).toBeTruthy();
  });
  it('Should render handlePrevious as expected', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      btnDisable: false,
    });
    wrapper.instance().handlePrevious(e);
    expect(props.prevSerd.mock.calls.length).toBe(1);
  });
  it('Should render handlePrevious as expected', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      btnDisable: true,
    });
    wrapper.instance().handlePrevious(e);
    expect(props.prevSerd.mock.calls.length).toBe(2);
  });
  it('Should render handleNext as expected', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      btnDisable: false,
    });
    wrapper.instance().handleNext(e);
    expect(props.prevSerd.mock.calls.length).toBe(2);
  });
  it('Should render handleNext as expected', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      btnDisable: true,
    });
    wrapper.instance().handleNext(e);
    expect(props.prevSerd.mock.calls.length).toBe(2);
  });
});

describe('<InboxProgram />', () => {
  let wrapper = null;
  const props = {
    isOpen: true,
    handleCancel: jest.fn(),
    sName: '',
    assignment: 'mSkills Assessment',
    getQuestion: jest.fn(),
    saveQuestion: jest.fn(),
    data: {
      allData: {
        length: 1,
      },
    },
    currIndex: 1,
    prevSerd: jest.fn(),
    nextSerd: jest.fn(),
  };
  wrapper = shallow(<InboxProgram {...props} />);
  it('Should render as expected', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
