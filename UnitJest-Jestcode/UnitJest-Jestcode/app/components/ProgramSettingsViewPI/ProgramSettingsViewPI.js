/**
 *
 * ProgramSettingsViewPI
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import * as Constants from './constants';
import './ProgramSettingsViewPI.scss';

class ProgramSettingsViewPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsObj: this.props.settings.toJS(),
    };
  }

  handleCheckbox = e => {
    const { settingsObj } = this.state;
    settingsObj[e.target.id][0] = e.target.checked ? '1' : '0';
    this.setState({ settingsObj, saveOptions: false });
    this.props.setIsolateTab(true);
  };

  handleSave = () => {
    this.props.handleSave(this.state.settingsObj);
    this.props.setIsolateTab(false);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleSave();
  };

  handleSetInitialValues = () => {
    const obj = this.props.settings.toJS();
    this.setState({ settingsObj: obj, saveOptions: true });
    this.props.setIsolateTab(false);
  };

  handleRestoreDefault = () => {
    const defaultSettingsObj = Constants.DEFAULT_SETTINGS;
    this.setState({ settingsObj: defaultSettingsObj, saveOptions: false });
    this.props.setIsolateTab(true);
  };

  renderEnglishLanguageLearnerAudioInstructions() {
    return (
      <div className="pi-settings__quadrants1">
        <span className="pi-settings__quadrants-heading">
          English Language Learner Audio Instructions
        </span>

        <div className="pi-setting__checkbox">
          <SettingsFourStateCheckbox
            checkboxId="spanish_support"
            checkboxText="Enable Spanish audio instructions"
            currentCheckboxValue={this.state.settingsObj.spanish_support[0]}
            handleChangeCheckboxValue={this.handleCheckbox}
          />
        </div>
      </div>
    );
  }

  renderAccuracyOnlyScoring() {
    return (
      <div className="pi-settings__quadrants2">
        <span className="pi-settings__quadrants-heading">Accuracy-Only Scoring</span>
        <div className="pi-setting__checkbox">
          <SettingsFourStateCheckbox
            checkboxId="requires_accommodation"
            checkboxText="Enable accuracy-only scoring"
            currentCheckboxValue={this.state.settingsObj.requires_accommodation[0]}
            handleChangeCheckboxValue={this.handleCheckbox}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="pi-settings__heading">
          Use these options to adjust Phonics Inventory settings.
        </span>
        <div className="pi-settings__content">
          {this.renderEnglishLanguageLearnerAudioInstructions()}
          {this.renderAccuracyOnlyScoring()}
          <ProgramSettingsButtons
            restoreDefaultHandler={this.handleRestoreDefault}
            saveAndReturnHandler={this.handleSave}
            setInitialValuesHandler={this.handleSetInitialValues}
            stateResult={!this.props.isTabIsolated}
          />
        </div>
      </form>
    );
  }
}

ProgramSettingsViewPI.propTypes = {
  handleSave: PropTypes.func.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
};

export default ProgramSettingsViewPI;
