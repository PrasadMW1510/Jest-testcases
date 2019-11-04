/**
 *
 * TopicManagerViewR180EE
 *
 */

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import ManageTopicTable from 'components/R180NGSetting/ManageTopicTable';
import SettingsSelectBox from 'components/SettingsSelectBox';
import { COHORT_TYPE } from 'containers/App/constants';
import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';

import './TopicManagerViewR180EE.scss';

class TopicManagerViewR180EE extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.topicManager.toJS() };
    /*
      --- State format ---
      installedStages: array,
      selectedStage: string,
      topics: array,
     */
  }

  // --- Handler Functions ---
  handleInstalledStagesOnChange = e => {
    this.props.showModal(OK_CANCEL_MODAL, {
      cancelLabel: 'No',
      message: this.renderOkCancelModalMessage(),
      modalClassName: 'topic-manager-view-r180ee__modal',
      okLabel: 'Yes',
      onOk: this.modalHandleOnOk,
      onOkParam: e.target.value,
    });
  };

  modalHandleOnOk = selectedStage => {
    this.props.setStage(selectedStage);
    this.props.setIsolateTab(false);
  };

  handleToggleEnabled = e => {
    const { topics } = this.state;
    const id = e.target.id;
    const topicIndex = topics.findIndex(item => item.cd_name[0] === id);
    topics[topicIndex].enable = e.target.checked ? ['1'] : ['0'];

    this.setState({ topics });
    this.props.setIsolateTab(true);
  };

  handleSave = () => {
    this.props.handleTopicSave(this.state.topics);
    this.props.setIsolateTab(false);
  };

  handleSetInitialValues = () => {
    this.modalHandleOnOk('');
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleSave();
  };

  // --- Render Functions ---
  renderOkCancelModalMessage = () => (
    <span>
      Using the filter menu will erase any changes that you have not already saved. Would you like
      to continue?
    </span>
  );

  renderInstalledStages = () => {
    const { cohortType, enrollmentDetails } = this.props;

    if (cohortType === COHORT_TYPE.District || cohortType === COHORT_TYPE.School) {
      return this.state.installedStages.map(stage => this.renderDropDownOption(stage));
    }

    const enrollmentIds = [];
    enrollmentDetails.forEach(item => {
      if (item.enrollmentCount > 0) {
        enrollmentIds.push(item.applicationId);
      }
    });

    const filterInstalledStages = this.state.installedStages.filter(stage =>
      enrollmentIds.includes(stage.stage_id[0])
    );

    return filterInstalledStages.map(stage => this.renderDropDownOption(stage));
  };

  renderDropDownOption = stage => (
    <option value={stage.stage_id} key={stage.stage_id}>
      {stage.name[0]}
    </option>
  );

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="topic-manager-view-r180ee">
        <Fragment>
          <div className="topic-manager-view-r180ee__header">
            Use the check boxes to activate or de-activate Topic Software.
          </div>
          <div className="topic-manager-view-r180ee__select">
            <SettingsSelectBox
              labelClass="topic-manager-view-r180ee__select-label"
              fieldClass="topic-manager-view-r180ee__select-field"
              label="Show Topic Software for:"
              fieldValue={this.state.selectedStage}
              onChange={this.handleInstalledStagesOnChange}
            >
              <option value={''}>All Stages</option>
              {this.renderInstalledStages()}
            </SettingsSelectBox>
          </div>
          <ManageTopicTable
            handleToggleEnabled={this.handleToggleEnabled}
            secondColumnHeader="Stage"
            topics={this.state.topics}
          />
          <div className="topic-manager-view-r180ee__footer">* Supplemental Content</div>
          <ProgramSettingsButtons
            showRestoreDefaults={false}
            saveAndReturnHandler={this.handleSave}
            setInitialValuesHandler={this.handleSetInitialValues}
            stateResult={!this.props.isTabIsolated}
          />
        </Fragment>
      </form>
    );
  }
}

TopicManagerViewR180EE.propTypes = {
  cohortType: PropTypes.string.isRequired,
  enrollmentDetails: PropTypes.array.isRequired,
  handleTopicSave: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  setStage: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  topicManager: PropTypes.object.isRequired,
};

export default TopicManagerViewR180EE;
