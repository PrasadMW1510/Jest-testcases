/**
 *
 * Manage Applications
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { CheckboxControl } from 'components/forms/';

class ManageApplications extends Component {
  getId = item => item && item.$ && item.$.community_id;

  getLabel = item => item && item.$ && item.$.name;

  render = () => (
    <Field
      name="applications"
      className="form-control--manage-applications"
      component={CheckboxControl}
      getId={this.getId}
      items={this.props.applications}
      label="Manage Applications"
      formatLabel={this.getLabel}
    />
  );
}

ManageApplications.defaultProps = {
  applications: [],
};

ManageApplications.propTypes = {
  applications: PropTypes.array.isRequired,
};

export default ManageApplications;
