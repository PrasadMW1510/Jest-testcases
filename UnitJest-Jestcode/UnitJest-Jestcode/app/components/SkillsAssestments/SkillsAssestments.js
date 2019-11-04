/**
 *
 * SkillsAssestments
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Math180SkillsQuestions from 'components/Math180SkillsQuestions';
import * as Constants from './constants';
import './SkillsAssestments.scss';

class SkillsAssestments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreShown: false,
      comment: '',
      score: '',
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      if (this.state.scoreShown === true && !this.scorenode.contains(e.target)) {
        this.setState({ scoreShown: false });
      }
    }
  };

  scoreToggle = e => {
    e.preventDefault();
    this.setState({
      scoreShown: true,
    });
  };

  scoreToggleClose = e => {
    e.preventDefault();
    this.setState({ scoreShown: false });
  };

  handleTab = tabIndex => {
    this.props.showWarning(tabIndex, 'Tabs');
  };

  buttonChange = (item, qNumber, e) => {
    this.setState({ score: e.target.value });
    this.handleEvaluationData(item, qNumber, e, Constants.SKILL_ASSESTMENT_PROGRAM_SCORE);
  };

  handleChange = (item, qNumber, e) => {
    this.setState({ comment: e.target.value });
    this.handleEvaluationData(item, qNumber, e, Constants.SKILL_ASSESTMENT_PROGRAM_COMMENT);
  };

  handleEvaluationData(item, qNumber, e, datachange) {
    const evaluationUpdate = {};
    const mSkillWorkItem = this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
      .mSkillsWorkItem[0];

    evaluationUpdate.communityID = mSkillWorkItem.$.communityId;
    evaluationUpdate.studentID = mSkillWorkItem.$.studentId;
    evaluationUpdate.workItemID = mSkillWorkItem.$.workItemId;
    evaluationUpdate.teacherID = this.props.profileUserId;

    switch (qNumber) {
      case Constants.SKILL_ASSESTMENT_QUESTION_1:
        evaluationUpdate.rubicType = mSkillWorkItem.mSkillsQuestion1[0].evaluation[0].$.rubricType;
        evaluationUpdate.submissionType =
          mSkillWorkItem.mSkillsQuestion1[0].evaluation[0].$.submissionType;
        break;
      case Constants.SKILL_ASSESTMENT_QUESTION_2:
        evaluationUpdate.rubicType = mSkillWorkItem.mSkillsQuestion2[0].evaluation[0].$.rubricType;
        evaluationUpdate.submissionType =
          mSkillWorkItem.mSkillsQuestion2[0].evaluation[0].$.submissionType;
        break;

      default:
        break;
    }
    switch (datachange) {
      case Constants.SKILL_ASSESTMENT_PROGRAM_SCORE:
        evaluationUpdate.score = e.target.value;
        evaluationUpdate.comment = this.state.comment;
        break;
      case Constants.SKILL_ASSESTMENT_PROGRAM_COMMENT:
        evaluationUpdate.comment = e.target.value;
        evaluationUpdate.score = this.state.score;
        break;
      default:
        break;
    }
    evaluationUpdate.questionNum = qNumber;

    this.props.storeData(evaluationUpdate);
  }
  skillItems = () => {
    if (
      this.props.inboxmodalcontainer.studentProgram.results.workItems &&
      this.props.inboxmodalcontainer.studentProgram.results.workItems[0].mSkillsWorkItem
    ) {
      return this.props.inboxmodalcontainer.studentProgram.results.workItems[0].mSkillsWorkItem[0];
    }
    return '';
  };

  render() {
    const scoreShow = {
      display: this.state.scoreShown ? 'block' : 'none',
    };
    const mSkillWorkItem = this.skillItems();
    return (
      <div ref={node => (this.node = node)}>
        <div className="inbox-program-title">
          {this.props.inboxmodalcontainer.studentProgram.results.workItems !== undefined &&
            this.props.inboxmodalcontainer.studentProgram.results.workItems[0].mSkillsWorkItem !==
              undefined && (
              <ul className="skill-assestment-overallscore-info-ullist">
                <li className="list-none">Math 180 Year2</li>
                <li>
                  {mSkillWorkItem.from} : {mSkillWorkItem.blockTitle}
                </li>

                {this.props.communityId !== 'M180Y2' && (
                  <li>
                    <a
                      href={
                        this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                          .mSkillsWorkItem[0].$.pdfFile
                      }
                      target="_blank"
                    >
                      mSkills Assessment
                    </a>
                  </li>
                )}
              </ul>
            )}
        </div>
        <div className="inbox-program-tabclss">
          <Tabs selectedIndex={this.props.tabIndex} onSelect={this.handleTab}>
            <TabList>
              {this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                .mSkillsWorkItem !== undefined &&
                mSkillWorkItem.mSkillsQuestion1[0] !== undefined && <Tab>Question 1</Tab>}
              {this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                .mSkillsWorkItem !== undefined &&
                mSkillWorkItem.mSkillsQuestion2[0] !== undefined && <Tab>Question 2</Tab>}
            </TabList>
            {this.props.inboxmodalcontainer.studentProgram.results.workItems[0].mSkillsWorkItem !==
              undefined &&
              mSkillWorkItem.mSkillsQuestion1[0] !== undefined && (
                <TabPanel>
                  <Math180SkillsQuestions
                    questionsData={
                      this.props.inboxmodalcontainer.question.length > 0
                        ? this.props.inboxmodalcontainer.question[0]
                        : {}
                    }
                    mSkillsQuestionsData={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined
                        ? mSkillWorkItem.mSkillsQuestion1[0]
                        : ''
                    }
                    scoreToggle={this.scoreToggle}
                    handleChange={this.handleChange}
                    index={Constants.SKILL_ASSESTMENT_INDEX0}
                    question={Constants.SKILL_ASSESTMENT_QUESTION_1}
                    rubicScore={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined &&
                      mSkillWorkItem.mSkillsQuestion1[0].evaluation !== undefined &&
                      mSkillWorkItem.mSkillsQuestion1[0].evaluation[0].rubricScores !== undefined
                        ? mSkillWorkItem.mSkillsQuestion1[0].evaluation[0].rubricScores[0].score[0]
                            .teacherScore
                        : []
                    }
                    buttonChange={this.buttonChange}
                    submitDate={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined
                        ? mSkillWorkItem.$.dateSubmitted
                        : ''
                    }
                    testResults={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined
                        ? mSkillWorkItem.testResults[0]
                        : ''
                    }
                    communityID={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined
                        ? mSkillWorkItem.$.communityId
                        : ''
                    }
                  />
                </TabPanel>
              )}
            {this.props.inboxmodalcontainer.studentProgram.results.workItems[0].mSkillsWorkItem !==
              undefined &&
              mSkillWorkItem.mSkillsQuestion2[0] !== undefined && (
                <TabPanel>
                  <Math180SkillsQuestions
                    questionsData={
                      this.props.inboxmodalcontainer.question.length > 1
                        ? this.props.inboxmodalcontainer.question[1]
                        : {}
                    }
                    mSkillsQuestionsData={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined
                        ? mSkillWorkItem.mSkillsQuestion2[0]
                        : ''
                    }
                    scoreToggle={this.scoreToggle}
                    handleChange={this.handleChange}
                    index={Constants.SKILL_ASSESTMENT_INDEX1}
                    question={Constants.SKILL_ASSESTMENT_QUESTION_2}
                    rubicScore={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined &&
                      mSkillWorkItem.mSkillsQuestion2[0].evaluation !== undefined &&
                      mSkillWorkItem.mSkillsQuestion2[0].evaluation[0].rubricScores !== undefined
                        ? mSkillWorkItem.mSkillsQuestion2[0].evaluation[0].rubricScores[0].score[0]
                            .teacherScore
                        : []
                    }
                    buttonChange={this.buttonChange}
                    submitDate={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined
                        ? mSkillWorkItem.$.dateSubmitted
                        : ''
                    }
                    testResults={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined
                        ? mSkillWorkItem.testResults[0]
                        : ''
                    }
                    communityID={
                      this.props.inboxmodalcontainer.studentProgram.results.workItems[0]
                        .mSkillsWorkItem !== undefined
                        ? mSkillWorkItem.$.communityId
                        : ''
                    }
                  />
                </TabPanel>
              )}
          </Tabs>
        </div>
        <div
          className="skill-assestment-overallscore"
          style={scoreShow}
          ref={scorenode => (this.scorenode = scorenode)}
        >
          <h3 className="skill-assestment-overallscore-data">Overall Score</h3>
          <button className="inbox-program-close-pop" onClick={this.scoreToggleClose}>
            x
          </button>
          <div className="skill-assestment-overallscore-info">
            <div className="skill-assestment-overallscore-information">
              <h4 className="skill-assestment-overallscore-info-points">
                0<br /> Needs Improvement
              </h4>
              <p className="skill-assestment-overallscore-info-exp">
                The student demonstrates inconsistent or no understanding of interpreting the
                meaning of products in an equal groups problem. The student answers no part
                correctly.
              </p>
            </div>
            <div className="skill-assestment-overallscore-information">
              <h4 className="skill-assestment-overallscore-info-points">
                1<br /> Average
              </h4>
              <p className="skill-assestment-overallscore-info-exp">
                The student demonstrates partial understanding of interpreting the meaning of
                products in an equal groups problem. The student answer either Part A or Part B
                incorrectly and does not provide reasonable explanations.
              </p>
            </div>
            <div className="skill-assestment-overallscore-information">
              <h4 className="skill-assestment-overallscore-info-points">
                2<br /> Good
              </h4>
              <p className="skill-assestment-overallscore-info-exp">
                The Student demonstrates good understanding of interpreting the meaning of products
                in an equal groups problem. The student answers Part A and B correctly but does not
                provide reasonable explanations.
              </p>
            </div>
            <div className="skill-assestment-overallscore-information">
              <h4 className="skill-assestment-overallscore-info-points">
                3<br /> Excellent
              </h4>
              <p className="skill-assestment-overallscore-info-exp">
                The Student demonstrates a thorough understanding of interpreting the meaning of
                products in an equal groups problem. The student answers Parts A and B correctly and
                provides reasonable explanations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SkillsAssestments.propTypes = {
  inboxmodalcontainer: PropTypes.object,
  profileUserId: PropTypes.string,
  storeData: PropTypes.func.isRequired,
  showWarning: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  communityId: PropTypes.string,
};

export default SkillsAssestments;
