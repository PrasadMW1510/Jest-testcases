import React from 'react';
import PropTypes from 'prop-types';
import './FormGroup.scss';

function FormGroup({ children, className, row, ...props }) {
  return (
    <div
      className={`form-control__form-group ${
        row ? 'form-control__form-group--row' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

FormGroup.defaultProps = {
  className: '',
  row: false,
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  row: PropTypes.bool.isRequired,
};

export default FormGroup;
