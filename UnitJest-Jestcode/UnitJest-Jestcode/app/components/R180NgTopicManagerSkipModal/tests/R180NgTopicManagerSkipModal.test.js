import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import R180NgtopicManagerSkipModal from '../index';

describe('<R180NgtopicManagerSkipModal />', () => {
  let wrapper = null;
  let mockYes = null;
  let mockNo = null;
  let mockData = {};
  // const fakeEvent = { preventDefault: () => {} };
  beforeEach(() => {
    mockYes = jest.fn();
    mockNo = jest.fn();
    mockData = { data: 'topic', skipTopic: jest.fn() };
    wrapper = shallow(
      <R180NgtopicManagerSkipModal isOpen onYes={mockYes} onNo={mockNo} data={mockData} />
    );
  });
  it('Expect to match snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('simulate Ok button click', () => {
    const okButton = wrapper.find(
      'SAMButton[buttonClassModifier="r180ng-topics-skip-modal--ok-button"]'
    );
    expect(okButton.exists()).toBeTruthy();
  });
});
