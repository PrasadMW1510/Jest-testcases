/**
 *
 * DistrictContactInfo
 *
 */

import React, { Component } from 'react';
import { Field } from 'redux-form/immutable';
import { InputControl, InputPhoneNumber } from 'components/forms/';
import PropTypes from 'prop-types';
import { normalizeZipCode } from 'utils/formUtilities';

/* NOTE: This is a class-based component to plan for the near future,
  when lifecycle events such as focusing the first input field
  will be added.
 */
class DistrictContactInfo extends Component {
  // lifecycle methods

  render() {
    const { stateOrZipHasErrors } = this.props;
    return (
      <div className="edit-district-profile__form-contact-info">
        <Field
          name="last_name"
          type="text"
          component={InputControl}
          label="District Contact Last Name"
          maxLength={40}
          ref={this.props.refAssignFocusedField}
          required
          showAsterisk={false}
          withRef
        />
        <Field
          name="first_name"
          component={InputControl}
          label="District Contact First Name"
          maxLength={40}
          required
          showAsterisk={false}
          type="text"
        />
        <Field
          name="middle_name"
          component={InputControl}
          label="District Contact Middle Name"
          maxLength={40}
          type="text"
        />
        <Field
          name="title"
          component={InputControl}
          label="District Contact Title"
          maxLength={40}
          type="text"
        />
        <Field
          name="email_address1"
          component={InputControl}
          label="District Contact Email"
          maxLength={40}
          required
          showAsterisk={false}
          type="text"
        />
        <Field
          component={InputControl}
          label="District Address Line 1"
          maxLength={40}
          name="address1"
          required
          showAsterisk={false}
          type="text"
        />
        <Field
          component={InputControl}
          label="District Address Line 2"
          maxLength={40}
          name="address2"
          type="text"
        />
        <Field
          component={InputControl}
          label="District Address Line 3"
          maxLength={40}
          name="address3"
          type="text"
        />
        <Field
          className="edit-district-profile__city"
          component={InputControl}
          hasSiblingInputErrors={stateOrZipHasErrors}
          label="City, State, and Zip Code"
          maxLength={30}
          name="city"
          required
          showAsterisk={false}
          type="text"
        />
        <Field
          className="edit-district-profile__state"
          component={InputControl}
          maxLength={2}
          name="state"
          type="text"
        />
        <Field
          className="edit-district-profile__zip"
          component={InputControl}
          name="postal_code"
          normalize={normalizeZipCode}
          type="text"
        />
        <InputPhoneNumber
          label="Contact Phone Number"
          name="phone_number1"
          required
          showAsterisk={false}
        />
      </div>
    );
  }
}

DistrictContactInfo.defaultProps = {
  stateOrZipHasErrors: false,
};

DistrictContactInfo.propTypes = {
  refAssignFocusedField: PropTypes.func,
  stateOrZipHasErrors: PropTypes.bool,
};

export default DistrictContactInfo;
