/**
 *
 * R180Ngsetting
 *
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LoadingBar from 'components/LoadingBar';
import NavBar, { NavItem } from 'components/NavBar';
import SettingsMessage from 'components/SettingsMessage/SettingsMessage';
import { COHORT_TYPE, USER_ORG, USER_TYPE } from 'containers/App/constants';
import ProgramSettingsViewR180NG from 'components/R180NGSetting/ProgramSettingsViewR180NG';
import 'components/ProgramSettingsView/ProgramSettingsView.scss'; // TODO: This needs to be moved to this scss file
import R180NGTopicContainer from 'containers/R180NGTopicContainer/R180NGTopicContainer';

import * as Constants from './constants';

class R180NGSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: Constants.TAB_SETTINGS,
      isolateTab: false,
    };
  }

  handleTabsReset = () => this.setState({ isolateTab: false });

  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });

  handleTabIsolate = () => this.setState({ isolateTab: true });

  renderSettingsTab = () => {
    const { programSettingData, onStudentLevelClick, enrollmentData, isLoading } = this.props;

    if (
      enrollmentData === 0 ||
      this.props.smartBarSelections === COHORT_TYPE.School ||
      programSettingData.programSetting === 'admin'
    ) {
      return this.renderNoEnrollmentData();
    }
    if (isLoading || programSettingData.size === 0) {
      return <LoadingBar />;
    }
    return (
      <ProgramSettingsViewR180NG
        programs={programSettingData && programSettingData.programSetting}
        programName={this.props.programName.display_name}
        onStudentLevelClick={onStudentLevelClick}
        handleSave={this.props.handleSaveClick}
        handleTabReset={this.handleTabsReset}
        handleToggle={this.handleTabIsolate}
      />
    );
  };

  renderNoEnrollmentData = () => {
    switch (this.props.smartBarSelections) {
      case COHORT_TYPE.School:
        if (this.state.activeTab === Constants.TAB_TOPIC_MANAGER)
          return <SettingsMessage message1={Constants.TOPIC_MANAGER_ERROR_MESSAGE_SCHOOL} />;
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_ADMIN} />;
      case COHORT_TYPE.Teacher:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_TEACHER} />;
      case COHORT_TYPE.Grade:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_GRADE} />;
      case COHORT_TYPE.Group:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_GROUP} />;
      case COHORT_TYPE.Class:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_CLASS} />;
      case COHORT_TYPE.Student:
        return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_STUDENT} />;
      default:
        break;
    }
    if (this.state.activeTab === Constants.TAB_TOPIC_MANAGER) {
      switch (this.props.userType.userOrg) {
        case USER_ORG.District:
          return <SettingsMessage message1={Constants.TOPIC_MANAGER_ERROR_MESSAGE_DISTRICT} />;
        case USER_ORG.School:
          if (this.props.userType.userType === USER_TYPE.Teacher)
            return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_TEACHER} />;
          return <SettingsMessage message1={Constants.TOPIC_MANAGER_ERROR_MESSAGE_SCHOOL} />;
        default:
          break;
      }
    }
    if (this.props.userType.userType === USER_TYPE.Teacher)
      return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_TEACHER} />;

    return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_ADMIN} />;
  };

  renderTopicManagerTab = () => {
    const { enrollmentData } = this.props;
    if (enrollmentData === 0) {
      return this.renderNoEnrollmentData();
    }
    return (
      <R180NGTopicContainer
        isolateTab={this.state.isolateTab}
        handleTabsReset={this.handleTabsReset}
        handleToggle={this.handleTabIsolate}
      />
    );
  };

  render() {
    const { activeTab } = this.state;
    const classesNavBar = `program-settings__navbar ${
      this.state.isolateTab ? 'program-settings__navbar--isolate-tab' : ''
    }`;

    const tabs = [
      { id: Constants.TAB_SETTINGS, label: 'Settings' },
      { id: Constants.TAB_TOPIC_MANAGER, label: 'Topic Manager' },
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
          {activeTab === Constants.TAB_SETTINGS && this.renderSettingsTab()}
          {activeTab === Constants.TAB_TOPIC_MANAGER && this.renderTopicManagerTab()}
        </div>
      </div>
    );
  }

  // TODO: Update to use the new ProgramSettingsNavBar component.
  /* render() {
    const tabs = [
      {
        renderFunction: this.renderSettingsTab,
        ...Constants.TAB_SETTINGS,
      },
      {
        renderFunction: this.renderTopicManagerTab,
        ...Constants.TAB_TOPIC_MANAGER,
      },
    ];

    return <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
  }*/
}

R180NGSetting.propTypes = {
  programSettingData: PropTypes.object.isRequired,
  programName: PropTypes.any,
  enrollmentData: PropTypes.any.isRequired,
  onStudentLevelClick: PropTypes.func,
  handleSaveClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  smartBarSelections: PropTypes.any,
  userType: PropTypes.any,
};

export default R180NGSetting;
