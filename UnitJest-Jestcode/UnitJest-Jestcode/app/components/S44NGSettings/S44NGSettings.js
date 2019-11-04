/**
 *
 * S44NGSettings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import ProgramSettingsViewS44NG from 'components/ProgramSettingsViewS44NG';
import SettingsMessage from 'components/SettingsMessage';
import { COHORT_TYPE } from 'containers/App/constants';

import * as Constants from './constants';

class S44NGSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isolateTab: false,
    };
  }

  setIsolateTab = isDirty => this.setState({ isolateTab: isDirty });

  renderContent = () => {
    const { cohortObj, enrollmentCount } = this.props;
    const selectedCohType = cohortObj.cohortType;

    if (selectedCohType === COHORT_TYPE.District || selectedCohType === COHORT_TYPE.School) {
      return <SettingsMessage message1={Constants.INVALID_COHORT_MESSAGE} />;
    }

    if (enrollmentCount === 0) {
      switch (selectedCohType) {
        case COHORT_TYPE.Grade:
          return <SettingsMessage message1={Constants.NO_ENROLLMENTS_MESSAGE.Grade} />;
        case COHORT_TYPE.Teacher:
          return <SettingsMessage message1={Constants.NO_ENROLLMENTS_MESSAGE.Teacher} />;
        case COHORT_TYPE.Class:
          return <SettingsMessage message1={Constants.NO_ENROLLMENTS_MESSAGE.Class} />;
        case COHORT_TYPE.Group:
          return <SettingsMessage message1={Constants.NO_ENROLLMENTS_MESSAGE.Group} />;
        case COHORT_TYPE.Student:
          return <SettingsMessage message1={Constants.NO_ENROLLMENTS_MESSAGE.Student} />;
        default:
          // This should never get hit, but just in case, we want to throw up some error
          return <SettingsMessage message1={Constants.WRONG_COHORT_MESSAGE} />;
      }
    }

    // This will make it so it will only show the settings when it is done loading
    // I might change this to used loading component
    if (this.props.isLoading || this.props.settings.size === 0) {
      return null;
    }

    return (
      <ProgramSettingsViewS44NG
        cohortType={selectedCohType}
        handleSave={this.props.handleSave}
        isTabIsolated={this.state.isolateTab}
        setIsolateTab={this.setIsolateTab}
        settings={this.props.settings}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderContent,
        ...Constants.TAB_SETTINGS,
      },
    ];

    return <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
  }
}

S44NGSettings.defaultProps = {
  enrollmentCount: 0,
};

S44NGSettings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number,
  isLoading: PropTypes.bool,
};

export default S44NGSettings;
