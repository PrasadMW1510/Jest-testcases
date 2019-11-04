import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import MessageLogFilter from 'components/MessageLogFilter';
import MessageLogStatusBar from 'components/MessageLogStatusBar';
import MessageLogTable from 'components/MessageLogTable';
import { ALL_PRODUCT_FILTER } from 'containers/MessageContainer/constants';
import MessageLog from '../index';

describe('<MessageLog />', () => {
  let wrapper = null;
  let wrapperInstance = null;
  let mockMessages = null;
  const mockHandleDeleteOnClick = jest.fn();
  const mockOnShowMeClick = jest.fn();
  const mockProductsAvailable = [];

  beforeEach(() => {
    mockMessages = [];

    wrapper = mount(
      <MessageLog
        messages={mockMessages}
        handleDeleteOnClick={mockHandleDeleteOnClick}
        onShowMeClick={mockOnShowMeClick}
        productsAvailable={mockProductsAvailable}
      />
    );

    wrapperInstance = wrapper.instance();
  });

  it('Should render correctly', () => {
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('Should have a MessageLogFilter', () => {
    expect(
      wrapper.contains(
        <MessageLogFilter
          productsAvailable={mockProductsAvailable}
          handleProductFilter={wrapperInstance.handleProductFilter}
        />
      )
    ).toBeTruthy();
  });

  it('Should not have a MessageLogStatusBar', () => {
    // We removed this for the time being
    expect(wrapper.contains(<MessageLogStatusBar />)).toBeFalsy();
  });

  it('Should have a MessageLogTable', () => {
    expect(
      wrapper.contains(
        <MessageLogTable
          messages={mockMessages}
          messageIdsChecked={[]}
          handleRowCheckboxOnChange={wrapperInstance.handleRowCheckboxOnChange}
          onShowMeClick={mockOnShowMeClick}
          toggleAllCheckboxes={wrapperInstance.toggleAllCheckboxes}
        />
      )
    ).toBeTruthy();
  });

  describe('handleRowCheckboxOnChange', () => {
    it('isChecked is true', () => {
      wrapperInstance.handleRowCheckboxOnChange(true, 123);
      expect(wrapper.state('messageIdsChecked')).toEqual([123]);
    });

    it('isChecked is false', () => {
      wrapper.setState({ messageIdsChecked: [123] });
      wrapperInstance.handleRowCheckboxOnChange(false, 123);
      expect(wrapper.state('messageIdsChecked')).toEqual([]);
    });
  });

  describe('toggleAllCheckboxes', () => {
    it('isChecked is true', () => {
      const checkboxes = [123, 456];

      wrapperInstance.toggleAllCheckboxes(true, [123, 456]);
      expect(wrapper.state('messageIdsChecked')).toEqual(checkboxes);
    });

    it('isChecked is false', () => {
      wrapper.setState({ messageIdsChecked: [123] });
      wrapperInstance.toggleAllCheckboxes(false, []);
      expect(wrapper.state('messageIdsChecked')).toEqual([]);
    });
  });

  describe('handleDeleteClicked', () => {
    it('messageIdsChecked is empty', () => {
      wrapper.find('button').simulate('click');
      expect(mockHandleDeleteOnClick).not.toHaveBeenCalled();
    });

    describe('messageIdsChecked is not empty', () => {
      beforeEach(() => {
        wrapper.setState({ messageIdsChecked: [123] });
        wrapper.find('button').simulate('click');
      });

      it('handleDeleteOnClick is called', () => {
        expect(mockHandleDeleteOnClick).toHaveBeenCalledWith([123]);
      });

      it('messageIdsChecked is set to empty array', () => {
        expect(wrapper.state('messageIdsChecked')).toEqual([]);
      });
    });
  });

  describe('handleProductFilter', () => {
    beforeEach(() => {
      wrapper.setState({ messageIdsChecked: [123], productFilter: '' });
      wrapperInstance.handleProductFilter('testProduct');
    });

    it('messageIdsChecked is set to empty array', () => {
      expect(wrapper.state().messageIdsChecked).toEqual([]);
    });

    it('productFilter is set to testProduct', () => {
      expect(wrapper.state().productFilter).toBe('testProduct');
    });
  });

  describe('filterMessages', () => {
    it('value is ALL_PRODUCT_FILTER', () => {
      wrapper.setState({ messageIdsChecked: [123], productFilter: ALL_PRODUCT_FILTER });
      expect(wrapperInstance.filterMessages(ALL_PRODUCT_FILTER)).toBeTruthy();
    });

    it('value and state.productFilter are the same', () => {
      wrapper.setState({ messageIdsChecked: [123], productFilter: 'testProduct' });
      const mockValue = { product: ['testProduct'] };
      expect(wrapperInstance.filterMessages(mockValue)).toBeTruthy();
    });

    it('value and state.productFilter are not the same', () => {
      wrapper.setState({ messageIdsChecked: [123], productFilter: 'testProduct' });
      const mockValue = { product: ['testProduct2'] };
      expect(wrapperInstance.filterMessages(mockValue)).toBeFalsy();
    });
  });
});
