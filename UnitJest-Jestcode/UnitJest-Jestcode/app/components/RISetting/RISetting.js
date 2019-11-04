/**
 *
 * RISetting
 *
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LoadingBar from 'components/LoadingBar';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import SettingsNoEnrollmentsMessage from 'components/SettingsNoEnrollmentsMessage';
import * as Selectors from 'containers/RISettingContainer/selectors';
import { COHORT_TYPE, PROGRAM_LIST } from 'containers/App/constants';
import * as Constants from './constants';
import './RISetting.scss';
import TabAdvancedSettings from './TabAdvancedSettings';
import TabSettings from './TabSettings';

class RISetting extends Component {
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
      <span className="ri-settings__instruction-text">
        {' '}
        Use these options to adjust {this.props.programName} settings.
      </span>
      <div className="ri-settings__settings-tab-content">
        <LoadingBar />
      </div>
    </div>
  );

  renderTabAdvancedSettingsLoadingContainer = isEditable => (
    <div className="ri-settings__advanced-settings-loading-container">
      <div className="ri-settings__instruction-text">
        {isEditable
          ? Constants.TAB_ADVANCED_SETTINGS_EDITABLE_INSTRUCTIONS
          : Constants.TAB_ADVANCED_SETTINGS_READ_ONLY_INSTRUCTIONS}
      </div>
      <LoadingBar />
    </div>
  );

  renderNoEnrollments = () => (
    <SettingsNoEnrollmentsMessage
      cohort={this.props.selectedCohortType}
      productName={PROGRAM_LIST.SRI.name}
    />
  );

  renderSettingsTab = () => {
    const {
      enrollmentCount,
      handleCancel,
      handleSave,
      loggedInUserType,
      programName,
      selectedCohortName,
      selectedCohortType,
      immSettingData,
      showModal,
    } = this.props;
    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }
    const isLoading = Selectors.selectIsLoading(immSettingData);
    if (isLoading) {
      return this.renderTabSettingsLoadingContainer();
    }
    return (
      <TabSettings
        enrollmentCount={enrollmentCount}
        handleIsolateTab={this.handleTabIsolate}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleTabReset={this.handleTabReset}
        immSettings={Selectors.selectImmProgramSettingsObj(immSettingData)}
        loggedInUserType={loggedInUserType}
        programName={programName}
        selectedCohortName={selectedCohortName}
        selectedCohortType={selectedCohortType}
        showModal={showModal}
      />
    );
  };

  renderAdvancedSettingsTab = () => {
    const {
      enrollmentCount,
      handleSave,
      immSettingData,
      selectedCohortType,
      showModal,
      transformLexile,
    } = this.props;
    if (enrollmentCount === 0) {
      return this.renderNoEnrollments();
    }
    const isLoading = Selectors.selectIsLoading(immSettingData);
    if (isLoading) {
      const isEditable = selectedCohortType === COHORT_TYPE.District;
      return this.renderTabAdvancedSettingsLoadingContainer(isEditable);
    }
    return (
      <TabAdvancedSettings
        handleIsolateTab={this.handleTabIsolate}
        handleSave={handleSave}
        handleTabReset={this.handleTabReset}
        immProficiencyBandData={Selectors.selectImmProficiencyBandData(immSettingData)}
        selectedCohortType={selectedCohortType}
        showModal={showModal}
        transformLexile={transformLexile}
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

RISetting.defaultProps = {
  selectedCohortName: '',
  selectedCohortType: '',
};

RISetting.propTypes = {
  enrollmentCount: PropTypes.number.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  immSettingData: PropTypes.object.isRequired,
  loggedInUserType: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  selectedCohortName: PropTypes.string.isRequired,
  selectedCohortType: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  transformLexile: PropTypes.func.isRequired,
};

export default RISetting;
