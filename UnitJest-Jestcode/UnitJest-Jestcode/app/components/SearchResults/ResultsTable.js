import React from 'react';
import PropTypes from 'prop-types';
import BooksTable from 'components/BooksTable';
import SearchResultsEditCell from './SearchResultsEditCell';
import './SearchResults.scss';

class ResultsTable extends React.Component {
  checkData = (event, th) => {
    event.preventDefault();
    this.props.searchDetailModal(th, 'searchResults');
  };

  handleColumnSorting = state => {
    const sortState = {
      ...state[0],
      desc: state[0].desc,
      curPage: this.props.searchResults.paginationData.current_page[0],
    };
    this.props.handleSortResultsOnClick(sortState);
  };

  columns = [
    {
      Header: 'Book/Quiz Title',
      id: 'Title',
      accessor: 'Title',
      width: 230,
      Cell: row => (
        <div className="search-result-table__group">
          <SearchResultsEditCell rowData={row.original} clickHandler={this.checkData} />
        </div>
      ),
    },
    {
      Header: 'Author',
      id: 'Author',
      width: 230,
      accessor: d => `${d.Author[0].LastName}, ${d.Author[0].FirstName}`,
    },
    {
      Header: 'Lexile\u00ae',
      id: 'Lexile',
      accessor: 'Lexile',
      width: 60,
    },
    {
      Header: 'RL',
      id: 'ReadingLevel',
      accessor: 'ReadingLevel',
      width: 60,
    },
    {
      Header: 'GRL',
      id: 'GuidedReadingLevel',
      accessor: 'GuidedReadingLevel',
      width: 60,
    },
    {
      Header: 'Points',
      id: 'Points',
      accessor: 'Points',
      width: 60,
    },
    {
      Header: 'Words',
      id: 'Words',
      accessor: 'Words',
      width: 100,
    },
    {
      Header: 'Type',
      id: 'Type',
      accessor: d => `${d.Type[0] === '1' ? 'Fiction' : 'Nonfiction'}`,
      width: 60,
    },
    {
      Header: 'Copies',
      id: 'Copies',
      accessor: 'Copies',
      width: 60,
    },
  ];

  calculateRowCount = () => {
    if (this.props.searchResults.itemCount && this.props.searchResults.itemCount > 0) {
      const totalItems = Number(this.props.searchResults.itemCount);
      const curPage = Number(this.props.searchResults.paginationData.current_page);
      const ipp = Number(this.props.searchResults.paginationData.items_per_page);
      const low = curPage * ipp + 1;
      const high = (curPage + 1) * ipp > totalItems ? totalItems : (curPage + 1) * ipp;
      const result = high - low + 1;
      return result;
    }
    return null;
  };

  renderTableData = () => {
    const resultsData = this.props.searchResults.results;
    if (resultsData !== undefined) {
      const parser = new DOMParser();
      return resultsData.map(rowData => ({
        _id: rowData.ID,
        ...rowData,
        Title: [parser.parseFromString(rowData.Title[0], 'text/html').body.textContent],
      }));
    }
    return [];
  };

  renderEmptySearchTable = () => {
    if (
      !isNaN(this.props.searchResults.itemCount) &&
      Number(this.props.searchResults.itemCount) === 0
    ) {
      return (
        <div className="search-results-reusable-table__no-data">
          <div className="search-results-reusable-table__no-data-text">
            There are no items to display.
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div className="search-results__wrapper">
        <BooksTable
          className="search-results__table"
          checkedIds={this.props.searchResultsIdsChecked}
          columns={this.columns}
          data={this.renderTableData()}
          renderEmptyTable={this.renderEmptySearchTable}
          handleRowCheckboxOnChange={this.props.handleRowCheckboxOnChange}
          handleRowSelections={this.props.handleRowSelections}
          hasCheckboxes
          toggleAllCheckboxes={this.props.toggleAllCheckboxes}
          selectAll={this.props.selectAll}
          pageSize={this.calculateRowCount()}
          onSortedChange={this.handleColumnSorting}
        />
      </div>
    );
  }
}

ResultsTable.defaultProps = {
  selectAll: false,
  searchResultsIdsChecked: [],
};

ResultsTable.propTypes = {
  searchResults: PropTypes.object,
  searchResultsIdsChecked: PropTypes.array,
  handleRowCheckboxOnChange: PropTypes.func.isRequired,
  handleRowSelections: PropTypes.func.isRequired,
  toggleAllCheckboxes: PropTypes.func.isRequired,
  selectAll: PropTypes.bool,
  searchDetailModal: PropTypes.func,
  handleSortResultsOnClick: PropTypes.func,
};

export default ResultsTable;
