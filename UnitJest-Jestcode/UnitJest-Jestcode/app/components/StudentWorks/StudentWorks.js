import React from 'react';
import PropTypes from 'prop-types';
import ResultsTable from './ResultsTable';
import * as Constants from '../../components/InBox/constants';
import './StudentWorks.scss';

export class StudentWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBy: 'Title',
      searchResultsIdsChecked: [],
      selectedrows: [],
      selectAll: false,
      searchFilterInfo: '',
    };
  }

  toggleAllCheckboxes = (isChecked, itemIds) => {
    this.setState({
      searchResultsIdsChecked: itemIds,
      selectAll: isChecked,
    });
  };

  handleRowSelections = (isChecked, itemId, row) => {
    if (isChecked) {
      this.state.selectedrows.push(row);
    } else {
      const Index = this.state.searchResultsIdsChecked.findIndex(element => element === itemId);
      this.state.selectedrows.splice(Index, 1);
    }
  };

  handleClick = clickedValue => {
    const mathvalue = Constants.MATH_VALUE_1;
    const mathvalue2 = Constants.MATH_VALUE_2;
    if (clickedValue === mathvalue || clickedValue === mathvalue2) {
      this.props.showInboxProgram();
    }
  };

  handleDetailProgram = (programRow, selectedIndex, metaData) => {
    const read180 = ['R180NG', 'RTNG', 'S44NG'];
    const mathvalue = ['M180', 'M180Y2'];
    if (
      programRow.assignment === Constants.ASSIGN_SUCCESS_RECORDING ||
      programRow.assignment === Constants.ASSIGN_FINAL_RECORDING
    ) {
      this.props.showSystem44SuccessRecordModal(programRow, selectedIndex, metaData);
      return false;
    }
    if (read180.findIndex(readvalue => readvalue === programRow.community_id) > -1) {
      if (
        programRow.assignment === Constants.ASSIGN_RESPOND_WRITE ||
        programRow.assignment === Constants.ASSIGN_WRITE_ACTIVITY
      ) {
        this.props.showRead180RespondWriteModal(
          programRow,
          'StudentWorks',
          selectedIndex,
          metaData
        );
        return false;
      }
      this.props.showRead180Modal(programRow, 'StudentWorks', selectedIndex, metaData);
    }

    if (mathvalue.findIndex(mvalue => mvalue === programRow.community_id) > -1) {
      this.props.showInboxProgram(programRow, 'StudentWorks', selectedIndex, metaData);
    }
    if (programRow.community_id === 'S44NG') {
      if (programRow.from === 'Student Goals') {
        const mappedMetaData = metaData;
        mappedMetaData[selectedIndex].kind = 'Goal';
        mappedMetaData[selectedIndex].goals = metaData[selectedIndex].date
          .split('T')[0]
          .split('-')
          .reverse()
          .join('/');
        mappedMetaData[selectedIndex].student_name = mappedMetaData[selectedIndex].student;
        mappedMetaData[selectedIndex].studentId = mappedMetaData[selectedIndex].id;
        this.props.showSystem44StudentGoalsModal({
          ...programRow,
          location: this.props.location,
          metaData: mappedMetaData,
          selectedIndex,
        });
      }
    }

    if (programRow.community_id === 'S44JR') {
      this.props.showIReadStudentWorkModal(programRow);
    }
    return true;
  };

  handleRowCheckboxOnChange = (isChecked, itemId) => {
    this.setState(previousState => {
      const searchResultsIdsChecked = previousState.searchResultsIdsChecked;

      if (isChecked) {
        searchResultsIdsChecked.push(itemId);
      } else {
        const Index = searchResultsIdsChecked.findIndex(element => element === itemId);
        searchResultsIdsChecked.splice(Index, 1);
      }
      return { searchResultsIdsChecked };
    });
  };

  render() {
    return (
      <div>
        <div className="student-work-remove-btn">
          <a>Remove</a>
        </div>
        <div className="student-work-header-right-block">
          <ResultsTable
            data={this.props.data}
            toggleAllCheckboxes={this.toggleAllCheckboxes}
            handleClick={this.handleClick}
            searchResultsIdsChecked={this.state.searchResultsIdsChecked}
            handleRowSelections={this.handleRowSelections}
            handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
            selectAll={this.state.selectAll}
            handleDetailProgram={this.handleDetailProgram}
          />
        </div>
      </div>
    );
  }
}

StudentWorks.propTypes = {
  data: PropTypes.array,
  showInboxProgram: PropTypes.func.isRequired,
  showRead180Modal: PropTypes.func,
  showSystem44StudentGoalsModal: PropTypes.func.isRequired,
  showIReadStudentWorkModal: PropTypes.func.isRequired,
  location: PropTypes.object,
  showRead180RespondWriteModal: PropTypes.func,
  showSystem44SuccessRecordModal: PropTypes.func,
};

export default StudentWorks;
