/**
 *
 * MessageLogFilter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ALL_PRODUCT_FILTER } from 'containers/MessageContainer/constants';

import './MessageLogFilter.scss';

function MessageLogFilter({ productsAvailable, handleProductFilter }) {
  function handleProgramOnChange(event) {
    handleProductFilter(event.target.value);
  }

  function renderProgramAvailableSelect() {
    return productsAvailable.map(item => (
      <option key={item.community_id} value={item.community_id}>
        {item.name}
      </option>
    ));
  }

  return (
    <div className="msg-log-filter">
      <span>Filter by: </span>
      <select onChange={handleProgramOnChange} className="msg-log-filter__select">
        <option key={'defaultValue'} value={ALL_PRODUCT_FILTER}>
          All Products
        </option>
        {renderProgramAvailableSelect()}
      </select>
      {
        // TODO: This is not working in Flash SAM, so we are ignoring it right now.
        /* <span>and</span>
      <select value="all_types" readOnly>
        <option value="all_types">All Message Types</option>
      </select> */
      }
    </div>
  );
}

MessageLogFilter.defaultProps = {
  productsAvailable: [],
};

MessageLogFilter.propTypes = {
  productsAvailable: PropTypes.array,
  handleProductFilter: PropTypes.func.isRequired,
};

export default MessageLogFilter;
