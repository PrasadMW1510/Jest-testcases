/**
 *
 * StudentsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import './StudentsTable.scss';

function StudentsTable({
  students,
  studentIdsChecked,
  handleRowCheckboxOnChange,
  toggleAllCheckboxes,
  selectAll,
}) {
  const columns = [
    {
      Header: 'Last Name',
      accessor: 'last_name',
      width: 200,
    },
    {
      Header: 'First Name',
      accessor: 'first_name',
    },
  ];

  function renderEmptyMsgTable() {
    return (
      <div className="roster-students-table__no-data">
        <div className="roster-students-table__no-data-text">No students.</div>
      </div>
    );
  }

  function renderTableData() {
    return students.map(rowData => ({
      _id: rowData.user_id && rowData.user_id[0],
      ...rowData,
    }));
  }
  return (
    <SAMTable
      checkedIds={studentIdsChecked}
      className="roster-students-table"
      columns={columns}
      data={renderTableData()}
      renderEmptyTable={renderEmptyMsgTable}
      handleRowCheckboxOnChange={handleRowCheckboxOnChange}
      toggleAllCheckboxes={toggleAllCheckboxes}
      selectAll={selectAll}
      pageSize={students.length}
      hasCheckboxes
    />
  );
}

StudentsTable.defaultProps = {
  students: [],
  studentIdsChecked: [],
  selectAll: false,
};

StudentsTable.propTypes = {
  students: PropTypes.array,
  studentIdsChecked: PropTypes.array,
  selectAll: PropTypes.bool,
  handleRowCheckboxOnChange: PropTypes.func.isRequired,
  toggleAllCheckboxes: PropTypes.func.isRequired,
};

export default StudentsTable;
