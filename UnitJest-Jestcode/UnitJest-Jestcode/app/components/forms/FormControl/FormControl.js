import React from 'react';
import PropTypes from 'prop-types';
import './FormControl.scss';

function FormControl({ children, className, ...props }) {
  return (
    <div
      className={`form-control ${props.disabled ? 'form-control--disabled' : ''} ${
        props.error ? 'form-control--error' : ''
      } ${props.required ? 'form-control--required' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

FormControl.defaultProps = {
  className: '',
};

FormControl.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  required: PropTypes.bool,
};

export default FormControl;
