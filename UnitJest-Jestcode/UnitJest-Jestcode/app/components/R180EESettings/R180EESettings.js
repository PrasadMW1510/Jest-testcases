/**
 *
 * R180EESettings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import LoadingBar from 'components/LoadingBar';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import ProgramSettingsViewR180EE from 'components/ProgramSettingsViewR180EE';
import SettingsMessage from 'components/SettingsMessage';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import TopicManagerStudentViewR180EE from 'components/TopicManagerStudentViewR180EE';
import TopicManagerViewR180EE from 'components/TopicManagerViewR180EE';
import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';

import * as Constants from './constants';

class R180EESettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isolateTab: false,
    };
  }

  setIsolateTab = isDirty => this.setState({ isolateTab: isDirty });

  renderNoEnrollments = () => {
    const { cohortObj } = this.props;
    const selectedCohType = cohortObj.cohortType;

    return (
      <SettingsNoEnrollmentsMessage cohort={selectedCohType} productName={PROGRAM_LIST.R180.name} />
    );
  };

  renderSettingTab = () => {
    const { cohortObj, enrollmentCount, isLoading, settings, showModal } = this.props;
    const selectedCohType = cohortObj.cohortType;

    if (selectedCohType === COHORT_TYPE.District || selectedCohType === COHORT_TYPE.School) {
      return <SettingsMessage message1={Constants.INVALID_COHORT_MESSAGE} />;
    }

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (isLoading || settings.size === 0) {
      return <LoadingBar />;
    }

    return (
      <ProgramSettingsViewR180EE
        handleSave={this.props.handleSave}
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
        settings={settings}
        showModal={showModal}
      />
    );
  };

  renderTopicManagerTab = () => {
    const {
      cohortObj,
      enrollmentCount,
      enrollmentDetails,
      handleTopicSave,
      isLoading,
      settings,
      setStage,
      showModal,
      topicManager,
    } = this.props;

    const selectedCohType = cohortObj.cohortType;

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (
      isLoading ||
      topicManager.get('installedStages').size === 0 ||
      topicManager.get('topics').size === 0
    ) {
      return <LoadingBar />;
    }

    if (selectedCohType === COHORT_TYPE.Student) {
      return (
        <TopicManagerStudentViewR180EE
          handleTopicSave={handleTopicSave}
          isTabIsolated={this.state.isolateTab}
          setIsolateTab={this.setIsolateTab}
          settingsStudentLevel={settings.getIn(['student_level', 0])}
          showModal={showModal}
          topicManager={topicManager}
        />
      );
    }

    return (
      <TopicManagerViewR180EE
        cohortType={selectedCohType}
        enrollmentDetails={enrollmentDetails}
        handleTopicSave={handleTopicSave}
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
        setStage={setStage}
        showModal={showModal}
        topicManager={topicManager}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderAction: this.props.r180EESettingsContainerRequest,
        renderFunction: this.renderSettingTab,
        ...Constants.TAB_SETTINGS,
      },
      {
        renderAction: this.props.r180EESettingsContainerRequest,
        renderFunction: this.renderTopicManagerTab,
        ...Constants.TAB_TOPIC_MANAGER,
      },
    ];

    return <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
  }
}

R180EESettings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  enrollmentDetails: PropTypes.array.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleTopicSave: PropTypes.func.isRequired,
  r180EESettingsContainerRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setStage: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  topicManager: PropTypes.object.isRequired,
};

export default R180EESettings;
