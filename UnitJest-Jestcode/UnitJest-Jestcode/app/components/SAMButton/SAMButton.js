/**
 *
 * SAMButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  BUTTON_CLASS_NAME,
  PRIMARY_BUTTON_CLASS_NAME,
  SECONDARY_BUTTON_CLASS_NAME,
} from './constants';

import './SAMButton.scss';

function SAMButton({
  children,
  onClickHandler,
  id,
  isPrimaryButton,
  buttonClassModifier,
  buttonType,
  disabled,
}) {
  const getButtonClass = () => {
    let className = BUTTON_CLASS_NAME;

    if (isPrimaryButton) {
      className += PRIMARY_BUTTON_CLASS_NAME;
    } else {
      className += SECONDARY_BUTTON_CLASS_NAME;
    }

    if (buttonClassModifier) {
      className += ` ${buttonClassModifier}`;
    }

    return className;
  };

  const handleOnClick = e => {
    if (onClickHandler) {
      e.preventDefault();
      onClickHandler();
    }
  };

  return (
    <button
      id={id}
      type={buttonType}
      className={getButtonClass()}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

SAMButton.defaultProps = {
  isPrimaryButton: false,
  buttonType: 'button',
};

SAMButton.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  onClickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  isPrimaryButton: PropTypes.bool,
  buttonClassModifier: PropTypes.string,
  buttonType: PropTypes.string,
};

export default SAMButton;
