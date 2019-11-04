/**
 *
 * SearchResultsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'components/LoadingBar';
import SAMTable from 'components/SAMTable';
import { USER_TYPE } from 'containers/App/constants';
import { SEARCH_STUDENT, SEARCH_TEACHER } from 'containers/SearchModalContainer/constants';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import './SearchResultsTable.scss';

class SearchResultsTable extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  teacherSearchStudentColumns = [
    {
      Header: 'Name',
      id: 'name',
      accessor: d => `${d.last_name}, ${d.first_name}`,
      width: 144,
    },
    {
      Header: 'Student ID',
      id: 'student_id',
      accessor: 'student_id',
      width: 110,
    },
    {
      Header: 'Username',
      accessor: 'user_name',
      width: 145,
    },
    {
      Header: 'Grade',
      id: 'grade',
      accessor: 'grade',
      width: 72,
    },
    {
      Header: 'Classes',
      id: 'classes',
      accessor: 'classes',
      width: 145,
    },
    {
      Header: 'Teachers',
      id: 'teachers',
      accessor: 'teachers',
      width: 145,
    },
    {
      Header: 'Enrollment',
      id: 'enrollment',
      accessor: 'enrollment',
      width: 144,
    },
  ];

  adminOrTechSearchStudentColumns = [
    {
      Header: 'Name',
      id: 'name',
      accessor: d => `${d.last_name}, ${d.first_name}`,
      width: 144,
    },
    {
      Header: 'Student ID',
      id: 'student_id',
      accessor: 'student_id',
      width: 110,
    },
    {
      Header: 'Username',
      id: 'user_name',
      accessor: 'user_name',
      width: 145,
    },
    {
      Header: 'Grade',
      id: 'grade',
      accessor: 'grade',
      width: 72,
    },
    {
      Header: 'Schools',
      id: 'schools',
      accessor: 'schools',
      width: 145,
    },
    {
      Header: 'Classes',
      id: 'classes',
      accessor: 'classes',
      width: 145,
    },
    {
      Header: 'Enrollment',
      id: 'enrollment',
      accessor: 'enrollment',
      width: 144,
    },
  ];

  adminOrTechSearchTeacherColumns = [
    {
      Header: 'Name',
      id: 'name',
      accessor: d => `${d.last_name}, ${d.first_name}`,
      width: 208,
    },
    {
      Header: 'District User ID',
      id: 'district_user_id',
      accessor: 'district_user_id',
      width: 156,
    },
    {
      Header: 'Username',
      id: 'user_name',
      accessor: 'user_name',
      width: 105,
    },
    {
      Header: 'Schools',
      id: 'schools',
      accessor: 'schools',
      width: 206,
    },
    {
      Header: 'Classes',
      id: 'classes',
      accessor: 'classes',
      width: 208,
    },
  ];

  // Determine the results columns based on USER_Type and if search was for (a)Student or was for (b)Teacher
  determineSAMTableColumns = () => {
    let result = this.teacherSearchStudentColumns;
    if (
      this.props.resultsType === SEARCH_STUDENT &&
      this.props.profileUserType === USER_TYPE.Teacher
    ) {
      result = this.teacherSearchStudentColumns;
    } else if (
      this.props.resultsType === SEARCH_STUDENT &&
      isUserTypeAdminOrTech(this.props.profileUserType)
    ) {
      result = this.adminOrTechSearchStudentColumns;
    } else if (
      this.props.resultsType === SEARCH_TEACHER &&
      isUserTypeAdminOrTech(this.props.profileUserType)
    ) {
      result = this.adminOrTechSearchTeacherColumns;
    }
    return result;
  };

  // Determine the result data based on if Search Results has (a)student or has (b)teacher data
  determineSAMTableData = () => {
    let result = [];
    if (this.props.searchResults.students && this.props.searchResults.students.length > 0) {
      const studentData = this.props.searchResults.students;
      result = studentData;
    }
    if (this.props.searchResults.teachers && this.props.searchResults.teachers.length > 0) {
      const teacherData = this.props.searchResults.teachers;
      result = teacherData;
    }
    return result;
  };

  calculateRowCount = () => {
    if (this.props.searchResults.itemCount && this.props.searchResults.itemCount > 0) {
      const totalItems = Number(this.props.searchResults.itemCount);
      const curPage = Number(this.props.searchResults.paginationData.current_page);
      const ipp = Number(this.props.searchResults.paginationData.items_per_page);
      const low = curPage * ipp + 1;
      const high = (curPage + 1) * ipp > totalItems ? totalItems : (curPage + 1) * ipp;
      const result = high - low + 1;
      return result;
    }
    return null;
  };

  renderTableData = () => {
    const resultsData = this.determineSAMTableData();
    return resultsData.map(rowData => ({
      _id: rowData.user_id,
      ...rowData,
    }));
  };

  renderEmptySearchTable = () => {
    if (
      !isNaN(this.props.searchResults.itemCount) &&
      Number(this.props.searchResults.itemCount) === 0
    ) {
      return (
        <div className="search-results-reusable-table__no-data">
          <div className="search-results-reusable-table__no-data-text">
            There are no items to display.
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    if (this.props.searchResults.loading) {
      return (
        <div className="search-results__loading-bar">
          <LoadingBar />
        </div>
      );
    }
    return (
      <SAMTable
        checkedIds={this.props.searchResultsIdsChecked}
        className="search-results-reusable-table"
        columns={this.determineSAMTableColumns()}
        data={this.renderTableData()}
        renderEmptyTable={this.renderEmptySearchTable}
        handleRowCheckboxOnChange={this.props.handleRowCheckboxOnChange}
        hasCheckboxes
        toggleAllCheckboxes={this.props.toggleAllCheckboxes}
        selectAll={this.props.selectAll}
        pageSize={this.calculateRowCount()}
      />
    );
  }
}

SearchResultsTable.defaultProps = {
  searchResults: {},
  profileUserType: USER_TYPE.Teacher,
  selectAll: false,
  searchResultsIdsChecked: [],
};

SearchResultsTable.propTypes = {
  searchResults: PropTypes.object,
  profileUserType: PropTypes.string,
  resultsType: PropTypes.string,
  handleRowCheckboxOnChange: PropTypes.func.isRequired,
  toggleAllCheckboxes: PropTypes.func.isRequired,
  selectAll: PropTypes.bool,
  searchResultsIdsChecked: PropTypes.array,
};

export default SearchResultsTable;
