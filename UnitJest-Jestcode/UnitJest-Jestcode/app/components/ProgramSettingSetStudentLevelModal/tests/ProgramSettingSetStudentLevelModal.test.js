import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ProgramSettingSetStudentLevelModal from '../index';

describe('<ProgramSettingSetStudentLevelModal/>', () => {
  let wrapper = null;
  let mockYes = null;
  let mockNo = null;
  let mockData = {};
  const fakeEvent = { preventDefault: () => {} };
  beforeEach(() => {
    mockYes = jest.fn();
    mockNo = jest.fn();
    mockData = { Level: 'topic', setLevel: jest.fn() };
    wrapper = shallow(
      <ProgramSettingSetStudentLevelModal
        isOpen
        onYes={mockYes}
        onNo={mockNo}
        displayLevel={mockData}
      />
    );
  });
  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('simulate Ok button click', () => {
    const okButton = wrapper.find(
      'SAMButton[buttonClassModifier="student-level-modal--ok-button"]'
    );
    expect(okButton.exists()).toBeTruthy();
    okButton.prop('onClickHandler')(fakeEvent);
    expect(mockYes).toHaveBeenCalled();
  });
});
