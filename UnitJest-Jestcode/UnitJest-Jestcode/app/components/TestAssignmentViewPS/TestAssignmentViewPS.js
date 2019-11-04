/**
 *
 * TestAssignmentViewPS
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import SettingsSelectBox from 'components/SettingsSelectBox';
import './TestAssignmentViewPS.scss';
import * as Constants from './constants';

class TestAssignmentViewPS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dtmModulesObj:
        this.props.testAssignmentData.get('dtmModules') &&
        this.props.testAssignmentData.get('dtmModules').toJS(),
      subProductObj:
        this.props.testAssignmentData.get('subproduct') &&
        this.props.testAssignmentData.get('subproduct').toJS(),
      dtmTestsObj:
        this.props.testAssignmentData.get('dtmTests') &&
        this.props.testAssignmentData.get('dtmTests').toJS(),
      dtmModules: [],
      toggleModule: true,
      toggleTest: true,
      selectedTestId: '',
      module_id: '',
      toggleDtmModules: false,
      toggleDtmTests: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.testAssignmentData !== this.props.testAssignmentData) {
      this.setState({
        dtmModulesObj:
          nextProps.testAssignmentData.get('dtmModules') &&
          nextProps.testAssignmentData.get('dtmModules').toJS(),
        subProductObj:
          nextProps.testAssignmentData.get('subproduct') &&
          nextProps.testAssignmentData.get('subproduct').toJS(),
        dtmTestsObj:
          nextProps.testAssignmentData.get('dtmTests') &&
          nextProps.testAssignmentData.get('dtmTests').toJS(),
      });
    }
  }

  getModules() {
    return (
      this.state.dtmModules &&
      this.state.dtmModules.map(option1 => (
        <option key={option1.module_id} value={option1.module_id}>
          {`${option1.topic_name}: ${option1.short_name}`}
        </option>
      ))
    );
  }

  getTests() {
    const selectedTests =
      this.state.dtmTests &&
      this.state.dtmTests.filter(tests => tests.module_id[0] === this.state.module_id);
    return (
      selectedTests &&
      selectedTests.map(tests => (
        <option key={tests.test_id} value={tests.test_id}>
          {`${tests.test_name}`}
        </option>
      ))
    );
  }

  isStudentEnrolled = dtmObj => {
    const totalCount =
      this.state.subProductObj &&
      this.state.subProductObj.sub_product.find(
        subprod => subprod.application_id[0] === dtmObj && Number(subprod.total_students[0]) > 0
      );
    if (totalCount) return false;
    return true;
  };

  handleSave() {}

  handleSetInitialValues = () => {
    this.setState({
      dtmModulesObj:
        this.props.testAssignmentData.get('dtmModules') &&
        this.props.testAssignmentData.get('dtmModules').toJS(),
      subProductObj:
        this.props.testAssignmentData.get('subproduct') &&
        this.props.testAssignmentData.get('subproduct').toJS(),
      dtmTestsObj:
        this.props.testAssignmentData.get('dtmTests') &&
        this.props.testAssignmentData.get('dtmTests').toJS(),
      dtmModules: [],
      toggleModule: true,
      toggleTest: true,
      selectedTestId: '',
      module_id: '',
      application_id: '',
      toggleDtmModules: false,
      toggleDtmTests: false,
    });
    this.props.setIsolateTab(false);
  };

  handleSelectProgramOption = e => {
    this.setState({
      dtmModules:
        e.target.id === Constants.PROGRAMS.DTM_MODULE
          ? this.state.dtmModulesObj && this.state.dtmModulesObj[0].module
          : this.state.dtmModulesObj && this.state.dtmModulesObj[1].module,
      dtmTests:
        e.target.id === Constants.PROGRAMS.DTM_MODULE
          ? this.state.dtmTestsObj && this.state.dtmTestsObj.tests[0].test
          : this.state.dtmTestsObj && this.state.dtmTestsObj.tests[1].test,
      toggleModule: false,
      toggleDtmModules: true,
      module_id: '',
      application_id: e.target.id,
    });
  };
  handleSelectedModule = e => {
    this.setState({
      module_id: e.target.value,
      toggleTest: false,
      toggleDtmModules: true,
      toggleDtmTests: true,
    });
  };

  handleSelectTest = e => {
    this.setState({ selectedTestId: e.target.value, toggleDtmTests: true });
    this.props.setIsolateTab(true);
  };

  checkDtmNowEnrollment = programName => {
    const enrollDtm =
      this.state.subProductObj &&
      this.state.subProductObj.sub_product.find(
        subprod => subprod.application_id[0] === programName && subprod.total_students[0] !== '0'
      );
    if (enrollDtm) {
      return true;
    }
    return false;
  };

  renderTestAssignment() {
    return (
      <div className="test-assignment-ps__quadrants">
        <span className="test-assignment-ps__quadrants-heading">Test Assignment</span>
        <div className="test-assignment-ps__block-spacing">
          <span className="test-assignment-ps-program-text"> 1. Select a Program </span>
          <span
            className={
              this.checkDtmNowEnrollment(Constants.PROGRAMS.DTM_MODULE)
                ? 'test-assignment-ps__radio'
                : 'test-assignment-ps__radio-none'
            }
            key="DTM_MODULE"
          >
            <input
              type="radio"
              name="application_id"
              onChange={this.handleSelectProgramOption}
              id="DTM_MODULE"
              key="DTM_MODULE"
              // value="DTM_MODULE"
              disabled={this.isStudentEnrolled(Constants.PROGRAMS.DTM_MODULE)}
              readOnly
              checked={
                this.state.application_id &&
                this.state.application_id === Constants.PROGRAMS.DTM_MODULE
              }
            />
            <span className="test-assignment-ps__options">Do the Math Modules</span>
          </span>
          <span
            className={
              this.checkDtmNowEnrollment(Constants.PROGRAMS.DTM_NOW)
                ? 'test-assignment-ps__radio'
                : 'test-assignment-ps__radio-none'
            }
            key="DTM_NOW"
          >
            <input
              type="radio"
              name="application_id"
              onChange={this.handleSelectProgramOption}
              id="DTM_NOW"
              key="DTM_NOW"
              value="DTM_NOW"
              disabled={this.isStudentEnrolled(Constants.PROGRAMS.DTM_NOW)}
              readOnly
              checked={
                this.state.application_id &&
                this.state.application_id === Constants.PROGRAMS.DTM_NOW
              }
            />
            <span className="test-assignment-ps__options">Do the Math Now</span>
          </span>
        </div>
        <div className="test-assignment-ps__block-spacing">
          <span>
            {' '}
            <SettingsSelectBox
              labelClass="test-assignment-ps__select-label"
              fieldClass={
                this.state.toggleModule
                  ? 'test-assignment-ps__select-field-disabled'
                  : 'test-assignment-ps__select-field'
              }
              fieldValue={this.state.module_id}
              onChange={this.handleSelectedModule}
              label="2. Select a Module or Unit"
            >
              <option value="" disabled hidden={this.state.toggleDtmModules}>
                {' '}
              </option>
              {this.getModules()}
            </SettingsSelectBox>
          </span>
        </div>
        <div className="test-assignment-ps__select-test">
          <span>
            <SettingsSelectBox
              labelClass="test-assignment-ps__select-label-test"
              fieldClass={
                this.state.toggleTest
                  ? 'test-assignment-ps__select-field-disabled'
                  : 'test-assignment-ps__select-field'
              }
              label="3. Select a Test:"
              fieldValue={this.state.selectedTestId}
              onChange={this.handleSelectTest}
            >
              <option value="" disabled hidden={this.state.toggleDtmTests}>
                {''}
              </option>
              {this.getTests()}
            </SettingsSelectBox>
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <span className="test-assignment-ps__heading" />
          <div className="test-assignment-ps__content">{this.renderTestAssignment()}</div>
          <div className="test-assignment-ps__footer">
            <ProgramSettingsButtons
              showRestoreDefaults={false}
              saveAndReturnHandler={this.handleSave}
              setInitialValuesHandler={this.handleSetInitialValues}
              stateResult={!this.props.isTabIsolated}
            />
          </div>
        </div>
      </form>
    );
  }
}

TestAssignmentViewPS.propTypes = {
  // TODO ADD THE FUNCTIONALITY FOR SAVE AND ISOLATE TAB
  // handleSave: PropTypes.func.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  testAssignmentData: PropTypes.any.isRequired,
};

export default TestAssignmentViewPS;
