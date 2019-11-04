import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import myImage from 'images/Pencil.png';
import myDisk from 'images/disk.png';
import myNoDisk from 'images/no-disk.png';

const SearchResultsEditCell = ({ rowData, clickHandler }) => {
  const cell = (
    <div className="search-results-table__result-td-cell">
      {clickHandler === undefined ? (
        <Link to="#">{rowData.Title}</Link>
      ) : (
        <a
          id={rowData.Title && rowData.Title[0]}
          href="button"
          onClick={event => {
            clickHandler(event, rowData);
          }}
        >
          {rowData.Title}
        </a>
      )}
      <button className="search-results-table__result-col-button">
        {String(rowData.QuizActive) === String('true') &&
          String(rowData.QuizTeacherMade) === String('true') && (
            <img style={{ width: '18px' }} src={myImage} alt="SAM" />
          )}
        {String(rowData.QuizActive) === String('true') &&
          String(rowData.QuizTeacherMade) === String('false') && (
            <img style={{ width: '18px' }} src={myDisk} alt="SAM" />
          )}
        {String(rowData.QuizActive) === String('false') &&
          String(rowData.QuizTeacherMade) === String('false') && (
            <img style={{ width: '18px' }} src={myNoDisk} alt="SAM" />
          )}
        {String(rowData.QuizActive) === String('false') &&
          String(rowData.QuizTeacherMade) === String('true') && (
            <img style={{ width: '18px' }} src={myNoDisk} alt="SAM" />
          )}
      </button>
    </div>
  );

  return cell;
};

SearchResultsEditCell.propTypes = {
  rowData: PropTypes.object,
};

export default SearchResultsEditCell;
