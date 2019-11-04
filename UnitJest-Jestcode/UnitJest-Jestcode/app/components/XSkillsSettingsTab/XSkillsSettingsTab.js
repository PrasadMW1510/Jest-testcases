/**
 *
 * XSkillsSettingsTab
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsRubricScoringSection from 'components/SettingsRubricScoringSection';
import SettingsTestExperienceSection from 'components/SettingsTestExperienceSection';
import {
  XSKILLS_SETTINGS_CHECKBOX_STATUS_MAP,
  XSKILLS_SETTINGS_TEST_EXPERIENCE_VALUES,
} from 'components/XSkillsSettings/constants';
import './XSkillsSettingsTab.scss';

class XSkillsSettingsTab extends React.Component {
  constructor(props) {
    super(props);
    const settingsOnScreen = props.immProgramSettings.toJS();
    this.state = {
      settingsOnScreen,
      shouldReinitializeEditor: false,
    };
  }
  englishLanguageLearnerAudioDirectionsMeta = [{ id: 0, name: 'None' }, { id: 1, name: 'Spanish' }];

  handleChange = e => {
    const targetFieldName = e.target.name;
    let newValue = e.target.value;
    const isChecked = e.target.checked;
    const newState = {
      settingsOnScreen: this.state.settingsOnScreen,
    };
    if (e.target.type === 'checkbox' && isChecked === true) {
      newValue = 1;
    } else if (e.target.type === 'checkbox' && isChecked === false) {
      newValue = 0;
    }
    newState.settingsOnScreen[targetFieldName] = [String(newValue)];
    // TODO Writing rubric will be saved in future story. keeping this comment out until then
    // if (e.target.name === 'writing_rubric') {
    //   // writing rubric is nested one deep, so cannot use targetFieldName
    //   newState.settingsOnScreen.writing_prompt_grading[0].grading_rubric = [String(newValue)];
    // } else {
    //   newState.settingsOnScreen[targetFieldName] = [String(newValue)];
    // }
    this.setState(newState);
    this.props.setIsolateTab(true);
  };

  findGradeOption = (gradingRubric, gradingType, gradingScore) => {
    const newState = {
      settingsOnScreen: this.state.settingsOnScreen,
    };
    const temp = newState.settingsOnScreen[gradingType].find(
      item => item.grading_rubric[0] === gradingRubric
    );
    const gradeOptions = temp.grade_options;
    return gradeOptions[0].grade_option.find(item => item.score[0] === gradingScore);
  };

  handleChangeLabel = ev => {
    const gradingRubric = ev.target.getAttribute('data-gradingrubric');
    const gradingType = ev.target.getAttribute('data-gradingtype');
    const gradingScore = ev.target.getAttribute('data-gradingscore');
    const gradeOption = this.findGradeOption(gradingRubric, gradingType, gradingScore);
    const newState = {
      settingsOnScreen: this.state.settingsOnScreen,
    };
    if (gradeOption) {
      gradeOption.label[0] = ev.target.value;
    }
    this.setState(newState);
    this.props.setIsolateTab(true);
  };

  handleChangeDescription = dataObj => {
    const gradingRubric = dataObj.idObj.gradingRubric;
    const gradingType = dataObj.idObj.gradingType;
    const gradingScore = dataObj.idObj.gradingScore;

    const gradeOption = this.findGradeOption(gradingRubric, gradingType, gradingScore);
    const newState = {
      settingsOnScreen: this.state.settingsOnScreen,
    };
    if (gradeOption) {
      gradeOption.description[0] = dataObj.target.value;
    }
    this.setState(newState);
    this.props.setIsolateTab(true);
  };

  handleRestoreDefaultClick = () => {
    // TODO , implement.
  };

  handleSaveAndReturn = () => {
    // TODO implement redirect on the Save story 'const redirect = true';
    this.props.handleSave();
  };

  handleSetInitialValues = () => {
    // reititializeEditor set to true,  needs to pass down to its SAMEditor so that it knows to reset itself
    const resetSettings = this.props.immProgramSettings.toJS();
    this.setState({
      settingsOnScreen: resetSettings,
      shouldReinitializeEditor: true,
    });
    this.props.setIsolateTab(false);
  };

  handleSubmit = event => {
    event.preventDefault();
    // TODO implement redirect on the Save story  'const noRedirect = false';
    this.props.handleSave();
    this.props.setIsolateTab(false);
  };

  // function passed down to its SAMEditor
  reinitializeEditorComplete = () => {
    this.setState({ shouldReinitializeEditor: false });
  };

  renderTestExperience = () => (
    <SettingsTestExperienceSection
      checkBoxStatusMap={XSKILLS_SETTINGS_CHECKBOX_STATUS_MAP}
      handleChange={this.handleChange}
      settingsOnScreen={this.state.settingsOnScreen}
      settingValues={XSKILLS_SETTINGS_TEST_EXPERIENCE_VALUES}
    />
  );

  renderEnglishLanguageLearner = () => (
    <div className="xskills-program-settings__ell-settings">
      <span className="xskills-program-settings__caption">
        English-Language Learner Audio Directions
      </span>
      {this.englishLanguageLearnerAudioDirectionsMeta.map(option => (
        <div className="xskills-program-settings__ell-audio-instructions" key={option.name}>
          <label htmlFor={option.name} className="xskills-program-settings__radio-label">
            <input
              type="radio"
              className="xskills-program-settings__radio"
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

  renderRubricScoringSection = () => (
    <SettingsRubricScoringSection
      cohortType={this.props.cohortType}
      handleChange={this.handleChange}
      handleChangeDescription={this.handleChangeDescription}
      handleChangeLabel={this.handleChangeLabel}
      handleSetInitialValues={this.handleSetInitialValues}
      reinitializeEditorComplete={this.reinitializeEditorComplete}
      settingsOnScreen={this.state.settingsOnScreen}
      shouldReinitializeEditor={this.state.shouldReinitializeEditor}
    />
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="xskills-settings-tab">
          <div className="xskills-program-settings__section--top-inputs">
            <div className="xskills-settings__test-experience-section">
              {this.renderTestExperience()}
            </div>
            {this.renderEnglishLanguageLearner()}
          </div>
          <div className="xskills-program-settings__section--rubric">
            {this.renderRubricScoringSection()}
          </div>
          <div className="xskills-settings__program-setting-buttons-container">
            <ProgramSettingsButtons
              restoreDefaultHandler={this.handleRestoreDefaultClick}
              saveAndReturnHandler={this.handleSaveAndReturn}
              setInitialValuesHandler={this.handleSetInitialValues}
              stateResult={!this.props.isTabIsolated}
            />
          </div>
        </div>
      </form>
    );
  }
}

XSkillsSettingsTab.propTypes = {
  cohortType: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  immProgramSettings: PropTypes.any,
  isTabIsolated: PropTypes.bool.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
};

export default XSkillsSettingsTab;
