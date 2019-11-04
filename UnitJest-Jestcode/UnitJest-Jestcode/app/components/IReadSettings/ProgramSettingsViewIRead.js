import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import { IREAD_SCREENER_MODAL } from 'containers/ModalController/constants';

import { IREAD_DEFAULT_SETTINGS } from './constants';

import './ProgramSettingsViewIRead.scss';

class ProgramSettingViewIRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: this.props.programSettingData.toJS(),
    };
  }

  setNewAdministrationFlag = value => {
    const { currentData } = this.state;
    currentData.new_administration_flag[0] = value;
    this.setState({ currentData });
    this.props.setIsolateTab(true);
  };

  englishLanguageLearnerOptions = [{ id: '0', name: 'None' }, { id: '1', name: 'Spanish' }];

  handleChangeAdminScreenOnNextLoginCheckbox = e => {
    this.setNewAdministrationFlag(e.target.checked ? '1' : '0');

    if (e.target.checked) {
      this.props.showModal(IREAD_SCREENER_MODAL, {
        setNewAdministrationFlag: this.setNewAdministrationFlag,
      });
    }
  };

  handleChangeEnableStudentRecordingsCheckbox = e => {
    const { currentData } = this.state;
    currentData.allow_recordings_flag[0] = e.target.checked ? '1' : '0';
    this.setState({ currentData });
    this.props.setIsolateTab(true);
  };

  handleChangeEnglishLanguageLearnerOptions = e => {
    const { currentData } = this.state;
    currentData.second_language_id[0] = e.target.value;
    this.setState({ currentData });
    this.props.setIsolateTab(true);
  };

  handleSetInitialValues = () => {
    this.setState({ currentData: this.props.programSettingData.toJS() });
    this.props.setIsolateTab(false);
  };

  handleRestoreDefault = () => {
    this.setState({ currentData: IREAD_DEFAULT_SETTINGS.toJS() });
    this.props.setIsolateTab(true);
  };

  handleSaveAndReturn = () => {
    this.props.handleSave(this.state.currentData);
    this.props.setIsolateTab(false);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleSaveAndReturn();
  };

  renderScreenAdministratorOptions = () => (
    <div>
      <ul className="iread-settings__list">
        <li key="automaticPlacement" className="iread-settings__list-item">
          <SettingsFourStateCheckbox
            checkboxText="Administer screener on next student login"
            currentCheckboxValue={this.state.currentData.new_administration_flag[0]}
            handleChangeCheckboxValue={this.handleChangeAdminScreenOnNextLoginCheckbox}
          />
        </li>
      </ul>
      <span className="iread-settings__note">
        Note:
        <ul className="iread-settings__list-item">
          <li>
            Screener will administer automatically upon first-time login to
            <span className="iread-settings__note-list-item--italic"> iRead</span>.
          </li>
          <li>
            Check this box ONLY if student is returning to
            <span className="iread-settings__note-list-item--italic"> iRead</span> after a prolonged
            absence such as summer break and is likely to be re-leveled due to summer loss.
          </li>
        </ul>
      </span>
    </div>
  );

  renderEnglishLanguageLearnerOptions = () => {
    const englishLanguageLearnerOptionsSelectedIndex = this.state.currentData.second_language_id[0];
    return (
      <div className="iread-settings__lang-options">
        {this.englishLanguageLearnerOptions.map(option => (
          <div key={option.name}>
            <span>
              <input
                type="radio"
                className="iread-settings__lang-option-radio"
                name="second_language_id"
                onChange={this.handleChangeEnglishLanguageLearnerOptions}
                id={option.name}
                key={option.name}
                value={option.id}
                checked={englishLanguageLearnerOptionsSelectedIndex === option.id}
              />
              {option.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  renderSupportOptions = () => (
    <ul className="iread-settings__list">
      <li key="captioning" className="iread-settings__list-item">
        <SettingsFourStateCheckbox
          checkboxText="Enable student recordings"
          currentCheckboxValue={this.state.currentData.allow_recordings_flag[0]}
          handleChangeCheckboxValue={this.handleChangeEnableStudentRecordingsCheckbox}
        />
      </li>
    </ul>
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="iread-settings__heading">
          Use these options to select iRead Program Settings.
        </span>
        <div className="iread-settings__content">
          <div className="iread-settings__section--full-width">
            <span className="iread-settings__section-title">Screener Administration Option</span>
            {this.renderScreenAdministratorOptions()}
          </div>
          <div className="iread-settings__section--half-width">
            <span className="iread-settings__section-title">English Language Learner Option</span>
            {this.renderEnglishLanguageLearnerOptions()}
          </div>
          <div className="iread-settings__section--half-width">
            <span className="iread-settings__section-title">Support Options</span>
            {this.renderSupportOptions()}
          </div>
          <ProgramSettingsButtons
            restoreDefaultHandler={this.handleRestoreDefault}
            saveAndReturnHandler={this.handleSaveAndReturn}
            setInitialValuesHandler={this.handleSetInitialValues}
            stateResult={!this.props.isTabIsolated}
          />
        </div>
      </form>
    );
  }
}

ProgramSettingViewIRead.propTypes = {
  handleSave: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  programSettingData: PropTypes.object.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ProgramSettingViewIRead;
