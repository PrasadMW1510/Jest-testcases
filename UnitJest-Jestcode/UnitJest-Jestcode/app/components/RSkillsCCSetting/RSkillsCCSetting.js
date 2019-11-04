/**
 *
 * RSkillsCCSetting
 *
 */
import PropTypes from 'prop-types';
import React from 'react';

import NavBar, { NavItem } from 'components/NavBar';
import * as PSVConstants from 'components/ProgramSettingsView/constants';
import * as Constants from 'components/RSkillsCCSetting/constants';
import RSkillsCCSettingsTab from 'components/RSkillsCCSettingsTab';
import SettingsMessage from 'components/SettingsMessage/SettingsMessage';
import { COHORT_TYPE } from 'containers/App/constants';

import RSkillCCTestAssignmentTab from './RSkillCCTestAssignmentTab';

import './RSkillsCCSetting.scss';

class RSkillsCCSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: Constants.TAB_TEST_ASSIGNMENT,
      isolateTab: false,
    };
  }

  enrolledCount = () => this.props.enrollmentCount;

  // TODO : determine if these tab functions might be better as a shared component
  handleTabsReset = () => this.setState({ isolateTab: false });

  handleTabClick = ev => {
    this.setState({ activeTab: ev.currentTarget.id });
  };

  handleTabIsolate = () => {
    this.setState({ isolateTab: true });
  };

  determineUnenrolledMsg = () => {
    // either passed in cohortType or whichever userOrg for logged in user
    const cohortType = this.props.effectiveCohortObject.cohortType;
    let msg = PSVConstants.UNDER_CONSTRUCTION;
    switch (cohortType) {
      case COHORT_TYPE.Student:
        msg = 'This student is not enrolled in';
        break;
      default:
        msg = `This ${cohortType.toLowerCase()} does not have any students enrolled in`;
    }
    msg += ` ${this.props.programMeta.name}`;
    return msg;
  };

  renderSettingsTab = () => {
    if (this.enrolledCount() === 0) {
      return <SettingsMessage message1={this.determineUnenrolledMsg()} />;
    }
    return (
      <RSkillsCCSettingsTab
        effectiveCohortObject={this.props.effectiveCohortObject}
        handleIsolateTab={this.handleTabIsolate}
        handleRSkillsCCGetDefaultSettings={this.props.handleRSkillsCCGetDefaultSettings}
        handleSave={this.props.handleRSkillsCCSettingsSave}
        handleTabReset={this.handleTabsReset}
        isDefaultProgramSettingsLoading={this.props.isDefaultProgramSettingsLoading}
        isLoading={this.props.isLoading}
        immDefaultProgramSettings={this.props.immDefaultProgramSettings}
        immProgramSettings={this.props.immProgramSettings}
        isTabIsolated={this.state.isolateTab}
      />
    );
  };

  renderTestAssignmentTab = () => {
    if (this.enrolledCount() === 0) {
      return <SettingsMessage message1={this.determineUnenrolledMsg()} />;
    }
    const cohortType = this.props.effectiveCohortObject.cohortType;
    switch (cohortType) {
      case COHORT_TYPE.District:
      case COHORT_TYPE.School:
      case COHORT_TYPE.Grade:
        return <SettingsMessage message1={Constants.RSKILLSCC_SELECT_OTHER_COHORT} />;
      // no default
    }

    return (
      <RSkillCCTestAssignmentTab
        effectiveCohortObject={this.props.effectiveCohortObject}
        handleSave={this.props.handleRSkillsCCTestAssignmentSave}
        handleTabReset={this.handleTabsReset}
        handleIsolateTab={this.handleTabIsolate}
        isLoading={this.props.isLoading}
        isTabIsolated={this.state.isolateTab}
        testAssignmentStages={this.props.testAssignmentStages}
      />
    );
  };

  render() {
    const { activeTab } = this.state;
    const classesNavBar = `program-settings__navbar ${
      this.state.isolateTab ? 'program-settings__navbar--isolate-tab' : ''
    }`;

    const tabs = [
      { id: Constants.TAB_TEST_ASSIGNMENT, label: Constants.TAB_TEST_ASSIGNMENT_LABEL },
      PSVConstants.TAB_SETTINGS,
    ];
    return (
      <div>
        <NavBar activeItemId={activeTab} className={classesNavBar} theme="tabs" palette="orange">
          {tabs.map(({ label, id }) => (
            <NavItem id={id} key={id} onClick={this.handleTabClick}>
              {label}
            </NavItem>
          ))}
        </NavBar>
        <div className="program-settings__tab-content">
          {activeTab === Constants.TAB_TEST_ASSIGNMENT && this.renderTestAssignmentTab()}
          {activeTab === PSVConstants.TAB_SETTINGS.id && this.renderSettingsTab()}
        </div>
      </div>
    );
  }
}

RSkillsCCSetting.propTypes = {
  effectiveCohortObject: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  handleRSkillsCCGetDefaultSettings: PropTypes.func.isRequired,
  handleRSkillsCCSettingsSave: PropTypes.func,
  handleRSkillsCCTestAssignmentSave: PropTypes.func,
  immDefaultProgramSettings: PropTypes.object.isRequired,
  immProgramSettings: PropTypes.object.isRequired,
  isDefaultProgramSettingsLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
  programMeta: PropTypes.object.isRequired,
  testAssignmentStages: PropTypes.array.isRequired,
};

export default RSkillsCCSetting;
