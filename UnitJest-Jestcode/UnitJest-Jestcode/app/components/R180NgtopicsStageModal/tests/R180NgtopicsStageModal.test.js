import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import R180NgtopicsStageModal from '../index';

describe('<R180NgtopicsStageModal/>', () => {
  let wrapper = null;
  let mockYes = null;
  let mockNo = null;
  // const fakeEvent = { preventDefault: () => {} };
  beforeEach(() => {
    mockYes = jest.fn();
    mockNo = jest.fn();
    wrapper = shallow(<R180NgtopicsStageModal isOpen onYes={mockYes} onNo={mockNo} />);
  });
  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('simulate Ok button click', () => {
    const okButton = wrapper.find(
      'SAMButton[buttonClassModifier="r180ng-topics-stage-modal--ok-button"]'
    );
    expect(okButton.exists()).toBeTruthy();
  });
});
