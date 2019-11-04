/**
 *
 * TopicManagerStudentViewR180EE
 *
 */

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import TopicManagerStudentViewTable from 'components/R180NGSetting/TopicManagerStudentViewTable';
import SettingsMessage from 'components/SettingsMessage';
import { OK_CANCEL_MODAL } from 'containers/ModalController/constants';
import UserTitleText from 'containers/UserTitleText';

import * as Constants from './constants';

import './TopicManagerStudentViewR180EE.scss';

class TopicManagerStudentViewR180EE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...Constants.INITIAL_STATE.toJS(),
      ...this.props.topicManager.toJS(),
    };
    /*
      --- State format ---
      currentSegment: '',
      currentSegmentId: '',
      currentTopic: '',
      currentTopicId: '',
      dataToSave: [],
      noStudentLevel: true,
      skipLevel: false,
      skipTopic: false,
      skippedTopicId: '',
      installedStages: array,
      selectedStage: string,
      topics: {
        student_level[0]: string,
        topic_cd: array
      },
     */
  }

  componentDidMount() {
    this.getCurrentTopic();
  }

  // --- Handler Functions ---
  getCurrentTopic = () => {
    const { topics } = this.state;
    if (!topics.student_level) {
      return;
    }

    let segment = null;
    let segmentId = null;
    let skipLevel = false;
    let topic = null;
    let topicId = null;

    const studentLevel = topics.student_level[0];
    const topicArray = topics.topic_cd;
    let currentSegmentObj = topicArray.find(topicObj => topicObj.current_segment[0] > 0);
    const enabledTopics = topicArray.filter(topicObj => topicObj.enable[0] === '1');

    if (!currentSegmentObj) {
      skipLevel = false;
      const topicIndex = enabledTopics.findIndex(
        topicObj => topicObj.topic_complete_levels !== undefined
      );
      currentSegmentObj = topicIndex === -1 ? enabledTopics[0] : enabledTopics[topicIndex + 1];
    } else {
      skipLevel = true;
    }

    if (enabledTopics.length === 0) {
      topic = null;
    } else if (!skipLevel && studentLevel >= '2') {
      topic = Constants.STUDENT_CHOICE_TOPIC;
    } else {
      segment = skipLevel ? this.getSegment(currentSegmentObj) : currentSegmentObj.segment1_name[0];
      segmentId = skipLevel ? currentSegmentObj.current_segment[0] : '1';
      topic = currentSegmentObj.topic_name[0];
      topicId = currentSegmentObj.cd_name[0];
    }

    this.setState({
      currentSegment: segment,
      currentSegmentId: segmentId,
      currentTopic: topic,
      currentTopicId: topicId,
      noStudentLevel: false,
      skipLevel,
    });
  };

  getSegment = currentSegmentObj => {
    const currentSegment = currentSegmentObj.current_segment[0];
    return currentSegmentObj[`segment${currentSegment}_name`][0];
  };

  getStudentLevel = () => {
    const { topics } = this.state;
    const studentLevel = topics.student_level[0];
    const { settingsStudentLevel } = this.props;

    if (this.hasStudentLevelChanged()) {
      return `${settingsStudentLevel} *`;
    }

    return studentLevel;
  };

  hasStudentLevelChanged = () => {
    const { topics } = this.state;
    const studentLevel = topics.student_level[0];
    const { settingsStudentLevel } = this.props;

    return studentLevel !== settingsStudentLevel;
  };

  handleCheckboxChange = e => {
    const { dataToSave, topics } = this.state;
    const id = e.target.id;
    const item = topics.topic_cd.findIndex(topic => topic.cd_name[0] === id);
    const enable = e.target.checked ? '1' : '0';
    topics.topic_cd[item].enable = [enable];

    const dataToSaveItemIndex = dataToSave.findIndex(data => data.cd_name === id);
    if (dataToSaveItemIndex === -1) {
      dataToSave.push({
        enable,
        completed: '0',
        manual_advance: '0',
        cd_name: topics.topic_cd[item].cd_name[0],
        cd_segment: topics.topic_cd[item].current_segment[0],
        level: topics.student_level[0],
      });
    } else {
      const dataToSaveItem = dataToSave[dataToSaveItemIndex];
      dataToSave[dataToSaveItemIndex] = {
        ...dataToSaveItem,
        enable,
      };
    }

    this.setState({ dataToSave, topics });
    this.props.setIsolateTab(true);
  };

  handleTopicSkipClicked = e => {
    e.preventDefault();

    this.props.showModal(OK_CANCEL_MODAL, {
      heading: 'Skip Topic CD',
      message: this.renderTopicModalMessage(),
      modalClassName: 'topic-manager-student-view__modal',
      headerClassName: 'topic-manager-student-view__modal-header',
      okLabel: 'Yes',
      cancelLabel: 'No',
      onOk: this.handleTopicSkipOnOK,
    });
  };

  handleSegmentSkipClicked = e => {
    e.preventDefault();

    this.props.showModal(OK_CANCEL_MODAL, {
      heading: 'Skip Segment',
      message: this.renderSegmentModalMessage(),
      modalClassName: 'topic-manager-student-view__modal',
      headerClassName: 'topic-manager-student-view__modal-header',
      okLabel: 'Yes',
      cancelLabel: 'No',
      onOk: this.handleSegmentSkipOnOk,
    });
  };

  handleTopicSkipOnOK = () => {
    const { dataToSave, topics } = this.state;
    const processedTopics = [];
    let foundTopic = '';

    topics.topic_cd.forEach(topicObj => {
      if (topicObj.current_segment[0] > 0) {
        foundTopic = topicObj;
        processedTopics.push({
          ...topicObj,
          current_segment: ['0'],
        });
      } else {
        processedTopics.push({ ...topicObj });
      }
    });

    topics.topic_cd = processedTopics;
    const skippedTopicId = this.state.currentTopicId;

    const dataToSaveItemIndex = dataToSave.findIndex(data => data.cd_name === skippedTopicId);
    if (dataToSaveItemIndex === -1) {
      dataToSave.push({
        enable: foundTopic.enable[0],
        completed: '1',
        manual_advance: '1',
        cd_name: foundTopic.cd_name[0],
        cd_segment: '0',
        level: topics.student_level[0],
      });
    } else {
      const dataToSaveItem = dataToSave[dataToSaveItemIndex];
      dataToSave[dataToSaveItemIndex] = {
        ...dataToSaveItem,
        completed: '1',
        manual_advance: '1',
        cd_segment: '0',
      };
    }

    this.setState({
      currentSegment: null,
      currentSegmentId: null,
      currentTopic: Constants.STUDENT_CHOICE_TOPIC,
      currentTopicId: null,
      dataToSave,
      skipTopic: true,
      skippedTopicId,
      topics,
    });
    this.props.setIsolateTab(true);
  };

  handleSegmentSkipOnOk = () => {
    const { dataToSave, topics } = this.state;
    const processedTopics = [];
    let foundCurrentSegment = null;
    let segment = null;
    let segmentId = null;
    let topic = null;
    let topicId = null;
    let skipTopic = false;

    topics.topic_cd.forEach(topicObj => {
      if (topicObj.current_segment[0] > 0) {
        const currentSegment = Number(topicObj.current_segment[0]);
        let updatedCurrentSegment = '0';
        if (currentSegment !== 4) {
          updatedCurrentSegment = (currentSegment + 1).toString();
        }
        foundCurrentSegment = {
          ...topicObj,
          current_segment: [updatedCurrentSegment],
        };
        processedTopics.push({ ...foundCurrentSegment });
      } else {
        processedTopics.push({ ...topicObj });
      }
    });

    topics.topic_cd = processedTopics;
    const skippedTopicId = this.state.currentTopicId;

    if (foundCurrentSegment.current_segment[0] === '0') {
      topic = Constants.STUDENT_CHOICE_TOPIC;
      skipTopic = true;
    } else {
      segment = this.getSegment(foundCurrentSegment);
      segmentId = foundCurrentSegment.current_segment[0];
      topic = foundCurrentSegment.topic_name[0];
      topicId = foundCurrentSegment.cd_name[0];
    }

    const dataToSaveItemIndex = dataToSave.findIndex(data => data.cd_name === skippedTopicId);
    if (dataToSaveItemIndex === -1) {
      dataToSave.push({
        enable: foundCurrentSegment.enable[0],
        completed: foundCurrentSegment.current_segment[0] === '0' ? '1' : '0',
        manual_advance: '1',
        cd_name: foundCurrentSegment.cd_name[0],
        cd_segment: foundCurrentSegment.current_segment[0],
        level: topics.student_level[0],
      });
    } else {
      const dataToSaveItem = dataToSave[dataToSaveItemIndex];
      dataToSave[dataToSaveItemIndex] = {
        ...dataToSaveItem,
        completed: foundCurrentSegment.current_segment[0] === '0' ? '1' : '0',
        manual_advance: '1',
        cd_segment: foundCurrentSegment.current_segment[0],
      };
    }

    this.setState({
      currentSegment: segment,
      currentSegmentId: segmentId,
      currentTopic: topic,
      currentTopicId: topicId,
      skipTopic,
      skippedTopicId,
      topics,
    });
    this.props.setIsolateTab(true);
  };

  handleSaveAndReturn = () => {
    this.props.handleTopicSave(this.state.dataToSave);
    this.props.setIsolateTab(false);
  };

  handleSetInitialValues = () => {
    this.setState(
      {
        ...Constants.INITIAL_STATE.toJS(),
        ...this.props.topicManager.toJS(),
      },
      this.handleSetInitialValuesCallback
    );
  };

  handleSetInitialValuesCallback = () => {
    this.getCurrentTopic();
    this.props.setIsolateTab(false);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleSaveAndReturn();
  };

  // --- Render Functions ---
  renderNoStudentLevel = () => <SettingsMessage message1={Constants.NO_STUDENT_LEVEL_MESSAGE} />;

  renderTopicName = () => {
    const { currentTopic, currentTopicId, topics } = this.state;
    let topicName = currentTopic;
    if (currentTopicId !== null) {
      topicName = this.hasStudentLevelChanged()
        ? `${currentTopic} (${currentTopicId}, Level ${topics.student_level[0]})`
        : `${currentTopic} (${currentTopicId})`;
    }

    return topicName;
  };

  renderSegmentName = () => {
    const { currentSegment, currentSegmentId, currentTopicId } = this.state;
    let topicName = currentSegment;
    if (currentSegmentId !== null && currentTopicId !== null) {
      topicName = `${currentSegment} (${currentTopicId}.0${currentSegmentId})`;
    }

    return topicName;
  };

  renderTopicModalMessage = () => (
    <span>
      Are you sure you want <UserTitleText /> to skip {this.renderTopicName()}?
    </span>
  );

  renderSegmentModalMessage = () => (
    <span>
      Are you sure you want <UserTitleText /> to skip {this.renderSegmentName()}?
    </span>
  );

  renderCurrentLevel = () => (
    <div className="topic-manager-student-view__level">
      <div className="topic-manager-student-view__level-sections">
        <span className="topic-manager-student-view__level-labels">Current Level:</span>
        <span className="topic-manager-student-view__level-text">
          {this.state.topics.student_level[0]}
        </span>
      </div>
      {this.renderTopicAndSegment()}
    </div>
  );

  renderNextLevel = () => (
    <div className="topic-manager-student-view__level">
      <div className="topic-manager-student-view__level-sections">
        <span className="topic-manager-student-view__level-labels">Next Level:</span>
        <span className="topic-manager-student-view__level-text">{this.getStudentLevel()}</span>
      </div>
      {this.renderTopicAndSegment()}
    </div>
  );

  renderTopicAndSegment = () => (
    <Fragment>
      <div className="topic-manager-student-view__level-sections">
        <span className="topic-manager-student-view__level-labels">Current Topic:</span>
        <span className="topic-manager-student-view__level-text--topic">
          {this.renderTopicName()}
        </span>
        {this.state.skipLevel &&
          this.state.currentTopic !== Constants.STUDENT_CHOICE_TOPIC && (
            <button
              className="topic-manager-student-view__level-text--skip"
              onClick={this.handleTopicSkipClicked}
            >
              Skip
            </button>
          )}
      </div>
      <div className="topic-manager-student-view__level-sections">
        <span className="topic-manager-student-view__level-labels">Current Segment:</span>
        <span className="topic-manager-student-view__level-text">{this.renderSegmentName()}</span>
        {this.state.skipLevel &&
          this.state.currentTopic !== Constants.STUDENT_CHOICE_TOPIC && (
            <button
              className="topic-manager-student-view__level-text--skip"
              onClick={this.handleSegmentSkipClicked}
            >
              Skip
            </button>
          )}
      </div>
    </Fragment>
  );

  renderHasStudentLevel = () => (
    <form onSubmit={this.handleSubmit}>
      <Fragment>
        {!this.hasStudentLevelChanged() && this.renderCurrentLevel()}
        {this.hasStudentLevelChanged() && this.renderNextLevel()}
      </Fragment>
      <div className="topic-manager-student-view__label--inline-block">
        Use check boxes to enable or disable Topic Software.
      </div>
      <TopicManagerStudentViewTable
        currentTopicID={this.state.currentTopicId}
        handleToggleEnabled={this.handleCheckboxChange}
        secondColumnHeader="Stage"
        skippedLevel={this.state.skipTopic ? this.state.topics.student_level[0] : ''}
        skippedTopicId={this.state.skippedTopicId}
        skipTopic={this.state.skipTopic}
        topics={this.state.topics}
        topicId={`${this.state.currentTopicId}.0${this.state.currentSegmentId}`}
        topicName={`${this.state.currentTopic} - ${this.state.currentSegment}`}
      />
      <div className="topic-manager-student-view__label">
        &lsquo;S&rsquo; indicates manual skip by the teacher.
      </div>
      {this.hasStudentLevelChanged() && (
        <div className="topic-manager-student-view__label">
          * This student&rsquo;s level has changed. The next level will take effect when the student
          begins a new segment.
        </div>
      )}
      <ProgramSettingsButtons
        saveAndReturnHandler={this.handleSaveAndReturn}
        setInitialValuesHandler={this.handleSetInitialValues}
        showRestoreDefaults={false}
        stateResult={!this.props.isTabIsolated}
      />
    </form>
  );

  render() {
    return (
      <Fragment>
        {this.state.noStudentLevel && this.renderNoStudentLevel()}
        {!this.state.noStudentLevel && this.renderHasStudentLevel()}
      </Fragment>
    );
  }
}

TopicManagerStudentViewR180EE.propTypes = {
  handleTopicSave: PropTypes.func.isRequired,
  isTabIsolated: PropTypes.bool.isRequired,
  setIsolateTab: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  settingsStudentLevel: PropTypes.string.isRequired,
  topicManager: PropTypes.object.isRequired,
};

export default TopicManagerStudentViewR180EE;
