import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { NavBarWithModalContainer } from '../index';

describe('<NavBarWithModalContainer />', () => {
  let wrapper = null;
  let mockTabs = null;
  const mockShowModal = jest.fn();
  afterEach(() => jest.resetAllMocks());
  beforeEach(() => {
    mockTabs = [
      {
        id: 'mockTabId1',
        label: 'mockTabLabel1',
        renderFunction: jest.fn(),
      },
      {
        id: 'mockTabId2',
        label: 'mockTabLabel2',
        renderFunction: jest.fn(),
      },
    ];
    wrapper = shallow(<NavBarWithModalContainer showModal={mockShowModal} tabs={mockTabs} />);
  });
  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('expect first tab renderFunction is called', () => {
    expect(mockTabs[0].renderFunction).toHaveBeenCalled();
  });
  it('handleTabClick', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        id: mockTabs[1].id,
      },
    };
    wrapper.instance().handleTabClick(mockEvent);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
    expect(mockShowModal).toHaveBeenCalled();
  });
});
