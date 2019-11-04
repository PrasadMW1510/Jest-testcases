/**
 *
 * RSkillsCCSettingsTab
 *
 */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import LoadingBar from 'components/LoadingBar';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import {
  RSKILLSCC_SETTINGS_CHECKBOX_STATUS_MAP,
  RSKILLSCC_SETTING_GRADING_RUBRIC_FOUR_PT,
  RSKILLSCC_SETTING_GRADING_RUBRIC_SIX_PT,
} from 'components/RSkillsCCSetting/constants';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import { COHORT_TYPE } from 'containers/App/constants';

import './RSkillsCCSettingsTab.scss';

class RSkillsCCSettingsTab extends React.Component {
  constructor(props) {
    super(props);
    const settingsOnScreen = props.immProgramSettings.toJS();
    this.state = {
      settingsOnScreen,
      tabHasNoUnsavedChanges: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.immProgramSettings !== this.props.immProgramSettings) {
      this.setState({
        settingsOnScreen: nextProps.immProgramSettings.toJS(),
        tabHasNoUnsavedChanges: true,
      });
    }

    if (
      nextProps.immDefaultProgramSettings !== this.props.immDefaultProgramSettings &&
      nextProps.immDefaultProgramSettings.size > 0
    ) {
      // props.immDefaultProgramSettings will change as a result of the user clicking restore default.
      this.handleRestoreDefault(nextProps.immDefaultProgramSettings.toJS());
    }
  }

  englishLanguageLearnerAudioDirectionsMeta = [
    { id: 0, name: 'None' },
    { id: 2, name: 'Haitian Creole' },
    { id: 1, name: 'Spanish' },
    { id: 5, name: 'Hmong' },
    { id: 3, name: 'Cantonese' },
    { id: 4, name: 'Vietnamese' },
  ];

  createRSkillsCCSettingsPayload = redirectToRoster => {
    const { effectiveCohortObject } = this.props;
    const {
      audio_instructions,
      show_correct_incorrect,
      include_open_response,
      include_writing_prompts,
      ell_audio_instructions,
      writing_prompt_grading,
    } = this.state.settingsOnScreen;

    const result = {
      redirectToRoster,
      postPayload: {
        output: {
          output_data: {
            cohort_type: effectiveCohortObject.cohortType.toUpperCase(),
            cohort_id: effectiveCohortObject.id,
            settings: {
              audio_instructions: audio_instructions[0],
              show_correct_incorrect: show_correct_incorrect[0],
              include_open_response: include_open_response[0],
              include_writing_prompts: include_writing_prompts[0],
              ell_audio_instructions: ell_audio_instructions[0],
              writing_prompt_grading: {
                grading_rubric: writing_prompt_grading[0].grading_rubric[0],
              },
            },
          },
        },
      },
    };
    return result;
  };

  fromApiToCheckboxValue = apiValue => (apiValue ? apiValue[0] : '0');

  handleChange = e => {
    const targetFieldName = e.target.name;
    let newValue = e.target.value;
    const isChecked = e.target.checked;
    const newState = {
      settingsOnScreen: this.state.settingsOnScreen,
      tabHasNoUnsavedChanges: false,
    };
    if (e.target.type === 'checkbox' && isChecked === true) {
      newValue = 1;
    } else if (e.target.type === 'checkbox' && isChecked === false) {
      newValue = 0;
    }
    if (e.target.name === 'writing_rubric') {
      // writing rubric is nested one deep, so cannot use targetFieldName
      newState.settingsOnScreen.writing_prompt_grading[0].grading_rubric = [String(newValue)];
    } else {
      newState.settingsOnScreen[targetFieldName] = [String(newValue)];
    }
    this.setState(newState);
    this.props.handleIsolateTab();
  };

  /**
   * this gets called, by way of componentWillReceiveProps, after a user has clicked the RestoreDefaults button
   */
  handleRestoreDefault = defaultSettings => {
    this.setState({
      settingsOnScreen: defaultSettings,
      tabHasNoUnsavedChanges: false,
    });
    this.props.handleIsolateTab();
  };

  handleRestoreDefaultClick = () => {
    this.props.handleRSkillsCCGetDefaultSettings();
  };

  handleSetInitialValues = () => {
    const settingsOnScreen = this.props.immProgramSettings.toJS();
    this.setState({
      settingsOnScreen,
      tabHasNoUnsavedChanges: true,
    });
    this.props.handleTabReset();
  };

  handleSubmit = e => {
    e.preventDefault();
    const noRedirect = false;
    this.props.handleSave(this.createRSkillsCCSettingsPayload(noRedirect));
    this.props.handleTabReset();
    this.hideSaveOptions();
  };

  handleSaveAndReturn = () => {
    const redirect = true;
    this.props.handleSave(this.createRSkillsCCSettingsPayload(redirect));
  };

  hideSaveOptions = () => {
    this.setState({ tabHasNoUnsavedChanges: true });
  };

  writingPromptRubricChecked = rubricVal => {
    let result = false;
    try {
      result =
        Number(this.state.settingsOnScreen.writing_prompt_grading[0].grading_rubric[0]) ===
        Number(rubricVal);
    } catch (err) {
      result = false;
    }
    return result;
  };

  renderCheckboxLabelRSkillCCSetting = (label, apiProperty) => {
    const checkboxValue = this.fromApiToCheckboxValue(this.state.settingsOnScreen[apiProperty]);
    return (
      <div className="rskillscc-program-settings__setting">
        <SettingsFourStateCheckbox
          checkboxName={apiProperty}
          checkboxText={label}
          currentCheckboxValue={checkboxValue}
          handleChangeCheckboxValue={this.handleChange}
          statusMap={RSKILLSCC_SETTINGS_CHECKBOX_STATUS_MAP}
        />
      </div>
    );
  };

  renderTestExperience = () => (
    <div className="rskillscc-program-settings__test-experience-settings">
      <span className="rskillscc-program-settings__caption">Test Experience</span>
      {this.renderCheckboxLabelRSkillCCSetting('Include audio directions', 'audio_instructions')}
      {this.renderCheckboxLabelRSkillCCSetting(
        'Show correct and incorrect answers',
        'show_correct_incorrect'
      )}
      {this.renderCheckboxLabelRSkillCCSetting(
        'Include constructed response',
        'include_open_response'
      )}
      {this.renderCheckboxLabelRSkillCCSetting(
        'Include extended constructed response',
        'include_writing_prompts'
      )}
    </div>
  );

  renderEnglishLanguageLearner = () => (
    <div className="rskillscc-program-settings__ell-settings">
      <span className="rskillscc-program-settings__caption">
        English-Lanaguage Learner Audio Directions
      </span>
      {this.englishLanguageLearnerAudioDirectionsMeta.map(option => (
        <div className="rskillscc-program-settings__ell-audio-instructions" key={option.name}>
          <label htmlFor={option.name} className="rskillscc-program-settings__radio-label">
            <input
              type="radio"
              className="rskillscc-program-settings__radio"
              name="ell_audio_instructions"
              onChange={this.handleChange}
              id={option.name}
              key={option.name}
              value={option.id}
              checked={
                this.state.settingsOnScreen.ell_audio_instructions &&
                Number(this.state.settingsOnScreen.ell_audio_instructions[0]) === Number(option.id)
              }
            />
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );

  renderWritingPromptSettings = () => {
    const disableRadio = this.props.effectiveCohortObject.cohortType !== COHORT_TYPE.District;
    const disabledCursorCSS = disableRadio ? 'rskillscc-program-settings__cursor--default' : '';
    const labelCSSClass = `rskillscc-program-settings__radio-label ${disabledCursorCSS}`;
    const radioCSSClass = `rskillscc-program-settings__radio  ${disabledCursorCSS}`;
    return (
      <div className="rskillscc-program-settings__writing-prompt-settings">
        <span className="rskillscc-program-settings__caption">Writing Prompt Settings</span>
        <div className="rskillscc-program-settings__writing-prompt-settings-instructions">
          Choose either a 4-point or 6-point rubric to grade rSkills Tests: College & Career Writing
          Prompts. To preview the rubrics for Open Response questions or Writing Prompts, see the
          SAM Resources.
        </div>
        <div className="rskillscc-program-settings__writing-prompt-settings-rubric-container">
          <div className="rskillscc-program-settings__rubric-options" key="rubric_four_id">
            <label htmlFor="rubric_four_id" className={labelCSSClass}>
              <input
                type="radio"
                className={radioCSSClass}
                name="writing_rubric"
                onChange={this.handleChange}
                id="rubric_four_id"
                key="rubric_four_name"
                value={RSKILLSCC_SETTING_GRADING_RUBRIC_FOUR_PT}
                checked={this.writingPromptRubricChecked(RSKILLSCC_SETTING_GRADING_RUBRIC_FOUR_PT)}
                disabled={disableRadio}
              />
              4 point rubric
            </label>
          </div>
          <div className="rskillscc-program-settings__rubric-options" key="rubric_six_id">
            <label htmlFor="rubric_six_id" className={labelCSSClass}>
              <input
                type="radio"
                className={radioCSSClass}
                name="writing_rubric"
                onChange={this.handleChange}
                id="rubric_six_id"
                key="rubric_six_name"
                value={RSKILLSCC_SETTING_GRADING_RUBRIC_SIX_PT}
                checked={this.writingPromptRubricChecked(RSKILLSCC_SETTING_GRADING_RUBRIC_SIX_PT)}
                disabled={disableRadio}
              />
              6 point rubric
            </label>
          </div>
        </div>
      </div>
    );
  };
  renderSettings = () => (
    <Fragment>
      <div className="rskillscc-settings-tab">
        <div className="rskillscc-program-settings__section--full-width rskillscc-program-settings__section--top">
          <div className="rskillscc-program-settings__section--top-inputs">
            {this.renderTestExperience()}
            {this.renderEnglishLanguageLearner()}
          </div>
        </div>
        <div className="rskillscc-program-settings__section--full-width">
          {this.renderWritingPromptSettings()}
        </div>
      </div>
      <div className="rskillscc-program-settings__program-setting-buttons-container">
        <ProgramSettingsButtons
          restoreDefaultHandler={this.handleRestoreDefaultClick}
          saveAndReturnHandler={this.handleSaveAndReturn}
          setInitialValuesHandler={this.handleSetInitialValues}
          stateResult={!this.props.isTabIsolated}
          suppressSaveAndReturnRedirect
        />
      </div>
    </Fragment>
  );

  render() {
    if (this.props.isLoading || this.props.isDefaultProgramSettingsLoading) {
      return (
        <div className="rskillscc-settings-tab">
          <LoadingBar />
        </div>
      );
    }
    return <form onSubmit={this.handleSubmit}>{this.renderSettings()}</form>;
  }
}

RSkillsCCSettingsTab.defaultProps = {
  isDefaultProgramSettingsLoading: false,
  isLoading: false,
};

RSkillsCCSettingsTab.propTypes = {
  effectiveCohortObject: PropTypes.object.isRequired,
  handleIsolateTab: PropTypes.func.isRequired,
  handleRSkillsCCGetDefaultSettings: PropTypes.func.isRequired,
  handleTabReset: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isDefaultProgramSettingsLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
  immDefaultProgramSettings: PropTypes.any,
  immProgramSettings: PropTypes.any,
  isTabIsolated: PropTypes.bool.isRequired,
};

export default RSkillsCCSettingsTab;
