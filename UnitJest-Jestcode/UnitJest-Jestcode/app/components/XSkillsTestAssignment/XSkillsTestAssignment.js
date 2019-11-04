/**
 *
 * XSkillsTestAssignment
 *
 */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SAMButton from 'components/SAMButton';
import { XSKILLS_PDF_PATH } from 'components/XSkillsSettings/constants';
import { getBaseUrlWithoutSlms } from 'utils/request';

import './XSkillsTestAssignment.scss';

class XSkillsTestAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedXSkillsTest: [''],
    };
  }

  handleTestPreviewButtonClick = () => {
    const pdfLink = `e21_${this.props.highestCourse}_W${this.state.selectedXSkillsTest[0]}.pdf`;
    this.handleOpenPreviewTest(pdfLink);
  };

  handleOpenPreviewTest = pdfLink => {
    const fullUrl = `${getBaseUrlWithoutSlms()}${XSKILLS_PDF_PATH}${pdfLink}`;
    window.open(fullUrl);
  };

  handleSetInitialValues = () => {
    this.setState({
      selectedXSkillsTest: [''],
    });
    this.props.setIsolateTab(false);
  };

  handleSaveAndReturn = () => {
    const redirect = true;
    this.props.handleSave(this.state.selectedXSkillsTest[0], redirect);
  };

  handleSubmit = event => {
    event.preventDefault();
    const noRedirect = false;
    this.props.handleSave(this.state.selectedXSkillsTest[0], noRedirect);
    this.props.setIsolateTab(false);
  };

  handleRadioChange = e => {
    const change = {};
    change.selectedXSkillsTest = [String(e.target.value)];
    this.setState(change);
    this.props.setIsolateTab(true);
  };

  renderTestSelectRadioButton = xSkillTest => {
    const radioId = `xskillsTestRadio_${xSkillTest.test_number[0]}`;
    const cssClass = 'xskills-test-assign__test-input';
    return (
      <Fragment key={radioId}>
        <div className={cssClass}>
          <label htmlFor={radioId} className="xskills-test-assign__radio-label">
            <input
              className="xskills-test-assign__radio"
              id={radioId}
              name={radioId}
              key={radioId}
              type="radio"
              value={xSkillTest.test_number[0]}
              checked={
                this.state.selectedXSkillsTest &&
                this.state.selectedXSkillsTest[0] === xSkillTest.test_number[0]
              }
              onChange={this.handleRadioChange}
            />{' '}
            {xSkillTest.test_description[0].replace('Workshops', 'Workshop')}
          </label>
        </div>
      </Fragment>
    );
  };

  /* eslint-enable react/no-array-index-key */
  renderSelectXSkillsTest = () => {
    // replace 'Workshops' with 'Workshop', server returns plural case for 1 - 4, weird.
    const xSkillsTests = (this.props.testsMeta && this.props.testsMeta.get('test')) || {};
    if (!Object.keys(xSkillsTests).length) return null;
    const arrTests = xSkillsTests.toJS();
    const xSkillsTestRadiosLeft = arrTests
      .filter(t => t.test_number[0] <= 4)
      .map(t => this.renderTestSelectRadioButton(t));

    const xSkillsTestRadiosRight = arrTests
      .filter(t => t.test_number[0] > 4)
      .map(t => this.renderTestSelectRadioButton(t));

    return (
      xSkillsTestRadiosLeft && (
        <div className="xskills-test-assign__select-block">
          <span className="xskills-test-assign__select-block-caption">
            Select Expert 21 Workshop Test
          </span>
          <div className="xskills-test-assign__test-input-left">{xSkillsTestRadiosLeft}</div>
          <div className="xskills-test-assign__test-input-right">{xSkillsTestRadiosRight}</div>
        </div>
      )
    );
  };

  renderPreviewSection = () => {
    if (this.state.selectedXSkillsTest[0] === '') {
      return null;
    }
    return (
      <div className="xskills-test-assign__preview-section">
        <span className="xskills-test-assign__select-block-caption">
          Preview or print xSkills Test
        </span>
        <div className="xskills-test-assign__preview-container">
          <div className="xskills-test-assign__preview-msg">
            Preview test or download and print for students to take test offline. Answer key appears
            at the end of each print version for grading.
          </div>

          <div className="xskills__btn-label-container">
            <SAMButton
              id="xskills__btn--below-grade-level"
              buttonClassModifier="xskills-test-assign__btn-preview"
              isPrimaryButton
              onClickHandler={this.handleTestPreviewButtonClick}
            >
              view print version of test
            </SAMButton>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <div className="xskills-test-assign">
          <form onSubmit={this.handleSubmit}>
            <div
              className={`xskills-test-assign__tab-content ${
                this.state.isTabIsolated === true ? 'xskills-test-assign__tab-content--overlay' : ''
              }`}
            >
              {this.renderSelectXSkillsTest()}
              {this.renderPreviewSection()}
            </div>
            <div className="xskills-test-assign__program-setting-buttons-container">
              <ProgramSettingsButtons
                saveAndReturnHandler={this.handleSaveAndReturn}
                setInitialValuesHandler={this.handleSetInitialValues}
                showRestoreDefaults={false}
                stateResult={!this.props.isTabIsolated}
                suppressSaveAndReturnRedirect
              />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

XSkillsTestAssignment.propTypes = {
  handleSave: PropTypes.func.isRequired,
  highestCourse: PropTypes.string.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  testsMeta: PropTypes.object.isRequired,
};

export default XSkillsTestAssignment;
