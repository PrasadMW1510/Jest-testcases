/**
 *
 * XSkillsSettings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import LoadingBar from 'components/LoadingBar';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsMessage from 'components/SettingsMessage';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import XSkillsSettingsTab from 'components/XSkillsSettingsTab';
import XSkillsTestAssignment from 'components/XSkillsTestAssignment';
import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';

import * as Constants from './constants';

import './XSkillsSettings.scss';

class XSkillsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isolateTab: false,
    };
  }

  setIsolateTab = isDirty => this.setState({ isolateTab: isDirty });

  shouldDisplaySettingsLoadingBar = () => {
    const { isLoadingSettings, settings } = this.props;
    return isLoadingSettings || settings.size === 0;
  };

  renderNoEnrollments = () => {
    const { cohortObj } = this.props;
    const selectedCohType = cohortObj.cohortType;

    return (
      <SettingsNoEnrollmentsMessage cohort={selectedCohType} productName={PROGRAM_LIST.XT.name} />
    );
  };

  renderSettingTab = () => {
    const { enrollmentCount, handleSettingsSave, settings } = this.props;

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (this.shouldDisplaySettingsLoadingBar()) {
      return (
        <div className="xskills-loading">
          <LoadingBar />
        </div>
      );
    }
    return (
      <XSkillsSettingsTab
        cohortType={this.props.cohortObj.cohortType}
        handleSave={handleSettingsSave}
        immProgramSettings={settings}
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
      />
    );
  };

  renderTestAssignmentTab = () => {
    const { cohortObj, enrollmentCount, isLoadingTestAssignment } = this.props;
    const cohortType = cohortObj.cohortType;

    if (
      cohortType === COHORT_TYPE.District ||
      cohortType === COHORT_TYPE.School ||
      cohortType === COHORT_TYPE.Grade
    ) {
      return <SettingsMessage message1={Constants.INVALID_COHORT_MESSAGE} />;
    }

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (isLoadingTestAssignment) {
      return (
        <div className="xskills-loading">
          <LoadingBar />
        </div>
      );
    }
    const highCourse = Constants.XSKILLS_COURSES[this.props.highestEnrolledCourse];
    return (
      <XSkillsTestAssignment
        handleSave={this.props.handleTestAssignmentSave}
        highestCourse={highCourse}
        setIsolateTab={this.setIsolateTab}
        isTabIsolated={this.state.isolateTab}
        testsMeta={this.props.testsMeta}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderTestAssignmentTab,
        ...Constants.TAB_TEST_ASSIGNMENT,
      },
      {
        renderFunction: this.renderSettingTab,
        ...Constants.TAB_SETTINGS,
      },
    ];

    return (
      <ProgramSettingsNavBar
        tabs={tabs}
        isolateTab={this.state.isolateTab}
        overrideClassName="xskills-settings-navbar"
      />
    );
  }
}

XSkillsSettings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  handleTestAssignmentSave: PropTypes.func.isRequired,
  handleSettingsSave: PropTypes.func.isRequired,
  highestEnrolledCourse: PropTypes.string.isRequired,
  isLoadingSettings: PropTypes.bool.isRequired,
  isLoadingTestAssignment: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  testsMeta: PropTypes.object.isRequired,
};

export default XSkillsSettings;
