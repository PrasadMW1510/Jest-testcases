import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PrintCustomList from '../index';
describe('<PrintCustomList />', () => {
  let wrapper = null;

  const props = {
    showPrintQuizModal: jest.fn(),
    showPrintBookLabelModal: jest.fn(),
    showPrintQuizAndAnswerKeyModal: jest.fn(),
    viewExportHTML: jest.fn(),
    searchresultsData: {
      selectedItems: [{}],
    },
    activateQuizModal: jest.fn(),
    deactivateQuizModal: jest.fn(),
    handleExportTeacherQuizModal: jest.fn(),
  };
  wrapper = shallow(<PrintCustomList {...props} />);

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect handlePrintQuizList to render correctly', () => {
    const ev = {
      preventDefault: () => {},
    };
    wrapper.instance().handlePrintQuizList(ev);
    expect(wrapper.instance().props.showPrintQuizModal).toBeCalled();
  });
  it('Expect handlePrintBookLabel to render correctly', () => {
    const ev = {
      preventDefault: () => {},
    };
    wrapper.instance().handlePrintBookLabel(ev);
    expect(wrapper.instance().props.showPrintBookLabelModal).toBeCalled();
  });
  it('Expect handlePrintAnswerList to render correctly', () => {
    const ev = {
      preventDefault: () => {},
    };
    wrapper.instance().handlePrintAnswerList(ev);
    expect(wrapper.instance().props.showPrintQuizAndAnswerKeyModal).toBeCalled();
  });
  it('Expect handleExportHTML to render correctly', () => {
    const ev = {
      preventDefault: () => {},
    };
    wrapper.instance().handleExportHTML(ev);
    expect(wrapper.instance().props.viewExportHTML).toBeCalled();
  });
  it('Expect handleActivateQuiz to render correctly', () => {
    const ev = {
      preventDefault: () => {},
    };
    wrapper.instance().handleActivateQuiz(ev);
    expect(wrapper.instance().props.activateQuizModal).toBeCalled();
  });
  it('Expect handleDeactivateQuiz to render correctly', () => {
    const ev = {
      preventDefault: () => {},
    };
    wrapper.instance().handleDeactivateQuiz(ev);
    expect(wrapper.instance().props.deactivateQuizModal).toBeCalled();
  });
  it('Expect handleExportTeacherQuiz to render correctly', () => {
    const ev = {
      preventDefault: () => {},
    };
    wrapper.instance().handleExportTeacherQuiz(ev);
    expect(wrapper.instance().props.handleExportTeacherQuizModal).toBeCalled();
  });
});
