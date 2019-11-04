import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsMessage from 'components/SettingsMessage';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import SettingsSelectBox from 'components/SettingsSelectBox';
import SettingsTextField from 'components/SettingsTextField';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
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

  setEstimatedReadingLevel = val => {
    const { settingsOnScreen } = this.state;
    settingsOnScreen.est_reading_level[0] = val;
    this.setState({ settingsOnScreen });
    this.isolateTab();
  };

  isEstReadingLevelEditable = () =>
    this.props.selectedCohortType === COHORT_TYPE.Class ||
    this.props.selectedCohortType === COHORT_TYPE.Group ||
    this.props.selectedCohortType === COHORT_TYPE.Student;

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
    // if the 'min_days_between_tests' field is invalid, show a warning modal
    const minDaysBetweenTests = parseInt(settingsOnScreen.min_days_between_tests, 10);
    if (isNaN(minDaysBetweenTests)) {
      this.props.showModal(WARNING_MODAL, {
        message: Constants.MINIMUM_TIME_BETWEEN_TESTS_BLANK_MESSAGE,
      });
      isAllValid = false;
    } else if (minDaysBetweenTests > 365) {
      this.props.showModal(WARNING_MODAL, {
        message: Constants.MINIMUM_TIME_BETWEEN_TESTS_OUT_OF_RANGE_MESSAGE,
      });
      isAllValid = false;
    } else {
      this.props.handleSave(Constants.TAB_SETTINGS, settingsOnScreen);
      this.setState({ tabHasNoUnsavedChanges: true });
      this.props.handleTabReset();
    }
    return isAllValid;
  };

  handleRestoreDefault = () => {
    const { settingsOnScreen } = this.state;
    const defaultSettings = { ...Constants.TAB_SETTINGS_DEFAULT_VALUES };
    // revert any changes to estimated reading level, if it's not editable on the current page
    if (!this.isEstReadingLevelEditable()) {
      defaultSettings.est_reading_level[0] = settingsOnScreen.est_reading_level[0];
    }
    // revert any changes to 'min_days_between_tests' (and the checkbox) if the logged-in user is a teacher
    if (this.props.loggedInUserType === USER_TYPE.Teacher) {
      defaultSettings.allow_min_days_between_tests[0] =
        settingsOnScreen.allow_min_days_between_tests[0];
      defaultSettings.min_days_between_tests[0] = settingsOnScreen.min_days_between_tests[0];
    }
    this.setState({
      settingsOnScreen: defaultSettings,
    });
    this.isolateTab();
  };

  handleChange = e => {
    const targetFieldName = e.target.name;
    let newValue = e.target.value;
    const isChecked = e.target.checked;
    // if this is the 'min_days_between_tests' field, and it's not numeric & positive nor length <= 3, suppress the change.
    if (
      targetFieldName === 'min_days_between_tests' &&
      (isNaN(newValue) || newValue === '0' || newValue.length > 3)
    ) {
      return;
    }
    const newState = {
      settingsOnScreen: this.state.settingsOnScreen,
    };
    if (e.target.type === 'checkbox' && isChecked === true) {
      newValue = 1;
    } else if (e.target.type === 'checkbox' && isChecked === false) {
      newValue = 0;
    }
    if (targetFieldName === 'est_reading_level') {
      this.props.showModal(OK_CANCEL_MODAL, {
        heading: 'Set Estimated Reading Level',
        message: `The Estimated Reading Level for ${
          this.props.selectedCohortName
        } has been changed to ${newValue}.  This change will only affect the first Reading Inventory test taken by the student(s).`,
        onOk: this.setEstimatedReadingLevel,
        onOkParam: newValue,
      });
    } else {
      newState.settingsOnScreen[targetFieldName] = [String(newValue)];
      this.setState(newState);
      this.isolateTab();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    return this.saveSettings();
  };

  isolateTab = () => {
    this.setState({ tabHasNoUnsavedChanges: false });
    this.props.handleIsolateTab();
  };

  fromApiToCheckboxValue = apiValue => (apiValue ? apiValue[0] : '0');

  renderCheckboxLabelRISetting = (label, apiProperty) => {
    const checkboxValue = this.fromApiToCheckboxValue(this.state.settingsOnScreen[apiProperty]);
    return (
      <div className="ri-settings__setting">
        <SettingsFourStateCheckbox
          checkboxName={apiProperty}
          checkboxText={label}
          currentCheckboxValue={checkboxValue}
          handleChangeCheckboxValue={this.handleChange}
          statusMap={Constants.RI_SETTINGS_CHECKBOX_STATUS_MAP}
        />
      </div>
    );
  };

  /* eslint-disable react/no-array-index-key */
  renderSelectOptionsForNumbers = count =>
    Array(count)
      .fill()
      .map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ));
  /* eslint-enable react/no-array-index-key */

  renderSelectOptionsForReadingLevel = () => (
    <Fragment>
      <option value="1">Undetermined</option>
      <option value="2">Far below grade level</option>
      <option value="3">Below grade level</option>
      <option value="4">On grade level</option>
      <option value="5">Above grade level</option>
      <option value="6">Far above grade level</option>
    </Fragment>
  );

  renderTestSettings = () => {
    const { settingsOnScreen } = this.state;
    const allowMinDaysBetweenTests = this.fromApiToCheckboxValue(
      settingsOnScreen.allow_min_days_between_tests
    );
    let minDaysBetweenTests =
      settingsOnScreen.min_days_between_tests && settingsOnScreen.min_days_between_tests[0];
    // if the minDaysBetweenTests value is 'mixed', then its label will appear gray;
    // however, if the user sets the allowMinDaysBetweenTests checkbox, then we want
    // the minDaysBetweenTests label to appear black, so we'll fool the SettingsTextField
    // component into thinking we have a value that is different from 'mixed':  empty string.
    // note that the value in the component state still remains the same
    if (minDaysBetweenTests === '-1' && allowMinDaysBetweenTests === '1') {
      minDaysBetweenTests = '';
    }
    const estReadingLevel =
      settingsOnScreen.est_reading_level && settingsOnScreen.est_reading_level[0];
    return (
      <div className="ri-settings__test-settings">
        <span className="ri-settings__caption">Test Settings</span>
        <div className="ri-settings__setting">
          <SettingsFourStateCheckbox
            checkboxName="allow_min_days_between_tests"
            checkboxText="Minimum time between completed tests:"
            currentCheckboxValue={allowMinDaysBetweenTests}
            disabled={this.props.loggedInUserType === USER_TYPE.Teacher}
            handleChangeCheckboxValue={this.handleChange}
            statusMap={Constants.RI_SETTINGS_CHECKBOX_STATUS_MAP}
          />
          <SettingsTextField
            disabled={
              allowMinDaysBetweenTests === '0' ||
              allowMinDaysBetweenTests === '-1' ||
              this.props.loggedInUserType === USER_TYPE.Teacher
            }
            fieldName="min_days_between_tests"
            fieldValue={minDaysBetweenTests}
            label="days"
            labelPosition="right"
            mixedValue="-1"
            onChange={this.handleChange}
          />
        </div>
        {this.isEstReadingLevelEditable() && (
          <div className="ri-settings__setting">
            <SettingsSelectBox
              fieldName="est_reading_level"
              fieldValue={estReadingLevel}
              label="Estimated Reading Level (initial placement only):"
              onChange={this.handleChange}
              mixedValue="-1"
            >
              {this.renderSelectOptionsForReadingLevel()}
            </SettingsSelectBox>
          </div>
        )}
      </div>
    );
  };

  renderTestExperienceSettings = () => {
    const maxBooksInReadingList =
      this.state.settingsOnScreen.max_books_in_reading_list &&
      this.state.settingsOnScreen.max_books_in_reading_list[0];
    const maxBooksInReadingListVaryingClassName =
      maxBooksInReadingList === '-1' ? 'ri-settings__setting--varying' : '';
    return (
      <div className="ri-settings__test-experience-settings">
        <span className="ri-settings__caption">Test Experience Settings</span>
        {this.renderCheckboxLabelRISetting(
          'Require students to take practice test',
          'require_practice_test'
        )}
        {this.renderCheckboxLabelRISetting(
          'Allow student to choose reading interests',
          'choose_reading_interests'
        )}
        {this.renderCheckboxLabelRISetting('Allow student to see reading list', 'see_reading_list')}
        {this.renderCheckboxLabelRISetting(
          'Limit reading list to Reading Counts! installed quizzes',
          'limit_reading_to_installed_quizzes'
        )}
        <div className="ri-settings__setting">
          <span className={maxBooksInReadingListVaryingClassName}>
            Limit number of books in reading list to
          </span>
          <SettingsSelectBox
            fieldName="max_books_in_reading_list"
            fieldValue={maxBooksInReadingList}
            onChange={this.handleChange}
            mixedValue="-1"
          >
            {this.renderSelectOptionsForNumbers(30)}
          </SettingsSelectBox>
        </div>
        {this.renderCheckboxLabelRISetting(
          'Show student Lexile® score after test completion',
          'show_lexile_after_test'
        )}
      </div>
    );
  };

  renderNoEnrolledStudentsContent = () => {
    const { programName, selectedCohortType } = this.props;
    let message = `This ${selectedCohortType.toLowerCase()} does not have any students enrolled in ${programName}`;
    if (selectedCohortType === COHORT_TYPE.Student) {
      message = `This student is not enrolled in ${programName}`;
    }
    return <SettingsMessage message1={message} />;
  };

  renderNoSettingsAvailableContent = () => {
    const { programName, selectedCohortType } = this.props;
    const message = `There are no ${programName} settings available for this ${selectedCohortType.toLowerCase()}`;
    return <SettingsMessage message1={message} />;
  };

  render() {
    const { enrollmentCount, programName, selectedCohortType, immSettings } = this.props;
    const { tabHasNoUnsavedChanges } = this.state;
    if (!selectedCohortType) {
      return <SettingsMessage message1={Constants.INVALID_COHORT_MESSAGE} />;
    }
    if (enrollmentCount === 0) {
      return this.renderNoEnrolledStudentsContent();
    }
    if (immSettings.size === 0) {
      return this.renderNoSettingsAvailableContent();
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="ri-settings__instruction-text">
          {' '}
          Use these options to adjust {programName} settings.
        </span>
        <div className="ri-settings__settings-tab-content">
          {this.renderTestSettings()}
          {this.renderTestExperienceSettings()}
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
  enrollmentCount: PropTypes.number.isRequired,
  handleIsolateTab: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleTabReset: PropTypes.func.isRequired,
  immSettings: PropTypes.any.isRequired,
  loggedInUserType: PropTypes.string.isRequired,
  programName: PropTypes.string,
  selectedCohortName: PropTypes.string.isRequired,
  selectedCohortType: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default TabSettings;
