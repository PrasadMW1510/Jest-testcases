/**
 *
 * TopicManagerStudentViewTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import './TopicManagerStudentViewTable.scss';

function TopicManagerStudentViewTable({
  currentTopicID,
  handleToggleEnabled,
  secondColumnHeader,
  skippedLevel,
  skippedTopicId,
  skipTopic,
  topics,
  topicId,
  topicName,
}) {
  const columns = [
    {
      Header: 'Enabled',
      id: 'topics',
      accessor: 'id',
      sortable: false,
      width: 100,
      getHeaderProps: () => ({ className: 'manage-topic-table__header-enabled' }),
      Cell: row => (
        <div className="manage-topic-table__cell-enabled">
          <SettingsFourStateCheckbox
            currentCheckboxValue={getCheckBoxStatus(row)}
            checkboxId={row.original.id}
            handleChangeCheckboxValue={handleToggleEnabled}
            isCheckboxDisabled={'-1'}
          />
        </div>
      ),
    },
    {
      Header: secondColumnHeader,
      accessor: 'cd_name',
      width: 100,
      Cell: row => <div className="manage-topic-table__topic-cell">{row.original.cd_name}</div>,
    },
    {
      Header: 'Topic Name',
      id: 'topic_name',
      accessor: 'topic_name',
      width: 200,
    },
    {
      id: 'completion_level_1',
      accessor: 'completion_level_1',
      width: 50,
    },
    {
      Header: 'Completion Level(s)',
      id: 'completion_level_2',
      accessor: 'completion_level_2',
      width: 50,
      align: 'center',
      getHeaderProps: () => ({ className: 'manage-topic-table__header-completion-level' }),
    },
    {
      id: 'completion_level_3',
      accessor: 'completion_level_3',
      width: 50,
      align: 'center',
    },
    {
      id: 'completion_level_4',
      accessor: 'completion_level_4',
      width: 50,
      align: 'center',
    },
  ];

  function getCheckBoxStatus(row) {
    if (row.original.enabled === 0 && row.original.globally_enabled === '0') return '-1';
    if (row.original.enabled === 1 && row.original.globally_enabled === '0') return '2';
    return String(row.original.enabled);
  }

  const getCompletionLevel = (row, givenLevel) => {
    if (typeof row.topic_complete_levels !== 'undefined') {
      const a = row.topic_complete_levels[0].topic_complete_level.find(
        level => level.level[0] === givenLevel
      );
      if (a)
        switch (a.segments[0].segment1_status[0]) {
          case '2':
            return `${a.level[0]}(S)`;
          default:
            return a.level[0];
        }
    }
    return '';
  };

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
      topics.topic_cd.map(rowData => ({
        _id: rowData.cd_name && rowData.cd_name[0],
        id: rowData.cd_name && rowData.cd_name[0],
        enabled: rowData.enable && Number(rowData.enable[0]),
        cd_name: getTopicId(rowData),
        completion_level_1: getSkippedLevel(rowData),
        completion_level_2: getCompletionLevel(rowData, '2'),
        completion_level_3: getCompletionLevel(rowData, '3'),
        completion_level_4: getCompletionLevel(rowData, '4'),
        supplimental: rowData.supplimental && rowData.supplimental[0],
        globally_enabled: rowData.globally_enabled && rowData.globally_enabled[0],
        topic_name: getTopicName(rowData),
      }))
    );
  }

  function getSkippedLevel(rowData) {
    if (skipTopic) {
      if (rowData.cd_name[0] === skippedTopicId) return `${skippedLevel}(S)`;
    }
    return getCompletionLevel(rowData, '1');
  }

  function getTopicId(rowData) {
    if (rowData.cd_name[0] === currentTopicID) {
      return topicId;
    }
    return rowData.cd_name[0];
  }

  function getTopicName(rowData) {
    if (rowData.cd_name[0] === currentTopicID) {
      return topicName;
    }
    return rowData.topic_name[0];
  }

  function getTrProps(state, rowInfo) {
    const higlightrow = currentTopicID && currentTopicID;
    if (rowInfo.original.id === higlightrow) {
      return {
        style: {
          background: '#ffef9f',
          color: '#000',
          fontWeight: 'bold',
        },
      };
    }
    return {};
  }

  return (
    <SAMTable
      className="manage-topic-square-view-table"
      columns={columns}
      data={renderTableData()}
      getTrProps={getTrProps}
      renderEmptyTable={renderEmptyTable}
      pageSize={topics && topics.topic_cd.length}
    />
  );
}

TopicManagerStudentViewTable.defaultProps = {
  secondColumnHeader: 'Topic ID',
  topics: {},
};

TopicManagerStudentViewTable.propTypes = {
  currentTopicID: PropTypes.any,
  handleToggleEnabled: PropTypes.any,
  secondColumnHeader: PropTypes.string,
  skippedLevel: PropTypes.any,
  skippedTopicId: PropTypes.any,
  skipTopic: PropTypes.any,
  topics: PropTypes.any,
  topicId: PropTypes.any,
  topicName: PropTypes.any,
};

export default TopicManagerStudentViewTable;
