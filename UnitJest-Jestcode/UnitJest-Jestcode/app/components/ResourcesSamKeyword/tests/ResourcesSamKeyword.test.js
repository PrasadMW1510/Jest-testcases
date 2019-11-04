import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ResourcesSamKeyword from '../index';

describe('<ResourcesSamKeyword />', () => {
  let wrapper = null;
  let mockApps = null;
  let mockPostResourcesQuickSearch = null;
  let mockUpdateResourcesQuickModalStatus = null;
  let mockModalQuickStatus = null;
  let mockResponseQuickSearch = null;

  beforeEach(() => {
    mockApps = fromJS([]);
    mockPostResourcesQuickSearch = jest.fn();
    mockUpdateResourcesQuickModalStatus = jest.fn();
    mockModalQuickStatus = false;
    mockResponseQuickSearch = fromJS({});

    wrapper = shallow(
      <ResourcesSamKeyword
        Apps={mockApps}
        postResourcesQuickSearch={mockPostResourcesQuickSearch}
        updateResourcesQuickModalStatus={mockUpdateResourcesQuickModalStatus}
        modalQuickStatus={mockModalQuickStatus}
        responseQuickSearch={mockResponseQuickSearch}
      />
    );
  });

  it('Expect to render itself', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('verify when the app data exist', () => {
    beforeEach(() => {
      mockApps = fromJS([
        {
          app_id: ['SMI'],
          name: ['math inventory'],
        },
        {
          app_id: ['DTM'],
          name: ['Do The Math!'],
        },
      ]);
      wrapper.setProps({ Apps: mockApps });
    });

    it('verify with the Apps has data', () => {
      wrapper.setState({ inputData: 'math' });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify handle input box', () => {
      const event = {
        preventDefault: jest.fn(),
        target: { value: 'math' },
      };
      wrapper.instance().handleInputBox(event);
      expect(wrapper.state('inputData')).toEqual(event.target.value);
    });

    it('verify handle click method', () => {
      const event = {
        preventDefault: jest.fn(),
        target: { value: 'math' },
      };
      wrapper.instance().handleClick(event);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify handle sorting post call', () => {
      const sortTerm = {
        term: 'resourceName',
        order: 'asc',
      };
      wrapper.instance().sortingPostCall(sortTerm);
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify modal status', () => {
      wrapper.setProps({ modalQuickStatus: true, responseQuickSearch: fromJS({}) });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('verify modal status', () => {
      wrapper.setProps({ modalQuickStatus: true, responseQuickSearch: undefined });
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
