import React from 'react';
import { mount } from 'enzyme';
import EditQuizCollectionNames from '../EditQuizCollectionNames';

describe('<EditQuizCollectionNames />', () => {
  let wrapper = null;
  const items = [
    {
      Name: ['Book 1'],
    },
    {
      Name: ['Book 2'],
    },
  ];
  const state = {
    editQuizCollectionNames: '',
    warningModal: false,
    quizNameChange: true,
    checkPrevNext: '',
    changednameVal: '',
    nameChange: false,
    navigate: false,
  };
  const props = {
    handleCancel: jest.fn(),
    handleSave: jest.fn(),
    dropDowndata: [
      {
        Name: ['Book 2'],
      },
    ],
    isOpen: true,
    saveStatus: false,
    fetchSuccess: true,
  };
  beforeEach(() => {
    wrapper = mount(
      <EditQuizCollectionNames {...state} {...props} dropDowndata={items} key={[]} />
    );
  });
  it('Expect to render componentWillReceiveProps correctly', () => {
    const nextProps = {
      dropDowndata: [{ Name: 'name' }],
      fetchSuccess: true,
      saveStatus: true,
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state('navigate')).toBe(true);
  });
  it('Expect to render onCollectionNameChange correctly', () => {
    const e = {
      target: {
        value: '',
      },
    };
    wrapper.instance().onCollectionNameChange(e);
    expect(wrapper.state('navigate')).toBe(false);
  });
  it('Expect to render handleClick correctly', () => {
    const e = {
      target: {
        value: '',
      },
    };
    wrapper.instance().handleClick(e);
    expect(wrapper.state('navigate')).toBe(false);
  });
  it('Expect to render handleSave correctly', () => {
    const e = {
      target: {
        value: '',
      },
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSave(e);
    expect(wrapper.instance().props.handleSave).toBeCalled();
  });
  it('Expect to render createNewWarningModal correctly', () => {
    const e = {
      warningModal: true,
    };
    wrapper.setState({
      changednameVal: '',
    });
    wrapper.instance().createNewWarningModal(e);
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render createNewWarningModal correctly', () => {
    const e = {
      warningModal: false,
    };
    wrapper.setState({
      changednameVal: 'fdgdd',
    });
    wrapper.instance().createNewWarningModal(e);
    expect(wrapper.state('warningModal')).toBe(true);
  });
  it('Expect to render prevName1 correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      nameChange: true,
      editQuizCollectionNames: 'Book 1',
      changednameVal: 'test1',
    });
    wrapper.instance().prevName(e);
    expect(wrapper.state('warningModal')).toBe(true);
  });
  it('Expect to render prevName2 correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      nameChange: false,
      editQuizCollectionNames: 'Book 2',
      changednameVal: 'Book 2',
    });
    wrapper.instance().prevName(e);
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render prevName3 correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      nameChange: true,
      editQuizCollectionNames: 'Book 2',
      changednameVal: 'Book 2',
    });
    wrapper.instance().prevName(e);
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render nextName1  correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      nameChange: true,
      editQuizCollectionNames: 'Book 1',
      changednameVal: 'test1',
    });
    wrapper.instance().nextName(e);
    expect(wrapper.state('warningModal')).toBe(true);
  });
  it('Expect to render nextName2 correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      nameChange: false,
      editQuizCollectionNames: 'Book 1',
      changednameVal: 'test1',
    });
    wrapper.instance().nextName(e);
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render nextName3 correctly', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      nameChange: true,
      editQuizCollectionNames: 'Book 1',
      changednameVal: 'Book 1',
    });
    wrapper.instance().nextName(e);
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render warningModalClose   correctly', () => {
    wrapper.instance().warningModalClose();
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render warningModalProceed1   correctly', () => {
    wrapper.setState({
      checkPrevNext: 'prev',
      editQuizCollectionNames: 'Book 2',
    });
    wrapper.instance().warningModalProceed();
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render warningModalProceed2   correctly', () => {
    wrapper.setState({
      checkPrevNext: 'prev1',
      editQuizCollectionNames: 'Book 1',
    });
    wrapper.instance().warningModalProceed();
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render warningModalProceed3   correctly', () => {
    wrapper.setState({
      checkPrevNext: 'next',
    });
    wrapper.instance().warningModalProceed();
    expect(wrapper.state('warningModal')).toBe(false);
  });

  it('Expect to render nameValueChange   correctly', () => {
    const e = {
      target: {
        value: '',
      },
    };
    wrapper.instance().nameValueChange(e);
    expect(wrapper.state('nameChange')).toBe(true);
  });
  it('Expect to render naviagtePrev    correctly', () => {
    wrapper.setState({
      editQuizCollectionNames: 'Book 2',
    });
    wrapper.instance().naviagtePrev();
    expect(wrapper.state('warningModal')).toBe(false);
  });
  it('Expect to render navigateNext    correctly', () => {
    wrapper.setState({
      editQuizCollectionNames: 'Book 1',
    });
    wrapper.instance().navigateNext();
    expect(wrapper.state('warningModal')).toBe(false);
  });
});
