/**
 *
 * ManageTopicTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import './ManageTopicTable.scss';

function ManageTopicTable({ handleToggleEnabled, secondColumnHeader, topics }) {
  const columns = [
    {
      Header: 'Enabled',
      id: 'topics',
      sortable: false,
      width: 130,
      getHeaderProps: () => ({ className: 'manage-topic-table__header-enabled' }),
      Cell: row => (
        <div className="manage-topic-table__cell-enabled">
          <SettingsFourStateCheckbox
            currentCheckboxValue={getCheckBoxStatus(row)}
            checkboxId={row.original.cd_name}
            handleChangeCheckboxValue={handleToggleEnabled}
            isCheckboxDisabled={'-1'}
          />
        </div>
      ),
    },
    {
      Header: secondColumnHeader,
      accessor: 'cd_name',
      width: 128,
      Cell: row => (
        <div className="manage-topic-table__topic-cell">
          {row.original.supplimental === '1' ? '*' : ''}
          {row.original.cd_name}
        </div>
      ),
    },
    {
      Header: 'Topic Name',
      id: 'topic_name',
      accessor: 'topic_name',
    },
  ];

  function getCheckBoxStatus(row) {
    if (row.original.enabled === '0' && row.original.globally_enabled === '0') return '-1';
    return row.original.enabled;
  }

  function renderEmptyTable() {
    return (
      <div className="manage-topic-table__no-data">
        <div className="manage-topic-table__no-data-text">No items.</div>
      </div>
    );
  }

  function renderTableData() {
    return (
      topics &&
      topics.map(rowData => ({
        _id: rowData.cd_name && rowData.cd_name[0],
        enabled: rowData.enable && rowData.enable[0],
        cd_name: rowData.cd_name && rowData.cd_name[0],
        supplimental: rowData.supplimental && rowData.supplimental[0],
        globally_enabled: rowData.globally_enabled && rowData.globally_enabled[0],
        topic_name: rowData.topic_name && rowData.topic_name[0],
      }))
    );
  }
  const data = renderTableData();

  return (
    <SAMTable
      className="manage-topic-table"
      columns={columns}
      data={data}
      renderEmptyTable={renderEmptyTable}
      pageSize={topics && topics.length}
    />
  );
}

ManageTopicTable.defaultProps = {
  secondColumnHeader: 'Topic ID',
  topics: [],
};

ManageTopicTable.propTypes = {
  handleToggleEnabled: PropTypes.any,
  secondColumnHeader: PropTypes.string,
  topics: PropTypes.array,
};

export default ManageTopicTable;
