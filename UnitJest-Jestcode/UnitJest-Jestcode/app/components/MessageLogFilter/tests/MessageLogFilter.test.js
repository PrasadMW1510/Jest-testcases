import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MessageLogFilter from '../index';

describe('<MessageLogFilter />', () => {
  let wrapper = null;
  let mockProductsAvailable = null;
  const mockHandleProductFilter = jest.fn();

  beforeEach(() => {
    mockProductsAvailable = [
      {
        community_id: 'mockId1',
        name: 'mockName1',
      },
      {
        community_id: 'mockId2',
        name: 'mockName2',
      },
    ];

    wrapper = shallow(
      <MessageLogFilter
        productsAvailable={mockProductsAvailable}
        handleProductFilter={mockHandleProductFilter}
      />
    );
  });

  it('Should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('filter is selected', () => {
    wrapper.find('select').simulate('change', { target: { value: 'mockValue' } });
    expect(mockHandleProductFilter).toHaveBeenCalledWith('mockValue');
  });
});
