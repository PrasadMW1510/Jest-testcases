/**
 *
 * SettingsMessage
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import SAMLinkButton from 'components/SAMLinkButton';

import './SettingsMessage.scss';

function SettingsMessage(props) {
  return (
    <div className="settings-message">
      <span className="settings-message__text">{props.message1}</span>
      <div className="settings-message__footer">
        <SAMLinkButton to="/roster" buttonClassModifier="settings-message__btn">
          Return to Profile
        </SAMLinkButton>
      </div>
    </div>
  );
}

SettingsMessage.propTypes = {
  message1: PropTypes.any,
};

export default SettingsMessage;
