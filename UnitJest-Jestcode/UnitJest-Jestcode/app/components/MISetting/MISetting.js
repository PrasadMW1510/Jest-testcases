/**
 *
 * MISetting
 *
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LoadingBar from 'components/LoadingBar';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import * as Selectors from 'containers/MISettingContainer/selectors';
import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';
import * as Constants from './constants';
import './MISetting.scss';
import TabAdvancedSettings from './TabAdvancedSettings';
import TabSettings from './TabSettings';

class MISetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: Constants.TAB_SETTINGS,
      isolateTab: false,
    };
  }

  handleTabReset = () => {
    this.setState({ isolateTab: false });
    this.props.handleCancel();
  };
  handleTabClick = ev => this.setState({ activeTab: ev.currentTarget.id });
  handleTabIsolate = () => this.setState({ isolateTab: true });

  renderTabSettingsLoadingContainer = () => (
    <div>
      <span className="mi-settings__instruction-text">
        {' '}
        Use these options to adjust {this.props.programName} settings.
      </span>
      <div className="mi-settings__settings-tab-content">
        <LoadingBar />
      </div>
    </div>
  );

  renderTabAdvancedSettingsLoadingContainer = isEditable => (
    <div className="mi-settings__advanced-settings-loading-container">
      <div className="mi-settings__instruction-text">
        {isEditable
          ? Constants.TAB_ADVANCED_SETTINGS_EDITABLE_INSTRUCTIONS
          : Constants.TAB_ADVANCED_SETTINGS_READ_ONLY_INSTRUCTIONS}
      </div>
      <LoadingBar />
    </div>
  );

  renderNoEnrollments = () => {
    const { selectedCohortTypeAndId } = this.props;
    const selectedCohType = selectedCohortTypeAndId.cohortType;
    return (
      <SettingsNoEnrollmentsMessage cohort={selectedCohType} productName={PROGRAM_LIST.SMI.name} />
    );
  };

  renderSettingsTab = () => {
    const {
      enrollmentCount,
      handleCancel,
      handleSave,
      loggedInUserType,
      programName,
      selectedCohortName,
      selectedCohortTypeAndId,
      immSettingData,
      showModal,
    } = this.props;
    const { cohortType } = selectedCohortTypeAndId;
    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }
    const isLoading = Selectors.selectIsLoading(immSettingData);
    if (isLoading) {
      return this.renderTabSettingsLoadingContainer();
    }
    const immSettings = Selectors.selectImmProgramSettingsObj(immSettingData);
    return (
      <TabSettings
        handleIsolateTab={this.handleTabIsolate}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleTabReset={this.handleTabReset}
        immSettings={immSettings}
        loggedInUserType={loggedInUserType}
        programName={programName}
        selectedCohortName={selectedCohortName}
        selectedCohortType={cohortType}
        showModal={showModal}
      />
    );
  };

  renderAdvancedSettingsTab = () => {
    const {
      enrollmentCount,
      handleSave,
      immSettingData,
      selectedCohortTypeAndId: { cohortType },
      showModal,
      transformScore,
    } = this.props;
    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }
    const isLoading = Selectors.selectIsLoading(immSettingData);
    if (isLoading) {
      const isEditable = cohortType === COHORT_TYPE.District;
      return this.renderTabAdvancedSettingsLoadingContainer(isEditable);
    }
    const immProficiencyBandData = Selectors.selectImmProficiencyBandData(immSettingData);
    return (
      <TabAdvancedSettings
        handleIsolateTab={this.handleTabIsolate}
        handleSave={handleSave}
        handleTabReset={this.handleTabReset}
        immProficiencyBandData={immProficiencyBandData}
        selectedCohortType={cohortType}
        showModal={showModal}
        transformScore={transformScore}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderSettingsTab,
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

MISetting.defaultProps = {
  selectedCohortName: '',
  selectedCohortTypeAndId: {},
};

MISetting.propTypes = {
  enrollmentCount: PropTypes.number.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  immSettingData: PropTypes.object.isRequired,
  loggedInUserType: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  selectedCohortName: PropTypes.string.isRequired,
  selectedCohortTypeAndId: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  transformScore: PropTypes.func.isRequired,
};

export default MISetting;
