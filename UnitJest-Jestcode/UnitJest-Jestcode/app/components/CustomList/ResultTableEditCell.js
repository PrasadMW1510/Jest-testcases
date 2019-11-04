import React from 'react';
import PropTypes from 'prop-types';

const SearchResultsEditCell = ({ rowData, onRemoveClick }) => {
  const showMeClick = e => {
    e.preventDefault();
    onRemoveClick(rowData);
  };
  const cell = (
    <div className="search-results-table__result-td-cell">
      <button className="custom-table-remove-button" onClick={showMeClick}>
        Remove
      </button>
    </div>
  );

  return cell;
};

SearchResultsEditCell.propTypes = {
  rowData: PropTypes.object,
  onRemoveClick: PropTypes.func,
};

export default SearchResultsEditCell;
