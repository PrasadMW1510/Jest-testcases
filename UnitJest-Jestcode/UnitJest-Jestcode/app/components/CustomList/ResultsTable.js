import React from 'react';
import PropTypes from 'prop-types';
import BooksTable from 'components/BooksTable';
import SearchResultsEditCell from 'components/SearchResults/SearchResultsEditCell';
import ResultTableEditCell from './ResultTableEditCell';
import * as Constants from './constants';

const ResultsTable = ({ removeListRow, searchDetailModal, searchResults, ...props }) => {
  const columns = [
    {
      Header: 'Book/Quiz Title',
      sortable: true,
      accessor: 'Title',
      width: 230,
      getProps: () => ({ className: 'book-title-table__results-td' }),
      Cell: row => (
        <div className="search-result-table__group">
          <SearchResultsEditCell rowData={row.original} clickHandler={checkData} />
        </div>
      ),
    },
    {
      Header: 'Quiz Author',
      id: 'author',
      width: 150,
      accessor: d => `${d.Author[0].LastName}, ${d.Author[0].FirstName}`,
    },
    {
      Header: 'Lexile\u00ae',
      id: 'lexile',
      accessor: 'Lexile',
      sortMethod: (a, b) => a - b,
      width: 60,
    },
    {
      Header: 'RL',
      id: 'rl',
      accessor: 'ReadingLevel',
      sortMethod: (a, b) => a - b,
      width: 60,
    },
    {
      Header: 'GRL',
      id: 'grl',
      accessor: 'GuidedReadingLevel',
      width: 60,
    },
    {
      Header: 'Points',
      id: 'points',
      accessor: 'Points',
      sortMethod: (a, b) => a - b,
      width: 60,
    },
    {
      Header: 'Words',
      id: 'words',
      accessor: 'Words',
      sortMethod: (a, b) => a - b,
      width: 100,
    },
    {
      Header: 'Type',
      id: 'type',
      accessor: d => `${d.Type[0] === '1' ? 'Fiction' : 'Nonfiction'}`,
      sortMethod: (a, b) => a - b,
      width: 60,
    },
    {
      Header: 'Copies',
      id: 'copies',
      accessor: 'Copies',
      sortMethod: (a, b) => a - b,
      width: 60,
    },
    {
      Header: '',
      id: 'links',
      Cell: row => (
        <div className="search-result-table__group">
          <ResultTableEditCell rowData={row.original} onRemoveClick={onRemoveClick} />
        </div>
      ),
      accessor: d => d,
    },
  ];

  const onRemoveClick = th => {
    removeListRow(th);
  };
  const checkData = (event, data) => {
    event.preventDefault();
    searchDetailModal(data, 'customList', 0);
  };
  const calculateRowCount = () => {
    if (searchResults && searchResults.selectedItems && searchResults.selectedItems.length > 0) {
      return Number(searchResults.selectedItems.length) > 10
        ? Number(searchResults.selectedItems.length)
        : 10;
    }
    return 0;
  };

  const renderTableData = () => {
    if (searchResults !== undefined) {
      const resultsData = searchResults.selectedItems;
      if (resultsData !== undefined && resultsData.length !== undefined) {
        return resultsData.map(rowData => ({
          _id: rowData.ID,
          ...rowData,
        }));
      }
      return [];
    }
    return [];
  };

  const renderEmptySearchTable = () => {
    const { LABEL } = Constants;
    if (searchResults && searchResults.selectedItems && searchResults.selectedItems.length === 0) {
      return (
        <div className="search-results-reusable-table__no-data">
          <div className="search-results-reusable-table__no-data-text">
            {LABEL.NO_SEARCH_RESULTS}
          </div>
        </div>
      );
    }
    return [];
  };

  return (
    <div className="search-results__wrapper">
      <BooksTable
        className="custom-list-search-results__table"
        columns={columns}
        data={renderTableData()}
        renderEmptyTable={renderEmptySearchTable}
        pageSize={calculateRowCount()}
        {...props}
      />
    </div>
  );
};

ResultsTable.propTypes = {
  searchResults: PropTypes.object,
  searchDetailModal: PropTypes.func,
  removeListRow: PropTypes.func,
};

export default ResultsTable;
