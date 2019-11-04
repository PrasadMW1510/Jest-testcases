import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import moment from 'moment';
import SearchResultsEditCell from './SearchResultsEditCell';

class ResultsTable extends React.Component {
  state = {
    flag: false,
    data: [],
  };

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });
  }

  onRowClick = (state, rowInfo) => ({
    onClick: () => {
      this.checkData(rowInfo.original, rowInfo.index);
    },
  });

  setActiveTab = (event, row, selectedIndex, metaData) => {
    this.props.handleClick(row, false, selectedIndex, metaData);
  };

  getData = () => {
    if (this.state.data !== undefined) {
      const data = this.state.data.map(item => ({
        _id: item.id,
        ...item,
      }));
      return data;
    }
    return [];
  };

  checkData = (row, rowIndex) => {
    this.props.handleDetailProgram(row, false, rowIndex, this.state.data);
  };

  calculateRowCount = () => {
    if (this.state.data !== undefined) {
      return this.state.data.length;
    }
    return 0;
  };

  columns = [
    {
      Header: 'Date',
      id: 'date',
      accessor: d => {
        moment.locale('en');
        const formattedDT = moment(`${d.date}`).format('MM/DD/YYYY');
        return formattedDT;
      },
      width: 100,
    },
    {
      Header: 'Name',
      id: 'student',
      accessor: 'student',
      sortable: true,
      width: 150,
    },
    {
      Header: 'Assignment',
      id: 'assignment',
      accessor: 'assignment',
      sortable: true,
      width: 150,
    },
    {
      Header: 'From',
      accessor: 'from',
      sortable: true,
      width: 120,
    },
    {
      Header: 'Program',
      accessor: 'community_id',
      Cell: row => (
        <div className="search-result-table__group">
          <SearchResultsEditCell rowData={row.original} />
        </div>
      ),
      sortable: true,
      width: 120,
    },
  ];
  render() {
    return (
      <div className="inbox-table">
        <SAMTable
          columns={this.columns}
          checkedIds={this.props.searchResultsIdsChecked}
          data={this.getData()}
          hasCheckboxes
          pageSize={this.calculateRowCount()}
          toggleAllCheckboxes={this.props.toggleAllCheckboxes}
          handleRowSelections={this.props.handleRowSelections}
          handleRowCheckboxOnChange={this.props.handleRowCheckboxOnChange}
          selectAll={this.props.selectAll}
          getTrProps={this.onRowClick}
        />
      </div>
    );
  }
}

ResultsTable.propTypes = {
  handleClick: PropTypes.func,
  toggleAllCheckboxes: PropTypes.func.isRequired,
  handleRowSelections: PropTypes.func.isRequired,
  handleRowCheckboxOnChange: PropTypes.func.isRequired,
  searchResultsIdsChecked: PropTypes.array,
  selectAll: PropTypes.bool,
  handleDetailProgram: PropTypes.func.isRequired,
};

export default ResultsTable;
