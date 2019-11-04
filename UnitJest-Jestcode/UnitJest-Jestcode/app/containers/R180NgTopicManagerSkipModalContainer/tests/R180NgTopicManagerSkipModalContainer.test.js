import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { R180NgTopicManagerSkipModalContainer } from '../index';
// import { R180NgTopicManagerSkipModalContainer } from '../R180NgTopicManagerSkipModalContainer';

describe('<R180NgTopicManagerSkipModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let mockData = {};
  beforeEach(() => {
    mockHideModal = jest.fn();
    mockData = { data: 'topic', skipTopic: jest.fn() };
    wrapper = shallow(
      <R180NgTopicManagerSkipModalContainer hideModal={mockHideModal} data={mockData} />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have a R180NgTopicManagerSkipModal modal', () => {
    const modal = wrapper.find('R180NgTopicManagerSkipModal');
    expect(modal).toBeDefined();
  });

  it('call skip topic modal on Yes clicked', () => {
    const modal = wrapper.find('R180NgTopicManagerSkipModal');
    modal.prop('onYes')();
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('hide skip topic stage modal on no clicked', () => {
    const modal = wrapper.find('R180NgTopicManagerSkipModal');
    modal.prop('onNo')();
    expect(mockHideModal).toHaveBeenCalled();
  });
});
