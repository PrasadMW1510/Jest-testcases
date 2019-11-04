import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { R180NgtopicsStageModalContainer } from 'containers/R180NgtopicsStageModalContainer';

describe('<R180NgtopicsStageModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = jest.fn();
  const mockR180NGTopicsRequest = jest.fn();
  const mockData = {
    prevValue: 'r180ng_A',
    currentValue: 'r180ng_B',
  };
  beforeEach(() => {
    mockHideModal = jest.fn();

    wrapper = shallow(
      <R180NgtopicsStageModalContainer
        hideModal={mockHideModal}
        data={mockData}
        R180NGTopicsRequest={mockR180NGTopicsRequest}
      />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have a ProgramSettingSetStudentLevel modal', () => {
    const modal = wrapper.find('R180NgtopicsStageModal');
    expect(modal).toBeDefined();
  });
  it('should update stage modal on Yes clicked', () => {
    const modal = wrapper.find('R180NgtopicsStageModal');
    modal.prop('onYes')();
    expect(mockR180NGTopicsRequest).toBeCalledWith(mockData.currentValue);
    expect(mockHideModal).toHaveBeenCalled();
  });
  it('should update stage modal on No clicked', () => {
    const modal = wrapper.find('R180NgtopicsStageModal');
    modal.prop('onNo')();
    expect(mockR180NGTopicsRequest).toBeCalledWith(mockData.prevValue);
    expect(mockHideModal).toHaveBeenCalled();
  });
});
