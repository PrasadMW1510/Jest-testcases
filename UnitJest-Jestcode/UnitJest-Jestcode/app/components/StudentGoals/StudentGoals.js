import React from 'react';
import PropTypes from 'prop-types';
import ResultsTable from './ResultsTable';
import './StudentGoals.scss';

export class StudentGoals extends React.Component {
  state = {
    searchBy: 'Title',
    searchResultsIdsChecked: [],
    selectedrows: [],
    selectAll: false,
    searchFilterInfo: '',
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

  handleClick = (data, metaData, selectedIndex) => {
    this.props.showSystem44StudentGoalsModal({
      ...data,
      location: this.props.location,
      metaData,
      selectedIndex,
    });
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
      <ResultsTable
        data={this.props.data}
        toggleAllCheckboxes={this.toggleAllCheckboxes}
        handleClick={this.handleClick}
        searchResultsIdsChecked={this.state.searchResultsIdsChecked}
        handleRowSelections={this.handleRowSelections}
        handleRowCheckboxOnChange={this.handleRowCheckboxOnChange}
        selectAll={this.state.selectAll}
      />
    );
  }
}

StudentGoals.propTypes = {
  showSystem44StudentGoalsModal: PropTypes.func.isRequired,
  location: PropTypes.object,
  data: PropTypes.array,
};

export default StudentGoals;
