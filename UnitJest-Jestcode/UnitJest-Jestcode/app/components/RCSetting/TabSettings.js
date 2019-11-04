import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsFourStateCheckbox from 'components/SettingsFourStateCheckbox';
import SettingsSelectBox from 'components/SettingsSelectBox';
import SettingsTextField from 'components/SettingsTextField';
import { COHORT_TYPE, USER_TYPE } from 'containers/App/constants';
import { WARNING_MODAL } from 'containers/ModalController/constants';
import { isStrictlyNumeric } from 'utils/utilities';
import './TabSettings.scss';
import * as Constants from './constants';

class TabSettings extends Component {
  constructor(props) {
    super(props);
    const { immSettings } = props;
    this.state = { immSettings };
  }

  getNewValue = e => {
    let newValue = e.target.value;
    const isChecked = e.target.checked;
    if (e.target.type === 'checkbox' && isChecked === true) {
      newValue = '1';
    } else if (e.target.type === 'checkbox' && isChecked === false) {
      newValue = '0';
    }
    return newValue;
  };

  getNumericTextFieldInvalidMessage = (description, min, max) =>
    `An invalid value has been entered for ${description}.  This value must be an integer between ${min} and ${max} inclusive.`;

  handleSetInitialValues = () => {
    const { immSettings } = this.props;
    this.setState({ immSettings });
    this.props.setIsolateTab(false);
  };

  handleRestoreDefault = () => {
    const { immSettings } = this.state;
    const newImmSettings = immSettings.withMutations(mutableImmSettings => {
      const studentSettingsDefaultEntries = mutableImmSettings
        .getIn(['StudentSettings', 0, 'StudentDefaults', 0])
        .entrySeq();
      studentSettingsDefaultEntries.forEach(entry => {
        mutableImmSettings.setIn(['StudentSettings', 0, entry[0], 0], entry[1].get(0));
      });
      const quizSettingsDefaultEntries = mutableImmSettings
        .getIn(['QuizSettings', 0, 'QuizDefaults', 0])
        .entrySeq();
      quizSettingsDefaultEntries.forEach(entry => {
        mutableImmSettings.setIn(['QuizSettings', 0, entry[0], 0], entry[1].get(0));
      });
      const awardSettingsDefaultEntries = mutableImmSettings
        .getIn(['AwardSettings', 0, 'AwardDefaults', 0])
        .entrySeq();
      awardSettingsDefaultEntries.forEach(entry => {
        mutableImmSettings.setIn(['AwardSettings', 0, entry[0], 0], entry[1].get(0));
      });
      const awardSettingsPointDefaultEntries = mutableImmSettings
        .getIn(['AwardSettings', 0, 'PointDefaults', 0])
        .entrySeq();
      awardSettingsPointDefaultEntries.forEach(entry => {
        mutableImmSettings.setIn(['AwardSettings', 0, entry[0], 0], entry[1].get(0));
      });
    });
    this.setState({ immSettings: newImmSettings });
    this.props.setIsolateTab(true);
  };

  handleBlurQuizSettings = e => {
    let { immSettings } = this.state;
    const targetFieldName = e.target.name;
    const newValue = this.getNewValue(e);
    const textFieldNumericRange = Constants.TEXT_FIELD_NUMERIC_RANGES[targetFieldName];
    if (textFieldNumericRange) {
      const newValueAsInt = parseInt(newValue, 10);
      const valueOutOfRange =
        !isNaN(newValueAsInt) &&
        (newValueAsInt < textFieldNumericRange[0] || newValueAsInt > textFieldNumericRange[1]);
      if ((targetFieldName === 'DaysBetweenRetake' && newValue.length === 0) || valueOutOfRange) {
        this.props.showModal(WARNING_MODAL, {
          message: this.getNumericTextFieldInvalidMessage(
            textFieldNumericRange[2],
            textFieldNumericRange[0],
            textFieldNumericRange[1]
          ),
        });
        const revertValue =
          textFieldNumericRange[3] === Constants.INITIAL_FORM_VALUE
            ? this.props.immSettings.getIn(['QuizSettings', 0, targetFieldName, 0])
            : textFieldNumericRange[3];
        immSettings = immSettings.setIn(['QuizSettings', 0, targetFieldName, 0], revertValue);
        this.setState({ immSettings });
      }
    }
  };

  handleBlurAwardSettings = e => {
    let { immSettings } = this.state;
    const targetFieldName = e.target.name;
    const newValue = this.getNewValue(e);
    const textFieldNumericRange = Constants.TEXT_FIELD_NUMERIC_RANGES[targetFieldName];
    if (textFieldNumericRange) {
      const newValueAsInt = parseInt(newValue, 10);
      const valueOutOfRange =
        !isNaN(newValueAsInt) &&
        (newValueAsInt < textFieldNumericRange[0] || newValueAsInt > textFieldNumericRange[1]);
      const pointsMultiplierIsEmpty =
        targetFieldName === 'PointsMultiplier' && newValue.length === 0;
      const goalsIsEmpty = targetFieldName === 'StudentGoal' && newValue.length === 0;
      if (pointsMultiplierIsEmpty || goalsIsEmpty || valueOutOfRange) {
        this.props.showModal(WARNING_MODAL, {
          message: this.getNumericTextFieldInvalidMessage(
            textFieldNumericRange[2],
            textFieldNumericRange[0],
            textFieldNumericRange[1]
          ),
        });
        const revertValue =
          textFieldNumericRange[3] === Constants.INITIAL_FORM_VALUE
            ? this.props.immSettings.getIn(['AwardSettings', 0, targetFieldName, 0])
            : textFieldNumericRange[3];
        immSettings = immSettings.setIn(['AwardSettings', 0, targetFieldName, 0], revertValue);
        this.setState({ immSettings });
      }
    }
  };

  handleChangeStudentSettings = e => {
    let { immSettings } = this.state;
    const targetFieldName = e.target.name;
    const newValue = this.getNewValue(e);
    immSettings = immSettings.setIn(['StudentSettings', 0, targetFieldName, 0], newValue);
    this.setState({ immSettings });
    this.props.setIsolateTab(true);
  };

  handleChangeQuizSettings = e => {
    let { immSettings } = this.state;
    const targetFieldName = e.target.name;
    const newValue = this.getNewValue(e);
    const textFieldNumericRange = Constants.TEXT_FIELD_NUMERIC_RANGES[targetFieldName];
    if (textFieldNumericRange) {
      // validate the type and number of characters
      if (
        newValue.length &&
        (newValue.length > textFieldNumericRange[1].toString().length ||
          !isStrictlyNumeric(newValue))
      ) {
        return;
      }
    }
    immSettings = immSettings.setIn(['QuizSettings', 0, targetFieldName, 0], newValue);
    this.setState({ immSettings });
    this.props.setIsolateTab(true);
  };

  handleChangeAwardSettings = e => {
    let { immSettings } = this.state;
    const targetFieldName = e.target.name;
    const newValue = this.getNewValue(e);
    const textFieldNumericRange = Constants.TEXT_FIELD_NUMERIC_RANGES[targetFieldName];
    if (textFieldNumericRange) {
      // validate the type and number of characters
      if (
        newValue.length &&
        (newValue.length > textFieldNumericRange[1].toString().length ||
          !isStrictlyNumeric(newValue))
      ) {
        return;
      }
    }
    immSettings = immSettings.setIn(['AwardSettings', 0, targetFieldName, 0], newValue);
    this.setState({ immSettings });
    this.props.setIsolateTab(true);
  };

  handleSave = (shouldRedirect = true) => {
    this.props.handleSave(this.state.immSettings, shouldRedirect);
    this.props.setIsolateTab(false);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleSave(false);
  };

  renderStudentSettings = () => {
    const immStudentSettings = this.state.immSettings.getIn(['StudentSettings', 0]);
    return (
      <div className="rc-settings__student-settings">
        <span className="rc-settings__caption">Student Settings</span>
        <div className="rc-settings__student-setting-block" key="display-congrats">
          <SettingsFourStateCheckbox
            checkboxName="DisplayCongratulations"
            checkboxText="Display Congratulations Screen"
            currentCheckboxValue={immStudentSettings.getIn(['DisplayCongratulations', 0])}
            handleChangeCheckboxValue={this.handleChangeStudentSettings}
            statusMap={Constants.RC_SETTINGS_CHECKBOX_STATUS_MAP}
          />
        </div>
        <div className="rc-settings__student-setting-block" key="display-wrong-answers">
          <SettingsFourStateCheckbox
            checkboxName="DisplayWrongAnswers"
            checkboxText="Display wrong answers"
            currentCheckboxValue={immStudentSettings.getIn(['DisplayWrongAnswers', 0])}
            handleChangeCheckboxValue={this.handleChangeStudentSettings}
            statusMap={Constants.RC_SETTINGS_CHECKBOX_STATUS_MAP}
          />
        </div>
        <div className="rc-settings__student-setting-block" key="allow-student-to-print">
          <SettingsFourStateCheckbox
            checkboxName="AllowPrint"
            checkboxText="Allow student to print"
            currentCheckboxValue={immStudentSettings.getIn(['AllowPrint', 0])}
            handleChangeCheckboxValue={this.handleChangeStudentSettings}
            statusMap={Constants.RC_SETTINGS_CHECKBOX_STATUS_MAP}
          />
        </div>
      </div>
    );
  };

  renderQuizSettings = () => {
    const immQuizSettings = this.state.immSettings.getIn(['QuizSettings', 0]);
    return (
      <div className="rc-settings__quiz-settings">
        <span className="rc-settings__caption">Quiz Settings</span>
        <div className="rc-settings__quiz-setting-block">
          <SettingsTextField
            fieldClass="rc-settings__text-field"
            fieldName="QuizAttemptsAllowed"
            fieldValue={immQuizSettings.getIn(['QuizAttemptsAllowed', 0])}
            label="Quiz attempts allowed"
            labelClass="rc-settings__text-field-label"
            labelPosition="left"
            mixedValue=""
            onBlur={this.handleBlurQuizSettings}
            onChange={this.handleChangeQuizSettings}
          />
        </div>
        <div className="rc-settings__quiz-setting-block">
          <SettingsTextField
            fieldClass="rc-settings__text-field"
            fieldName="PercentRequired"
            fieldValue={immQuizSettings.getIn(['PercentRequired', 0])}
            label="% required to pass a quiz"
            labelClass="rc-settings__text-field-label"
            labelPosition="left"
            mixedValue=""
            onBlur={this.handleBlurQuizSettings}
            onChange={this.handleChangeQuizSettings}
          />
        </div>
        <div className="rc-settings__quiz-setting-block">
          <SettingsTextField
            fieldClass="rc-settings__text-field"
            fieldName="DaysBetweenRetake"
            fieldValue={immQuizSettings.getIn(['DaysBetweenRetake', 0])}
            label="Retake days between quizzes"
            labelClass="rc-settings__text-field-label"
            labelPosition="left"
            mixedValue=""
            onBlur={this.handleBlurQuizSettings}
            onChange={this.handleChangeQuizSettings}
          />
        </div>
        {this.props.loggedInUserType !== USER_TYPE.Teacher && (
          <div className="rc-settings__quiz-setting-block">
            <SettingsFourStateCheckbox
              checkboxName="AllowOffLineScores"
              checkboxText="Allow teachers to enter offline quiz scores"
              currentCheckboxValue={immQuizSettings.getIn(['AllowOffLineScores', 0])}
              handleChangeCheckboxValue={this.handleChangeQuizSettings}
              statusMap={Constants.RC_SETTINGS_CHECKBOX_STATUS_MAP}
            />
          </div>
        )}
      </div>
    );
  };

  renderNumberOfQuestionsPerQuiz = () => {
    const immQuizSettings = this.state.immSettings.getIn(['QuizSettings', 0]);
    return (
      <div className="rc-settings__num-questions-per-quiz">
        <span className="rc-settings__caption">Number of Questions per Quiz</span>
        <div className="rc-settings__num-questions-text-field-block">
          <SettingsTextField
            fieldClass="rc-settings__text-field"
            fieldName="NumQuestionsPerQuiz"
            fieldValue={immQuizSettings.getIn(['NumQuestionsPerQuiz', 0])}
            label="Number of questions per quiz"
            labelClass="rc-settings__text-field-label"
            labelPosition="left"
            mixedValue=""
            onBlur={this.handleBlurQuizSettings}
            onChange={this.handleChangeQuizSettings}
          />
        </div>
        <div className="rc-settings__num-questions-text-field-block">
          <SettingsTextField
            fieldClass="rc-settings__text-field rc-settings__num-questions-per-ereads-field"
            fieldName="NumQuestionsPerEReads"
            fieldValue={immQuizSettings.getIn(['NumQuestionsPerEReads', 0])}
            label="Number of questions for eReads quiz (READ 180 Next Generation)"
            labelClass="rc-settings__num-questions-per-ereads-label"
            labelPosition="left"
            mixedValue=""
            onBlur={this.handleBlurQuizSettings}
            onChange={this.handleChangeQuizSettings}
          />
        </div>
      </div>
    );
  };

  renderAwardLevelsReadOnly = immAwardSettings => (
    <tr>
      <td>{immAwardSettings.getIn(['Gold', 0])}</td>
      <td>{immAwardSettings.getIn(['Silver', 0])}</td>
      <td>{immAwardSettings.getIn(['Bronze', 0])}</td>
      <td>{immAwardSettings.getIn(['Red', 0])}</td>
      <td>{immAwardSettings.getIn(['Blue', 0])}</td>
    </tr>
  );

  renderAwardLevelsEditable = immAwardSettings => (
    <tr>
      <td>
        <input
          className="rc-setting__award-level-text-input"
          name="Gold"
          onBlur={this.handleBlurAwardSettings}
          onChange={this.handleChangeAwardSettings}
          type="text"
          value={immAwardSettings.getIn(['Gold', 0])}
        />
      </td>
      <td>
        <input
          className="rc-setting__award-level-text-input"
          name="Silver"
          onBlur={this.handleBlurAwardSettings}
          onChange={this.handleChangeAwardSettings}
          type="text"
          value={immAwardSettings.getIn(['Silver', 0])}
        />
      </td>
      <td>
        <input
          className="rc-setting__award-level-text-input"
          name="Bronze"
          onBlur={this.handleBlurAwardSettings}
          onChange={this.handleChangeAwardSettings}
          type="text"
          value={immAwardSettings.getIn(['Bronze', 0])}
        />
      </td>
      <td>
        <input
          className="rc-setting__award-level-text-input"
          name="Red"
          onBlur={this.handleBlurAwardSettings}
          onChange={this.handleChangeAwardSettings}
          type="text"
          value={immAwardSettings.getIn(['Red', 0])}
        />
      </td>
      <td>
        <input
          className="rc-setting__award-level-text-input"
          name="Blue"
          onBlur={this.handleBlurAwardSettings}
          onChange={this.handleChangeAwardSettings}
          type="text"
          value={immAwardSettings.getIn(['Blue', 0])}
        />
      </td>
    </tr>
  );

  renderAwardSettings = () => {
    const immAwardSettings = this.state.immSettings.getIn(['AwardSettings', 0]);
    return (
      <div className="rc-settings__award-settings">
        <span className="rc-settings__caption">Award Settings</span>
        {this.props.loggedInUserType !== USER_TYPE.Teacher && (
          <div className="rc-settings__award-setting-block">
            <SettingsFourStateCheckbox
              checkboxName="AllowChangeGoals"
              checkboxText="Allow teachers to change goals"
              currentCheckboxValue={immAwardSettings.getIn(['AllowChangeGoals', 0])}
              handleChangeCheckboxValue={this.handleChangeAwardSettings}
              statusMap={Constants.RC_SETTINGS_CHECKBOX_STATUS_MAP}
            />
          </div>
        )}
        <div className="rc-settings__award-setting-block">
          <SettingsSelectBox
            fieldClass="rc-settings__award-setting-goals-field"
            fieldName="Goals"
            fieldValue={immAwardSettings.getIn(['Goals', 0])}
            label="Goals"
            mixedValue="-1"
            onChange={this.handleChangeAwardSettings}
          >
            <option value="1">Points</option>
            <option value="2">Books</option>
          </SettingsSelectBox>
          <SettingsTextField
            fieldClass="rc-settings__text-field rc-settings__award-setting-student-goal-field"
            fieldName="StudentGoal"
            fieldValue={immAwardSettings.getIn(['StudentGoal', 0])}
            mixedValue=""
            onBlur={this.handleBlurAwardSettings}
            onChange={this.handleChangeAwardSettings}
          />
        </div>
        <div className="rc-settings__award-setting-block rc-settings__award-setting-pts-multiplier-block">
          <SettingsTextField
            fieldClass="rc-settings__text-field rc-settings__award-setting-pts-multiplier-field"
            fieldName="PointsMultiplier"
            fieldValue={immAwardSettings.getIn(['PointsMultiplier', 0])}
            label="Points multiplier (multiply by)"
            labelClass="rc-settings__text-field-label"
            labelPosition="left"
            mixedValue=""
            onBlur={this.handleBlurAwardSettings}
            onChange={this.handleChangeAwardSettings}
          />
        </div>
        <div className="rc-settings__subheading">Levels for Award Report</div>
        <table className="rc-settings__award-level-table">
          <tbody>
            <tr>
              <td className="rc-settings__award-level-table-cell">Gold</td>
              <td className="rc-settings__award-level-table-cell">Silver</td>
              <td className="rc-settings__award-level-table-cell">Bronze</td>
              <td className="rc-settings__award-level-table-cell">Red</td>
              <td className="rc-settings__award-level-table-cell">Blue</td>
            </tr>
            {this.props.cohortObj.cohortType === COHORT_TYPE.Student
              ? this.renderAwardLevelsReadOnly(immAwardSettings)
              : this.renderAwardLevelsEditable(immAwardSettings)}
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    const { isTabIsolated, programName } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="rc-settings__instruction-text">
          {' '}
          Use these options to adjust {programName} settings.
        </span>
        <table className="rc-settings__top-settings-table">
          <tbody>
            <tr>
              <td className="rc-settings__table-cell rc-settings__student-settings-container">
                {this.renderStudentSettings()}
              </td>
              <td className="rc-settings__table-cell rc-settings__quiz-settings-container">
                {this.renderQuizSettings()}
              </td>
              <td className="rc-settings__table-cell rc-settings__num-questions-per-quiz-container">
                {this.renderNumberOfQuestionsPerQuiz()}
              </td>
            </tr>
          </tbody>
        </table>
        {this.renderAwardSettings()}
        <ProgramSettingsButtons
          restoreDefaultHandler={this.handleRestoreDefault}
          saveAndReturnHandler={this.handleSave}
          setInitialValuesHandler={this.handleSetInitialValues}
          stateResult={!isTabIsolated}
          suppressSaveAndReturnRedirect
        />
      </form>
    );
  }
}

TabSettings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
  immSettings: PropTypes.object.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  loggedInUserType: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default TabSettings;
