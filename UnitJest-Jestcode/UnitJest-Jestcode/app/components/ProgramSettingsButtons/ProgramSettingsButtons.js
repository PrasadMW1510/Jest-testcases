/**
 *
 * ProgramSettingsButtons
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import SAMButton from 'components/SAMButton';
import SAMLinkButton from 'components/SAMLinkButton';

import './ProgramSettingsButtons.scss';

function ProgramSettingsButtons({
  restoreDefaultHandler,
  saveAndReturnHandler,
  setInitialValuesHandler,
  showRestoreDefaults,
  stateResult,
  suppressSaveAndReturnRedirect,
}) {
  return (
    <div className="program-settings-buttons">
      {showRestoreDefaults && (
        <SAMButton
          id="restoreDefaults"
          onClickHandler={restoreDefaultHandler}
          buttonClassModifier="program-settings-buttons__button"
        >
          Restore Defaults
        </SAMButton>
      )}
      {!showRestoreDefaults && <span />}
      <div
        className={`program-settings-buttons__display-save-options ${
          showRestoreDefaults ? '' : 'program-settings-buttons__display-save-options-restore'
        }`}
      >
        {!stateResult && (
          <SAMButton
            id="cancel"
            onClickHandler={setInitialValuesHandler}
            buttonClassModifier="program-settings-buttons__button"
          >
            Cancel
          </SAMButton>
        )}
        <SAMLinkButton
          to="/roster"
          id="cancelAndReturn"
          buttonClassModifier="program-settings-buttons__button"
        >
          Cancel & Return
        </SAMLinkButton>
        {!stateResult && (
          <div className="program-settings-buttons__display-hide-options">
            <SAMButton
              id="save"
              buttonClassModifier="program-settings-buttons__button"
              buttonType="submit"
              isPrimaryButton
            >
              Save
            </SAMButton>
            <SAMLinkButton
              to="/roster"
              id="saveAndReturn"
              buttonClassModifier="program-settings-buttons__button"
              isPrimaryButton
              onClickHandler={saveAndReturnHandler}
              suppressRedirect={suppressSaveAndReturnRedirect}
            >
              Save & Return
            </SAMLinkButton>
          </div>
        )}
      </div>
    </div>
  );
}

ProgramSettingsButtons.defaultProps = {
  showRestoreDefaults: true,
  stateResult: false,
  suppressSaveAndReturnRedirect: false,
};

ProgramSettingsButtons.propTypes = {
  restoreDefaultHandler: PropTypes.func,
  saveAndReturnHandler: PropTypes.func.isRequired,
  setInitialValuesHandler: PropTypes.func.isRequired,
  showRestoreDefaults: PropTypes.bool,
  stateResult: PropTypes.bool,
  suppressSaveAndReturnRedirect: PropTypes.bool,
};

export default ProgramSettingsButtons;
