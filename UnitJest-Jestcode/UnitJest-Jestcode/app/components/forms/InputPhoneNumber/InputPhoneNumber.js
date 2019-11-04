import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import InputControl from '../InputControl';

/**
 * Input form field that automatically formats, validates, and stores phone numbers.
 * If user enters 914-555-5555 (dashes are added automatically), the value stored is '9145555555'.
 */
class InputPhoneNumber extends Component {
  /* eslint-disable react/no-unused-prop-types */

  // make sure only digits can be entered
  normalizePhoneNumber = (newValue, previousValue) => (isNaN(newValue) ? previousValue : newValue);

  // add the dashes and limit it to 10 characters
  formatPhoneNumber = number => {
    if (!number) {
      return '';
    }
    // split it to format like 555-555-5555
    const splitter = /.{1,3}/g;
    const formattedNumber = number.substring(0, 10);
    return (
      formattedNumber
        .substring(0, 7)
        .match(splitter)
        .join('-') + formattedNumber.substring(7)
    );
  };

  // parse the text input as just a sequence of digits (dashes removed)
  parsePhoneNumber = number => (number ? number.replace(/-/g, '').substring(0, 10) : '');

  render = () => (
    <Field
      component={InputControl}
      format={this.formatPhoneNumber}
      normalize={this.normalizePhoneNumber}
      parse={this.parsePhoneNumber}
      {...this.props}
    />
  );
}

InputPhoneNumber.defaultProps = {
  className: '',
  label: '',
  required: false,
};

InputPhoneNumber.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default InputPhoneNumber;
