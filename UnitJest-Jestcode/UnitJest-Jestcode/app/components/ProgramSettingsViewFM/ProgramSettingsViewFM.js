/**
 *
 * ProgramSettingsViewFM
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsSelectBox from 'components/SettingsSelectBox';

import { ACCESSIBILITY, LANGUAGE, LESSONS_PER_DAY, OPERATION, ORIENTATION } from './constants';

import './ProgramSettingsViewFM.scss';

class ProgramSettingsViewFM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaults: props.settings.getIn(['Defaults', 0]),
      settings: {
        ...props.settings.getIn(['Settings', 0]).toJS(),
      },
    };
  }

  // --- Handler Functions ---
  setStateAndIsolateTab = settings => {
    this.setState({ settings });
    this.props.setIsolateTab(true);
  };

  getSettingsValue = key => {
    const { settings } = this.state;
    return settings[key][0];
  };

  handleChange = e => {
    const { settings } = this.state;
    settings[e.target.id][0] = e.target.value;
    this.setStateAndIsolateTab(settings);
  };

  handleRestoreDefault = () => {
    const { settings, defaults } = this.state;
    settings[ACCESSIBILITY.id][0] = defaults.getIn([ACCESSIBILITY.id, 0]);
    settings[LANGUAGE.id][0] = defaults.getIn([LANGUAGE.id, 0]);
    settings[LESSONS_PER_DAY.id][0] = defaults.getIn([LESSONS_PER_DAY.id, 0]);
    settings[ORIENTATION.id][0] = defaults.getIn([ORIENTATION.id, 0]);
    this.setStateAndIsolateTab(settings);
  };

  handleSave = () => {
    this.props.handleSave(this.state.settings);
    this.props.setIsolateTab(false);
  };

  handleSetInitialValues = () => {
    this.setState({ settings: { ...this.props.settings.getIn(['Settings', 0]).toJS() } });
    this.props.setIsolateTab(false);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleSave();
  };

  // --- Render Functions ---
  renderAssignment = () => (
    <div className="fm-settings__section--top">
      <div className="fm-settings__section-title">Assignment</div>
      <div className="fm-settings__section-content">
        <div className="fm-settings__section-content-assignment">
          <div className="fm-settings__section-content-label">Operation</div>
          <SettingsSelectBox
            fieldClass="fm-settings__section-content-operation-drop-down"
            fieldValue={this.getSettingsValue(OPERATION.id)}
            id={OPERATION.id}
            mixedValue="-2"
            onChange={this.handleChange}
          >
            {OPERATION.options.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </SettingsSelectBox>
        </div>
        <div className="fm-settings__section-content-assignment">
          <div className="fm-settings__section-content-label">Lessons per Day</div>
          {LESSONS_PER_DAY.options.map(option => (
            <div key={option.name}>
              <input
                checked={this.getSettingsValue(LESSONS_PER_DAY.id) === option.id}
                id={LESSONS_PER_DAY.id}
                onChange={this.handleChange}
                type="radio"
                value={option.id}
              />
              <span className="fm-settings__radio-label">{option.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  renderProblemFormat = () => (
    <div className="fm-settings__section--middle">
      <div className="fm-settings__section-title">Problem Format</div>
      <div className="fm-settings__section-content">
        <span className="fm-settings__section-content-label--orientation">Orientation</span>
        {ORIENTATION.options.map(option => (
          <span key={option.name}>
            <input
              checked={this.getSettingsValue(ORIENTATION.id) === option.id}
              id={ORIENTATION.id}
              onChange={this.handleChange}
              type="radio"
              value={option.id}
            />
            <span className="fm-settings__radio-label">{option.name}</span>
          </span>
        ))}
      </div>
    </div>
  );

  renderUserInterface = () => (
    <div className="fm-settings__section--bottom">
      <div className="fm-settings__section-title">User Interface</div>
      <div className="fm-settings__section-content">
        <span>
          <span className="fm-settings__section-content-label--accessibility">Accessibility</span>
          <SettingsSelectBox
            fieldValue={this.getSettingsValue(ACCESSIBILITY.id)}
            id={ACCESSIBILITY.id}
            mixedValue="-1"
            onChange={this.handleChange}
          >
            {ACCESSIBILITY.options.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </SettingsSelectBox>
        </span>
        <span>
          <span className="fm-settings__section-content-label--language">Language</span>
          {LANGUAGE.options.map(option => (
            <span key={option.name}>
              <input
                checked={this.getSettingsValue(LANGUAGE.id) === option.id}
                id={LANGUAGE.id}
                onChange={this.handleChange}
                type="radio"
                value={option.id}
              />
              <span className="fm-settings__radio-label">{option.name}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="fm-settings__heading">
          Use these options to adjust FASTT Math settings.
          <div className="fm-settings__content">
            {this.renderAssignment()}
            {this.renderProblemFormat()}
            {this.renderUserInterface()}
            <ProgramSettingsButtons
              restoreDefaultHandler={this.handleRestoreDefault}
              saveAndReturnHandler={this.handleSave}
              setInitialValuesHandler={this.handleSetInitialValues}
              stateResult={!this.props.isTabIsolated}
            />
          </div>
        </span>
      </form>
    );
  }
}

ProgramSettingsViewFM.propTypes = {
  isTabIsolated: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default ProgramSettingsViewFM;
