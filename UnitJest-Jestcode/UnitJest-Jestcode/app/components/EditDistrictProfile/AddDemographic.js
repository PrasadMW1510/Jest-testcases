/**
 *
 * DistrictProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import SAMButton from 'components/SAMButton';

import './EditDistrictProfile.scss';

class AddDemographic extends React.Component {
  render() {
    return (
      <div className="add-demographic">
        <SAMButton
          id="add-demographic-button"
          buttonClassModifier="add-demographic__button"
          onClickHandler={this.props.onClick}
        >
          Add New Demographic
        </SAMButton>
      </div>
    );
  }
}

AddDemographic.propTypes = {
  onClick: PropTypes.func,
};

export default AddDemographic;
