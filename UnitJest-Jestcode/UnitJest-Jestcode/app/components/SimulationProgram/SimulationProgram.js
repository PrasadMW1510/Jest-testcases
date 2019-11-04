/**
 *
 * SimulationProgram
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Math180Questions from 'components/Math180Questions';
import * as Constants from './constants';
import './SimulationProgram.scss';

class SimulationProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      comment: '',
      score: '',
      scoreShown: false,
      updateStatus: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      if (this.state.shown === true && !this.simnode.contains(e.target)) {
        this.setState({ shown: false });
      }
      if (this.state.scoreShown === true && !this.scorenode.contains(e.target)) {
        this.setState({ scoreShown: false });
      }
    }
  };

  toggle = e => {
    e.preventDefault();
    this.setState({
      shown: true,
      scoreShown: false,
    });
  };
  scoreToggle = e => {
    e.preventDefault();
    this.setState({
      scoreShown: true,
      shown: false,
    });
  };
  closeblock = e => {
    e.preventDefault();
    this.setState({
      shown: false,
    });
  };
  scoreToggleClose = e => {
    e.preventDefault();
    this.setState({ scoreShown: false });
  };

  buttonChange = (item, qNumber, e) => {
    this.setState({ score: e.target.value });
    this.handleEvaluationData(item, qNumber, e, Constants.SIMULATION_PROGRAM_SCORE);
  };

  handleChange = (item, qNumber, e) => {
    this.setState({ comment: e.target.value });
    this.handleEvaluationData(item, qNumber, e, Constants.SIMULATION_PROGRAM_COMMENT);
  };

  handleEvaluationData(item, qNumber, e, datachange) {
    const evaluationUpdate = {};
    evaluationUpdate.communityID = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].$.communityId;
    evaluationUpdate.studentID = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].$.studentId;
    evaluationUpdate.workItemID = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt[
      item
    ].number;
    evaluationUpdate.teacherID = this.props.profileUserId;

    switch (qNumber) {
      case Constants.SIMULATION_PROGRAM_QUESTION_1:
        evaluationUpdate.rubicType = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt[
          item
        ].question1[0].evaluation[0].$.rubricType;
        evaluationUpdate.submissionType = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt[
          item
        ].question1[0].evaluation[0].$.submissionType;
        break;
      case Constants.SIMULATION_PROGRAM_QUESTION_2:
        evaluationUpdate.rubicType = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt[
          item
        ].question2[0].evaluation[0].$.rubricType;
        evaluationUpdate.submissionType = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt[
          item
        ].question2[0].evaluation[0].$.submissionType;
        break;
      case Constants.SIMULATION_PROGRAM_QUESTION_3:
        evaluationUpdate.rubicType = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt[
          item
        ].question3[0].evaluation[0].$.rubricType;
        evaluationUpdate.submissionType = this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt[
          item
        ].question3[0].evaluation[0].$.submissionType;
        break;
      default:
        break;
    }

    switch (datachange) {
      case Constants.SIMULATION_PROGRAM_SCORE:
        evaluationUpdate.score = e.target.value;
        evaluationUpdate.comment = this.state.comment;
        break;
      case Constants.SIMULATION_PROGRAM_COMMENT:
        evaluationUpdate.comment = e.target.value;
        evaluationUpdate.score = this.state.score;
        break;
      default:
        break;
    }

    evaluationUpdate.questionNum = qNumber;
    this.props.storeData(evaluationUpdate);
  }

  handleTab = tabIndex => {
    this.props.showWarning(tabIndex, 'Tabs');
  };

  handleQuestionTab = tabIndex => {
    this.props.showWarning(tabIndex, 'QuestionTabs');
  };

  handleScoreCommentUpdate = uStatus => {
    this.setState({ updateStatus: uStatus });
  };

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const shown = {
      display: this.state.shown ? 'block' : 'none',
    };
    const scoreShow = { display: this.state.scoreShown ? 'block' : 'none' };
    return (
      <div ref={node => (this.node = node)}>
        <div className="inbox-program-title">
          {this.props.inboxmodalcontainer.studentProgram.results.workItems !== undefined && (
            <span>
              {this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem !==
                undefined && (
                <ul className="inbox-program-title-list">
                  {' '}
                  <li className="list-none">Math180</li>
                  <li>{Constants.SIMULATION_TITLE}</li>
                  <li>
                    {
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .m180WorkItem[0].from
                    }
                  </li>{' '}
                  <li>
                    {
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .m180WorkItem[0].attempt[0].simulationTitle
                    }
                  </li>{' '}
                  <li>
                    <button className="simulation-program-title-button" onClick={this.toggle}>
                      About this Simulation
                    </button>
                  </li>
                </ul>
              )}
            </span>
          )}
        </div>
        <div className="inbox-program-tabclss">
          {this.props.inboxmodalcontainer.studentProgram.results.workItems !== undefined &&
            this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem !==
              undefined && (
              <Tabs
                forceRenderTabPanel
                selectedIndex={this.props.tabIndex}
                onSelect={this.handleTab}
              >
                <TabList>
                  {this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt.map(
                    (attemptItem, index) => <Tab key={attemptItem.index}>Attempt {index + 1}</Tab>
                  )}
                </TabList>
                {this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem[0].attempt.map(
                  (attemptItem, index) => (
                    <TabPanel key={attemptItem.index}>
                      <div className="inbox-program-student-choices">
                        <div className="inbox-program-tabinr-titl">Student Choices :</div>
                        <div className="inbox-program-tabinar-data">
                          <div className="inbox-program-tabinr-row">
                            {attemptItem.studentChoices[0].studentChoice.map((sChoice, scIndex) => {
                              const schoice = [];
                              if (scIndex === 0 || scIndex % 2 === 0)
                                schoice.push(
                                  <div className="inbox-program-tabinr-col" key={sChoice.$.key}>
                                    <span className="col-sm-2">
                                      <b>{sChoice.$.key}</b>
                                    </span>
                                    <span className="col-sm-2"> {sChoice.$.value}</span>
                                  </div>
                                );

                              if (scIndex % 2 !== 0)
                                schoice.push(
                                  <div
                                    className="inbox-program-tabinr-col pull-right"
                                    key={sChoice.$.key}
                                  >
                                    <span className="col-sm-2">
                                      <b>{sChoice.$.key}</b>
                                    </span>
                                    <span className="col-sm-2">{sChoice.$.value}</span>
                                  </div>
                                );
                              return schoice;
                            })}
                          </div>
                        </div>
                      </div>
                      <Tabs
                        forceRenderTabPanel
                        className="inbox-program-tabinr"
                        selectedIndex={this.props.questionTabIndex}
                        onSelect={this.handleQuestionTab}
                      >
                        <TabList>
                          {attemptItem.question1[0] !== undefined && <Tab>Question 1</Tab>}
                          {attemptItem.question2[0] !== undefined && <Tab>Question 2</Tab>}
                          {attemptItem.question3[0] !== undefined && <Tab>Question 3</Tab>}
                        </TabList>
                        {attemptItem.question1[0] !== undefined && (
                          <TabPanel>
                            <Math180Questions
                              questionData={attemptItem.question1[0]}
                              index={index}
                              question={`1`}
                              handleChange={this.handleChange}
                              buttonChange={this.buttonChange}
                              scoreToggle={this.scoreToggle}
                              submitDate={
                                this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                                  .m180WorkItem[0].$.dateSubmitted
                              }
                              rubicScore={
                                attemptItem.question1[0].evaluation !== undefined &&
                                attemptItem.question1[0].evaluation[0].rubricScores !== undefined
                                  ? attemptItem.question1[0].evaluation[0].rubricScores[0].score[0]
                                      .teacherScore
                                  : null
                              }
                              handleScoreCommentUpdate={this.handleScoreCommentUpdate}
                              resetStateData={this.props.resetStateData}
                            />
                          </TabPanel>
                        )}
                        {attemptItem.question2[0] !== undefined && (
                          <TabPanel>
                            <Math180Questions
                              questionData={attemptItem.question2[0]}
                              index={index}
                              question={`2`}
                              handleChange={this.handleChange}
                              buttonChange={this.buttonChange}
                              scoreToggle={this.scoreToggle}
                              submitDate={
                                this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                                  .m180WorkItem[0].$.dateSubmitted
                              }
                              rubicScore={
                                attemptItem.question2[0].evaluation !== undefined &&
                                attemptItem.question2[0].evaluation[0].rubricScores !== undefined
                                  ? attemptItem.question2[0].evaluation[0].rubricScores[0].score[0]
                                      .teacherScore
                                  : null
                              }
                              handleScoreCommentUpdate={this.handleScoreCommentUpdate}
                              resetStateData={this.props.resetStateData}
                            />
                          </TabPanel>
                        )}
                        {attemptItem.question3[0] !== undefined && (
                          <TabPanel>
                            <Math180Questions
                              questionData={attemptItem.question3[0]}
                              index={index}
                              question={`3`}
                              handleChange={this.handleChange}
                              buttonChange={this.buttonChange}
                              scoreToggle={this.scoreToggle}
                              submitDate={`${
                                this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                                  .m180WorkItem[0].$.dateSubmitted
                              }`}
                              rubicScore={
                                attemptItem.question3[0].evaluation !== undefined &&
                                attemptItem.question3[0].evaluation[0].rubricScores !== undefined
                                  ? attemptItem.question3[0].evaluation[0].rubricScores[0].score[0]
                                      .teacherScore
                                  : null
                              }
                              handleScoreCommentUpdate={this.handleScoreCommentUpdate}
                              resetStateData={this.props.resetStateData}
                            />
                          </TabPanel>
                        )}
                      </Tabs>
                    </TabPanel>
                  )
                )}
              </Tabs>
            )}
          {this.props.inboxmodalcontainer.studentProgram.results.workItems !== undefined &&
            this.props.inboxmodalcontainer.studentProgram.results.workItems[0].m180WorkItem !==
              undefined && (
              <div
                className="simulation-program-info simulation-program-modalmain"
                style={shown}
                ref={simnode => (this.simnode = simnode)}
              >
                <h3 className="simulation-program-info-title">
                  {
                    this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                      .m180WorkItem[0].attempt[0].simulationTitle
                  }{' '}
                </h3>
                <button className="inbox-program-close-pop" onClick={this.closeblock}>
                  x
                </button>

                <div className="simulation-program-smul-inr">
                  <div className="simulation-program-popmodal">
                    <h4 className="simulation-program-smul-header">Simulation Description</h4>
                    <p className="simulation-program-smul-desc">
                      {
                        this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                          .m180WorkItem[0].simDescription
                      }{' '}
                    </p>
                  </div>
                  <div className="simulation-program-popmodal">
                    <h4 className="simulation-program-smul-header">Simulation Choices</h4>
                    <p className="simulation-program-smul-desc">
                      {
                        this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                          .m180WorkItem[0].simChoice
                      }{' '}
                    </p>
                  </div>
                </div>
              </div>
            )}
          <div
            className="simulation-program-overall-score"
            style={scoreShow}
            ref={scorenode => (this.scorenode = scorenode)}
          >
            <h3 className="simulation-program-overall-score-head">Overall Score</h3>
            <button className="inbox-program-close-pop" onClick={this.scoreToggleClose}>
              x
            </button>
            <div className="simulation-program-overall-score-info">
              <div className="simulation-program-col-sm-4">
                <h4 className="simulation-program-col-body">
                  0<br /> Not Attempted
                </h4>
                <p className="simulation-program-col-p">The Student did not answer the question.</p>
              </div>
              <div className="simulation-program-col-sm-4">
                <h4 className="simulation-program-col-body">
                  1<br /> Partially Attempted
                </h4>
                <p className="simulation-program-col-p">
                  The Student states whether he or she met the goal, but does not explain why.
                </p>
              </div>
              <div className="simulation-program-col-sm-4">
                <h4 className="simulation-program-col-body">
                  2<br /> Complete
                </h4>
                <p className="simulation-program-col-p">
                  The Student explains why he or she met(or did not meet) the goal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SimulationProgram.propTypes = {
  inboxmodalcontainer: PropTypes.object,
  storeData: PropTypes.func.isRequired,
  profileUserId: PropTypes.string,
  showWarning: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  questionTabIndex: PropTypes.number.isRequired,
  resetStateData: PropTypes.bool,
};

export default SimulationProgram;
