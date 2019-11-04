/**
 *
 * CollectionsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
class CollectionsList extends React.Component {
  handleChange = e => {
    const change = {};
    const targetVal = e.target.value;
    change[e.target.name] = e.target.value;

    this.props.onChange(targetVal);
  };

  render() {
    return (
      <span>
        <select
          name="collections-list"
          className="collections-list__select"
          onChange={this.handleChange}
        >
          {this.props.data.map(item => (
            <option value={item.Name} key={item.Name}>
              {item.Name}
            </option>
          ))}
        </select>
      </span>
    );
  }
}

CollectionsList.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CollectionsList;
