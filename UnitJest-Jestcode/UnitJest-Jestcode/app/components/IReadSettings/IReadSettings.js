/**
 *
 * IReadSettings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsMessage from 'components/SettingsMessage';
import { COHORT_TYPE } from 'containers/App/constants';

import * as Constants from './constants';
import ProgramSettingsViewIRead from './ProgramSettingsViewIRead';

class IReadSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isolateTab: false,
    };
  }

  setIsolateTab = isDirty => this.setState({ isolateTab: isDirty });

  renderSettingsTab = () => {
    const { programSettingData, enrollmentCount, cohortObj, isLoading } = this.props;
    const selectedCohType = cohortObj.cohortType;

    if (
      selectedCohType === COHORT_TYPE.District ||
      selectedCohType === COHORT_TYPE.School ||
      selectedCohType === COHORT_TYPE.Grade ||
      selectedCohType === COHORT_TYPE.Teacher
    ) {
      return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_ADMIN} />;
    }

    if (enrollmentCount === 0) {
      switch (selectedCohType) {
        case COHORT_TYPE.Class:
          return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_CLASS} />;
        case COHORT_TYPE.Group:
          return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_GROUP} />;
        case COHORT_TYPE.Student:
          return <SettingsMessage message1={Constants.ENROLLMENT_COUNT_ERROR_MESSAGE_STUDENT} />;
        default:
          return null;
      }
    }

    // This will make it so it will only show the settings when it is done loading
    // I might change this to used loading component
    if (isLoading || programSettingData.size === 0) {
      return null;
    }

    return (
      <ProgramSettingsViewIRead
        handleSave={this.props.handleSave}
        isTabIsolated={this.state.isolateTab}
        programSettingData={programSettingData}
        setIsolateTab={this.setIsolateTab}
        showModal={this.props.showModal}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderSettingsTab,
        ...Constants.TAB_SETTINGS,
      },
    ];

    return <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
  }
}

IReadSettings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  programSettingData: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default IReadSettings;
