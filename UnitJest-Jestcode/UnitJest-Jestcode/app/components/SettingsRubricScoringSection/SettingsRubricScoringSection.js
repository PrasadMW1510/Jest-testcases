/**
 *
 * SettingsRubricScoringSection
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import NavBarWithModalContainer from 'containers/NavBarWithModalContainer';
import SettingsRubricTab from 'components/SettingsRubricTab';
import './SettingsRubricScoringSection.scss';

import * as Constants from '../XSkillsSettingsTab/constants';

class SettingsRubricScoringSection extends React.Component {
  onChangeRubricTab = () => {
    this.props.handleSetInitialValues();
  };

  get2PointGradeOptions = () => {
    const res = this.props.settingsOnScreen.open_resp_grading.filter(
      item => item.grading_rubric[0] === Constants.GRADING_RUBRIC_TWO
    );
    return res[0].grade_options;
  };

  get4PointGradeOptions = () => {
    const res = this.props.settingsOnScreen.open_resp_grading.filter(
      item => item.grading_rubric[0] === Constants.GRADING_RUBRIC_FOUR
    );
    return res[0].grade_options;
  };

  get6PointGradeOptions = () => {
    const res = this.props.settingsOnScreen.writing_prompt_grading.filter(
      item => item.grading_rubric[0] === Constants.GRADING_RUBRIC_SIX
    );
    return res[0].grade_options;
  };
  render2PointScoring = () => {
    const {
      cohortType,
      handleChangeDescription,
      handleChangeLabel,
      reinitializeEditorComplete,
      shouldReinitializeEditor,
    } = this.props;
    return (
      <SettingsRubricTab
        cohortType={cohortType}
        handleChangeDescription={handleChangeDescription}
        handleChangeLabel={handleChangeLabel}
        gradeOptions={this.get2PointGradeOptions()}
        gradingRubric={Constants.GRADING_RUBRIC_TWO}
        reinitializeEditorComplete={reinitializeEditorComplete}
        shouldReinitializeEditor={shouldReinitializeEditor}
        title={Constants.CONSTRUCTED_RESPONSE_TITLE}
      />
    );
  };

  render4PointScoring = () => {
    const {
      cohortType,
      handleChangeDescription,
      handleChangeLabel,
      reinitializeEditorComplete,
      shouldReinitializeEditor,
    } = this.props;
    return (
      <SettingsRubricTab
        cohortType={cohortType}
        handleChangeDescription={handleChangeDescription}
        handleChangeLabel={handleChangeLabel}
        gradeOptions={this.get4PointGradeOptions()}
        gradingRubric={Constants.GRADING_RUBRIC_FOUR}
        reinitializeEditorComplete={reinitializeEditorComplete}
        shouldReinitializeEditor={shouldReinitializeEditor}
        title={Constants.CONSTRUCTED_RESPONSE_TITLE}
      />
    );
  };
  render6PointScoring = () => {
    const {
      cohortType,
      handleChangeDescription,
      handleChangeLabel,
      reinitializeEditorComplete,
      shouldReinitializeEditor,
    } = this.props;
    return (
      <SettingsRubricTab
        cohortType={cohortType}
        handleChangeDescription={handleChangeDescription}
        handleChangeLabel={handleChangeLabel}
        gradeOptions={this.get6PointGradeOptions()}
        gradingRubric={Constants.GRADING_RUBRIC_SIX}
        reinitializeEditorComplete={reinitializeEditorComplete}
        shouldReinitializeEditor={shouldReinitializeEditor}
        title={Constants.WRITING_PROMPT_TITLE}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderFunction: this.render2PointScoring,
        ...Constants.TAB_2POINT_SCORING,
      },
      {
        renderFunction: this.render4PointScoring,
        ...Constants.TAB_4POINT_SCORING,
      },
      {
        renderFunction: this.render6PointScoring,
        ...Constants.TAB_6POINT_SCORING,
      },
    ];

    return (
      <NavBarWithModalContainer
        tabs={tabs}
        onOkHandler={this.onChangeRubricTab}
        modalOverrideClassName="xskills-settings__rubric-modal"
      />
    );
  }
}

SettingsRubricScoringSection.defaultProps = {
  shouldReinitializeEditor: false,
};

SettingsRubricScoringSection.propTypes = {
  cohortType: PropTypes.string.isRequired,
  handleChangeDescription: PropTypes.func.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  handleSetInitialValues: PropTypes.func.isRequired,
  reinitializeEditorComplete: PropTypes.func.isRequired,
  settingsOnScreen: PropTypes.object.isRequired,
  shouldReinitializeEditor: PropTypes.bool,
};

export default SettingsRubricScoringSection;
