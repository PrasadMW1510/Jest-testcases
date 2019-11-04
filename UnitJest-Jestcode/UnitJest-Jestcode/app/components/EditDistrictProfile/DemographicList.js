/**
 *
 * Demographic List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './EditDistrictProfile.scss';

class DemographicList extends React.Component {
  renderList = () => this.props.items.map(item => <li key={item}> {item} </li>);
  render() {
    const list = this.renderList();
    return <ul className="edit-district-profile__demographic-list">{list}</ul>;
  }
}

DemographicList.propTypes = {
  items: PropTypes.array,
};

export default DemographicList;
