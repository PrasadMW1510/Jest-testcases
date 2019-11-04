import React from 'react';
import PropTypes from 'prop-types';
import './FormLabel.scss';

function FormLabel({ children, className, ...props }) {
  return (
    <span
      className={`form-control__label ${props.disabled ? 'form-control__label--disabled' : ''} ${
        props.error ? 'form-control__label--error' : ''
      } ${props.required ? 'form-control__label--required' : ''} ${className}`}
    >
      {children}
    </span>
  );
}

FormLabel.defaultProps = {
  className: '',
  disabled: false,
  error: false,
  required: false,
};

FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
};

export default FormLabel;
