import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsMessage from 'components/SettingsMessage';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import SettingsSelectBox from 'components/SettingsSelectBox';
import SettingsTextField from 'components/SettingsTextField';
import { COHORT_TYPE } from 'containers/App/constants';
import { OK_CANCEL_MODAL, WARNING_MODAL } from 'containers/ModalController/constants';
import * as Constants from './constants';

class TabSettings extends Component {
  constructor(props) {
    super(props);
    const settingsOnScreen = props.immSettings.toJS();
    this.state = {
      settingsOnScreen,
      tabHasNoUnsavedChanges: true,
    };
  }

  setDiscardLastIncompleteTest = val => {
    const { settingsOnScreen } = this.state;
    settingsOnScreen.chosen_settings[0].discard_last_incomplete_test[0] = val;
    this.setState({ settingsOnScreen });
    this.isolateTab();
  };

  setMathLevel = val => {
    const { settingsOnScreen } = this.state;
    settingsOnScreen.chosen_settings[0].math_level[0] = val;
    this.setState({ settingsOnScreen });
    this.isolateTab();
  };

  shouldShowEstimatedMathLevel = () =>
    this.props.immSettings.getIn(['chosen_settings', 0, 'math_level']) &&
    (this.props.selectedCohortType === COHORT_TYPE.Class ||
      this.props.selectedCohortType === COHORT_TYPE.Group ||
      this.props.selectedCohortType === COHORT_TYPE.Student);

  shouldShowCalculatorAndFormulaCheckboxes = () =>
    this.props.immSettings.getIn(['chosen_settings', 0, 'show_calculator']) &&
    this.props.selectedCohortType !== COHORT_TYPE.Class &&
    this.props.selectedCohortType !== COHORT_TYPE.Group &&
    this.props.selectedCohortType !== COHORT_TYPE.Student;

  shouldShowLanguageCheckboxes = () =>
    this.props.immSettings.getIn(['chosen_settings', 0, 'language']) &&
    (this.props.selectedCohortType === COHORT_TYPE.Class ||
      this.props.selectedCohortType === COHORT_TYPE.Group ||
      this.props.selectedCohortType === COHORT_TYPE.Student);

  isolateTab = () => {
    this.setState({ tabHasNoUnsavedChanges: false });
    this.props.handleIsolateTab();
  };

  handleSetInitialValues = () => {
    this.setState({
      settingsOnScreen: this.props.immSettings.toJS(),
      tabHasNoUnsavedChanges: true,
    });
    this.props.handleTabReset();
  };

  saveSettings = () => {
    const { settingsOnScreen } = this.state;
    let isAllValid = true;
    // if the user selected a custom number of days between tests radio button,
    // make sure that a value was provided
    const timeBetweenTests = settingsOnScreen.chosen_settings[0].time_between_tests[0];
    if (timeBetweenTests === '5') {
      const customDaysList = settingsOnScreen.chosen_settings[0].custom_days;
      if (!customDaysList || isNaN(parseInt(customDaysList[0], 10))) {
        this.props.showModal(WARNING_MODAL, {
          message: 'Please fill in the minimum time between tests with a value between 0 and 365',
        });
        isAllValid = false;
      }
    }
    // some logged-in-user/cohort combinations don't allow access to specific props:
    // make sure these props are not present in the saved settings, accordingly
    if (!this.shouldShowEstimatedMathLevel()) {
      delete settingsOnScreen.chosen_settings[0].math_level;
    }
    if (!this.shouldShowCalculatorAndFormulaCheckboxes()) {
      delete settingsOnScreen.chosen_settings[0].show_calculator;
      delete settingsOnScreen.chosen_settings[0].show_reference_sheet;
    }
    if (!this.shouldShowLanguageCheckboxes()) {
      delete settingsOnScreen.chosen_settings[0].language;
      delete settingsOnScreen.chosen_settings[0].audio_read_aloud;
    }
    if (isAllValid) {
      this.props.handleSave(Constants.TAB_SETTINGS, settingsOnScreen);
      // the discard last incomplete test checkbox is always cleared after saving
      settingsOnScreen.chosen_settings[0].discard_last_incomplete_test[0] = '0';
      this.setState({ settingsOnScreen, tabHasNoUnsavedChanges: true });
      this.props.handleTabReset();
    }
    return isAllValid;
  };

  handleRestoreDefault = () => {
    const { default_settings: defaultSettingsList, settings_options } = this.state.settingsOnScreen;
    const defaultSettings = defaultSettingsList[0];
    const chosenSettings = { ...defaultSettings };
    // for some reason, the default value prop for the proficiency calculation (handed back)
    // from the server) is named 'default_proficiency_calculation' rather than its name under
    // the chosen settings block: 'active_proficiency_calculation'
    if (defaultSettings.default_proficiency_calculation) {
      chosenSettings.active_proficiency_calculation = [
        defaultSettings.default_proficiency_calculation[0],
      ];
      delete chosenSettings.default_proficiency_calculation;
    }
    const settingsOnScreen = {
      chosen_settings: [chosenSettings],
      default_settings: defaultSettingsList,
      settings_options,
    };
    this.setState({ settingsOnScreen });
    this.isolateTab();
  };

  handleBlur = e => {
    const targetFieldName = e.target.name;
    let newValue = e.target.value;
    if (targetFieldName === 'custom_days' && newValue.length > 0) {
      const newValueInt = parseInt(newValue, 10);
      if (newValueInt < 0 || newValueInt > 365) {
        if (newValueInt > 365) {
          newValue = 365;
        } else {
          newValue = 0;
        }
        this.handleChange({ target: { name: 'custom_days', value: newValue } });
        this.props.showModal(WARNING_MODAL, {
          message: 'Please fill in the minimum time between tests with a value between 0 and 365',
        });
      }
    }
  };

  handleChange = e => {
    const targetFieldName = e.target.name;
    let newValue = e.target.value;
    const isChecked = e.target.checked;
    // if this is the 'custom_days' field, and it's not numeric & positive, suppress the change.
    if (targetFieldName === 'custom_days' && newValue.length > 0) {
      const newValueInt = parseInt(newValue, 10);
      if (isNaN(newValue) || newValueInt < 0 || newValue.length > 3) {
        return;
      }
    }
    const newState = {
      settingsOnScreen: this.state.settingsOnScreen,
    };
    if (e.target.type === 'checkbox' && isChecked === true) {
      newValue = '1';
    } else if (e.target.type === 'checkbox' && isChecked === false) {
      newValue = '0';
    }
    if (targetFieldName === 'discard_last_incomplete_test' && newValue === '1') {
      this.props.showModal(OK_CANCEL_MODAL, {
        heading: 'Discard last incomplete test',
        message: (
          <span>
            Discarding the last incomplete test will require the student to start a new test on
            their next login.<br />
            <br />
            Are you sure you want to discard the last incomplete test(s) for the selected
            student(s)?
          </span>
        ),
        modalClassName: 'mi-settings__set-discard-test-modal',
        onOk: this.setDiscardLastIncompleteTest,
        onOkParam: newValue,
      });
    } else if (targetFieldName === 'math_level') {
      const { settings_options: settingsOptions } = this.state.settingsOnScreen;
      const mathLevelOption = settingsOptions[0].math_level[0].list[0].item.find(
        element => element.$.id === newValue
      );
      this.props.showModal(OK_CANCEL_MODAL, {
        heading: 'Set Estimated Math Level',
        message: `The Estimated Math Level for ${
          this.props.selectedCohortName
        } has been changed to "${mathLevelOption._}".
        This change will only affect the first Math Inventory test taken by the student(s).`,
        modalClassName: 'mi-settings__set-math-level-modal',
        onOk: this.setMathLevel,
        onOkParam: newValue,
      });
    } else {
      newState.settingsOnScreen.chosen_settings[0][targetFieldName] = [String(newValue)];
      this.setState(newState);
      this.isolateTab();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    return this.saveSettings();
  };

  fromApiToCheckboxValue = apiValue => (apiValue ? apiValue[0] : '0');

  renderCalculatorAndFormulaCheckboxes = () => {
    const checkboxes = [];
    if (this.shouldShowCalculatorAndFormulaCheckboxes()) {
      checkboxes.push(
        this.renderCheckboxLabelMISetting(
          'Turn off calculator. (Without the use of a calculator, students may find that problems are harder than expected.)',
          'show_calculator'
        )
      );
      checkboxes.push(
        this.renderCheckboxLabelMISetting(
          'Turn off formulas. (Without referring to formulas when appropriate, students may find that problems are harder than expected.)',
          'show_reference_sheet'
        )
      );
    }
    return checkboxes;
  };

  renderLanguageCheckboxes = () => {
    if (this.shouldShowLanguageCheckboxes()) {
      const language = this.state.settingsOnScreen.chosen_settings[0].language[0];
      const audioReadAloud = this.state.settingsOnScreen.chosen_settings[0].audio_read_aloud[0];
      return (
        <Fragment>
          <div className="mi-settings__setting" key="language-label">
            Language (directions only)
          </div>
          <div className="mi-settings__setting" key="language-field">
            <input
              type="radio"
              name="language"
              onChange={this.handleChange}
              key="english-radio"
              value="English"
              checked={language === 'English'}
            />
            <span className="mi-settings__radio-button-label" key="english-label">
              English
            </span>
            <input
              type="radio"
              name="language"
              onChange={this.handleChange}
              key="spanish-radio"
              value="Spanish"
              checked={language === 'Spanish'}
            />
            <span className="mi-settings__radio-button-label" key="spanish-label">
              Spanish
            </span>
          </div>
          <div className="mi-settings__setting" key="audio-read-aloud-label">
            Audio Read-aloud
          </div>
          <div className="mi-settings__setting" key="audio-read-aloud-field">
            <input
              type="radio"
              name="audio_read_aloud"
              onChange={this.handleChange}
              key="none-radio"
              value="None"
              checked={audioReadAloud === 'None'}
            />
            <span className="mi-settings__radio-button-label" key="none-label">
              None
            </span>
            <input
              type="radio"
              name="audio_read_aloud"
              onChange={this.handleChange}
              key="english-radio"
              value="English"
              checked={audioReadAloud === 'English'}
            />
            <span className="mi-settings__radio-button-label" key="english-label">
              English
            </span>
            <input
              type="radio"
              name="audio_read_aloud"
              onChange={this.handleChange}
              key="spanish-radio"
              value="Spanish"
              checked={audioReadAloud === 'Spanish'}
            />
            <span className="mi-settings__radio-button-label" key="spanish-label">
              Spanish
            </span>
          </div>
        </Fragment>
      );
    }
    return null;
  };

  renderCheckboxLabelMISetting = (label, apiProperty) => {
    const checkboxValue = this.fromApiToCheckboxValue(
      this.state.settingsOnScreen.chosen_settings[0][apiProperty]
    );
    return (
      <div className="mi-settings__setting" key={apiProperty}>
        <SettingsFourStateCheckbox
          checkboxName={apiProperty}
          checkboxText={label}
          currentCheckboxValue={checkboxValue}
          handleChangeCheckboxValue={this.handleChange}
          statusMap={Constants.MI_SETTINGS_CHECKBOX_STATUS_MAP}
        />
      </div>
    );
  };

  renderSelectOptionsForList = items =>
    items.map(item => (
      <option key={item.$.id} value={item.$.id}>
        {item._}
      </option>
    ));

  renderTestSettings = () => {
    const {
      chosen_settings: chosenSettings,
      settings_options: settingsOptions,
    } = this.state.settingsOnScreen;
    if (!chosenSettings || !settingsOptions) {
      return null;
    }
    const chosenTimeBetweenTests = chosenSettings[0].time_between_tests[0];
    return (
      <div className="mi-settings__test-settings">
        <span className="mi-settings__caption">Test Settings</span>
        <div>
          <div className="mi-settings__setting" key="time-between-tests-text">
            Minimum time between completed tests (We recommend using The Math Inventory 3 to 5 times
            a year for the most accurate measurement of progress.):
          </div>
          <div className="mi-settings__setting" key="time-between-tests-field">
            {settingsOptions[0].time_between_tests[0].list[0].item.map(timeBetweenTestsItem => (
              <span key={timeBetweenTestsItem.$.id}>
                <input
                  type="radio"
                  name="time_between_tests"
                  onChange={this.handleChange}
                  value={timeBetweenTestsItem.$.id}
                  checked={chosenTimeBetweenTests === timeBetweenTestsItem.$.id}
                />
                {timeBetweenTestsItem._ !== 'Custom' && (
                  <span className="mi-settings__radio-button-label--large-margin">
                    {timeBetweenTestsItem._}
                  </span>
                )}
              </span>
            ))}
            <span className="mi-settings__radio-button-label--medium-margin">
              <SettingsTextField
                disabled={chosenTimeBetweenTests !== '5'}
                fieldClass="mi-settings__text-field"
                fieldName="custom_days"
                fieldValue={chosenSettings[0].custom_days ? chosenSettings[0].custom_days[0] : ''}
                label="days"
                labelClass="mi-settings__text-field-label"
                labelPosition="right"
                mixedValue="-2"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
              />
            </span>
          </div>
          {this.shouldShowEstimatedMathLevel() && (
            <div className="mi-settings__setting" key="math-level-field">
              <SettingsSelectBox
                fieldName="math_level"
                fieldValue={chosenSettings[0].math_level[0]}
                label="Estimated Math Level (used for student placement on first test only):"
                mixedValue="-2"
                onChange={this.handleChange}
              >
                {this.renderSelectOptionsForList(settingsOptions[0].math_level[0].list[0].item)}
              </SettingsSelectBox>
            </div>
          )}
          {this.renderCheckboxLabelMISetting(
            'Discard last incomplete test (the student will start a new test on next login)',
            'discard_last_incomplete_test'
          )}
        </div>
      </div>
    );
  };

  renderTestExperienceSettings = () => {
    const {
      chosen_settings: chosenSettings,
      settings_options: settingsOptions,
    } = this.state.settingsOnScreen;
    if (!chosenSettings || !settingsOptions) {
      return null;
    }
    return (
      <div className="mi-settings__test-experience-settings">
        <span className="mi-settings__caption">Test Experience Settings</span>
        <div className="mi-settings__setting">
          <SettingsSelectBox
            fieldName="practice_test"
            fieldValue={chosenSettings[0].practice_test[0]}
            label="Require students to take practice questions (3-5 questions):"
            mixedValue="-2"
            onChange={this.handleChange}
          >
            {this.renderSelectOptionsForList(settingsOptions[0].practice_test[0].list[0].item)}
          </SettingsSelectBox>
        </div>
        {this.renderCheckboxLabelMISetting(
          'Show student Quantile® after test completion',
          'show_quantile'
        )}
        {this.renderCalculatorAndFormulaCheckboxes()}
        {this.renderLanguageCheckboxes()}
      </div>
    );
  };

  renderNoSettingsAvailableContent = () => {
    const { programName, selectedCohortType } = this.props;
    const message = `There are no ${programName} settings available for this ${selectedCohortType.toLowerCase()}`;
    return <SettingsMessage message1={message} />;
  };

  renderReportingSettings = () => {
    const { chosen_settings: chosenSettings } = this.state.settingsOnScreen;
    if (!chosenSettings) {
      return null;
    }
    const activeProficiencyCalculationList = chosenSettings[0].active_proficiency_calculation;
    return (
      <div className="mi-settings__reporting-settings">
        <span className="mi-settings__caption">Reporting Settings</span>
        <div className="mi-settings__brief">
          Select one of the following options for reporting student performance.
        </div>
        <div className="mi-settings__setting">
          <input
            checked={
              activeProficiencyCalculationList &&
              activeProficiencyCalculationList[0] === 'progressive'
            }
            className="mi-settings__radio-button"
            key="progressive"
            name="active_proficiency_calculation"
            onChange={this.handleChange}
            type="radio"
            value="progressive"
          />
          <span className="mi-settings__radio-button-label">
            Progressive bands (using performance levels that increase throughout the school year,
            from prior year spring levels to end-of-current-year levels)
          </span>
        </div>
        <div className="mi-settings__setting">
          <input
            checked={
              activeProficiencyCalculationList && activeProficiencyCalculationList[0] === 'static'
            }
            className="mi-settings__radio-button"
            key="static"
            name="active_proficiency_calculation"
            onChange={this.handleChange}
            type="radio"
            value="static"
          />
          <span className="mi-settings__radio-button-label">
            Fixed-EOY bands (using end-of-current-year performance levels throughout the entire
            school year)
          </span>
        </div>
      </div>
    );
  };

  render() {
    const { programName, selectedCohortType, immSettings } = this.props;
    const { tabHasNoUnsavedChanges } = this.state;
    if (!selectedCohortType) {
      return <SettingsMessage message1={Constants.INVALID_COHORT_MESSAGE} />;
    }
    if (immSettings.size === 0) {
      return this.renderNoSettingsAvailableContent();
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="mi-settings__instruction-text">
          {' '}
          Use these options to adjust {programName} settings.
        </span>
        <div className="mi-settings__settings-tab-content">
          {this.renderTestSettings()}
          {this.renderTestExperienceSettings()}
          {selectedCohortType === COHORT_TYPE.District && this.renderReportingSettings()}
        </div>
        <ProgramSettingsButtons
          restoreDefaultHandler={this.handleRestoreDefault}
          saveAndReturnHandler={this.saveSettings}
          setInitialValuesHandler={this.handleSetInitialValues}
          stateResult={tabHasNoUnsavedChanges}
        />
      </form>
    );
  }
}

TabSettings.defaultProps = {
  selectedCohortName: '',
  selectedCohortType: '',
};

TabSettings.propTypes = {
  handleIsolateTab: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleTabReset: PropTypes.func.isRequired,
  immSettings: PropTypes.any.isRequired,
  programName: PropTypes.string,
  selectedCohortName: PropTypes.string.isRequired,
  selectedCohortType: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default TabSettings;
