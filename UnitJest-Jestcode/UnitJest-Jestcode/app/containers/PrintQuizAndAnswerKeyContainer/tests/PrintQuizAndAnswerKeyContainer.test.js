import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { PrintQuizAndAnswerKeyContainer } from '../PrintQuizAndAnswerKeyContainer';

describe('<PrintQuizAndAnswerKeyContainer  />', () => {
  let wrapper = null;
  let props = null;
  beforeEach(() => {
    props = {
      hideModal: jest.fn(),
      printQuizAndAnswerKeyRequest: jest.fn(),
      showMessageLogModal: jest.fn(),
      printquizandanswerkeycontainer: {},
    };
    wrapper = shallow(<PrintQuizAndAnswerKeyContainer {...props} />);
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should call componentWillReceiveProps', () => {
    const nextProps = {
      printquizandanswerkeycontainer: {
        showError: true,
      },
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
  });
  it('should render componentWillReceiveProps without props', () => {
    const nextProps = {
      printquizandanswerkeycontainer: {},
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
  });
  it('should call handlePreview ', () => {
    const opts = {};
    wrapper.instance().handlePreview(opts);
    expect(wrapper.instance().props.printQuizAndAnswerKeyRequest).toBeDefined();
  });
  it('should call handleCancel  ', () => {
    wrapper.instance().handleCancel();
    expect(wrapper.instance().props.hideModal).toBeDefined();
  });
});
