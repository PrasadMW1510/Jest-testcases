/**
 *
 * AddGroupTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';

import './AddGroupTable.scss';

class AddGroupTable extends React.Component {
  constructor(props) {
    super(props);
    this.firstColumn = null;
    this.state = {
      isLastName: true,
    };
  }

  componentDidMount() {
    if (this.firstColumn) {
      this.firstColumn.click();
    }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ isLastName: !this.state.isLastName });
  };

  columns = [
    {
      Header: () => <span ref={node => (this.firstColumn = node)}>Last Name</span>,
      id: 'last_name',
      accessor: 'last_name',
      width: 170,
    },
    {
      Header: () => <span onChange={this.handleChange}>First Name</span>,
      id: 'first_name',
      accessor: 'first_name',
      width: 178,
    },
  ];

  studentsList = () =>
    this.props.students.map(student => ({ _id: student.user_id[0], ...student }));

  render() {
    return (
      <SAMTable
        className="add-group-select-student"
        checkedIds={this.props.studentIdChecked}
        handleRowCheckboxOnChange={this.props.handleRowCheckboxOnChange}
        columns={this.columns}
        data={this.studentsList()}
        pageSize={this.props.students.length}
        toggleAllCheckboxes={this.props.toggleAllCheckboxes}
        selectAll={this.props.selectAll}
        hasCheckboxes
      />
    );
  }
}

AddGroupTable.propTypes = {
  toggleAllCheckboxes: PropTypes.func.isRequired,
  selectAll: PropTypes.bool,
  handleRowCheckboxOnChange: PropTypes.func.isRequired,
  studentIdChecked: PropTypes.array,
  students: PropTypes.array,
};

export default AddGroupTable;
