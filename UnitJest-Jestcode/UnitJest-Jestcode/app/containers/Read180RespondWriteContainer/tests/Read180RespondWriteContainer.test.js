import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import * as Constants from 'components/InBox/constants';
import { Read180RespondWriteContainer, mapDispatchToProps } from '../Read180RespondWriteContainer';

describe('<Read180RespondWriteContainer />', () => {
  let wrapper = null;
  const props = {
    getRespondWriteRequest: jest.fn(),
    showRead180Modal: jest.fn(),
    read180respondwritecontainer: {},
    tempGridData: [],
    saveRespondData: jest.fn(),
    hideModal: jest.fn(),
    read180studentworkcontainer: jest.fn(),
    showInboxProgram: jest.fn(),
    showIreadModal: jest.fn(),
    showSystem44Modal: jest.fn(),
    showSystem44SuccessRecordModal: jest.fn(),
    showRead180RespondWriteModal: jest.fn(),
    showRead180StudentWorkModal: jest.fn(),
    data: [],
    InboxContainer: {},
  };
  wrapper = shallow(<Read180RespondWriteContainer {...props} />);
  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render dispatchAction correctly', () => {
    const rowData = {
      community_id: 'R180NG',
      assignment: 'Respond & Write',
    };
    const currentIndex = 0;
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render dispatchAction correctly', () => {
    const rowData = {
      community_id: 'R180NG',
      assignment: 'Success Recording',
    };
    const currentIndex = 0;
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render dispatchAction correctly', () => {
    const rowData = {
      community_id: 'R180NG',
      assignment: 'Final Recording',
    };
    const currentIndex = 0;
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render dispatchAction correctly', () => {
    const rowData = {
      community_id: Constants.PROG_DEFAULT_VALUE,
      assignment: 'Final Recording',
    };
    const currentIndex = 0;
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render dispatchAction correctly', () => {
    const rowData = {
      community_id: Constants.PROG_RTNG_VALUE,
      assignment: 'Final Recording',
    };
    const currentIndex = 0;
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('Expect to render dispatchAction correctly', () => {
    const rowData = {
      community_id: Constants.PROG_MATH_VALUE_1,
      assignment: 'Final Recording',
    };
    const currentIndex = 0;
    wrapper.instance().dispatchAction(rowData, currentIndex);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('map Dispatch To Props', () => {
    const mockObject = jest.fn;
    const mapDispatchToPropscomp = mapDispatchToProps(mockObject);
    expect(mapDispatchToPropscomp.getRespondWriteRequest().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.hideModal().mock.calls.length).toBe(0);
    expect(mapDispatchToPropscomp.saveRespondData().mock.calls.length).toBe(0);
    // expect(mapDispatchToPropscomp.showRead180Modal().mock.calls.length).toBe(0);
    // expect(mapDispatchToPropscomp.showRead180StudentWorkModal().mock.calls.length).toBe(0);
  });
});
