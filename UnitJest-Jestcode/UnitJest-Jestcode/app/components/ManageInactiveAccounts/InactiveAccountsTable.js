import React from 'react';
import SAMTable from 'components/SAMTable';
import PropTypes from 'prop-types';
import { COHORT_TYPE } from 'containers/App/constants';
import { ITEMS_PER_PAGE, TABLE_FIELDS } from './constants';
import './InactiveAccountsTable.scss';

class InactiveAccountsTable extends React.Component {
  getColumns = () => {
    let columns;

    switch (this.props.cohortSelection) {
      case COHORT_TYPE.Student: {
        columns = [
          {
            Header: 'Name',
            accessor: TABLE_FIELDS.Name,
            defaultSort: true,
            queryParam: 'last_name',
            width: 200,
            Cell: row => (
              <span
                role="link"
                className="mia-data-table__link"
                tabIndex={0} // eslint-disable-next-line no-underscore-dangle
                onClick={() => this.props.onEdit(row)}
              >
                {row.original.name}
              </span>
            ),
          },
          {
            Header: 'Student ID',
            accessor: TABLE_FIELDS.StudentId,
            queryParam: 'sis_id',
            width: 180,
          },
          {
            Header: 'Username',
            accessor: TABLE_FIELDS.UserName,
            queryParam: 'user_name',
            width: 180,
          },
          {
            Header: 'Status',
            accessor: TABLE_FIELDS.Status,
            queryParam: 'is_attached',
            width: 65,
          },
          {
            Header: 'Enrollment',
            accessor: TABLE_FIELDS.Enrollment,
            className: 'rt-td__enrollment',
            queryParam: 'is_enrolled',
          },
        ];
        break;
      }
      case COHORT_TYPE.Teacher: {
        columns = [
          {
            Header: 'Teacher Name',
            accessor: TABLE_FIELDS.Name,
            queryParam: 'last_name',
            width: 200,
            Cell: row => (
              <span
                role="link"
                className="mia-data-table__link"
                tabIndex={0} // eslint-disable-next-line no-underscore-dangle
                onClick={() => this.props.onEdit(row)}
              >
                {row.original.name}
              </span>
            ),
          },
          {
            Header: 'District User ID',
            accessor: TABLE_FIELDS.DistrictUserId,
            queryParam: 'district_user_id',
          },
          {
            Header: 'Username',
            accessor: TABLE_FIELDS.UserName,
            queryParam: 'user_name',
          },
          {
            Header: 'School',
            accessor: TABLE_FIELDS.School,
            queryParam: 'school_name',
          },
        ];
        break;
      }
      case COHORT_TYPE.Class: {
        columns = [
          {
            Header: 'Name',
            accessor: TABLE_FIELDS.Name,
            defaultSort: true,
            queryParam: 'name',
            Cell: row => (
              <span
                role="link"
                className="mia-data-table__link"
                tabIndex={0} // eslint-disable-next-line no-underscore-dangle
                onClick={() => this.props.onEdit(row)}
              >
                {row.original.name}
              </span>
            ),
          },
          {
            Header: 'School',
            accessor: TABLE_FIELDS.School,
            queryParam: 'school_name',
          },
          {
            Header: 'Grades',
            accessor: TABLE_FIELDS.Grade,
            queryParam: 'grade',
          },
        ];
        break;
      }
      case COHORT_TYPE.School: {
        columns = [
          {
            Header: 'Name',
            accessor: TABLE_FIELDS.Name,
            defaultSort: true,
            queryParam: 'name',
            Cell: row => (
              <span
                role="link"
                className="mia-data-table__link"
                tabIndex={0} // eslint-disable-next-line no-underscore-dangle
                onClick={() => this.props.onEdit(row)}
              >
                {row.original.name}
              </span>
            ),
          },
          {
            Header: 'School ID',
            accessor: TABLE_FIELDS.SchoolId,
            queryParam: 'school_number',
          },
          {
            Header: 'Grades',
            accessor: TABLE_FIELDS.Grade,
            queryParam: 'grade',
          },
        ];
        break;
      }

      default:
        break;
    }
    return columns;
  };

  checkIfDataLoading = () => this.props.isLoadingNewCohort || this.props.isLoadingNewPageOrSort;

  renderEmptyMsgTable = () => (
    <div className="mia-data-table__no-data">
      {!this.checkIfDataLoading() && (
        <div className="mia-data-table__no-data-text">No results.</div>
      )}
    </div>
  );

  render = () => {
    const {
      allSelected,
      checkedIds,
      handleFetchData,
      handleRowCheckboxOnChange,
      isLoadingNewCohort,
      rowData,
      toggleAllCheckboxes,
    } = this.props;
    const isDataLoading = this.checkIfDataLoading();
    return (
      <SAMTable
        checkedIds={checkedIds}
        className="mia-data-table"
        columns={this.getColumns()}
        data={isLoadingNewCohort ? [] : rowData}
        handleRowCheckboxOnChange={handleRowCheckboxOnChange}
        hasCheckboxes
        loading={isDataLoading}
        manual
        minRows={0}
        onFetchData={handleFetchData}
        pageSize={ITEMS_PER_PAGE}
        renderEmptyTable={this.renderEmptyMsgTable}
        selectAll={allSelected}
        toggleAllCheckboxes={toggleAllCheckboxes}
      />
    );
  };
}

InactiveAccountsTable.defaultProps = {
  allSelected: false,
  checkedIds: [],
  isLoadingNewPageOrSort: false,
  isLoadingNewCohort: false,
  rowData: [],
};

InactiveAccountsTable.propTypes = {
  allSelected: PropTypes.bool.isRequired,
  checkedIds: PropTypes.array.isRequired,
  cohortSelection: PropTypes.string.isRequired,
  handleFetchData: PropTypes.func.isRequired,
  handleRowCheckboxOnChange: PropTypes.func.isRequired,
  isLoadingNewCohort: PropTypes.bool.isRequired,
  isLoadingNewPageOrSort: PropTypes.bool.isRequired,
  rowData: PropTypes.array.isRequired,
  toggleAllCheckboxes: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
};

export default InactiveAccountsTable;
