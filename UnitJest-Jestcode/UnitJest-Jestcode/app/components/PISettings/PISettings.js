/**
 *
 * PISettings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import LoadingBar from 'components/LoadingBar';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsMessage from 'components/SettingsMessage';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';
import ProgramSettingsViewPI from 'components/ProgramSettingsViewPI';
import * as Constants from './constants';

export class PISettings extends React.Component {
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
      <SettingsNoEnrollmentsMessage cohort={selectedCohType} productName={PROGRAM_LIST.SPI.name} />
    );
  };

  renderSettingTab = () => {
    const { cohortObj, enrollmentCount, isLoading, settings } = this.props;
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
      <ProgramSettingsViewPI
        settings={settings}
        handleSave={this.props.handleSave}
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderSettingTab,
        ...Constants.TAB_SETTINGS,
      },
    ];

    return <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
  }
}

PISettings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
};

export default PISettings;
