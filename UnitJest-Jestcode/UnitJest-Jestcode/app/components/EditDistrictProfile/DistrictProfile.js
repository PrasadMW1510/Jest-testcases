/**
 *
 * DistrictProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import {
  InputControl,
  DropdownControl,
  CheckboxControl,
  TimeRangeDropdownControl,
} from 'components/forms';

import { WEEK_LIST, STATE_LIST } from './constants';

import './EditDistrictProfile.scss';

class DistrictProfile extends React.Component {
  render() {
    return (
      <div>
        <Field
          name="name"
          type="text"
          component={InputControl}
          className="district-form-input-control district-profile__district-input"
          label="District Name"
          maxLength={50}
        />
        <Field
          name="location"
          type="text"
          component={DropdownControl}
          className="district-form-input-control district-profile__district-input"
          label="District Location"
          items={STATE_LIST}
        />

        <Field
          name="time_zone"
          component={DropdownControl}
          className="district-form-input-control district-profile__district-input"
          label="District Time Zone"
          items={this.props.timeZones}
        />

        <Field
          name="school_days"
          component={CheckboxControl}
          className="form-input-control"
          items={WEEK_LIST}
          label="School Days "
          row
        />

        <Field
          name="school_hours"
          component={TimeRangeDropdownControl}
          className="district-form-input-control"
          label="School Hours "
        />
        <span className="district-profile__restrict-text">
          Restrict student use for selected programs to during school days and hours{' '}
        </span>

        <Field
          name="restricted_apps"
          component={CheckboxControl}
          className="district-form-input-control district-profile__checkbox-group"
          items={this.props.applications}
          label=""
          row
        />
      </div>
    );
  }
}

DistrictProfile.propTypes = {
  applications: PropTypes.array.isRequired,
  timeZones: PropTypes.array.isRequired,
};

export default DistrictProfile;
