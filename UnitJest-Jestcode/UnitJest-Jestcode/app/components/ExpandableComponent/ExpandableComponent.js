/**
 *
 * Common component to display a drop down expandable list
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ExpandableComponent.scss';
// TODO: Needs some refactoring to make it easier to re-use
function ExpandableComponent({ items }) {
  function renderDropList() {
    return items.map(product => (
      <div className="table-container__rows" key={product.name}>
        {product.datapoint && (
          <input
            className="table-container__triangle"
            type="checkbox"
            defaultChecked="checked"
            name="tabs2"
            id={product.name}
          />
        )}
        {product.datapoint && (
          <label key={product} className="table-container__prodname" htmlFor={product.name}>
            {product.name}{' '}
          </label>
        )}
        <div className="table-container__content">
          <div className="table-details">
            {/* Make sure only if the datapoint exists we display the label and values */}
            {product.datapoint && renderDatapoint(product.datapoint)}
          </div>
        </div>
      </div>
    ));
  }

  function renderDatapoint(datapoint) {
    return datapoint.map(point => (
      <div className="table-details__labels" key={point.getIn(['label']) + point.getIn(['value'])}>
        <div className="table-details__labels-label">{point.getIn(['label'])}</div>
        <div className="table-details__labels-value">{point.getIn(['value'])}</div>
      </div>
    ));
  }

  return (
    <div className="container">
      <div className="table-container">{renderDropList()}</div>
    </div>
  );
}

ExpandableComponent.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ExpandableComponent;
