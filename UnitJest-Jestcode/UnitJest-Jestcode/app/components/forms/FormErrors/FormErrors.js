/**
 *
 * FormErrors
 * Working example in EditAdminForm
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import './FormErrors.scss';

function FormErrors({ classModifier, shouldShowErrors, submitErrors, validationErrors }) {
  const getClassName = () => {
    let className = 'form-errors';
    if (classModifier) {
      className += ` ${classModifier}`;
    }

    return className;
  };

  const displayErrors = errorObj =>
    shouldShowErrors &&
    errorObj &&
    Object.keys(errorObj).map(key => {
      let displayText = null;
      const errorMessage = errorObj[key];
      // Only print out text
      if (errorMessage !== true && typeof errorMessage === 'string') {
        displayText = (
          <div key={key} className="form-errors-item">
            {errorMessage}
          </div>
        );
      }

      return displayText;
    });

  return (
    <div className={getClassName()}>
      {displayErrors(submitErrors)}
      {displayErrors(validationErrors)}
    </div>
  );
}

FormErrors.defaultProps = {
  shouldShowErrors: false,
  submitErrors: null,
  validationErrors: null,
};

FormErrors.propTypes = {
  classModifier: PropTypes.string,
  shouldShowErrors: PropTypes.bool,
  submitErrors: PropTypes.object,
  validationErrors: PropTypes.object,
};

export default FormErrors;
