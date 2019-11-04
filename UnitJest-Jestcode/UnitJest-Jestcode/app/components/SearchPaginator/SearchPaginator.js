/**
 *
 * SearchPaginator
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SearchPaginator.scss';

function SearchPaginator({ data, handlePaginatedSearch }) {
  const divClassName = 'search-paginator__navigator-item-div';
  const createSearchPaginator = pData => {
    let result = null;
    if (
      !pData.page_count ||
      !pData.page_count[0] ||
      isNaN(pData.page_count[0]) ||
      Number(pData.page_count[0]) < 2
    ) {
      return result;
    }
    const pgCount = pData.page_count[0];
    const finalPage = Number(pgCount) - 1;
    const links = [];
    const linkLen = Number(pgCount);
    const currentPage = Number(pData.current_page[0]);
    for (let n = 0; n < linkLen; n += 1) {
      const isActive = n !== currentPage;
      links.push({ active: isActive, pageNum: n });
    }
    result = (
      <div className="search-modal__search-paginator">
        <ul className="search-paginator__navigator">
          <li key="first" className="search-paginator__navigator-item">
            {createFirstDiv(currentPage)}
          </li>
          /
          <li key="prev" className="search-paginator__navigator-item">
            {createPrevDiv(currentPage)}
          </li>
          {links.map(item => (
            <li key={item.pageNum} className="search-paginator__navigator-item">
              {createPaginatedDiv(item)}
            </li>
          ))}
          <li key="next" className="search-paginator__navigator-item">
            {createNextDiv(currentPage, finalPage)}
          </li>
          /
          <li key="last" className="search-paginator__navigator-item">
            {createLastDiv(currentPage, finalPage)}
          </li>
        </ul>
      </div>
    );

    return result;
  };

  /**
   * create the Numberd pagination links. The Current page is non-clickable
   * @param item
   * @returns {*}
   */
  const createPaginatedDiv = item => {
    if (item.active) {
      // return a clickable link
      return (
        <div
          tabIndex="-1"
          className={divClassName}
          role="button"
          onClick={() => {
            handlePaginatedSearch(item.pageNum);
          }}
        >
          {item.pageNum + 1}
        </div>
      );
    }
    // this is the current page so not-clickable
    return <div tabIndex="-1">{item.pageNum + 1}</div>;
  };

  /**
   * create the First Div. If on CurrentPage the non-clickable
   * @param item
   * @returns {*}
   */
  const createFirstDiv = currentPage => {
    if (currentPage === 0) {
      // return a non Clickable
      return <div tabIndex="-1">First</div>;
    }
    // this is clickable
    return (
      <div
        tabIndex="-1"
        className={divClassName}
        role="button"
        onClick={() => {
          handlePaginatedSearch(0);
        }}
      >
        First
      </div>
    );
  };

  const createPrevDiv = currentPage => {
    if (currentPage === 0) {
      // return a non Clickable
      return <div tabIndex="-1">Previous</div>;
    }
    return (
      <div
        tabIndex="-1"
        className={divClassName}
        role="button"
        onClick={() => {
          handlePaginatedSearch(Number(currentPage) - 1);
        }}
      >
        Previous
      </div>
    );
  };

  const createNextDiv = (currentPage, finalPage) => {
    if (currentPage === finalPage) {
      return <div tabIndex="-1">Next</div>;
    }
    return (
      <div
        tabIndex="-1"
        className={divClassName}
        role="button"
        onClick={() => {
          handlePaginatedSearch(Number(currentPage) + 1);
        }}
      >
        Next
      </div>
    );
  };

  const createLastDiv = (currentPage, finalPage) => {
    if (currentPage === finalPage) {
      return <div tabIndex="-1">Last</div>;
    }
    return (
      <div
        tabIndex="-1"
        className={divClassName}
        role="button"
        onClick={() => {
          handlePaginatedSearch(finalPage);
        }}
      >
        Last
      </div>
    );
  };

  return createSearchPaginator(data);
}

SearchPaginator.defaultProps = {
  data: {},
};

SearchPaginator.propTypes = {
  data: PropTypes.object,
  handlePaginatedSearch: PropTypes.func.isRequired,
};

export default SearchPaginator;
