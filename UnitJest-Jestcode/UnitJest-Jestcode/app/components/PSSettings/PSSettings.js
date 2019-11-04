/**
 *
 * PSSettings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import LoadingBar from 'components/LoadingBar';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsMessage from 'components/SettingsMessage';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';
import ProgramSettingsViewPS from 'components/ProgramSettingsViewPS';
import TestAssignmentViewPS from 'components/TestAssignmentViewPS';
import * as Constants from './constants';

export class PSSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isolateTab: false,
    };
  }

  setIsolateTab = isIsolate => this.setState({ isolateTab: isIsolate });

  renderNoEnrollments = () => {
    const { cohortObj } = this.props;
    const selectedCohType = cohortObj.cohortType;

    return (
      <SettingsNoEnrollmentsMessage cohort={selectedCohType} productName={PROGRAM_LIST.DTM.name} />
    );
  };

  renderSettingTab = () => {
    const { cohortObj, enrollmentCount, isLoading, settings, handleSave } = this.props;
    const selectedCohType = cohortObj.cohortType;

    if (
      selectedCohType === COHORT_TYPE.District ||
      selectedCohType === COHORT_TYPE.School ||
      selectedCohType === COHORT_TYPE.Grade
    ) {
      return (
        <SettingsMessage
          message1={
            Constants.INVALID_COHORT_MESSAGE.message1 +
            selectedCohType.toLowerCase() +
            Constants.INVALID_COHORT_MESSAGE.message2
          }
        />
      );
    }

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (isLoading || settings.size === 0) {
      return <LoadingBar />;
    }

    return (
      <ProgramSettingsViewPS
        settings={settings}
        handleSave={handleSave}
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
      />
    );
  };

  renderTestAssignmentTab = () => {
    const { cohortObj, enrollmentCount, isLoading, testAssignmentData } = this.props;
    const selectedCohType = cohortObj && cohortObj.cohortType;

    if (
      selectedCohType === COHORT_TYPE.District ||
      selectedCohType === COHORT_TYPE.School ||
      selectedCohType === COHORT_TYPE.Grade
    ) {
      return <SettingsMessage message1={Constants.INVALID_COHORT_MESSAGE_TEST_ASSIGNMENT} />;
    }

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (isLoading) {
      return <LoadingBar />;
    }

    return (
      <TestAssignmentViewPS
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
        testAssignmentData={testAssignmentData}
        psTestAssignmentRequest={this.props.psTestAssignmentRequest}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderSettingTab,
        ...Constants.TAB_SETTINGS,
      },
      {
        renderFunction: this.renderTestAssignmentTab,
        ...Constants.TAB_TEST_ASSIGNMENT,
        renderAction: this.props.psTestAssignmentRequest,
      },
    ];

    return <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
  }
}

PSSettings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  psTestAssignmentRequest: PropTypes.func,
  testAssignmentData: PropTypes.object,
};

export default PSSettings;
