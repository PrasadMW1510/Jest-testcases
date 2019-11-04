import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SAMTable from 'components/SAMTable';
import { formatDate } from 'utils/utilities';
import MessageLogTable from '../index';

describe('<MessageLogTable />', () => {
  let wrapper = null;
  let mockMessagesData = null;
  const mockHandleRowCheckboxOnChange = jest.fn();
  const mockOnShowMeClick = jest.fn();
  const mockToggleAll = jest.fn();

  describe('props.messages is empty array', () => {
    it('Should render correctly', () => {
      wrapper = shallow(
        <MessageLogTable
          messages={[]}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          onShowMeClick={mockOnShowMeClick}
          toggleAllCheckboxes={mockToggleAll}
        />
      );
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should populates the SAMTable with no data', () => {
      const table = wrapper.find(SAMTable);
      const { data } = table.props();

      expect(data).toEqual([]);
    });
  });

  describe('props.messages is not an empty array', () => {
    beforeEach(() => {
      mockMessagesData = [
        {
          message_id: [1],
          message_type: ['Unknown'],
          message_title: ['Message title mock 1'],
          product: ['product1'],
          message_date: ['2017-06-26'],
        },
        {
          message_id: [12],
          message_type: ['Unknown'],
          message_title: ['Message title mock 2'],
          product: ['SLMS'],
          message_date: ['2017-06-26'],
        },
      ];

      wrapper = shallow(
        <MessageLogTable
          messages={mockMessagesData}
          handleRowCheckboxOnChange={mockHandleRowCheckboxOnChange}
          onShowMeClick={mockOnShowMeClick}
          toggleAllCheckboxes={mockToggleAll}
        />
      );
    });

    it('Should render correctly', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Should have a SAMTable', () => {
      expect(wrapper.find('SAMTable')).toHaveLength(1);
    });

    it('should populate the SAMTable with the right columns', () => {
      const mockData = {
        message_id: 1,
        message_type: 'Unknown',
        message_title: 'Message title mock 1',
        product: 'product1',
        message_date: '2017-06-26',
      };

      const mockRowData = {
        original: mockData,
      };

      const table = wrapper.find(SAMTable);
      const { columns } = table.props();
      const messageColumn = columns.find(row => row.Header === 'Message');
      const dateColumn = columns.find(row => row.Header === 'Date');
      const messageRowWrapper = shallow(messageColumn.Cell(mockRowData));

      expect(messageColumn.accessor(mockData)).toEqual(mockData.message_title);
      expect(shallowToJson(messageRowWrapper)).toMatchSnapshot();
      expect(dateColumn.accessor(mockData)).toEqual(formatDate(mockData.message_date));
      expect(messageColumn.getProps()).toEqual({ className: 'msg-log-table__message-td' });
    });

    describe('product column', () => {
      let productColumn = null;
      beforeEach(() => {
        mockMessagesData = [
          {
            message_id: [1],
            message_type: ['Unknown'],
            message_title: ['Message title mock 1'],
            product: ['product1'],
            message_date: ['2017-06-26'],
          },
          {
            message_id: [12],
            message_type: ['Unknown'],
            message_title: ['Message title mock 2'],
            product: ['SLMS'],
            message_date: ['2017-06-26'],
          },
        ];

        const samTable = wrapper.find(SAMTable);
        const { columns } = samTable.props();
        productColumn = columns.find(row => row.Header === 'Product');
      });

      it('expect product column to be product', () => {
        expect(productColumn.accessor(mockMessagesData[0])).toEqual(mockMessagesData[0].product);
      });

      it('expect product column to SAM', () => {
        expect(productColumn.accessor(mockMessagesData[1])).not.toEqual(
          mockMessagesData[1].product
        );
        expect(productColumn.accessor(mockMessagesData[1])).toEqual('SAM');
      });
    });

    it('populates the SAMTable with the right data', () => {
      const mockTableData = mockMessagesData.map(rowData => ({
        _id: rowData.message_id,
        ...rowData,
      }));

      const table = wrapper.find(SAMTable);
      const { data } = table.props();

      expect(data).toEqual(mockTableData);
    });
  });
});
