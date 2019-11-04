import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import SAMTable from 'components/SAMTable';
import s44programImg from 'images/gateway_assets/btn_s44.png';
import SearchResultsEditCell from './SearchResultsEditCell';
import './StudentGoals.scss';

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  state = {
    flag: false,
  };

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });
  }

  setActiveTab = (event, row, metaData) => {
    this.props.handleClick(row.original, metaData, row.index);
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
      Header: 'Name',
      id: 'student_name',
      accessor: d => {
        const studentName =
          d.student_name.length > 12 ? `${d.student_name.substr(0, 12)}...` : d.student_name;
        return studentName;
      },
      sortable: true,
      width: 100,
    },
    {
      Header: 'Academic Goals Last Adjusted',
      id: 'goals',
      accessor: d => {
        moment.locale('en');
        const date = moment(d.goals);
        const isValidDate = date.isValid();
        let formattedDT = '';
        if (isValidDate) {
          formattedDT = moment(`${d.goals}`).format('MM/DD/YYYY');
        } else {
          formattedDT = d.goals;
        }
        return formattedDT;
      },
      sortable: true,
      width: 195,
    },
    {
      Header: 'Behavioral Goals Last Assessed',
      id: 'behaviour_goal',
      accessor: d => {
        moment.locale('en');
        const date = moment(d.behaviour_goal);
        const isValidDate = date.isValid();
        let formattedDT = '';
        if (isValidDate) {
          formattedDT = moment(`${d.behaviour_goal}`).format('MM/DD/YYYY');
        } else {
          formattedDT = d.behaviour_goal;
        }
        return formattedDT;
      },
      sortable: true,
      width: 215,
    },
    {
      Header: 'Program',
      id: 'community_id',
      accessor: () => <img src={s44programImg} alt="" width="25px" height="25px" />,
      Cell: row => (
        <div className="search-result-table__group">
          <SearchResultsEditCell
            row={row}
            metaData={this.state.data}
            clickHandler={this.setActiveTab}
          />
        </div>
      ),
      width: 10,
    },
  ];

  render() {
    return (
      <div>
        <SAMTable
          columns={this.columns}
          checkedIds={this.props.searchResultsIdsChecked}
          data={this.getData()}
          pageSize={this.state.data.length}
          handleClick={this.props.handleClick}
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
  handleRowCheckboxOnChange: PropTypes.func.isRequired,
  searchResultsIdsChecked: PropTypes.any,
  selectAll: PropTypes.bool,
};

export default ResultsTable;
