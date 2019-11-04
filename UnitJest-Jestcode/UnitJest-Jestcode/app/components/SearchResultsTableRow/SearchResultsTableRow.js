/**
 *
 * SearchResultsTableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { USER_TYPE } from 'containers/App/constants';
import { SEARCH_STUDENT, SEARCH_TEACHER } from 'containers/SearchModalContainer/constants';
import { isUserTypeAdminOrTech } from 'utils/utilities';
import './SearchResultsTableRow.scss';

class SearchResultsTableRow extends React.Component {
  // ToDo refactor so that this done in the SAM resuable table.
  render() {
    let fullName = null;
    let teacherResultsForAdmin = null;
    let studentResultsForAdmin = null;
    let studentResultsForTeacher = null;

    if (this.props.rowData.last_name && this.props.rowData.first_name) {
      fullName = `${this.props.rowData.last_name[0]}, ${this.props.rowData.first_name[0]}`;
    }

    let idColumnData = null;
    if (this.props.rowData.student_id && this.props.rowData.student_id[0]) {
      idColumnData = this.props.rowData.student_id[0];
    } else if (this.props.rowData.district_user_id && this.props.rowData.district_user_id[0]) {
      idColumnData = this.props.rowData.district_user_id[0];
    }

    if (
      this.props.resultType === SEARCH_TEACHER &&
      isUserTypeAdminOrTech(this.props.profileUserType)
    ) {
      // for when logged in user is an Adminstrator and search results are teachers
      teacherResultsForAdmin = (
        <tr className="search-results-table__tr">
          <td className="search-results-table__body-col search-results-table__col--extra-small search-results-table__id-col">
            <input id="checkBox" type="checkbox" />
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-large search-results-table__first_name-col">
            {fullName}
          </td>
          <td className="search-results-table__body-col search-results-table__col--medium search-results-table__student_id-col-text">
            {idColumnData}
          </td>
          <td className="search-results-table__body-col search-results-table__col--large search-results-table__user_name-col-text">
            {this.props.rowData.user_name[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--large search-results-table__user_name-col-text">
            {this.props.rowData.schools[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-extra-large search-results-table__enrollment-col">
            {this.props.rowData.classes[0]}
          </td>
        </tr>
      );
    }

    if (
      this.props.resultType === SEARCH_STUDENT &&
      isUserTypeAdminOrTech(this.props.profileUserType)
    ) {
      // for when logged in user is an Adminstrator and search results are students
      studentResultsForAdmin = (
        <tr className="search-results-table__tr">
          <td className="search-results-table__body-col search-results-table__col--extra-small search-results-table__id-col">
            <input id="checkBox" type="checkbox" />
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-large search-results-table__first_name-col">
            {fullName}
          </td>
          <td className="search-results-table__body-col search-results-table__col--medium search-results-table__student_id-col-text">
            {idColumnData}
          </td>
          <td className="search-results-table__body-col search-results-table__col--large search-results-table__user_name-col-text">
            {this.props.rowData.user_name[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--small search-results-table__grade-col">
            {this.props.rowData.grade[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--large search-results-table__user_name-col-text">
            {this.props.rowData.schools[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-extra-large search-results-table__classes-col">
            {this.props.rowData.classes[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-extra-large search-results-table__enrollment-col">
            {this.props.rowData.enrollment[0]}
          </td>
        </tr>
      );
    }

    if (
      this.props.resultType === SEARCH_STUDENT &&
      this.props.profileUserType === USER_TYPE.Teacher
    ) {
      // for when logged in user is a Teacher and search results are students
      studentResultsForTeacher = (
        <tr className="search-results-table__tr">
          <td className="search-results-table__body-col search-results-table__col--extra-small search-results-table__id-col">
            <input id="checkBox" type="checkbox" />
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-large search-results-table__first_name-col">
            {fullName}
          </td>
          <td className="search-results-table__body-col search-results-table__col--medium search-results-table__student_id-col-text">
            {idColumnData}
          </td>
          <td className="search-results-table__body-col search-results-table__col--large search-results-table__user_name-col-text">
            {this.props.rowData.user_name[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--small search-results-table__grade-col">
            {this.props.rowData.grade[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-extra-large search-results-table__classes-col">
            {this.props.rowData.classes[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-extra-large search-results-table__teacher-col">
            {this.props.rowData.teachers[0]}
          </td>
          <td className="search-results-table__body-col search-results-table__col--extra-extra-large search-results-table__enrollment-col">
            {this.props.rowData.enrollment[0]}
          </td>
        </tr>
      );
    }

    let results = null;
    if (isUserTypeAdminOrTech(this.props.profileUserType)) {
      results =
        this.props.resultType === SEARCH_STUDENT ? studentResultsForAdmin : teacherResultsForAdmin;
    } else {
      results = this.props.resultType === SEARCH_STUDENT ? studentResultsForTeacher : null;
    }
    return results;
  }
}

SearchResultsTableRow.defaultProps = {
  profileUserType: USER_TYPE.Teacher,
};

SearchResultsTableRow.propTypes = {
  rowData: PropTypes.object.isRequired,
  profileUserType: PropTypes.string,
  resultType: PropTypes.string,
};

export default SearchResultsTableRow;
