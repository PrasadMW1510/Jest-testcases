/**
 *
 * SamlinkButton
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import SAMButton from 'components/SAMButton';

export function SAMLinkButton(props) {
  const { history, suppressRedirect, to } = props;

  const onClickHandler = () => {
    let onClickResult;
    if (props.onClickHandler) {
      // note, if the user didn't return anything from onClickHandler,
      // onClickResult will be 'undefined'.
      onClickResult = props.onClickHandler();
    }
    // onClickHandler has to explicitly return 'false' && suppressRedirect must be false if it wants to suppress redirect
    if (onClickResult !== false && !suppressRedirect) {
      history.push(to);
    }
  };

  return (
    <SAMButton
      id={props.id}
      onClickHandler={onClickHandler}
      disabled={props.disabled}
      isPrimaryButton={props.isPrimaryButton}
      buttonClassModifier={props.buttonClassModifier}
      buttonType={props.buttonType}
    >
      {props.children}
    </SAMButton>
  );
}

SAMLinkButton.defaultProps = {
  buttonType: 'button',
  disabled: false,
  isPrimaryButton: false,
  suppressRedirect: false,
};

SAMLinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  suppressRedirect: PropTypes.bool,
  buttonClassModifier: PropTypes.string,
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  history: PropTypes.object,
  id: PropTypes.string,
  isPrimaryButton: PropTypes.bool,
  onClickHandler: PropTypes.func,
};

export default withRouter(SAMLinkButton);
