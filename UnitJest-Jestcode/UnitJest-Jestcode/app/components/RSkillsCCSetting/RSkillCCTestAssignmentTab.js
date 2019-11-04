import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import LoadingBar from 'components/LoadingBar';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SAMButton from 'components/SAMButton';
import { getBaseUrlWithoutSlms } from 'utils/request';

import './RSkillsCCSetting.scss';

class RSkillCCTestAssignmentTab extends React.Component {
  constructor(props) {
    super(props);
    const r180Stage = this.determineFirstStage();
    this.state = {
      tabHasNoUnsavedChanges: true,
      r180Stage,
      rBook: '',
      selectedRSkillsTest: '',
      rSkillsTestLevel: ['0'],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.effectiveCohortObject.id !== this.props.effectiveCohortObject.id ||
      nextProps.testAssignmentStages !== this.props.testAssignmentStages
    ) {
      const r180Stage = this.determineFirstStage();
      this.setState({
        tabHasNoUnsavedChanges: true,
        r180Stage,
        rBook: '',
        selectedRSkillsTest: '',
        rSkillsTestLevel: ['0'],
      });
    }
  }

  /**
   * get the first stage from the props or ''
   * e.g.  ["A"] , ["B"], ["C"], ''
   * @returns {RSkillCCTestAssignmentTab.props.testAssignmentStages|*|*[]|string}
   */
  determineFirstStage = () => {
    const { testAssignmentStages } = this.props;
    const stageOption = testAssignmentStages && testAssignmentStages[0];
    return (stageOption && stageOption.id && [String(stageOption.id)]) || '';
  };

  determineSingleTestMeta = () => {
    const { testAssignmentStages } = this.props;
    let filteredTest = null;
    if (this.state.r180Stage !== '' && testAssignmentStages) {
      const filteredStage = this.findStageMetaBySelectedStage();
      if (this.state.rBook !== '' && filteredStage && filteredStage[0].bundles) {
        const filteredBundle = this.findBundleMetaBySelectedStageAndBook();
        if (this.state.selectedRSkillsTest !== '' && filteredBundle && filteredBundle[0].tests) {
          filteredTest = filteredBundle[0].tests.filter(
            test => test.number.toString() === this.state.selectedRSkillsTest[0].toString()
          );
        }
      }
    }
    return filteredTest;
  };

  findStageMetaBySelectedStage = () => {
    const { testAssignmentStages } = this.props;
    return testAssignmentStages.filter(stage => stage.id === this.state.r180Stage[0]);
  };

  findBundleMetaBySelectedStageAndBook = () => {
    const filteredStage = this.findStageMetaBySelectedStage();
    return filteredStage[0].bundles.filter(bundle => bundle.id === this.state.rBook[0]);
  };

  handleBelowGradeLevelPreviewButtonClick = () => {
    const rSkillCCTestMeta = this.determineSingleTestMeta();
    let belowGradeUrlLink = '';
    if (rSkillCCTestMeta && rSkillCCTestMeta[0].belowGradePdf) {
      belowGradeUrlLink = rSkillCCTestMeta[0].belowGradePdf;
    }
    this.handleOpenPreviewTest(belowGradeUrlLink);
  };

  handleGradeLevelPreviewButtonClick = () => {
    const rSkillCCTestMeta = this.determineSingleTestMeta();
    let atGradeTestLink = '';
    if (rSkillCCTestMeta && rSkillCCTestMeta[0].atGradePdf) {
      atGradeTestLink = rSkillCCTestMeta[0].atGradePdf;
    }
    this.handleOpenPreviewTest(atGradeTestLink);
  };

  handleOpenPreviewTest = pdfLink => {
    const fullUrl = `${getBaseUrlWithoutSlms()}${pdfLink}`;
    window.open(fullUrl);
  };

  handleSetInitialValues = () => {
    const r180Stage = this.determineFirstStage();
    this.setState({
      tabHasNoUnsavedChanges: true,
      r180Stage,
      rBook: '',
      selectedRSkillsTest: '',
      rSkillsTestLevel: ['0'],
    });
    this.props.handleTabReset();
  };

  handleSaveAndReturn = () => {
    const redirect = true;
    this.props.handleSave(this.createRSkillsCCTestAssignPayload(redirect));
  };

  handleSubmit = event => {
    event.preventDefault();
    const noRedirect = false;
    this.props.handleSave(this.createRSkillsCCTestAssignPayload(noRedirect));
    this.props.handleTabReset();
    this.hideSaveOptions();
  };

  handleRadioChange = e => {
    this.setState({ tabHasNoUnsavedChanges: false });
    const change = {};
    if (e.target.name.indexOf('rskillsTestRadio_') >= 0) {
      change.selectedRSkillsTest = [String(e.target.value)];
    }
    this.setState(change);
  };

  handleR180StageChange = e => {
    this.setState({
      tabHasNoUnsavedChanges: false,
      rBook: '',
      selectedRSkillsTest: '',
      rSkillsTestLevel: ['0'],
      r180Stage: [String(e.target.value)],
    });
  };

  handleRBookChange = e => {
    this.setState({
      tabHasNoUnsavedChanges: false,
      selectedRSkillsTest: '',
      rSkillsTestLevel: ['0'],
      rBook: [String(e.target.value)],
    });
    this.props.handleIsolateTab();
  };

  handleRSkillsTestLevelChange = e => {
    this.setState({
      tabHasNoUnsavedChanges: false,
      rSkillsTestLevel: [String(e.target.value)],
    });
  };

  hideSaveOptions() {
    this.setState({ tabHasNoUnsavedChanges: true });
  }

  createRSkillsCCTestAssignPayload = redirectToRoster => {
    const { effectiveCohortObject } = this.props;
    // in state these are "A", "B", "C" for Stage A , Stage B, Stage C
    let bundleName = '';
    const bundle = this.findBundleMetaBySelectedStageAndBook();
    if (bundle && bundle[0].name) {
      bundleName = bundle[0].name;
    }
    let testDescription = '';
    const testMeta = this.determineSingleTestMeta();
    if (testMeta && testMeta[0].description) {
      testDescription = testMeta[0].description;
    }
    const result = {
      redirectToRoster,
      bundleName,
      testDescription,
      postPayload: {
        output: {
          output_data: {
            cohort_type: effectiveCohortObject.cohortType.toUpperCase(),
            cohort_id: effectiveCohortObject.id,
            stage: this.state.r180Stage[0].toUpperCase(),
            test_bundle_id: this.state.rBook[0].toLowerCase(),
            test_number: this.state.selectedRSkillsTest[0],
            level: this.state.rSkillsTestLevel[0],
          },
        },
      },
    };
    return result;
  };

  /* eslint-enable react/no-array-index-key */
  renderR180StageDropdown = () => {
    const { testAssignmentStages } = this.props;
    const stageOption =
      testAssignmentStages &&
      testAssignmentStages.map(item => (
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      ));
    return (
      <div className="rskillscc-test-assign__setting">
        <span className="rskillscc-test-assign--left">
          <label className="rskillscc-test-assign__step-label" htmlFor="id_r180Stage">
            1. Select a READ 180 stage:
          </label>
          <select
            className="rskillscc-test-assign__select-option"
            name="r180Stage"
            id="id_r180Stage"
            onChange={this.handleR180StageChange}
            value={this.state.r180Stage && this.state.r180Stage[0]}
          >
            {stageOption}
          </select>
        </span>
      </div>
    );
  };

  renderSelectRBookOption = () => {
    const { testAssignmentStages } = this.props;
    let rBookOption = null;
    if (this.state.r180Stage !== '' && testAssignmentStages) {
      const filteredStage = this.findStageMetaBySelectedStage();
      rBookOption =
        filteredStage[0] &&
        filteredStage[0].bundles &&
        filteredStage[0].bundles.map(book => (
          <option value={book.id} key={book.id}>
            {book.name}
          </option>
        ));
    }
    const blankOption = this.state.rBook === '' && <option key="-1" disabled />;
    return (
      <div className="rskillscc-test-assign__setting">
        <span className="rskillscc-test-assign--right">
          <label className="rskillscc-test-assign__step-label" htmlFor="id_rBook">
            2. Select the rBook you are using:
          </label>
          <select
            className="rskillscc-test-assign__select-option"
            name="rBook"
            id="id_rBook"
            onChange={this.handleRBookChange}
            value={this.state.rBook && this.state.rBook[0]}
          >
            {blankOption}
            {rBookOption}
          </select>
        </span>
      </div>
    );
  };

  renderSelectRSkillsTest = () => {
    const { testAssignmentStages } = this.props;
    let rSkillsTestRadios = null;
    if (this.state.r180Stage !== '' && testAssignmentStages) {
      const filteredStage = this.findStageMetaBySelectedStage();
      if (this.state.rBook !== '' && filteredStage && filteredStage[0].bundles) {
        const filteredBundle = this.findBundleMetaBySelectedStageAndBook();
        rSkillsTestRadios =
          filteredBundle[0] &&
          filteredBundle[0].tests &&
          filteredBundle[0].tests.map(test => {
            const radioId = `rskillsTestRadio_${test.number}`;
            return (
              <Fragment key={radioId}>
                <div className="rskillscc-test-assign__test-input">
                  <label htmlFor={radioId} className="rskillscc-test-assign__radio-label">
                    <input
                      className="rskillscc-test-assign__radio"
                      id={radioId}
                      name={radioId}
                      type="radio"
                      value={test.number}
                      checked={
                        this.state.selectedRSkillsTest &&
                        this.state.selectedRSkillsTest[0] === test.number
                      }
                      onChange={this.handleRadioChange}
                    />{' '}
                    {test.description}
                  </label>
                </div>
              </Fragment>
            );
          });
      }
    }

    return (
      rSkillsTestRadios && (
        <div className="rskillscc-test-assign__select-block">
          <span className="rskillscc-test-assign__select-block-caption">
            3. Select an rSkills Test:
          </span>
          {rSkillsTestRadios}
        </div>
      )
    );
  };

  renderSelectRSkillsTestLevel = () => {
    const { selectedRSkillsTest } = this.state;
    return (
      selectedRSkillsTest && (
        <div className="rskillscc-test-assign__select-block-test-levels">
          <span className="rskillscc-test-assign__select-block-caption">
            4. Select a Test Level:
          </span>
          <div>
            <select
              className="rskillscc-test-assign__select-option rskillscc-test-assign__select-option--wide"
              name="rSkillsTestLevel"
              id="id_rSkillsTestLevel"
              onChange={this.handleRSkillsTestLevelChange}
              value={this.state.rSkillsTestLevel && this.state.rSkillsTestLevel[0]}
            >
              <option value="0" key="below">
                Below Grade-Level
              </option>;
              <option value="1" key="grade">
                Grade-Level
              </option>;
              <option value="2" key="automatic">
                Automatic Leveling
              </option>);
            </select>
            <div className="rskillscc-test-assign__btn-preview-container">
              <div className="rskillscc__btn-label-container">
                <label htmlFor="rskillscc__btn--below-grade-level" className="rskillscc__btn-label">
                  Below Grade-Level <br />(READ 180 Levels 1 & 2)
                </label>
                <SAMButton
                  id="rskillscc__btn--below-grade-level"
                  buttonClassModifier="rskillscc-test-assign__btn-preview"
                  isPrimaryButton
                  onClickHandler={this.handleBelowGradeLevelPreviewButtonClick}
                >
                  Preview Test
                </SAMButton>
              </div>
              <div className="rskillscc__btn-label-container">
                <label htmlFor="rskillscc-btn-grade-level" className="rskillscc__btn-label">
                  Grade-Level <br />(READ 180 Levels 3 & 4)
                </label>
                <SAMButton
                  id="rskillscc-btn-grade-level"
                  buttonClassModifier="rskillscc-test-assign__btn-preview"
                  isPrimaryButton
                  onClickHandler={this.handleGradeLevelPreviewButtonClick}
                >
                  Preview Test
                </SAMButton>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  render() {
    if (this.props.isLoading) {
      return (
        <div className="rskillscc-settings-tab">
          <LoadingBar />
        </div>
      );
    }
    const nullVal = {};
    return (
      <Fragment>
        <div className="rskillscc-test-assign">
          <form onSubmit={this.handleSubmit} defaultValue={nullVal}>
            <div
              className={`rskillscc-test-assign__tab-content ${
                this.state.tabHasNoUnsavedChanges === false
                  ? 'rskillscc-test-assign__tab-content--overlay'
                  : ''
              }`}
            >
              {this.renderR180StageDropdown()}
              {this.renderSelectRBookOption()}
              {this.renderSelectRSkillsTest()}
              {this.renderSelectRSkillsTestLevel()}
            </div>
            <div className="rskillscc-test-assign__program-setting-buttons-container">
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

RSkillCCTestAssignmentTab.defaultProps = {
  isLoading: false,
  testAssignmentStages: [],
};

RSkillCCTestAssignmentTab.propTypes = {
  effectiveCohortObject: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleTabReset: PropTypes.func.isRequired,
  handleIsolateTab: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isTabIsolated: PropTypes.bool.isRequired,
  testAssignmentStages: PropTypes.array,
};

export default RSkillCCTestAssignmentTab;
