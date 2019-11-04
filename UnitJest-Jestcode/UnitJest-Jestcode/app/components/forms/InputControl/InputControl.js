import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../FormControl';
import FormLabel from '../FormLabel';
import './InputControl.scss';

/**
 * InputControl
 *
 * A component to enhance a standard <input type=".." ../> form field
 *
 * @param className CSS class name string
 * @param input An object (handed down from Redux-Form) that defines the input field properties
 * @param label A textual label for the input field
 * @param required A boolean indication of whether the input field must be populated
 * @param errorProp A validation error (if one exists) for the current state of the input field
 * @param submitFailed A boolean indication of whether a form submission failed due to validation
 * @param inputMaxLength Number of how many characters can be in input box
 * @param props Any other props
 * @returns {*}
 * @constructor
 */
class InputControl extends Component {
  inputElement = null;

  focus = () => this.inputElement.focus();
  assignRef = ref => (this.inputElement = ref);

  render = () => {
    const {
      className,
      input,
      label,
      required,
      showAsterisk,
      meta: { error: errorProp, submitFailed },
      ...props
    } = this.props;
    const error = errorProp && submitFailed;
    return (
      <FormControl className={className}>
        {label && (
          <FormLabel error={error}>
            {label}
            {required && showAsterisk && <span className="form-control__label-required">*</span>}
          </FormLabel>
        )}
        <input
          className="form-control__input"
          autoComplete={input && input.name}
          ref={this.assignRef}
          {...input}
          {...props}
        />
      </FormControl>
    );
  };
}

InputControl.defaultProps = {
  className: '',
  meta: {},
  required: false,
  showAsterisk: true,
  type: 'text',
};

InputControl.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  required: PropTypes.bool.isRequired,
  showAsterisk: PropTypes.bool,
  type: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};

export default InputControl;
