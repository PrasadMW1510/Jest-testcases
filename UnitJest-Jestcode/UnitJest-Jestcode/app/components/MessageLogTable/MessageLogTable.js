/**
 *
 * MessageLogTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import { formatDate } from 'utils/utilities';
import MessageLogCell from './MessageLogCell';
import './MessageLogTable.scss';

function MessageLogTable({
  messages,
  messageIdsChecked,
  handleRowCheckboxOnChange,
  onShowMeClick,
  toggleAllCheckboxes,
  selectAll,
}) {
  const columns = [
    {
      Header: 'Type',
      accessor: 'type',
      width: 40,
    },
    {
      Header: 'Message',
      id: 'message',
      accessor: d => d.message_title,
      width: 450,
      getProps: () => ({ className: 'msg-log-table__message-td' }),
      Cell: row => (
        <div className="msg-log-table__message-td-group">
          <MessageLogCell rowData={row.original} />
          <hr className="msg-log-table__vertical-line" />
          <div className="msg-log-table__message-td-cell">
            <MessageLogCell link rowData={row.original} onShowMeClick={onShowMeClick} />
          </div>
        </div>
      ),
    },
    {
      Header: 'Product',
      id: 'product',
      accessor: d => (d.product[0] === 'SLMS' ? 'SAM' : d.product),
      width: 100,
    },
    {
      Header: 'Date',
      id: 'date',
      accessor: d => formatDate(d.message_date),
    },
  ];

  function renderEmptyMsgTable() {
    return (
      <div className="msg-log-table__no-data">
        <div className="msg-log-table__no-data-text">
          You have no messages at this time. If you believe you should have messages, contact your
          School Technology Coordinator for assistance.
        </div>
      </div>
    );
  }

  function renderTableData() {
    return messages.map(rowData => ({
      _id: rowData.message_id,
      ...rowData,
    }));
  }

  return (
    <SAMTable
      checkedIds={messageIdsChecked}
      className="msg-log-table"
      columns={columns}
      data={renderTableData()}
      renderEmptyTable={renderEmptyMsgTable}
      handleRowCheckboxOnChange={handleRowCheckboxOnChange}
      hasCheckboxes
      toggleAllCheckboxes={toggleAllCheckboxes}
      selectAll={selectAll}
      pageSize={messages.length}
    />
  );
}

MessageLogTable.defaultProps = {
  messages: [],
  messageIdsChecked: [],
  selectAll: false,
};

MessageLogTable.propTypes = {
  messages: PropTypes.array,
  messageIdsChecked: PropTypes.array,
  selectAll: PropTypes.bool,
  handleRowCheckboxOnChange: PropTypes.func.isRequired,
  onShowMeClick: PropTypes.func.isRequired,
  toggleAllCheckboxes: PropTypes.func.isRequired,
};

export default MessageLogTable;
