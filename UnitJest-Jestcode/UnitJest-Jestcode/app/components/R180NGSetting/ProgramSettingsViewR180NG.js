import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ProgramSettingsButtons from 'components/ProgramSettingsButtons/ProgramSettingsButtons';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import * as Constants from './constants';
import './ProgramSettingsViewR180NG.scss';

class ProgramSettingsViewR180NG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: true,
      ...this.props.programs,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.programs !== this.props.programs) {
      this.setState({ result: true, ...nextProps.programs });
    }
  }

  getQuadrant1LevelingOptions = () => (
    <div className="program-settings-list">
      <div className="program-settings-list__item">
        <SettingsFourStateCheckbox
          checkboxId="computer_placement"
          checkboxText="Enable automatic placement based on initial Reading Inventory Lexile&reg;"
          currentCheckboxValue={this.state.computer_placement && this.state.computer_placement[0]}
          handleChangeCheckboxValue={this.handleChange}
          disabled={this.state.student_level && this.state.student_level[0] > 0}
        />
      </div>

      <div className="program-settings-list__item">
        <SettingsFourStateCheckbox
          checkboxId="auto_level"
          checkboxText="Promote student to next level automatically"
          currentCheckboxValue={this.state.auto_level && this.state.auto_level[0]}
          handleChangeCheckboxValue={this.handleChange}
        />
      </div>

      <div key="studentLevel" className="program-settings-list__item">
        <span className="program-settings-r180ng__quadrants-text">
          {"Set student's next level to:"}{' '}
        </span>
        <select
          name="student_level"
          className="program-settings-r180ng__quadrants-select"
          onChange={this.handleSetStudentLevelChange}
          value={this.state.student_level && Number(this.state.student_level[0])}
        >
          {this.props.programs.student_level &&
            Number(this.props.programs.student_level[0]) < 0 && <option value={'-1'}>--</option>}
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>
  );

  getQuadrant2ReadingWritingOptions = () => (
    <div className="program-settings-list">
      <div className="program-settings-list__item">
        <SettingsFourStateCheckbox
          checkboxId="writing_zone_enabled"
          checkboxText="Enable Writing Zone"
          currentCheckboxValue={
            this.state.writing_zone_enabled && this.state.writing_zone_enabled[0]
          }
          handleChangeCheckboxValue={this.handleChange}
        />
      </div>
      <div key="writingZoneFrequency" className="program-settings-list__item">
        <span className="program-settings-r180ng__quadrants-textoptions">
          Writing Zone Frequency:
        </span>
        <select
          id="writing_zone_frequency"
          name="writing_zone_frequency"
          className="program-settings-writingzone-frequency"
          onChange={this.handleChange}
          value={
            this.state.writing_zone_enabled && this.state.writing_zone_enabled[0] === '0'
              ? '-2'
              : this.state.writing_zone_frequency && this.state.writing_zone_frequency[0]
          }
          disabled={this.state.writing_zone_enabled && this.state.writing_zone_enabled[0] === '0'}
        >
          <option
            disabled
            value={'-2'}
            hidden={(this.state.writing_zone_enabled && this.state.writing_zone_enabled[0]) === '0'}
          />
          <option value="every_segment">Every Segment</option>
          <option value="every_other_segment">Every Other Segment</option>
        </select>
      </div>
      <div key="enableERead" className="program-settings-list__item">
        <SettingsFourStateCheckbox
          checkboxId="ereads_enabled"
          checkboxText="Enable eReads"
          currentCheckboxValue={this.state.ereads_enabled && this.state.ereads_enabled[0]}
          handleChangeCheckboxValue={this.handleChange}
        />

        <div className="program-settings-r180ng-eread">
          <div className="program-settings-r180ng__quadrants-options">
            <input
              id="match_ereads_level_to_sw_reading_level"
              name="match_ereads_level_to_sw_reading_level"
              className="enableEread-MatchPlacement"
              onChange={this.handleDefaultEnableEreadMatchPlacement}
              onClick={this.handleDefaultEnableEreadMatchPlacement}
              disabled={this.state.ereads_enabled && this.state.ereads_enabled[0] === '0'}
              checked={
                this.state.match_ereads_level_to_sw_reading_level &&
                this.state.match_ereads_level_to_sw_reading_level[0] > 0
                  ? (this.state.ereads_level = ['-2'])
                  : ''
              }
              type="radio"
            />
            <span className="program-settings-r180ng__quadrants-eread">
              Match placement to student{`'`}s software reading level
            </span>
          </div>
          <div className="program-settings-r180ng__quadrants-options">
            <input
              id="ereads_enabled"
              name="ereads_enabled"
              className="enableEread-setStudent-eReadLevel"
              disabled={this.state.ereads_enabled && this.state.ereads_enabled[0] === '0'}
              onChange={this.handleSetEreadLevel}
              checked={this.state.ereads_level && Number(this.state.ereads_level[0]) > 0}
              type="radio"
            />
            <span className="program-settings-r180ng__quadrants-eread">
              Set student&apos;s eReads level to:
              <select
                className="program-settings-r180ng__quadrants-select"
                id="ereads_level"
                name="ereads_level"
                disabled={this.state.ereads_level && this.state.ereads_level[0] < 0}
                onChange={this.handleChange}
                value={this.state.ereads_level && this.state.ereads_level[0]}
              >
                <option
                  disabled
                  value={'-2'}
                  hidden={this.state.ereads_enabled && Number(this.state.ereads_enabled[0]) === 1}
                >
                  {''}
                </option>
                <option value="1">1-2</option>
                <option value="3">3-4</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  getQuadrant3EnglishLanguageLearnerOptions = () => (
    <div className="program-settings-r180ng__quadrants-learneroption">
      {this.secondLangOptions.map(
        option =>
          Number(option.id) < 3 ? (
            <div className="program-settings-r180ng__second-lang-options" key={option.name}>
              <span className="program-settings-r180ng-options">
                <input
                  type="radio"
                  className="program-settings-r180ng-second-lang-option"
                  name="second_language_id"
                  onChange={this.handleChange}
                  id={option.name}
                  key={option.name}
                  value={option.id}
                  readOnly
                  checked={
                    !!(
                      this.state.second_language_id &&
                      Number(this.state.second_language_id[0]) === option.id
                    )
                  }
                />
                {option.name}
              </span>
            </div>
          ) : (
            <div className="program-settings-r180ng__second-lang-options" key={option.name}>
              <span className="program-settings-r180ng-options">
                <input
                  type="radio"
                  className="program-settings-r180ng-second-lang-option"
                  name="second_language_id"
                  onChange={this.handleChange}
                  id={option.name}
                  key={option.name}
                  value={option.id}
                  readOnly
                  checked={
                    !!(
                      this.state.second_language_id &&
                      Number(this.state.second_language_id[0]) === option.id
                    )
                  }
                />
                {option.name}
              </span>
            </div>
          )
      )}
    </div>
  );

  getQuadrant4SupportOptions = () => (
    <div className="program-settings-list">
      <div className="program-settings-list__item">
        <SettingsFourStateCheckbox
          checkboxId="captioning"
          checkboxText="Enable captioning"
          currentCheckboxValue={this.state.captioning && this.state.captioning[0]}
          handleChangeCheckboxValue={this.handleChange}
        />
      </div>
      <div className="program-settings-list__item">
        <SettingsFourStateCheckbox
          textClass="program-settings-r180ng__quadrants-text"
          checkboxId="alt_color_scheme"
          checkboxText="Display with alternate color scheme"
          currentCheckboxValue={this.state.alt_color_scheme && this.state.alt_color_scheme[0]}
          handleChangeCheckboxValue={this.handleChange}
        />
      </div>
      <div className="program-settings-list__item">
        <SettingsFourStateCheckbox
          checkboxId="button_rollover"
          checkboxText="Enable button rollover"
          currentCheckboxValue={this.state.button_rollover && this.state.button_rollover[0]}
          handleChangeCheckboxValue={this.handleChange}
        />
      </div>
      <div className="program-settings-r180ng__quadrants-reading-speed">
        <span className="program-settings-r180ng__quadrants-text">Set reading speed to: </span>
        <select
          name="reading_speed"
          className="program-settings-r180ng__quadrants-select"
          onChange={this.handleChange}
          value={this.state.reading_speed && this.state.reading_speed[0]}
        >
          <option
            disabled
            value={'-2'}
            hidden={this.state.reading_speed && Number(this.state.reading_speed[0]) > 0}
          >
            {''}
          </option>
          <option value="1"> 1</option>
          <option value="2"> 2</option>
          <option value="3"> 3</option>
          <option value="4"> 4</option>
          <option value="5"> 5</option>
        </select>
      </div>
    </div>
  );

  setStudentLevel = level => {
    const change = {};

    if (level > 0) {
      change.computer_placement = ['0'];
    }
    change.student_level = [String(level)];
    this.setState(change);
    this.showSaveOptions();
    this.props.handleToggle();
    return '';
  };

  handleChangeEreadLevelSelected = e => {
    this.handleChange(e);
  };

  handleSetInitialValues = () => {
    this.setState({ ...this.props.programs, result: true });
    this.props.handleTabReset();
  };

  handleSaveAndReturn = () => {
    this.props.handleSave(this.state);
    this.props.handleTabReset();
  };

  handleRestoreDefault = () => {
    this.setState({ ...Constants.R180NG_RESTORE_DEFALUT_VALUES, result: false });
    this.props.handleToggle();
  };

  showSaveOptions() {
    this.setState({ result: false });
  }

  handleChangeWritingZone = e => {
    this.handleChange(e);
  };

  handleSetStudentLevelChange = e => {
    e.preventDefault();
    if (e.target.value > 0) {
      this.props.onStudentLevelClick({
        Level: e.target.value,
        setLevel: this.setStudentLevel,
      });
    }
  };

  handleDefaultSetEreadLevel = e => {
    this.handleChange(e);
  };

  handleDefaultEnableEreadMatchPlacement = () => {
    this.setState({ result: false });
    const change = {};
    change.match_ereads_level_to_sw_reading_level = ['1'];
    change.ereads_level = ['-2'];
    this.setState(change);
    this.props.handleToggle();
  };

  handleSetEreadLevel = () => {
    this.setState({ result: false });
    const change = {};
    change.match_ereads_level_to_sw_reading_level = ['0'];
    change.ereads_level = ['1'];
    this.setState(change);
    this.props.handleToggle();
  };

  secondLangOptions = [
    { id: 0, name: 'None' },
    { id: 3, name: 'Cantonese' },
    { id: 1, name: 'Spanish' },
    { id: 4, name: 'Vietnamese' },
    { id: 2, name: 'Haitian Creole' },
    { id: 5, name: 'Hmong' },
  ];

  saveChanges = values => values;

  handleChange = e => {
    this.setState({ result: false });
    const change = {};
    let targetvalue = e.target.value;
    if (e.target.type === 'checkbox' && e.target.checked === true) {
      targetvalue = 1;
    } else if (e.target.type === 'checkbox' && e.target.checked === false) {
      targetvalue = 0;
    }
    if (e.target.name === 'student_level' && e.target.value > 0) {
      change.computer_placement = ['0'];
    }
    if (e.target.name === 'second_language_id' && e.target.value === '1') {
      change.pronunciation_tip = ['1'];
    } else {
      change.pronunciation_tip = ['0'];
    }
    if (e.target.id === 'writing_zone_enabled' && e.target.checked === false) {
      change.writing_zone_frequency = ['-2'];
    }
    if (e.target.id === 'writing_zone_enabled' && e.target.checked === true) {
      change.writing_zone_frequency = ['every_other_segment'];
    }
    if (e.target.id === 'ereads_enabled' && e.target.checked === false) {
      change.match_ereads_level_to_sw_reading_level = ['-2'];
      change.ereads_level = ['-2'];
    } else if (e.target.id === 'ereads_enabled' && e.target.checked === true) {
      change.match_ereads_level_to_sw_reading_level = ['1'];
      change.ereads_level = ['0'];
    }
    change[e.target.name] = [String(targetvalue)];
    change[e.target.id] = [String(targetvalue)];
    this.setState(change);
    this.props.handleToggle();
  };

  hideSaveOptions() {
    this.setState({ result: true });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSave(this.state);
    this.props.handleTabReset();
    this.hideSaveOptions();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} defaultValue={this.props.programs}>
        <span className="program-settings-heading">
          {' '}
          Use these options to select {this.props.programName} Program Settings.
        </span>
        <div
          className={`program-settings--r180ng ${
            this.state.result === false ? 'program-settings--r180ng-overlay' : ''
          }`}
        >
          <div className="program-settings--r180ng__quadrants">
            <span className="program-settings--r180ng__level-caption">Leveling Options</span>
            {this.getQuadrant1LevelingOptions()}
          </div>
          <div className="program-settings--r180ng__quadrants">
            <span className="program-settings--r180ng__level-caption">
              Extended Reading and Writing Options
            </span>
            {this.getQuadrant2ReadingWritingOptions()}
          </div>
          <div className="program-settings--r180ng__quadrants">
            <span className="program-settings--r180ng__level-caption">
              English Language Learner Options
            </span>
            {this.getQuadrant3EnglishLanguageLearnerOptions()}
            <span className="program-settings--r180ng__level-caption">
              <SettingsFourStateCheckbox
                checkboxId="pronunciation_tip"
                checkboxText="Pronunciation Tips (Spanish Only)"
                currentCheckboxValue={
                  this.state.pronunciation_tip && this.state.pronunciation_tip[0]
                }
                handleChangeCheckboxValue={this.handleChange}
                disabled
              />
            </span>
          </div>
          <div className="program-settings--r180ng__quadrants">
            <span className="program-settings--r180ng__level-caption">Support Options</span>
            {this.getQuadrant4SupportOptions()}
          </div>
          <ProgramSettingsButtons
            restoreDefaultHandler={this.handleRestoreDefault}
            saveAndReturnHandler={this.handleSaveAndReturn}
            setInitialValuesHandler={this.handleSetInitialValues}
            stateResult={this.state.result}
          />
        </div>
      </form>
    );
  }
}

ProgramSettingsViewR180NG.propTypes = {
  programs: PropTypes.any.isRequired,
  onStudentLevelClick: PropTypes.func,
  programName: PropTypes.string,
  handleSave: PropTypes.func,
  handleTabReset: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default ProgramSettingsViewR180NG;
