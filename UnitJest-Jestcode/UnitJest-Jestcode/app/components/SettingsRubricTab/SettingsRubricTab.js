/**
 *
 * SettingsRubricTab
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import SAMEditor from 'components/SAMEditor';
import { COHORT_TYPE } from 'containers/App/constants';
import * as Constants from '../XSkillsSettingsTab/constants';

import './SettingsRubricTab.scss';

class SettingsRubricTab extends React.Component {
  determineGradingType = () => {
    switch (this.props.title) {
      case Constants.CONSTRUCTED_RESPONSE_TITLE:
        return 'open_resp_grading';
      case Constants.WRITING_PROMPT_TITLE:
        return 'writing_prompt_grading';
      default:
        return '';
    }
  };

  handleChangeLabel = ev => {
    this.props.handleChangeLabel(ev);
  };

  handleChangeDescription = (newContent, idObj) => {
    const dataObj = {
      target: {
        value: newContent,
      },
      idObj,
    };
    this.props.handleChangeDescription(dataObj);
  };

  determineRubricKey = score =>
    `${this.props.gradingRubric}_${this.determineGradingType()}_${score}`;

  renderRubricValues = () => {
    const readOnly = this.props.cohortType !== COHORT_TYPE.District;
    const gradeOptionsRows = this.props.gradeOptions[0].grade_option.map(g => {
      const gradingType = this.determineGradingType();
      const idObj = {
        gradingRubric: this.props.gradingRubric,
        gradingType,
        gradingScore: g.score[0],
      };
      return (
        <div key={g.score[0]} className="settings-rubric__row">
          <div className="settings-rubric__score--detail">{g.score[0]}</div>
          <div className="settings-rubric__label--detail-container">
            <div className="settings-rubric__label--detail">
              <input
                className="settings-rubric__label-input"
                maxLength={Constants.SCORING_LABEL_MAX_LEN}
                onChange={this.handleChangeLabel}
                readOnly={readOnly}
                type="text"
                value={g.label[0]}
                data-gradingrubric={this.props.gradingRubric}
                data-gradingtype={gradingType}
                data-gradingscore={g.score[0]}
              />
            </div>
          </div>
          <div className="settings-rubric__description--detail">
            <SAMEditor
              isReadOnly={readOnly}
              editorIdObj={idObj}
              handleChange={this.handleChangeDescription}
              key={this.determineRubricKey(g.score[0])}
              data={g.description[0]}
              reinitializeEditorComplete={this.props.reinitializeEditorComplete}
              shouldReinitializeEditor={this.props.shouldReinitializeEditor}
            />
          </div>
        </div>
      );
    });
    return <div className="settings-rubric__details">{gradeOptionsRows}</div>;
  };

  render() {
    const { title } = this.props;
    return (
      <div className="settings-rubric__tab">
        <div className="settings-rubric__title">
          <span className="settings-rubric__title-text">{title}</span>
        </div>
        <div className="settings-rubric__title-column-header">
          <div className="settings-rubric__title-column-header-score">Score</div>
          <div className="settings-rubric__title-column-header-label">Label</div>
          <div className="settings-rubric__title-column-header-description">Description</div>
        </div>
        {this.renderRubricValues()}
      </div>
    );
  }
}

SettingsRubricTab.defaultProps = {
  shouldReinitializeEditor: false,
};

SettingsRubricTab.propTypes = {
  cohortType: PropTypes.string.isRequired,
  gradingRubric: PropTypes.string.isRequired,
  gradeOptions: PropTypes.array.isRequired,
  handleChangeDescription: PropTypes.func.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  reinitializeEditorComplete: PropTypes.func.isRequired,
  shouldReinitializeEditor: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default SettingsRubricTab;
