import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SAMTable from 'components/SAMTable';
import tickImage from 'images/tick.png';
import { checkProgramImg } from 'utils/utilities';
import SearchResultsEditCell from './SearchResultsEditCell';

import './Assignments.scss';

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });
  }

  setActiveTab = (event, row, selectedIndex, metaData) => {
    this.props.handleClick(row, false, selectedIndex, metaData);
  };

  getData = () => {
    const data = this.state.data.map(item =>
      // using chancejs to generate guid
      // shortid is probably better but seems to have performance issues
      // on codesandbox.io
      //  const _id = item.id;
      ({
        _id: item.id,
        ...item,
      })
    );
    return data;
  };

  calculateRowCount = () => this.state.data.length;

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
      Header: 'Assignment',
      id: 'assignment',
      accessor: 'assignment',
      sortable: true,
      Cell: row => (
        <div className="search-result-table__group">
          <SearchResultsEditCell
            rowData={row.original}
            index={row.index}
            metaData={this.state.data}
            clickHandler={this.setActiveTab}
          />
        </div>
      ),
      width: 150,
    },
    {
      Header: 'From',
      accessor: 'from',
      sortable: true,
      width: 100,
    },
    {
      Header: 'Program',
      id: 'community_id',
      accessor: d => {
        const programImg = checkProgramImg(d.community_id);
        return <img src={programImg} alt="" width="50px" height="20px" />;
      },
      sortable: true,
      width: 120,
    },
    {
      Header: 'Graded',
      id: 'graded',
      accessor: d => {
        const tickSymbol =
          d.graded === 'true' ? <img src={tickImage} alt="" width="20px" height="20px" /> : '';
        return tickSymbol;
      },
      sortable: true,
      width: 150,
    },
  ];
  render() {
    return (
      <div className="assignment-table">
        <SAMTable
          columns={this.columns}
          checkedIds={this.props.searchResultsIdsChecked}
          data={this.getData()}
          pageSize={this.state.data.length}
          toggleAllCheckboxes={this.props.toggleAllCheckboxes}
          handleRowSelections={this.props.handleRowSelections}
          handleRowCheckboxOnChange={this.props.handleRowCheckboxOnChange}
          selectAll={this.props.selectAll}
        />
      </div>
    );
  }
}

ResultsTable.propTypes = {
  handleClick: PropTypes.func.isRequired,
  toggleAllCheckboxes: PropTypes.func.isRequired,
  handleRowSelections: PropTypes.func.isRequired,
  handleRowCheckboxOnChange: PropTypes.func,
  searchResultsIdsChecked: PropTypes.array,
  selectAll: PropTypes.bool,
};

export default ResultsTable;
