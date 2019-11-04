import React from 'react';
import PropTypes from 'prop-types';

const SearchResultsEditCell = ({ metaData, rowData, index, clickHandler }) => {
  const cell = (
    <div className="search-results-table__result-td-cell">
      <a
        id={rowData.assignment}
        role="link"
        tabIndex="-1"
        onClick={event => {
          clickHandler(event, rowData, index, metaData);
        }}
      >
        {rowData.assignment}
      </a>
    </div>
  );

  return cell;
};

SearchResultsEditCell.propTypes = {
  rowData: PropTypes.object,
  handleStudent: PropTypes.func,
};

export default SearchResultsEditCell;
