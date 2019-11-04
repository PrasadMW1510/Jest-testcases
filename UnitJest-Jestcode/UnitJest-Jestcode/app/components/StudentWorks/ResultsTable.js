import React from 'react';
import PropTypes from 'prop-types';
import SAMTable from 'components/SAMTable';
import moment from 'moment';
import tickImage from 'images/tick.png';
import { checkProgramImg } from 'utils/utilities';
import './StudentWorks.scss';

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: false,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.data });
  }

  onRowClick = (state, rowInfo) => ({
    onClick: () => {
      this.checkData(rowInfo.original, rowInfo.index, this.state.data);
    },
  });

  setActiveTab = (e, rowData, index) => {
    this.props.handleClick(rowData, false, index);
  };

  getData = () => {
    const data = this.state.data.map(item => ({
      _id: item.id,
      ...item,
    }));
    return data;
  };

  checkData = (row, selectedIndex, metaData) => {
    this.props.handleDetailProgram(row, selectedIndex, metaData);
  };

  calculateRowCount = () => this.state.data.length;

  columns = [
    {
      Header: 'Date',
      id: 'date',
      accessor: d => {
        moment.locale('en');
        const formattedDT = moment(new Date(`${d.date}`)).format('MM/DD/YYYY');
        return formattedDT;
      },
      width: 100,
    },
    {
      Header: 'Student',
      id: 'student',
      accessor: 'student',
      sortable: true,
      width: 120,
    },
    {
      Header: 'Assignment',
      id: 'assignment',
      accessor: 'assignment',
      sortable: true,
      width: 120,
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
      Cell: e => (
        <a role="link" tabIndex="-1" value={e.value} onClick={this.setActiveTab}>
          {' '}
          {e.value}{' '}
        </a>
      ),
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
      width: 100,
    },
  ];

  render() {
    return (
      <div className="studentWorksTable">
        <SAMTable
          columns={this.columns}
          checkedIds={this.props.searchResultsIdsChecked}
          data={this.getData()}
          pageSize={this.state.data.length}
          handleClick={this.props.handleClick}
          getTrProps={this.onRowClick}
        />
      </div>
    );
  }
}

ResultsTable.propTypes = {
  handleClick: PropTypes.func,
  searchResultsIdsChecked: PropTypes.any,
  handleDetailProgram: PropTypes.func,
};

export default ResultsTable;
