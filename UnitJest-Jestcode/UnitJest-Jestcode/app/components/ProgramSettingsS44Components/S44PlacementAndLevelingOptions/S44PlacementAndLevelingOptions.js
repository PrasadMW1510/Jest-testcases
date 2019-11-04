/**
 *
 * S44PlacementAndLevelingOptions
 *
 */
import PropTypes from 'prop-types';
import React from 'react';

import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';

import '../ProgramSettingsS44Components.scss';

function S44PlacementAndLevelingOptions({
  settingsObj,
  callBackFunc,
  isHalfHeight,
  isHalfWidth,
  isS44NG,
}) {
  const getHeightClassName = () =>
    isHalfHeight ? 's44ng-settings__section--half-height' : 's44ng-settings__section--full-height';

  const getWidthClassName = () =>
    isHalfWidth ? 's44ng-settings__section--half-width' : 's44ng-settings__section--full-width';

  const handleChangeAutoPlacement = () => {
    callBackFunc({ ...settingsObj, auto_placement: ['1'], initial_placement: ['0'] });
  };

  const handleChangeEnableFastTrack = e => {
    callBackFunc({ ...settingsObj, enable_fasttrack: [e.target.checked ? '1' : '0'] });
  };

  const handleChangeInitialValue = e => {
    callBackFunc({ ...settingsObj, initial_placement: [e.target.value.toString()] });
  };

  const handleChangeSetInitialRadio = () => {
    callBackFunc({ ...settingsObj, auto_placement: ['0'] });
  };

  const createSetInitialDropDown = () =>
    Array.from(Array(25).keys()).map((currentValue, index) => (
      <option key={currentValue} value={index + 1}>
        {index + 1}
      </option>
    ));

  const renderHasNotStartedWorking = () => (
    <div className="s44ng-settings__initial-settings">
      <div className="s44ng-settings__radio">
        <input
          id="autoPlacement"
          type="radio"
          checked={settingsObj.auto_placement[0] === '1'}
          onChange={handleChangeAutoPlacement}
        />
        <span className="s44ng-settings__radio-text">
          Enable automatic placement based on initial Phonics Inventory results
        </span>
      </div>
      <div className="s44ng-settings__radio">
        <input
          id="setInitial"
          type="radio"
          checked={settingsObj.auto_placement[0] === '0'}
          onChange={handleChangeSetInitialRadio}
        />
        <span className="s44ng-settings__radio-text">Set initial series to:</span>
        <select
          onChange={handleChangeInitialValue}
          value={settingsObj.initial_placement[0]}
          disabled={settingsObj.auto_placement[0] === '1'}
          className={`s44ng-settings__select ${
            settingsObj.auto_placement[0] === '1' ? 's44ng-settings__select--disabled' : ''
          }`}
        >
          <option value={0}>-</option>
          {createSetInitialDropDown()}
        </select>
      </div>
    </div>
  );

  const renderHasStartedWorking = () => (
    <div className="s44ng-settings__has-started-working">
      {`Once student has started System 44 ${isS44NG ? 'NG' : ''} the`}
      <br />
      “Placement and Leveling” options are unavailable
    </div>
  );

  return (
    <div className={`s44ng-settings__section ${getHeightClassName()} ${getWidthClassName()}`}>
      <div className="s44ng-settings__section-title">Placement and Leveling Options</div>
      <div className="s44ng-settings__section-content">
        {settingsObj.has_started_working[0] === 'false' && renderHasNotStartedWorking()}
        {settingsObj.has_started_working[0] === 'true' && renderHasStartedWorking()}
        <SettingsFourStateCheckbox
          checkboxText="Enable Fast-Track between series"
          currentCheckboxValue={settingsObj.enable_fasttrack[0]}
          handleChangeCheckboxValue={handleChangeEnableFastTrack}
        />
      </div>
    </div>
  );
}

S44PlacementAndLevelingOptions.defaultProps = {
  isHalfHeight: true,
  isHalfWidth: true,
  isS44NG: false,
};

S44PlacementAndLevelingOptions.propTypes = {
  callBackFunc: PropTypes.func.isRequired,
  settingsObj: PropTypes.object.isRequired,
  isHalfHeight: PropTypes.bool,
  isHalfWidth: PropTypes.bool,
  isS44NG: PropTypes.bool,
};

export default S44PlacementAndLevelingOptions;
