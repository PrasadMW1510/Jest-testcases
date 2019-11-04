import React from 'react';
import PropTypes from 'prop-types';

const SearchResultsEditCell = ({ metaData, row, clickHandler }) => (
  <div>
    <a
      role="link"
      tabIndex="-1"
      value={row.value}
      onClick={event => {
        clickHandler(event, row, metaData);
      }}
    >
      {' '}
      {row.value}
    </a>
  </div>
);

SearchResultsEditCell.propTypes = {
  row: PropTypes.object,
  metaData: PropTypes.object,
  clickHandler: PropTypes.func,
};

export default SearchResultsEditCell;
