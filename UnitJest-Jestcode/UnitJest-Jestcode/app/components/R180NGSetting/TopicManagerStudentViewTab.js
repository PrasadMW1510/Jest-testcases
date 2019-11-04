/**
 *
 * TopicManagerStudentViewTab
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProgramSettingsButtons from 'components/ProgramSettingsButtons';
import TopicManagerStudentViewTable from './TopicManagerStudentViewTable';
import { CHOICE_TYPE_STUDENT } from './constants';
import './TopicManagerTab.scss';

class TopicManagerStudentViewTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r180ngTopicsObj: props.r180ngTopics && props.r180ngTopics.toJS(),
      studentLevel: props.studentLevel && props.studentLevel.toJS(),
      saveOptions: true,
      currentTopicID: '',
      currentSegmentId: '',
      currentTopic: '',
      currentSegment: '',
      studentLevelToggle: true,
      skipLevel: false,
      skipTopic: false,
      skipSegment: false,
      skipTopicObj: {},
      completionLevel: '',
    };
  }
  // TODO functionality
  componentDidMount() {
    if (!this.state.skipTopic) {
      this.getCurrentTopic();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.r180ngTopics !== this.props.r180ngTopics) {
      this.setState({ r180ngTopicsObj: nextProps.r180ngTopics && nextProps.r180ngTopics.toJS() });
    }
    if (nextProps.studentLevel !== this.props.studentLevel) {
      this.setState({ studentLevel: nextProps.studentLevel.toJS() });
    }
    this.getCurrentTopic();
  }

  getCurrentTopic() {
    let topic = null;
    let topicId = null;
    let segmentId = null;
    let segment = null;
    let skipLevel = false;
    // When student level is greater than 1
    const r180ngTopicsObj = this.state.r180ngTopicsObj && this.state.r180ngTopicsObj;
    const topics = r180ngTopicsObj.topic_cd;
    const currentSegment = topics.find(it => it.current_segment[0] > 0);
    if (!currentSegment) {
      skipLevel = false;
      const currentLevel = r180ngTopicsObj.student_level[0];
      if (currentLevel >= '2') {
        topic = CHOICE_TYPE_STUDENT;
        segment = '';
      } else {
        const currentSegments = topics.find(
          it => it.enable[0] === '1' && !it.topic_complete_levels
        );
        if (currentSegments) {
          topic = `${currentSegments.topic_name[0]}`;
          topicId = currentSegments.cd_name[0];
          segmentId = 1;
          segment = `${currentSegments.segment1_name[0]}`;
        }
      }
    } else {
      skipLevel = true;
      topic = `${currentSegment.topic_name[0]}`;
      topicId = `${currentSegment.cd_name[0]}`;
      segmentId = currentSegment.current_segment[0];
      segment = this.getSegment(currentSegment.current_segment[0], currentSegment);
    }
    let studentLevelToggle = '';
    if (this.state.studentLevel.student_level[0] !== r180ngTopicsObj.student_level[0]) {
      studentLevelToggle = false;
    } else {
      studentLevelToggle = true;
    }
    this.setState({
      currentTopic: topic,
      currentTopicID: topicId,
      currentSegmentId: segmentId,
      currentSegment: segment,
      skipLevel,
      studentLevelToggle,
    });
  }
  getSegment = (segment, currentSegment) => {
    switch (segment) {
      case '1':
        return `${currentSegment.segment1_name[0]}`;
      case '2':
        return `${currentSegment.segment2_name[0]}`;
      case '3':
        return `${currentSegment.segment3_name[0]}`;
      case '4':
        return `${currentSegment.segment4_name[0]}`;
      default:
        return '';
    }
  };

  getTopicsSkipModal = e => {
    e.preventDefault();
    this.props.showR180NGTopicsSkipModal({
      data: this.getTopicName(),
      skipTopic: this.setSkipTopic,
    });
  };

  getSegmentSkipModal = e => {
    e.preventDefault();

    this.props.showR180NGSegmentSkipModal({
      data: this.getSegmentName(),
      skipSegment: this.setSkipSegment,
    });
  };

  getCurrentTopicData(topicName, topicId) {
    if (topicName === CHOICE_TYPE_STUDENT) {
      return topicName;
    }
    if (topicId) {
      if (this.state.studentLevelToggle === false) {
        switch (Number(this.state.r180ngTopicsObj.student_level[0])) {
          case 1:
            return ` ${topicName} (${topicId}, Level 1)`;
          case 2:
            return ` ${topicName} (${topicId}, Level 2)`;
          case 3:
            return ` ${topicName} (${topicId}, Level 3)`;
          case 4:
            return ` ${topicName} (${topicId}, Level 4)`;
          default:
            return ` ${topicName} (${topicId})`;
        }
      }
      return ` ${topicName} (${topicId})`;
    }
    return '';
  }

  getCurrentSegmentData(segmentName, topicId, segmentId) {
    if (segmentName) {
      return ` ${segmentName} (${topicId}.${segmentId})`;
    }
    return '';
  }

  setSkipTopic = () => {
    let skippedTopic = '';
    let skippedSegment = '';
    let currentTopicID = '';
    let skipSegmentId = '';
    let skipLevel = false;
    const nextTopic = this.state.r180ngTopicsObj.topic_cd.findIndex(
      row => row.cd_name[0] === this.state.currentTopicID
    );
    const r180ngTopicsObj = this.state.r180ngTopicsObj;
    const currentLevel = r180ngTopicsObj.student_level[0];
    const studentLevel = this.state.studentLevel.student_level[0];
    // When Levels are different greater than 1
    if (currentLevel > '1' || studentLevel > '1') {
      skipLevel = r180ngTopicsObj.student_level[0];
      skippedTopic = CHOICE_TYPE_STUDENT;
    } else if (typeof nextTopic !== 'undefined' && nextTopic < r180ngTopicsObj.topic_cd.length) {
      const topics = r180ngTopicsObj.topic_cd.findIndex(
        (a, index) => a.enable[0] === '1' && index > Number(nextTopic) && !a.topic_complete_levels
      );
      if (!(typeof topics === 'undefined' || topics === -1)) {
        skippedTopic = `${r180ngTopicsObj.topic_cd[topics].topic_name[0]}`;
        skipSegmentId = 1;
        skippedSegment = `${r180ngTopicsObj.topic_cd[topics].segment1_name[0]}`;
        currentTopicID = `${r180ngTopicsObj.topic_cd[topics].cd_name[0]}`;
      }
    }

    const skipData = {
      skipTopic: true,
      skipLevel: currentLevel,
      skipTopicName: skippedTopic,
      skipSegmentName: skippedSegment,
      skipSegmentId,
      skipTopicID: currentTopicID,
    };

    this.setState({ skipTopic: true, skipData, skipLevel, skipSegment: false });
    this.showSaveOptions();
    this.props.handleToggle();
  };

  setSkipSegment = () => {
    const skippedTopic = '';
    const skipTopic = false;
    let skippedSegmentId = '';
    let skippedSegmentName = '';
    let currentTopicID = '';
    currentTopicID = this.state.currentTopicID;
    const currentR180ngTopicsObj = this.state.r180ngTopicsObj.topic_cd.find(
      a => a.cd_name[0] === this.state.currentTopicID
    );
    const currentLevel = this.state.r180ngTopicsObj.student_level[0];
    const currentSegment = this.state.skipSegment
      ? this.state.skipsSegmentData.skippedSegmentId
      : this.state.currentSegmentId;
    switch (currentSegment) {
      case '1':
        skippedSegmentId = '2';
        skippedSegmentName = this.getSegment('2', currentR180ngTopicsObj);
        break;
      case '2':
        skippedSegmentId = '3';
        skippedSegmentName = this.getSegment('3', currentR180ngTopicsObj);
        break;
      case '3':
        skippedSegmentId = '4';
        skippedSegmentName = this.getSegment('4', currentR180ngTopicsObj);
        break;
      case '4':
        return this.setSkipTopic();
      default:
        break;
    }

    const skipsSegmentData = {
      skipSegment: true,
      skipLevel: currentLevel,
      skipTopicName: skippedTopic,
      skipSegmentName: skippedSegmentName,
      skippedSegmentId,
      skipTopicID: currentTopicID,
    };

    this.setState({
      skipTopic,
      skipSegment: true,
      skipsSegmentData,
      currentTopicID,
      currentSegment: skippedSegmentName,
      currentSegmentId: skippedSegmentId,
    });
    this.showSaveOptions();
    this.props.handleToggle();
    return '';
  };

  getSegmentName = () => {
    if (this.state.skipTopic) {
      if (this.state.skipData.skipTopicName === CHOICE_TYPE_STUDENT) {
        return '';
      } else if (this.state.skipData.skipSegmentName)
        return `${this.state.skipData.skipSegmentName}(${this.state.skipData.skipTopicID}.${
          this.state.skipData.skipSegmentId
        })`;
    }
    if (this.state.skipSegment) {
      return `${this.state.skipsSegmentData.skipSegmentName}(${this.state.currentTopicID}.${
        this.state.skipsSegmentData.skippedSegmentId
      })`;
    }

    return this.getCurrentSegmentData(
      this.state.currentSegment,
      this.state.currentTopicID,
      this.state.currentSegmentId
    );
  };

  getStudentTableTopicId = () => {
    if (this.state.skipTopic) {
      return `${this.state.skipData.skipTopicID}.${this.state.skipData.skipSegmentId}`;
    }
    if (this.state.skipSegment) {
      return `${this.state.currentTopicID}.${this.state.skipsSegmentData.skippedSegmentId}`;
    }
    return `${this.state.currentTopicID}.${this.state.currentSegmentId}`;
  };

  getStudentTableTopicName = () => {
    if (this.state.skipTopic) {
      return `${this.state.skipData.skipTopicName}-${this.state.skipData.skipSegmentName}`;
    }
    if (this.state.skipSegment) {
      return `${this.state.currentTopic}-${this.state.skipsSegmentData.skipSegmentName}`;
    }
    return `${this.state.currentTopic}-${this.state.currentSegment}`;
  };

  getTopicName = () => {
    if (this.state.skipTopic)
      return this.getCurrentTopicData(
        this.state.skipData.skipTopicName,
        this.state.skipData.skipTopicID
      );

    return this.getCurrentTopicData(this.state.currentTopic, this.state.currentTopicID);
  };
  handleSetInitialValues = () => {
    this.setState({
      r180ngTopicsObj: this.props.r180ngTopics.toJS(),
      skipTopic: false,
      skipSegment: false,
    });

    this.getCurrentTopic();
    this.hideSaveOptions();
    this.props.handleTabsReset();
  };

  handleCheckBoxChange = e => {
    this.showSaveOptions();
    this.props.handleToggle();
    const { r180ngTopicsObj } = this.state;
    const id = e.target.id;
    const item = r180ngTopicsObj.topic_cd.findIndex(it => it.cd_name[0] === id);
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
    return (
      <form onSubmit={this.handleSubmit}>
        <Fragment>
          <div className="topic-manager-level">
            <div className="topic-manager-level__sections">
              <span
                className={`topic-manager-level__text ${
                  this.state.studentLevelToggle ? '' : 'display-student-level-different'
                }`}
              >
                Current Level:{'   '}
                <span className="topic-manager-level__text--plain-topic">
                  {this.state.studentLevel.student_level[0]}{' '}
                </span>
              </span>
              <span
                className={`topic-manager-level__text ${
                  this.state.studentLevelToggle
                    ? 'display-student-level-different'
                    : 'display-student-level-different-toggle'
                }`}
              >
                Next Level:{'   '}
                <span className="topic-manager-level__text--plain-topic">
                  {this.state.studentLevel.student_level[0]} *
                </span>
              </span>
            </div>
            <div className="topic-manager-level__sections">
              <div
                className={`topic-manager-level__text ${
                  this.state.skipLevel ? 'display-student-level-different' : ''
                }`}
              >
                Current Topic:{'  '}
                <span className="topic-manager-level__text--plain-topic">
                  {this.getTopicName()}{' '}
                </span>
              </div>
              <div
                className={`topic-manager-level__text ${
                  this.state.skipLevel
                    ? 'display-student-level-different-toggle'
                    : 'display-student-level-different'
                }`}
              >
                Current Topic:{'  '}
                <span className="topic-manager-level__text--plain-topic">
                  {this.getTopicName()}{' '}
                </span>
                <span
                  className={`topic-manager-skip-link ${
                    this.state.skipTopic
                      ? 'display-student-level-different'
                      : 'topic-manager-skip-link'
                  }`}
                >
                  <button className="topic-manager-skip-level" onClick={this.getTopicsSkipModal}>
                    {' '}
                    Skip
                  </button>
                </span>
              </div>
            </div>{' '}
            <div className="topic-manager-level__sections">
              <div
                className={`topic-manager-level__text ${
                  this.state.skipLevel ? 'display-student-level-different' : ''
                }`}
              >
                Current Segment:
                <span className="topic-manager-level__text--plain-topic">
                  {this.getSegmentName()}
                </span>
              </div>
              <div
                className={`topic-manager-level__text ${
                  this.state.skipLevel
                    ? 'display-student-level-different-toggle'
                    : 'display-student-level-different'
                }`}
              >
                Current Segment:
                <div className="topic-manager-level__text--plain-topic">
                  {this.getSegmentName()}{' '}
                  <span
                    className={`topic-manager-skip-link ${
                      this.state.skipTopic
                        ? 'display-student-level-different'
                        : 'topic-manager-skip-link'
                    }`}
                  >
                    <button className="topic-manager-skip-level" onClick={this.getSegmentSkipModal}>
                      Skip
                    </button>
                  </span>
                </div>
              </div>
            </div>{' '}
          </div>
          <div className="topic-manager-level__text--plain">
            Use the check boxes to activate or disable Topic Software.
          </div>

          <TopicManagerStudentViewTable
            topics={this.state.r180ngTopicsObj && this.state.r180ngTopicsObj}
            topicId={this.getStudentTableTopicId()}
            topicName={this.getStudentTableTopicName()}
            skipTopic={this.state.skipTopic}
            skippedTopicId={this.state.currentTopicID}
            skippedLevel={this.state.skipTopic ? this.state.skipData.skipLevel : ''}
            currentTopicID={
              this.state.skipTopic
                ? this.state.skipData.skipTopicID
                : this.state && this.state.currentTopicID
            }
            handleToggleEnabled={e => this.handleCheckBoxChange(e)}
          />
          <div className="topic-manager-level__container-footer">
            <span className="topic-manager-level__text--plain">
              {"'S' indicates manual skip by the teacher."}
            </span>
            <span
              className={`topic-manager-level__text--plain ${
                this.state.studentLevelToggle
                  ? 'display-student-level-different'
                  : 'display-student-level-different-toggle'
              }`}
            >
              {' '}
              * This student&apos;s level has changed. The next level will take effect when the
              student begins a new segment.
            </span>
          </div>
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
TopicManagerStudentViewTab.defaultProps = {
  isolateTab: false,
};

TopicManagerStudentViewTab.propTypes = {
  r180ngTopics: PropTypes.any.isRequired,
  studentLevel: PropTypes.any.isRequired,
  handleTabsReset: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  showR180NGTopicsSkipModal: PropTypes.func,
  showR180NGSegmentSkipModal: PropTypes.func,
  r180ngSaveTopics: PropTypes.any,
  // isolateTab: PropTypes.bool.isRequired,
};

export default TopicManagerStudentViewTab;
