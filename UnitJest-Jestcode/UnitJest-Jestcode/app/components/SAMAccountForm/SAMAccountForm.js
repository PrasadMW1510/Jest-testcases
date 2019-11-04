/**
 *
 * SAMAccountForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { InputControl, TextControl, DropdownControl } from 'components/forms';
import { USER_ORG, PASSWORD_TYPES } from 'containers/App/constants';
import QuestionIconToolTip from 'components/QuestionIconToolTip';
import { createPasswordToolTipText } from 'utils/utilities';

import './SAMAccountForm.scss';

class SAMAccountForm extends React.Component {
  formatTypeOfAccount = typeOfAccount => {
    if (!this.props.editMode || !this.props.editingSameAccount) {
      return this.props.accountType;
    }
    if (this.props.userOrg) {
      return `${this.props.userOrg} ${typeOfAccount}`;
    }
    return typeOfAccount;
  };

  formatSchool = school => String(school.name[0]);

  render() {
    return (
      <div>
        <Field
          name="user_type"
          type="text"
          component={TextControl}
          className="form-input-control"
          label="Type of Account"
          formatText={this.formatTypeOfAccount}
        />
        <Field
          name="district_user_id"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="District User ID"
          required
          maxLength={32}
        />
        <Field
          name="sps_id"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="SPS ID"
          maxLength={255}
        />
        <Field
          name="prefix"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="Prefix"
          maxLength={5}
        />
        <Field
          name="first_name"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="First Name"
          required
          maxLength={40}
        />
        <Field
          name="last_name"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="Last Name"
          required
          maxLength={40}
        />
        <Field
          name="title"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="Title (e.g. Teacher)"
          maxLength={40}
        />
        <Field
          name="suffix"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="Suffix"
          maxLength={5}
        />
        <Field
          name="email"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="Email"
          required
          maxLength={50}
        />
        <Field
          name="user_name"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="Username"
          required
          maxLength={20}
        />
        <span>
          <Field
            name="password"
            type="password"
            component={InputControl}
            className="form-input-control"
            label="Password"
            required
            maxLength={20}
          />
          <QuestionIconToolTip>
            {createPasswordToolTipText(this.props.passwordConfigsArray, PASSWORD_TYPES.Complex)}
          </QuestionIconToolTip>
        </span>
        <Field
          name="password_confirm"
          type="password"
          component={InputControl}
          className="form-input-control"
          label="Confirm Password"
          required
          maxLength={20}
        />
        <Field
          name="password_hint"
          type="text"
          component={InputControl}
          className="form-input-control"
          label="Password Hint"
          maxLength={40}
        />
        {this.props.userOrg === USER_ORG.School && (
          <Field
            name="school_name"
            type="text"
            component={TextControl}
            className="form-input-control"
            label="School"
          />
        )}

        {(!this.props.editMode || !this.props.editingSameAccount) &&
          this.props.isSchoolAdminForm &&
          this.props.userOrg === USER_ORG.District && (
            <Field
              name="school_name"
              component={DropdownControl}
              formatLabel={this.formatSchool}
              className="form-input-control sam-account-form__dropdown"
              items={this.props.schools}
              label="School"
            />
          )}
      </div>
    );
  }
}

SAMAccountForm.defaultProps = {
  passwordConfigsArray: [],
  userOrg: '',
  editMode: true,
  isSchoolAdminForm: false,
};

SAMAccountForm.propTypes = {
  accountType: PropTypes.string,
  editMode: PropTypes.bool,
  editingSameAccount: PropTypes.bool,
  passwordConfigsArray: PropTypes.array,
  isSchoolAdminForm: PropTypes.bool,
  schools: PropTypes.array,
  userOrg: PropTypes.string,
};

export default SAMAccountForm;
