/**
 *
 * ProgramSettingsViewS44NG
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import {
  S44CheckboxSection,
  S44PlacementAndLevelingOptions,
} from 'components/ProgramSettingsS44Components';
import { COHORT_TYPE } from 'containers/App/constants';
import { S44NG_DEFAULT_SETTINGS } from 'containers/S44NGSettingContainer/constants';

import './ProgramSettingsViewS44NG.scss';

class ProgramSettingsViewS44NG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsObj: this.props.settings.toJS(),
    };
  }

  // --- Handler Functions ---
  setStateAndIsolateTab = settingsObj => {
    this.setState({ settingsObj });
    this.props.setIsolateTab(true);
  };

  handleChangeSpanishSupport = e => {
    const { settingsObj } = this.state;
    settingsObj.spanish_support[0] = e.target.checked ? '1' : '0';
    this.setStateAndIsolateTab(settingsObj);
  };

  handleChangeCaptioning = e => {
    const { settingsObj } = this.state;
    settingsObj.captioning[0] = e.target.checked ? '1' : '0';
    this.setStateAndIsolateTab(settingsObj);
  };

  handleChangeWritingEnabled = e => {
    const { settingsObj } = this.state;
    settingsObj.writing_enabled[0] = e.target.checked ? '1' : '0';
    this.setStateAndIsolateTab(settingsObj);
  };

  handleRestoreDefault = () => {
    let defaultSettings = S44NG_DEFAULT_SETTINGS.generic.toJS();
    if (this.props.cohortType === COHORT_TYPE.Student) {
      defaultSettings = S44NG_DEFAULT_SETTINGS.student.toJS();
      defaultSettings.has_started_working = this.state.settingsObj.has_started_working;
    }

    this.setStateAndIsolateTab(defaultSettings);
  };

  handleSave = () => {
    this.props.handleSave(this.state.settingsObj);
    this.props.setIsolateTab(false);
  };

  handleSetInitialValues = () => {
    this.setState({ settingsObj: this.props.settings.toJS() });
    this.props.setIsolateTab(false);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleSave();
  };

  // --- Render Functions ---
  renderEnglishLanguageLearnerOptions = () => (
    <S44CheckboxSection
      sectionTitle="English Language Learner Option"
      checkboxText="Spanish Support"
      checkboxValue={this.state.settingsObj.spanish_support[0]}
      handleChangeCheckboxValue={this.handleChangeSpanishSupport}
    />
  );

  renderSupportOptions = () => (
    <S44CheckboxSection
      sectionTitle="Support Option"
      checkboxText="Enable video captioning"
      checkboxValue={this.state.settingsObj.captioning[0]}
      handleChangeCheckboxValue={this.handleChangeCaptioning}
    />
  );

  renderExtendedWritingZone = (isHalfWidth = false) => (
    <S44CheckboxSection
      sectionTitle="Extended Writing Zone"
      checkboxText="Enable Writing Zone"
      checkboxValue={this.state.settingsObj.writing_enabled[0]}
      handleChangeCheckboxValue={this.handleChangeWritingEnabled}
      isHalfWidth={isHalfWidth}
    />
  );

  renderPlacementAndLevelingOptions = () => (
    <S44PlacementAndLevelingOptions
      callBackFunc={this.setStateAndIsolateTab}
      settingsObj={this.state.settingsObj}
      isS44NG
    />
  );

  renderSettings = () => (
    <div className="s44ng-settings__content">
      {this.renderEnglishLanguageLearnerOptions()}
      {this.renderSupportOptions()}
      {this.renderExtendedWritingZone()}
      <ProgramSettingsButtons
        restoreDefaultHandler={this.handleRestoreDefault}
        saveAndReturnHandler={this.handleSave}
        setInitialValuesHandler={this.handleSetInitialValues}
        stateResult={!this.props.isTabIsolated}
      />
    </div>
  );

  renderStudentSettings = () => (
    <div className="s44ng-settings__content">
      {this.renderPlacementAndLevelingOptions()}
      {this.renderExtendedWritingZone(true)}
      {this.renderEnglishLanguageLearnerOptions()}
      {this.renderSupportOptions()}
      <ProgramSettingsButtons
        restoreDefaultHandler={this.handleRestoreDefault}
        saveAndReturnHandler={this.handleSave}
        setInitialValuesHandler={this.handleSetInitialValues}
        stateResult={!this.props.isTabIsolated}
      />
    </div>
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="s44ng-settings__heading">
          Use these options to select System 44 NG Program Settings.
        </span>
        {this.props.cohortType !== COHORT_TYPE.Student && this.renderSettings()}
        {this.props.cohortType === COHORT_TYPE.Student && this.renderStudentSettings()}
      </form>
    );
  }
}

ProgramSettingsViewS44NG.propTypes = {
  cohortType: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  settings: PropTypes.object,
};

export default ProgramSettingsViewS44NG;
