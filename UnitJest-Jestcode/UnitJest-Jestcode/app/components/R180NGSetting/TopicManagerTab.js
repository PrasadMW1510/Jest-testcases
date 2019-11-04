/**
 *
 * TopicManagerTab
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import ManageTopicTable from './ManageTopicTable';
import './TopicManagerTab.scss';

class TopicManagerTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r180ngTopicsObj: props.r180ngTopics && props.r180ngTopics.toJS(),
      saveOptions: true,
      activeStage: props.activeStage,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.r180ngTopics !== this.props.r180ngTopics ||
      nextProps.activeStage !== this.props.activeStage
    ) {
      this.setState({
        r180ngTopicsObj: nextProps.r180ngTopics && nextProps.r180ngTopics.toJS(),
        activeStage: nextProps.activeStage,
      });
    }
  }
  getTopicsStageModal = e => {
    e.preventDefault();
    const obj = { currentValue: e.target.value, prevValue: this.state.activeStage };
    this.setState({ activeStage: e.target.value }, () => {
      this.props.showR180NGTopicsStageModal(obj);
    });
  };

  handleSetInitialValues = () => {
    const obj = this.props.r180ngTopics.toJS();
    this.setState({ r180ngTopicsObj: obj, saveOptions: true });
    this.props.handleTabsReset();
  };

  handleCheckBoxChange = e => {
    this.showSaveOptions();
    this.props.handleToggle();
    const { r180ngTopicsObj } = this.state;
    const id = e.target.id;
    const item =
      this.state.r180ngTopicsObj &&
      this.state.r180ngTopicsObj.topic_cd.findIndex(it => it.cd_name[0] === id);
    r180ngTopicsObj.topic_cd[item].enable = e.target.checked ? ['1'] : ['0'];
    this.setState({ r180ngTopicsObj });
  };

  showSaveOptions() {
    this.setState({ saveOptions: false });
  }

  hideSaveOptions() {
    this.setState({ saveOptions: true });
  }

  handleSaveAndReturn = () => {
    this.props.r180ngSaveTopics(this.state);
    this.props.handleTabsReset();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.r180ngSaveTopics(this.state);
    this.props.handleTabsReset();
    this.hideSaveOptions();
  };

  render() {
    const { r180ngTopicsInstalledStages } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Fragment>
          <div className="program-settings__intro-text">
            Use the check boxes to activate or de-activate Topic Software.
          </div>
          <div className="program-settings__intro-text">
            Show Topic Software for:
            <select
              key={this.props.cohortType}
              className="program-settings__select"
              onChange={this.getTopicsStageModal}
              name="topic_stage_selection"
              value={this.state.activeStage}
            >
              <option value={''} key={'allStages'}>
                All Stages
              </option>
              {r180ngTopicsInstalledStages &&
                r180ngTopicsInstalledStages.map(stage => (
                  <option value={stage.stage_id[0]} key={stage.stage_id[0]}>
                    {' '}
                    {stage.name[0]}{' '}
                  </option>
                ))}
            </select>
          </div>
          <ManageTopicTable
            topics={this.state.r180ngTopicsObj && this.state.r180ngTopicsObj.topic_cd}
            handleToggle={this.props.handleToggle}
            handleTabsReset={this.props.handleTabsReset}
            handleToggleEnabled={e => this.handleCheckBoxChange(e)}
          />
          <div className="program-settings__footnote">* Supplemental Content</div>

          <ProgramSettingsButtons
            showRestoreDefaults={false}
            saveAndReturnHandler={this.handleSaveAndReturn}
            setInitialValuesHandler={this.handleSetInitialValues}
            stateResult={this.state.saveOptions}
          />
        </Fragment>
      </form>
    );
  }
}

TopicManagerTab.propTypes = {
  r180ngTopics: PropTypes.any.isRequired,
  r180ngTopicsInstalledStages: PropTypes.any.isRequired,
  handleTabsReset: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  showR180NGTopicsStageModal: PropTypes.func.isRequired,
  activeStage: PropTypes.any.isRequired,
  cohortType: PropTypes.any,
  r180ngSaveTopics: PropTypes.any,
};

export default TopicManagerTab;
