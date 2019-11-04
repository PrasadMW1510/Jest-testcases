import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgramSettingsNavBar from 'components/ProgramSettingsNavBar';
import * as Constants from './constants';
import TabQuizScoreRecordingTool from './TabQuizScoreRecordingTool';
import TabPointsRecordingTool from './TabPointsRecordingTool';

import './SRCGradingTool.scss';

class SRCGradingTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: Constants.TAB_QUIZ_SCORE_RECORDING_TOOL,
      quizScoreData: [],
      isolateTab: false,
      quizzesToRemove: [],
    };
  }

  componentDidUpdate = () => {
    const { scoreData } = this.props;
    const { quizScoreData, isolateTab } = this.state;
    const updatedScoreData = [];
    if (scoreData.length !== quizScoreData.length && !isolateTab) {
      scoreData.forEach(scoreObj => {
        const newObject = {
          date: scoreObj.date,
          title: scoreObj.title,
          lexile: scoreObj.lexile,
          rl: scoreObj.rl,
          '# Correct': scoreObj['# Correct'],
          '# Questions': scoreObj['# Questions'],
          points: scoreObj.points,
          remove: this.renderRemoveQuizScore(scoreObj.remove, scoreObj.quizSequence),
          id: scoreObj.id,
        };
        updatedScoreData.push(newObject);
      });
      this.setState({ quizScoreData: updatedScoreData });
    }
  };

  unIsolateTab = () => {
    this.setState({ isolateTab: false });
  };

  removeQuizScore = (id, seq) => {
    const newRemovalArray = this.state.quizzesToRemove;
    const newQuizScoreData = [];
    this.state.quizScoreData.forEach(scoreData => {
      if (scoreData.id !== id) {
        newQuizScoreData.push(scoreData);
      }
    });
    newRemovalArray.push({ ID: id, sequence: seq });
    this.setState({
      isolateTab: true,
      quizzesToRemove: newRemovalArray,
      quizScoreData: newQuizScoreData,
    });
  };

  renderRemoveQuizScore = (id, seq) => (
    <button
      className="src-quiz-remove__button"
      onClick={() => {
        this.removeQuizScore(id, seq);
      }}
    >
      Remove
    </button>
  );

  renderQuizScoreRecordingToolTab = () => {
    const {
      enrollmentCount,
      profileInfo,
      quizSearchData,
      searchForQuizzesToAdd,
      clearSearchedQuizzes,
      paginationData,
      itemCount,
      saveRemovedQuizzesRequest,
      isLoading,
    } = this.props;
    return (
      <TabQuizScoreRecordingTool
        profileInfo={profileInfo}
        enrollmentCount={enrollmentCount}
        scoreData={this.state.quizScoreData}
        quizSearchData={quizSearchData}
        searchForQuizzesToAdd={searchForQuizzesToAdd}
        clearSearchedQuizzes={clearSearchedQuizzes}
        isolateTab={this.state.isolateTab}
        paginationData={paginationData}
        itemCount={itemCount}
        saveRemovedQuizzesRequest={saveRemovedQuizzesRequest}
        quizzesToRemove={this.state.quizzesToRemove}
        unIsolateTab={this.unIsolateTab}
        isLoading={isLoading}
      />
    );
  };

  renderPointsRecordingToolTab = () => {
    const { enrollmentCount, profileInfo, pointsData } = this.props;
    return (
      <TabPointsRecordingTool
        profileInfo={profileInfo}
        enrollmentCount={enrollmentCount}
        pointsData={pointsData}
      />
    );
  };

  render() {
    const tabs = [
      {
        renderFunction: this.renderQuizScoreRecordingToolTab,
        ...Constants.TAB_QUIZ_SCORE_RECORDING_TOOL,
      },
      {
        renderFunction: this.renderPointsRecordingToolTab,
        ...Constants.TAB_POINTS_RECORDING_TOOL,
      },
    ];
    return (
      <div>
        <div className="src-grading-tools-description">
          <span>Use the options below to enter offline quiz results and to redeem points.</span>
        </div>
        <ProgramSettingsNavBar tabs={tabs} isolateTab={this.state.isolateTab} />;
      </div>
    );
  }
}

SRCGradingTool.propTypes = {
  enrollmentCount: PropTypes.number.isRequired,
  profileInfo: PropTypes.object.isRequired,
  scoreData: PropTypes.array.isRequired,
  pointsData: PropTypes.object.isRequired,
  quizSearchData: PropTypes.array,
  searchForQuizzesToAdd: PropTypes.func.isRequired,
  clearSearchedQuizzes: PropTypes.func.isRequired,
  paginationData: PropTypes.object,
  itemCount: PropTypes.string,
  saveRemovedQuizzesRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SRCGradingTool;
