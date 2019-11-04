/**
 *
 * Read180StudentWork
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Read180Swcr1 from 'components/Read180Swcr1';
import Read180Swcr2 from 'components/Read180Swcr2';
import Read180Swew from 'components/Read180Swew';
import * as Constants from './constants';
import './Read180StudentWork.scss';

class Read180StudentWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: false,
      tabIndex: '',
      lastIndex: '',
      alert: false,
      saveWarningModal: false,
      saveClass: false,
      postComment: '',
      postScore: '',
      scoreShown: false,
      overShown: false,
      type: '',
      rubricType: '',
      data: {},
      readSW1: {
        score: '',
        comment: '',
        responseType1: '',
        rubricType1: '',
      },
      readSW2: {
        score: '',
        comment: '',
        responseType2: '',
        rubricType2: '',
      },
      readSW3: {
        score: '',
        comment: '',
        responseType3: '',
        rubricType3: '',
      },
    };
  }
  componentDidMount() {
    if (
      this.props.readStudentWork180Data &&
      this.props.readStudentWork180Data.results !== undefined &&
      this.props.readStudentWork180Data.results.workItems !== undefined &&
      this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem !== undefined
    ) {
      const data = this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem[0];
      this.updateData(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.readStudentWork180Data &&
      nextProps.readStudentWork180Data.results &&
      nextProps.readStudentWork180Data.results.workItems &&
      nextProps.readStudentWork180Data.results.workItems[0].rSkillsWorkItem
    ) {
      const data = nextProps.readStudentWork180Data.results.workItems[0].rSkillsWorkItem[0];
      this.updateData(data);
    }
  }

  updateData = data => {
    if (
      data.openResponse1Submission &&
      data.openResponse1Submission[0].evaluation &&
      data.openResponse1Submission[0].evaluation[0].rubricScores &&
      data.openResponse1Submission[0].evaluation[0].rubricScores[0].score &&
      data.openResponse1Submission[0].evaluation[0].rubricScores[0].score[0]
    ) {
      const responseType1 = data.openResponse1Submission[0].evaluation[0].$.submissionType;
      const rubricType1 = data.openResponse1Submission[0].evaluation[0].$.rubricType;
      const sw1Score =
        data.openResponse1Submission[0].evaluation[0].rubricScores[0].score[0].teacherScore[0];
      const sw1Comment =
        data.openResponse1Submission[0].evaluation[0].comment &&
        data.openResponse1Submission[0].evaluation[0].comment[0];
      const readSW1 = { ...this.state.readSW1 };
      readSW1.score = sw1Score;
      readSW1.comment = sw1Comment;
      readSW1.responseType1 = responseType1;
      readSW1.rubricType1 = rubricType1;
      this.setState({
        readSW1,
      });
    }
    if (
      data.openResponse2Submission &&
      data.openResponse2Submission[0].evaluation &&
      data.openResponse2Submission[0].evaluation[0].rubricScores &&
      data.openResponse2Submission[0].evaluation[0].rubricScores[0].score &&
      data.openResponse2Submission[0].evaluation[0].rubricScores[0].score[0]
    ) {
      const responseType2 = data.openResponse2Submission[0].evaluation[0].$.submissionType;
      const rubricType2 = data.openResponse2Submission[0].evaluation[0].$.rubricType;
      const sw2Score =
        data.openResponse2Submission[0].evaluation[0].rubricScores[0].score[0].teacherScore[0];
      const sw2Comment =
        data.openResponse2Submission[0].evaluation[0].comment &&
        data.openResponse2Submission[0].evaluation[0].comment[0];
      const readSW2 = { ...this.state.readSW2 };
      readSW2.score = sw2Score;
      readSW2.comment = sw2Comment;
      readSW2.responseType2 = responseType2;
      readSW2.rubricType2 = rubricType2;
      this.setState({
        readSW2,
      });
    }
    if (
      data.writingPromptSubmission &&
      data.writingPromptSubmission[0].evaluation &&
      data.writingPromptSubmission[0].evaluation[0].rubricScores &&
      data.writingPromptSubmission[0].evaluation[0].rubricScores[0].score &&
      data.writingPromptSubmission[0].evaluation[0].rubricScores[0].score[0]
    ) {
      const responseType3 = data.writingPromptSubmission[0].evaluation[0].$.submissionType;
      const rubricType3 = data.writingPromptSubmission[0].evaluation[0].$.rubricType;
      const sw3Score =
        data.writingPromptSubmission[0].evaluation[0].rubricScores[0].score[0].teacherScore[0];
      const sw3Comment =
        data.writingPromptSubmission[0].evaluation[0].comment &&
        data.writingPromptSubmission[0].evaluation[0].comment[0];
      const readSW3 = { ...this.state.readSW3 };
      readSW3.score = sw3Score;
      readSW3.comment = sw3Comment;
      readSW3.responseType3 = responseType3;
      readSW3.rubricType3 = rubricType3;
      this.setState({
        readSW3,
      });
    }
    this.setState({
      data,
    });
  };
  gradePercent = () => {
    const data =
      this.props.readStudentWork180Data.results &&
      this.props.readStudentWork180Data.results.workItems &&
      this.props.readStudentWork180Data.results.workItems[0] &&
      this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem[0];
    if (
      data &&
      data.multichoiceResults &&
      data.multichoiceResults[0].correct &&
      data.multichoiceResults[0].correct[0] !== '' &&
      data &&
      data.multichoiceResults &&
      data.multichoiceResults[0].correct &&
      data.multichoiceResults[0].total[0] !== ''
    ) {
      const gPercent =
        Number(data.multichoiceResults[0].correct[0]) /
        Number(data.multichoiceResults[0].total[0]) *
        100;
      const average = Math.round(gPercent);
      return average;
    }
    return data;
  };
  saveAssignment = () => {
    this.setState({
      saveWarningModal: true,
      saveClass: false,
      alert: false,
    });
    this.props.savePostAssesment(
      this.state.type,
      this.state.rubricType,
      this.state.postComment,
      this.state.postScore
    );
  };
  alertBox = () => {
    if (this.state.saveClass) {
      this.setState({
        alert: !this.state.alert,
      });
    }
  };

  scoreToggle = () => {
    this.setState({
      scoreShown: true,
    });
  };
  scoreToggleClose = () => {
    this.setState({ scoreShown: false });
  };
  overToggle = () => {
    this.setState({
      overShown: true,
    });
  };
  overToggleClose = () => {
    this.setState({ overShown: false });
  };

  savewarningModalClose = () => {
    this.setState({
      saveWarningModal: false,
      alert: false,
      saveClass: false,
    });
  };
  withooutSavewarningModalCancel = () => {
    this.setState({
      saveWarningModal: false,
      alert: false,
      saveClass: false,
    });
  };
  savewarningModalCancel = () => {
    this.setState({
      saveWarningModal: false,
      alert: false,
      saveClass: false,
      cancel: true,
    });
  };
  savewarningModalProceed = () => {
    this.setState({
      saveWarningModal: false,
    });
  };
  saveColor = (type, rubricType, postScore, postComment) => {
    if (type === Constants.READ180_OPEN_RESPONSE_ONE) {
      const readSW1 = { ...this.state.readSW1 };
      readSW1.score = postScore;
      readSW1.comment = postComment;
      this.setState({ readSW1 });
    }
    if (type === Constants.READ180_OPEN_RESPONSE_TWO) {
      const readSW2 = { ...this.state.readSW2 };
      readSW2.score = postScore;
      readSW2.comment = postComment;
      this.setState({ readSW2 });
    }
    if (type === Constants.READ180_WRITING_PROMPT) {
      const readSW3 = { ...this.state.readSW3 };
      readSW3.score = postScore;
      readSW3.comment = postComment;
      this.setState({ readSW3 });
    }
    this.setState({ postComment, postScore, saveClass: true, type, rubricType });
  };

  print = () => {
    window.print();
  };

  render() {
    const scoreShow = {
      display: this.state.scoreShown ? 'block' : 'none',
    };
    const overShow = { display: this.state.overShown ? 'block' : 'none' };

    const read180saveclass = ['button-save'];
    if (this.state.saveClass) {
      read180saveclass.push('print-read180ng-modal-button-save-blue');
    }

    return (
      <div>
        <div>
          <div className="read180-student-work-centerpanel">
            <div className="read180-student-work--show-label-quiz-list--purple">
              <div>{this.props.data && this.props.data.row && this.props.data.row.student}</div>
              <button className="button-close" onClick={this.props.handleCancel}>
                X
              </button>
            </div>
            {this.props.readStudentWork180Data &&
              this.props.readStudentWork180Data.results !== undefined &&
              this.props.readStudentWork180Data.results.workItems !== undefined &&
              this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem !==
                undefined && (
                <div className="read180-student-work-title">
                  rSkills College & Carrer . Workshop .{
                    this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem[0]
                      .workshop[0]
                  }
                  <a
                    className="read180-student-work-title-link"
                    href="https://h511000002.education.scholastic.com/rtng/extensions/sample_pdfs/rSkillsTests_A_1a.pdf"
                  >
                    {
                      this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem[0]
                        .testName[0]
                    }
                  </a>
                  <span className="read180-student-work-title-right ">
                    Date of Test:{' '}
                    {moment(
                      this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem[0].$
                        .dateSubmitted
                    ).format('MM/DD/YYYY')}{' '}
                    score :{this.gradePercent()}% ({this.props.readStudentWork180Data.results
                      .workItems[0].rSkillsWorkItem[0].multichoiceResults &&
                      this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem[0]
                        .multichoiceResults[0].correct[0]}/{this.props.readStudentWork180Data
                      .results.workItems[0].rSkillsWorkItem[0].multichoiceResults &&
                      this.props.readStudentWork180Data.results.workItems[0].rSkillsWorkItem[0]
                        .multichoiceResults[0].total[0]}){' '}
                  </span>
                </div>
              )}

            <div className="tab-bar book-nav-bar">
              <div className="nav-bar__container book-nav-container">
                <Tabs>
                  <TabList className="read180-tabs-list">
                    <Tab>Constructed Response1</Tab>
                    <Tab>Constructed Response2</Tab>
                    <Tab>Extended Writing</Tab>
                  </TabList>
                  <TabPanel>
                    <Read180Swcr1
                      unMountChild={this.alertBox}
                      read180Swcr1={this.state.data}
                      comments={this.state.readSW1.comment}
                      score={this.state.readSW1.score}
                      saveColor={this.saveColor}
                      overallScore={this.scoreToggle}
                      response={this.state.readSW1.responseType1}
                      rubricType={this.state.readSW1.rubricType1}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Read180Swcr2
                      unMountChild={this.alertBox}
                      read180Swcr2={this.state.data}
                      comments={this.state.readSW2.comment}
                      score={this.state.readSW2.score}
                      saveColor={this.saveColor}
                      overallScore={this.scoreToggle}
                      response={this.state.readSW2.responseType2}
                      rubricType={this.state.readSW2.rubricType2}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Read180Swew
                      unMountChild={this.alertBox}
                      read180Swew={this.state.data}
                      comments={this.state.readSW3.comment}
                      score={this.state.readSW3.score}
                      saveColor={this.saveColor}
                      overLink={this.overToggle}
                      response={this.state.readSW3.responseType3}
                      rubricType={this.state.readSW3.rubricType3}
                    />
                  </TabPanel>
                </Tabs>
              </div>
            </div>

            <div className="print-custom-booklabel__buttons">
              <button className="button-print" onClick={this.print}>
                Print
              </button>
              <button className="button-cancel" onClick={this.props.handleCancel}>
                Cancel
              </button>

              <button
                className={read180saveclass.join(' ')}
                onClick={this.state.saveClass ? this.saveAssignment : undefined}
              >
                Save
              </button>
              <div>
                <center />
              </div>
              <div className="simulation-program-overall-score" style={scoreShow}>
                <h3 className="simulation-program-overall-score-head">Overall Score</h3>
                <button className="inbox-program-close-pop" onClick={this.scoreToggleClose}>
                  x
                </button>
                <div className="simulation-program-overall-score-info">
                  <div className="simulation-program-col-sm-4">
                    <h4 className="simulation-program-col-body">
                      0<br /> Not Attempted
                    </h4>
                    <p className="simulation-program-col-p">
                      Response needs supporting explation for claims.
                    </p>
                  </div>
                  <div className="simulation-program-col-sm-4">
                    <h4 className="simulation-program-col-body">
                      1<br /> Partially Attempted
                    </h4>
                    <p className="simulation-program-col-p">
                      Response includes one supporting explainations.
                    </p>
                  </div>
                  <div className="simulation-program-col-sm-4">
                    <h4 className="simulation-program-col-body">
                      2<br /> Complete
                    </h4>
                    <p className="simulation-program-col-p">
                      Response includes atleast two supporting explainations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="skill-assestment-overallscore" style={overShow}>
                <h3 className="skill-assestment-overallscore-data">Overall Score</h3>
                <button className="inbox-program-close-pop" onClick={this.overToggleClose}>
                  x
                </button>
                <div className="skill-assestment-overallscore-info">
                  <div className="skill-assestment-overallscore-information">
                    <h4 className="skill-assestment-overallscore-info-points">
                      1<br /> Needs Improvement
                    </h4>
                    <p className="skill-assestment-overallscore-info-exp">
                      The student demonstrates inconsistent or no understanding of interpreting the
                      meaning of products in an equal groups problem. The student answers no part
                      correctly.
                    </p>
                  </div>
                  <div className="skill-assestment-overallscore-information">
                    <h4 className="skill-assestment-overallscore-info-points">
                      2<br /> Average
                    </h4>
                    <p className="skill-assestment-overallscore-info-exp">
                      The student demonstrates partial understanding of interpreting the meaning of
                      products in an equal groups problem. The student answer either Part A or Part
                      B incorrectly and does not provide reasonable explanations.
                    </p>
                  </div>
                  <div className="skill-assestment-overallscore-information">
                    <h4 className="skill-assestment-overallscore-info-points">
                      3<br /> Good
                    </h4>
                    <p className="skill-assestment-overallscore-info-exp">
                      The Student demonstrates good understanding of interpreting the meaning of
                      products in an equal groups problem. The student answers Part A and B
                      correctly but does not provide reasonable explanations.
                    </p>
                  </div>
                  <div className="skill-assestment-overallscore-information">
                    <h4 className="skill-assestment-overallscore-info-points">
                      4<br /> Excellent
                    </h4>
                    <p className="skill-assestment-overallscore-info-exp">
                      The Student demonstrates a thorough understanding of interpreting the meaning
                      of products in an equal groups problem. The student answers Parts A and B
                      correctly and provides reasonable explanations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {}
        <SAMModal isOpen={this.state.alert} modalClassModifier="modal--savescreen-warning-alert">
          <div className="modal--savewrapper-heading">Warning </div>
          <div className="modal--savewrapper-warning">
            you have unsaved changes.Do you want to leave this screen without saving them?
            <div className="read180ngsave-innerpage-button">
              <SAMButton isPrimaryButton onClickHandler={this.savewarningModalClose}>
                OK
              </SAMButton>
              <SAMButton onClickHandler={this.withooutSavewarningModalCancel}> Cancel </SAMButton>
            </div>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.state.saveWarningModal}
          modalClassModifier="modal--savescreen-warning"
        >
          <div className="modal--savewrapper-heading"> </div>
          <div className="modal--savewrapper-warning">
            Assignment Updated
            <div className="read180ngsave-innerpage-button">
              <SAMButton onClickHandler={this.savewarningModalClose}> OK </SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

Read180StudentWork.propTypes = {
  readStudentWork180Data: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  savePostAssesment: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default Read180StudentWork;
