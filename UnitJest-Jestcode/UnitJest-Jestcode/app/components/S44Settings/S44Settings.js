/**
 *
 * S44Settings
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import ProgramSettingsViewS44 from 'components/ProgramSettingsViewS44';
import SettingsMessage from 'components/SettingsMessage';
import { COHORT_TYPE } from 'containers/App/constants';

import * as Constants from './constants';

class S44Settings extends React.Component {
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
        default:
          // selectedCohType is Student
          return <SettingsMessage message1={Constants.NO_ENROLLMENTS_MESSAGE.Student} />;
      }
    }

    // This will make it so it will only show the settings when it is done loading
    // I might change this to used loading component
    if (this.props.isLoading || this.props.settings.size === 0) {
      return null;
    }

    return (
      <ProgramSettingsViewS44
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

S44Settings.propTypes = {
  cohortObj: PropTypes.object.isRequired,
  enrollmentCount: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
};

export default S44Settings;
