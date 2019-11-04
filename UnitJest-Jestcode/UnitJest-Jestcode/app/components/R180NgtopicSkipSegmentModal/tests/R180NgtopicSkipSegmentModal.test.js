import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import R180NgtopicSkipSegmentModal from '../index';

describe('<R180NgtopicSkipSegmentModal />', () => {
  let wrapper = null;
  let mockYes = null;
  let mockNo = null;
  let mockData = {};
  // const fakeEvent = { preventDefault: () => {} };
  beforeEach(() => {
    mockYes = jest.fn();
    mockNo = jest.fn();
    mockData = { data: 'topic', skipSegment: jest.fn() };
    wrapper = shallow(
      <R180NgtopicSkipSegmentModal isOpen onYes={mockYes} onNo={mockNo} data={mockData} />
    );
  });
  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('simulate r180ng topic segment skip ok click', () => {
    const okButton = wrapper.find(
      'SAMButton[buttonClassModifier="r180ng-topics-segment-skip-modal--ok-button"]'
    );
    expect(okButton.exists()).toBeTruthy();
  });
});
