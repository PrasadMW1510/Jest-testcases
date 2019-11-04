import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { R180NgtopicSkipSegmentModalContainer } from '../index';

describe('<R180NgtopicSkipSegmentModalContainer />', () => {
  let wrapper = null;
  let mockHideModal = null;
  let mockData = {};
  beforeEach(() => {
    mockHideModal = jest.fn();
    mockData = { data: 'topic', skipSegment: jest.fn() };
    wrapper = shallow(
      <R180NgtopicSkipSegmentModalContainer hideModal={mockHideModal} data={mockData} />
    );
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have a R180NgtopicSkipSegmentModal modal', () => {
    const modal = wrapper.find('R180NgtopicSkipSegmentModal');
    expect(modal).toBeDefined();
  });

  it('call skip segment modal on Yes clicked', () => {
    const modal = wrapper.find('R180NgtopicSkipSegmentModal');
    modal.prop('onYes')();
    expect(mockHideModal).toHaveBeenCalled();
  });

  it('call skip segment modal on Yes clicked', () => {
    const modal = wrapper.find('R180NgtopicSkipSegmentModal');
    modal.prop('onNo')();
    expect(mockHideModal).toHaveBeenCalled();
  });
});
