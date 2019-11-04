/**
 *
 * SchoolContactInfo
 *
 */

import React, { Component } from 'react';
import { Field } from 'redux-form/immutable';
import { InputControl, InputPhoneNumber } from 'components/forms/';
import PropTypes from 'prop-types';
import { normalizeZipCode } from 'utils/formUtilities';
import * as Constants from './constants';

/* NOTE: This is a class-based component to plan for the near future,
  when lifecycle events such as focusing the first input field
  will be added.
 */
class SchoolContactInfo extends Component {
  // lifecycle methods

  render() {
    const { stateOrZipHasErrors } = this.props;
    const { FORM_FIELD_NAMES } = Constants;
    return (
      <div className="school-form__form-contact-info">
        <Field
          name={FORM_FIELD_NAMES.SchoolContactLastName}
          type="text"
          component={InputControl}
          label="School Contact Last Name"
          maxLength={40}
          ref={this.props.refAssignFocusedField}
          required
          withRef
        />
        <Field
          component={InputControl}
          label="School Contact First Name"
          maxLength={40}
          name={FORM_FIELD_NAMES.SchoolContactFirstName}
          required
          type="text"
        />
        <Field
          component={InputControl}
          label="School Contact Middle Name"
          maxLength={40}
          name="schoolContactMiddleName"
          type="text"
        />
        <Field
          component={InputControl}
          label="School Contact Title"
          maxLength={40}
          name="schoolContactTitle"
          type="text"
        />
        <Field
          component={InputControl}
          label="School Contact Email"
          maxLength={40}
          name={FORM_FIELD_NAMES.SchoolContactEmail}
          required
          type="text"
        />
        <Field
          component={InputControl}
          label="School Mailing Address Line 1"
          maxLength={40}
          name={FORM_FIELD_NAMES.SchoolContactAddressLine1}
          required
          type="text"
        />
        <Field
          component={InputControl}
          label="School Mailing Address Line 2"
          maxLength={40}
          name="schoolContactAddressLine2"
          type="text"
        />
        <Field
          component={InputControl}
          label="School Mailing Address Line 3"
          maxLength={40}
          name="schoolContactAddressLine3"
          type="text"
        />
        <Field
          className="school-form__city"
          component={InputControl}
          hasSiblingInputErrors={stateOrZipHasErrors}
          label="City, State, and Zip Code"
          maxLength={30}
          name={FORM_FIELD_NAMES.SchoolContactCity}
          required
          type="text"
        />
        <Field
          className="school-form__state"
          component={InputControl}
          maxLength={2}
          name={FORM_FIELD_NAMES.SchoolContactState}
          type="text"
        />
        <Field
          className="school-form__zip"
          component={InputControl}
          name={FORM_FIELD_NAMES.SchoolContactZip}
          normalize={normalizeZipCode}
          type="text"
        />
        <InputPhoneNumber
          label="School's Main Phone Number"
          name={FORM_FIELD_NAMES.SchoolContactPhoneNumber}
          placeholder="xxx-xxx-xxxx"
          required
        />
        <div className="school-form__contact-required-label">* Required</div>
      </div>
    );
  }
}

SchoolContactInfo.defaultProps = {
  stateOrZipHasErrors: false,
};

SchoolContactInfo.propTypes = {
  refAssignFocusedField: PropTypes.func,
  stateOrZipHasErrors: PropTypes.bool.isRequired,
};

export default SchoolContactInfo;
