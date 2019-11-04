import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ProgramSettingSetStudentLevelModalContainer } from '../index';

describe('<ProgramSettingSetStudentLevelModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let mockData = {};
  beforeEach(() => {
    mockHideModal = jest.fn();
    mockData = { Level: 'topic', setLevel: jest.fn() };
    wrapper = shallow(
      <ProgramSettingSetStudentLevelModalContainer hideModal={mockHideModal} data={mockData} />
    );
  });
  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have a ProgramSettingSetStudentLevelModal  modal', () => {
    const modal = wrapper.find('ProgramSettingSetStudentLevelModal');
    expect(modal).toBeDefined();
  });

  it('call set student level modal on Yes clicked', () => {
    const modal = wrapper.find('ProgramSettingSetStudentLevelModal');
    modal.prop('onYes')();
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('call set student level  modal on No clicked', () => {
    const modal = wrapper.find('ProgramSettingSetStudentLevelModal');
    modal.prop('onNo')();
    expect(mockHideModal).toHaveBeenCalled();
  });
});
