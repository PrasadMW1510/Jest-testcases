import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import ProgramSettingsNavBar from '../index';

describe('<ProgramSettingsNavBar />', () => {
  let wrapper = null;
  let wrapperInstance = null;

  let mockTabs = null;

  beforeEach(() => {
    mockTabs = [
      {
        id: 'mockTabId1',
        label: 'mockTabLabel1',
        renderFunction: jest.fn(),
        renderAction: jest.fn(),
      },
      {
        id: 'mockTabId2',
        label: 'mockTabLabel2',
        renderFunction: jest.fn(),
        renderAction: jest.fn(),
      },
    ];
  });

  describe('render two tabs', () => {
    beforeEach(() => {
      wrapper = shallow(<ProgramSettingsNavBar tabs={mockTabs} />);

      wrapperInstance = wrapper.instance();
    });

    it('Expect to render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('expect first tab renderFunction is called', () => {
      expect(mockTabs[0].renderFunction).toHaveBeenCalled();
    });

    it('handleTabClick', () => {
      const mockEvent = {
        currentTarget: {
          id: mockTabs[1].id,
        },
      };
      wrapperInstance.handleTabClick(mockEvent);

      expect(shallowToJson(wrapper)).toMatchSnapshot();
      expect(wrapper.state('activeTab')).toEqual(mockTabs[1].id);
      expect(mockTabs[1].renderFunction).toHaveBeenCalled();
      expect(mockTabs[1].renderAction).toHaveBeenCalled();
      expect(mockTabs[0].renderAction).not.toHaveBeenCalled();
    });
  });

  it('isolateTab and overrideClassName', () => {
    wrapper = shallow(
      <ProgramSettingsNavBar tabs={mockTabs} overrideClassName="mockOverrideClassName" isolateTab />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
