/**
 *
 * RCSettings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

// TODO: Uncomment and rename import when working on second tab
import LoadingBar from 'components/LoadingBar';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsMessage from 'components/SettingsMessage';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import { PROGRAM_LIST } from 'containers/App/constants';
import TabSettings from './TabSettings';
// import RestrictQuizzesViewRC from './RestrictQuizzesViewRC';

import * as Constants from './constants';

class RCSettings extends React.Component {
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
      <SettingsNoEnrollmentsMessage cohort={selectedCohType} productName={PROGRAM_LIST.SRC.name} />
    );
  };

  renderSettingTab = () => {
    const {
      cohortObj,
      enrollmentCount,
      handleSave,
      immSettings,
      isLoading,
      loggedInUserType,
      programName,
      showModal,
    } = this.props;

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (isLoading || immSettings.size === 0) {
      return <LoadingBar />;
    }

    return (
      <TabSettings
        cohortObj={cohortObj}
        handleSave={handleSave}
        isTabIsolated={this.state.isolateTab}
        loggedInUserType={loggedInUserType}
        programName={programName}
        setIsolateTab={this.setIsolateTab}
        immSettings={immSettings}
        showModal={showModal}
      />
    );
  };

  renderRestrictQuizzesTab = () => {
    // TODO: Uncomment and rename used props accordingly
    const {
      // cohortObj,
      enrollmentCount,
      // handleTopicSave,
      isLoading,
      // setStage,
      // showModal,
      // topicManager,
    } = this.props;

    // TODO: Adjust following block based on how your settings handle no enrollments
    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (isLoading) {
      return <LoadingBar />;
    }

    // TODO: Remove this next snippet after the tab is implemented
    return <SettingsMessage message1={Constants.COMING_SOON} />;

    // TODO: Replace the following with your component for the second tab
    /* return (
      <RestrictQuizzesViewRC
        handleTopicSave={handleTopicSave}
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
        setStage={setStage}
        showModal={showModal}
        topicManager={topicManager}
      />
    ); */
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderSettingTab,
        ...Constants.TAB_SETTINGS,
      },
      {
        renderFunction: this.renderRestrictQuizzesTab,
        ...Constants.TAB_RESTRICT_QUIZZES,
      },
    ];

    return <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
  }
}

// TODO: Uncomment props for second tab, when working on it
RCSettings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
  // handleTopicSave: PropTypes.func.isRequired,
  immSettings: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loggedInUserType: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  // topicManager: PropTypes.object.isRequired,
};

export default RCSettings;
