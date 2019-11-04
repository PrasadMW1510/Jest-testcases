/**
 *
 * ProgramSettingsViewR180EE
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import SettingsSelectBox from 'components/SettingsSelectBox';
import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';
import UserTitleText from 'containers/UserTitleText';

import {
  CHECKBOXES,
  DEFAULT_SETTINGS,
  LANGUAGE_OPTIONS,
  PRONUNCIATION_TIP_STATUS_MAP,
  RADIO,
  SELECTS,
} from './constants';

import './ProgramSettingsViewR180EE.scss';

class ProgramSettingsViewR180EE extends React.Component {
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

  getSettingsValue = key => {
    const { settingsObj } = this.state;
    return settingsObj[key][0];
  };

  createDropDown = numOfOptions =>
    Array.from(Array(numOfOptions).keys()).map((currentValue, index) => (
      <option key={currentValue} value={index + 1}>
        {index + 1}
      </option>
    ));

  handleCheckbox = e => {
    const { settingsObj } = this.state;
    settingsObj[e.target.id][0] = e.target.checked ? '1' : '0';
    this.setStateAndIsolateTab(settingsObj);
  };

  handleChangeEnglishLanguageLearnerOptions = e => {
    const { settingsObj } = this.state;
    settingsObj.second_language_id[0] = e.target.value;
    settingsObj.pronunciation_tip[0] = settingsObj.second_language_id[0] === '1' ? '1' : '0';

    this.setStateAndIsolateTab(settingsObj);
  };

  handleReadingSpeedChange = e => {
    const { settingsObj } = this.state;
    settingsObj.reading_speed[0] = e.target.value;
    this.setStateAndIsolateTab(settingsObj);
  };

  handleStudentLevelChange = e => {
    const { settingsObj } = this.state;
    const previousStudentLevel = settingsObj.student_level[0];
    settingsObj.computer_placement[0] = '0';
    settingsObj.student_level[0] = e.target.value;

    if (settingsObj.student_level[0] !== '-1') {
      this.props.showModal(OK_CANCEL_MODAL, {
        heading: 'Set Student Level',
        message: this.renderOkCancelModalMessage(e.target.value),
        modalClassName: 'r180ee-settings__student-level-modal',
        headerClassName: 'r180ee-settings__student-level-modal-header',
        onCancel: this.handleModalCancel,
        onCancelParam: previousStudentLevel,
      });
    }

    this.setStateAndIsolateTab(settingsObj);
  };

  handleModalCancel = previousStudentLevel => {
    const { settingsObj } = this.state;
    settingsObj.student_level[0] = previousStudentLevel;
    this.setStateAndIsolateTab(settingsObj);
  };

  handleRestoreDefault = () => {
    const defaultSettings = DEFAULT_SETTINGS.toJS();
    defaultSettings.computer_placement = this.state.settingsObj.computer_placement;
    defaultSettings.auto_level = this.state.settingsObj.auto_level;
    defaultSettings.student_level = this.state.settingsObj.student_level;

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
  renderOkCancelModalMessage = levelValue => (
    <span>
      Are you sure you want <UserTitleText /> set at Level {levelValue} in READ 180?<br />
      <br />
      Changes will take effect when the student begins a new segment.
    </span>
  );

  renderLevelingOptions = () => (
    <div className="r180ee-settings__section r180ee-settings__section--top">
      <div className="r180ee-settings__section-title">Leveling Options</div>
      <div className="r180ee-settings__section-content">
        <div>
          <SettingsFourStateCheckbox
            checkboxId={CHECKBOXES.computerPlacement.id}
            checkboxText={CHECKBOXES.computerPlacement.text}
            currentCheckboxValue={this.getSettingsValue(CHECKBOXES.computerPlacement.id)}
            handleChangeCheckboxValue={this.handleCheckbox}
            disabled={Number(this.getSettingsValue('student_level')) > -1}
          />
        </div>
        <div>
          <SettingsFourStateCheckbox
            checkboxId={CHECKBOXES.autoLevel.id}
            checkboxText={CHECKBOXES.autoLevel.text}
            currentCheckboxValue={this.getSettingsValue(CHECKBOXES.autoLevel.id)}
            handleChangeCheckboxValue={this.handleCheckbox}
          />
        </div>
      </div>
      <SettingsSelectBox
        labelClass="r180ee-settings__student-level-label"
        fieldClass="r180ee-settings__select-field"
        fieldName={SELECTS.studentLevel.id}
        label={SELECTS.studentLevel.text}
        fieldValue={this.getSettingsValue(SELECTS.studentLevel.id)}
        onChange={this.handleStudentLevelChange}
        mixedValue="100"
      >
        {Number(this.props.settings.getIn([SELECTS.studentLevel.id, 0])) < 0 && (
          <option value={'-1'}>--</option>
        )}
        {this.createDropDown(4)}
      </SettingsSelectBox>
    </div>
  );

  renderEnglishLanguageLearnerOptions = () => (
    <div className="r180ee-settings__section r180ee-settings__section--bottom">
      <div className="r180ee-settings__section-title">English Language Learner Options</div>
      <div className="r180ee-settings__section-content">
        {LANGUAGE_OPTIONS.map(option => (
          <div className="r180ee-settings__radio" key={option.name}>
            <input
              type="radio"
              name={RADIO.secondLanguageId.id}
              onChange={this.handleChangeEnglishLanguageLearnerOptions}
              id={option.name}
              key={option.name}
              value={option.id}
              checked={this.getSettingsValue(RADIO.secondLanguageId.id) === option.id}
            />
            <span className="r180ee-settings__radio-text">{option.name}</span>
          </div>
        ))}
      </div>
      <div className="r180ee-settings__section-footer">
        <SettingsFourStateCheckbox
          checkboxId={CHECKBOXES.pronunciationTip.id}
          checkboxText={CHECKBOXES.pronunciationTip.text}
          currentCheckboxValue={this.getSettingsValue(CHECKBOXES.pronunciationTip.id)}
          statusMap={PRONUNCIATION_TIP_STATUS_MAP}
        />
      </div>
    </div>
  );

  renderSupportOptions = () => (
    <div className="r180ee-settings__section r180ee-settings__section--bottom">
      <div className="r180ee-settings__section-title">Support Options</div>
      <div className="r180ee-settings__section-content">
        <div>
          <SettingsFourStateCheckbox
            checkboxId={CHECKBOXES.captioning.id}
            checkboxText={CHECKBOXES.captioning.text}
            currentCheckboxValue={this.getSettingsValue(CHECKBOXES.captioning.id)}
            handleChangeCheckboxValue={this.handleCheckbox}
          />
        </div>
        <div>
          <SettingsFourStateCheckbox
            checkboxId={CHECKBOXES.altColorScheme.id}
            checkboxText={CHECKBOXES.altColorScheme.text}
            currentCheckboxValue={this.getSettingsValue(CHECKBOXES.altColorScheme.id)}
            handleChangeCheckboxValue={this.handleCheckbox}
          />
        </div>
        <div>
          <SettingsFourStateCheckbox
            checkboxId={CHECKBOXES.buttonRollover.id}
            checkboxText={CHECKBOXES.buttonRollover.text}
            currentCheckboxValue={this.getSettingsValue(CHECKBOXES.buttonRollover.id)}
            handleChangeCheckboxValue={this.handleCheckbox}
          />
        </div>
        <SettingsSelectBox
          labelClass="r180ee-settings__reading-speed-label"
          fieldClass="r180ee-settings__select-field"
          fieldName={SELECTS.readingSpeed.id}
          mixedValue="-2"
          label={SELECTS.readingSpeed.text}
          fieldValue={this.getSettingsValue(SELECTS.readingSpeed.id)}
          onChange={this.handleReadingSpeedChange}
        >
          {this.createDropDown(5)}
        </SettingsSelectBox>
      </div>
    </div>
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="r180ee-settings__heading">
          Use these options to select READ 180 Enterprise Edition Program Settings.
        </span>
        <div className="r180ee-settings__content">
          {this.renderLevelingOptions()}
          {this.renderEnglishLanguageLearnerOptions()}
          {this.renderSupportOptions()}
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

ProgramSettingsViewR180EE.propTypes = {
  handleSave: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ProgramSettingsViewR180EE;
