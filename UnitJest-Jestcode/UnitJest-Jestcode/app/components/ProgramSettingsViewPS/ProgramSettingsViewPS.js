/**
 *
 * ProgramSettingsViewPS
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import './ProgramSettingsViewPS.scss';
import * as Constants from './constants';

class ProgramSettingsViewPS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsObj: this.props.settings.toJS(),
    };
  }

  handleCheckbox = e => {
    const { settingsObj } = this.state;
    settingsObj[e.target.id][0] = e.target.checked ? '1' : '0';
    this.setState({ settingsObj });
    this.props.setIsolateTab(true);
  };

  handleEnglishLanguageLearnerOption = e => {
    const { settingsObj } = this.state;
    settingsObj.ell_audio_instructions[0] = e.target.value;
    this.setState({ settingsObj });
    this.props.setIsolateTab(true);
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

  handleSave = () => {
    this.props.handleSave(this.state.settingsObj);
    this.props.setIsolateTab(false);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleSave();
  };

  renderTestExperience() {
    return (
      <div className="ps-settings__quadrants1">
        <span className="ps-settings__quadrants-heading">Test Experience</span>

        <div className="ps-setting__audio-instruction">
          <div className="ps-setting__checkbox">
            <SettingsFourStateCheckbox
              checkboxId="audio_instructions"
              checkboxText="Include audio support of question stems"
              currentCheckboxValue={this.state.settingsObj.audio_instructions[0]}
              handleChangeCheckboxValue={this.handleCheckbox}
              statusMap={Constants.PROGRESS_SPACE_STATUS_MAP}
            />
          </div>
          <div className="ps-setting__checkbox">
            <SettingsFourStateCheckbox
              checkboxId="student_access_to_score"
              checkboxText="Allow students to see final score and progress graph after test"
              currentCheckboxValue={this.state.settingsObj.student_access_to_score[0]}
              handleChangeCheckboxValue={this.handleCheckbox}
              statusMap={Constants.PROGRESS_SPACE_STATUS_MAP}
            />
          </div>
          <div className="ps-setting__checkbox">
            <SettingsFourStateCheckbox
              checkboxId="include_sample_questions"
              checkboxText="Include two sample questions before test"
              currentCheckboxValue={this.state.settingsObj.include_sample_questions[0]}
              handleChangeCheckboxValue={this.handleCheckbox}
              statusMap={Constants.PROGRESS_SPACE_STATUS_MAP}
            />
          </div>
        </div>
      </div>
    );
  }
  renderEnglishLanguageLearnerAudioDirections() {
    return (
      <div className="ps-settings__quadrants2">
        <span className="ps-settings__quadrants-heading">
          English-Language Learner Audio Directions
        </span>
        <div className="ps-settings__english-language">
          <span className="ps-setting__radio" key="None">
            <input
              type="radio"
              name="ell_audio_instructions"
              onChange={this.handleEnglishLanguageLearnerOption}
              id="None"
              key="None"
              value="0"
              checked={this.state.settingsObj.ell_audio_instructions[0] === '0'}
            />
            <span className="ps-settings__radio-label">None</span>
          </span>
          <span className="ps-setting__radio" key="Spanish">
            <input
              type="radio"
              name="ell_audio_instructions"
              onChange={this.handleEnglishLanguageLearnerOption}
              id="Spanish"
              key="Spanish"
              value="1"
              checked={this.state.settingsObj.ell_audio_instructions[0] === '1'}
            />
            <span className="ps-settings__radio-label">Spanish</span>
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="ps-settings__heading" />
        <div className="ps-settings__content">
          <div className="ps-setting__quadrants1-content">{this.renderTestExperience()}</div>
          <div className="ps-setting__quadrants2-content">
            {this.renderEnglishLanguageLearnerAudioDirections()}
          </div>
        </div>
        <div className="ps-settings__footer">
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

ProgramSettingsViewPS.propTypes = {
  handleSave: PropTypes.func.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
};

export default ProgramSettingsViewPS;
