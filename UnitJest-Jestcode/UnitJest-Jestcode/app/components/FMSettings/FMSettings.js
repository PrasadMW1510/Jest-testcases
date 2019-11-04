/**
 *
 * FMSettings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import LoadingBar from 'components/LoadingBar';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import ProgramSettingsViewFM from 'components/ProgramSettingsViewFM';
import SettingsMessage from 'components/SettingsMessage';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';

import * as Constants from './constants';

class FMSettings extends React.Component {
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
      <SettingsNoEnrollmentsMessage cohort={selectedCohType} productName={PROGRAM_LIST.FM.name} />
    );
  };

  renderSettingTab = () => {
    const { cohortObj, enrollmentCount, handleSettingSave, isLoading, settings } = this.props;
    const selectedCohType = cohortObj.cohortType;

    if (
      selectedCohType !== COHORT_TYPE.Class &&
      selectedCohType !== COHORT_TYPE.Group &&
      selectedCohType !== COHORT_TYPE.Student
    ) {
      return (
        <SettingsMessage
          message1={Constants.SETTINGS_INVALID_COHORT_MESSAGE.replace(
            Constants.COHORT_SEARCH_STRING,
            selectedCohType.toLowerCase()
          )}
        />
      );
    }

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (isLoading) {
      return <LoadingBar />;
    }

    return (
      <ProgramSettingsViewFM
        isTabIsolated={this.state.isolateTab}
        handleSave={handleSettingSave}
        setIsolateTab={this.setIsolateTab}
        settings={settings}
      />
    );
  };

  renderAdvancedSettingsTab = () => {
    const { cohortObj, enrollmentCount, isLoading } = this.props;
    const selectedCohType = cohortObj.cohortType;

    if (
      selectedCohType !== COHORT_TYPE.Class &&
      selectedCohType !== COHORT_TYPE.Group &&
      selectedCohType !== COHORT_TYPE.Student
    ) {
      return (
        <SettingsMessage
          message1={Constants.ADVANCED_SETTINGS_INVALID_COHORT_MESSAGE.replace(
            Constants.COHORT_SEARCH_STRING,
            selectedCohType.toLowerCase()
          )}
        />
      );
    }

    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }

    if (isLoading) {
      return <LoadingBar />;
    }

    return <SettingsMessage message1={Constants.COMING_SOON} />;

    // TODO: Replace the following with your component for the second tab
    /* return (
      <ProgramAdvancedSettingsViewFM
        advancedSettings={advancedSettings}
        handleAdvancedSettingSave={this.props.handleAdvancedSettingSave}
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
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
        renderFunction: this.renderAdvancedSettingsTab,
        ...Constants.TAB_ADVANCED_SETTINGS,
      },
    ];

    return <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
  }
}

FMSettings.propTypes = {
  // advancedSettings: PropTypes.object.isRequired,
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  // handleAdvancedSettingSave: PropTypes.func.isRequired,
  handleSettingSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
};

export default FMSettings;
