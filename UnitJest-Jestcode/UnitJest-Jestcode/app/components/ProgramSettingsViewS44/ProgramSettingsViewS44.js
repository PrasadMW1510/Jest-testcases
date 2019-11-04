/**
 *
 * ProgramSettingsViewS44
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
import { S44_DEFAULT_SETTINGS } from 'containers/S44SettingContainer/constants';

import './ProgramSettingsViewS44.scss';

class ProgramSettingsViewS44 extends React.Component {
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

  handleRestoreDefault = () => {
    let defaultSettings = S44_DEFAULT_SETTINGS.generic.toJS();
    if (this.props.cohortType === COHORT_TYPE.Student) {
      defaultSettings = S44_DEFAULT_SETTINGS.student.toJS();
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
  renderEnglishLanguageLearnerOptions = (isHalfHeight = true) => (
    <S44CheckboxSection
      sectionTitle="English Language Learner Option"
      checkboxText="Spanish Support"
      checkboxValue={this.state.settingsObj.spanish_support[0]}
      handleChangeCheckboxValue={this.handleChangeSpanishSupport}
      isHalfHeight={isHalfHeight}
    />
  );

  renderSupportOptions = (isHalfHeight = true) => (
    <S44CheckboxSection
      sectionTitle="Support Option"
      checkboxText="Enable video captioning"
      checkboxValue={this.state.settingsObj.captioning[0]}
      handleChangeCheckboxValue={this.handleChangeCaptioning}
      isHalfHeight={isHalfHeight}
    />
  );

  renderPlacementAndLevelingOptions = () => (
    <S44PlacementAndLevelingOptions
      callBackFunc={this.setStateAndIsolateTab}
      settingsObj={this.state.settingsObj}
      isHalfWidth={false}
    />
  );

  renderProgramButtons = () => (
    <ProgramSettingsButtons
      restoreDefaultHandler={this.handleRestoreDefault}
      saveAndReturnHandler={this.handleSave}
      setInitialValuesHandler={this.handleSetInitialValues}
      stateResult={!this.props.isTabIsolated}
    />
  );

  renderSettings = () => (
    <div className="s44-settings__content">
      {this.renderEnglishLanguageLearnerOptions(false)}
      {this.renderSupportOptions(false)}
      {this.renderProgramButtons()}
    </div>
  );

  renderStudentSettings = () => (
    <div className="s44-settings__content">
      {this.renderPlacementAndLevelingOptions()}
      {this.renderEnglishLanguageLearnerOptions()}
      {this.renderSupportOptions()}
      {this.renderProgramButtons()}
    </div>
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="s44-settings__heading">
          Use these options to select System 44 Program Settings.
        </span>
        {this.props.cohortType !== COHORT_TYPE.Student && this.renderSettings()}
        {this.props.cohortType === COHORT_TYPE.Student && this.renderStudentSettings()}
      </form>
    );
  }
}

ProgramSettingsViewS44.propTypes = {
  cohortType: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default ProgramSettingsViewS44;
