import React from 'react';
import PropTypes from 'prop-types';
import ResultsTable from './ResultsTable';
import * as Constants from './constants';
import './InBox.scss';

export class InBox extends React.Component {
  state = {
    searchResultsIdsChecked: [],
    selectedrows: [],
    selectAll: false,
  };

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

  handleDetailProgram = (row, isEditable, index, metaData) => {
    const defaultValue = Constants.PROG_DEFAULT_VALUE;
    const mathvalue = [Constants.PROG_MATH_VALUE_1, Constants.PROG_MATH_VALUE_2];
    const read180Value = Constants.PROG_READ_VALUE;
    const rskillValue = Constants.PROG_RTNG_VALUE;
    const oralActivity = [Constants.PROG_READ_VALUE, Constants.ASSIGN_DEFAULT_VALUE];

    if (
      row.assignment === Constants.ASSIGN_SUCCESS_RECORDING ||
      row.assignment === Constants.ASSIGN_FINAL_RECORDING
    ) {
      this.props.showSystem44SuccessRecordModal(row, index, metaData);
      return false;
    }

    if (
      oralActivity.findIndex(readvalue => readvalue === row.community_id) > -1 &&
      (row.assignment === Constants.ASSIGN_RESPOND_WRITE ||
        row.assignment === Constants.ASSIGN_WRITE_ACTIVITY)
    ) {
      this.props.showRead180RespondWriteModal(row, 'inbox', index, metaData);
      return false;
    }

    if (row.communityId === defaultValue) {
      this.props.showSystem44Modal();
    } else if (
      row.community_id === Constants.S44JR ||
      row.community_id === Constants.ASSIGN_DEFAULT_VALUE ||
      row.community_id === Constants.PROG_READ_VALUE
    ) {
      const postData = { classId: row, isEditable, currentIndex: index, metaData };
      this.props.showIreadModal(postData);
    }

    if (row.community_id === read180Value) {
      this.props.showRead180NgModal(row);
    }

    if (mathvalue.findIndex(mvalue => mvalue === row.communityId) > -1) {
      this.props.showInboxProgram(row, 'Inbox', index, metaData);
    }
    if (row.community_id === rskillValue) {
      this.props.showRead180StudentWorkModal(row);
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
      <div className="inbox-page">
        <ResultsTable
          data={this.props.data}
          resultdata={this.props.data}
          toggleAllCheckboxes={this.toggleAllCheckboxes}
          handleClick={this.handleClick}
          searchResultsIdsChecked={this.state.searchResultsIdsChecked}
          handleRowSelections={this.handleRowSelections}
          handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
          selectAll={this.state.selectAll}
          handleDetailProgram={this.handleDetailProgram}
        />
      </div>
    );
  }
}
InBox.propTypes = {
  data: PropTypes.array,
  showSystem44SuccessRecordModal: PropTypes.func,
  showRead180RespondWriteModal: PropTypes.func,
  showSystem44Modal: PropTypes.func,
  showIreadModal: PropTypes.func.isRequired,
  showRead180NgModal: PropTypes.func,
  showInboxProgram: PropTypes.func.isRequired,
  showRead180StudentWorkModal: PropTypes.func,
};
export default InBox;
