import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { fromJS } from 'immutable';

import { MessageContainer } from '../MessageContainer';

describe('<MessageContainer />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  let mockMessageContainer = null;
  let mockProgramsAvailable = null;
  const mockGetMessageRequest = jest.fn();
  const mockPostDeleteRequest = jest.fn();
  const mockShowMessageLogModal = jest.fn();

  beforeEach(() => {
    mockMessageContainer = fromJS({
      messages: [],
    });

    mockProgramsAvailable = fromJS([
      {
        $: {
          community_id: 'CDX',
          name: 'Common Core X',
        },
      },
      {
        $: {
          community_id: 'DTM',
          name: 'Do The Math',
        },
      },
      {
        $: {
          community_id: 'E3D',
          name: 'English 3D',
        },
      },
    ]);

    wrapper = shallow(
      <MessageContainer
        messageContainer={mockMessageContainer}
        getMessageRequest={mockGetMessageRequest}
        postDeleteRequest={mockPostDeleteRequest}
        showMessageLogModal={mockShowMessageLogModal}
        programsAvailable={mockProgramsAvailable}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('Expect to render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Expect to call load function on mount', () => {
    expect(mockGetMessageRequest).toHaveBeenCalled();
  });

  it('getMessageContainer', () => {
    expect(typeof wrapperInstance.getMessageContainer()).toBe('object');
  });

  it('getProgramsAvailable', () => {
    expect(typeof wrapperInstance.getProgramsAvailable()).toBe('object');
  });

  it('handleDeleteOnClick', () => {
    wrapperInstance.handleDeleteOnClick();
    expect(mockPostDeleteRequest).toHaveBeenCalled();
  });

  it('showMessageLogModal', () => {
    wrapperInstance.handleShowMeClick('dummy data');
    expect(mockShowMessageLogModal).toHaveBeenCalledWith('dummy data');
  });
});
