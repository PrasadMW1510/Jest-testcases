/**
 *
 * RespondWrite
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import moment from 'moment';
import SystemRecordingPopUp from 'components/SystemRecordingPopUp';
import './RespondWrite.scss';
import * as Constants from './constants';

class RespondWrite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUptableData: '',
      comment: '',
      teacherScore1: '',
      teacherScore2: '',
      teacherScore3: '',
      teacherScore4: '',
      teacherScore5: '',
      studentScore1: '',
      studentScore2: '',
      studentScore3: '',
      studentScore4: '',
      currentIndex: '0',
      showPopUp: false,
      popUpType: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    const stateArr = {};
    if (nextProps.data.respondWrite) {
      if (
        nextProps.data.respondWrite.respondWriteSubmission &&
        nextProps.data.respondWrite.respondWriteSubmission[0].evaluation[0].rubricScores[0].score
          .length > 0
      ) {
        nextProps.data.respondWrite.respondWriteSubmission[0].evaluation[0].rubricScores[0].score.map(
          item => {
            const rubricName = item.$.rubricOrder;
            const titleName = `${'teacherScore'}${rubricName}`;
            const studentName = `${'studentScore'}${rubricName}`;
            const studentScore = item.selfScore ? item.selfScore[0] : '-';
            const teacherScoreVal = item.teacherScore ? item.teacherScore[0] : '0';
            Object.assign(
              stateArr,
              { [titleName]: teacherScoreVal },
              { [studentName]: studentScore }
            );
            return true;
          }
        );
        const commentData = nextProps.data.respondWrite.respondWriteSubmission[0].evaluation[0]
          .comment
          ? nextProps.data.respondWrite.respondWriteSubmission[0].evaluation[0].comment[0]
          : '';
        Object.assign(
          stateArr,
          { comment: commentData },
          { currentIndex: this.props.currentIndex }
        );
        this.setState(stateArr);
      } else if (
        nextProps.data.respondWrite.writingActivitySubmission &&
        nextProps.data.respondWrite.writingActivitySubmission[0].evaluation[0].rubricScores[0].score
          .length > 0
      ) {
        nextProps.data.respondWrite.writingActivitySubmission[0].evaluation[0].rubricScores[0].score.map(
          item => {
            const rubricName = item.$.rubricOrder;
            const titleName = `${'teacherScore'}${rubricName}`;
            const studentName = `${'studentScore'}${rubricName}`;
            const studentScore = item.selfScore ? item.selfScore[0] : '-';
            const teacherScoreVal = item.teacherScore ? item.teacherScore[0] : '0';
            Object.assign(
              stateArr,
              { [titleName]: teacherScoreVal },
              { [studentName]: studentScore }
            );
            return true;
          }
        );
        const commentData = nextProps.data.respondWrite.writingActivitySubmission[0].evaluation[0]
          .comment
          ? nextProps.data.respondWrite.writingActivitySubmission[0].evaluation[0].comment[0]
          : '';
        Object.assign(
          stateArr,
          { comment: commentData },
          { currentIndex: this.props.currentIndex }
        );
        this.setState(stateArr);
      }
    }
  }
  componentWillUnmount() {
    this.setState({
      comment: '',
      teacherScore1: '',
      teacherScore2: '',
      teacherScore3: '',
      teacherScore4: '',
      teacherScore5: '',
      studentScore1: '',
      studentScore2: '',
      studentScore3: '',
      studentScore4: '',
    });
  }

  handlePrevious = e => {
    e.preventDefault();
    if (this.state.currentIndex === 0) {
      return;
    }
    const prevRow = this.props.tempGridData[this.state.currentIndex - 1];
    this.setState({
      currentIndex: this.state.currentIndex - 1,
    });
    this.props.dispatchAction(prevRow, this.state.currentIndex);
  };

  handleNext = e => {
    e.preventDefault();
    if (this.state.currentIndex === this.props.tempGridData.length - 1) {
      return;
    }
    const nextRow = this.props.tempGridData[this.state.currentIndex + 1];
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
    this.props.dispatchAction(nextRow, this.state.currentIndex);
  };

  handleCancel = () => {
    this.props.hideCancel();
  };
  handlePrint = () => {
    window.print();
  };
  saveResponseModal = () => {
    this.props.saveRespondData(this.state);
  };
  updateComment = event => {
    this.setState({ comment: event.target.value });
  };
  scoreToggleClose = () => {
    this.setState({ showPopUp: false });
  };
  handlePopupOpen = popupType => {
    const popupTitle = popupType.target.getAttribute('value');
    const popTableData = Constants.popUpText[popupTitle];
    this.setState({ popUptableData: popTableData, showPopUp: true, popUpType: popupTitle });
  };
  addRubric = event => {
    const rubricName = event.target.getAttribute('name');
    const rubricValue = event.target.getAttribute('value');
    switch (rubricName) {
      case 'teacherScore1':
        this.setState({ teacherScore1: rubricValue });
        break;
      case 'teacherScore2':
        this.setState({ teacherScore2: rubricValue });
        break;
      case 'teacherScore3':
        this.setState({ teacherScore3: rubricValue });
        break;
      case 'teacherScore4':
        this.setState({ teacherScore4: rubricValue });
        break;
      case 'teacherScore5':
        this.setState({ teacherScore5: rubricValue });
        break;
      default:
        break;
    }
  };

  render() {
    const { isOpen } = this.props;
    let dataContent = '';
    let topicSentence = '';
    let rubricTitle1 = '';
    let rubricTitle2 = '';
    let rubricTitle3 = '';
    let rubricTitle4 = '';
    if (
      this.props.data &&
      this.props.data.community_id &&
      this.props.data.community_id === Constants.S44NG
    ) {
      dataContent = this.props.data.respondWrite.writingActivitySubmission;
      topicSentence = dataContent[0].draftResponse[0].topicSentence[0].fixedText1[0];
      rubricTitle1 = Constants.TEXT_EVIDENCE;
      rubricTitle2 = Constants.PUNCTUATION;
      rubricTitle3 = Constants.SPELLING;
      rubricTitle4 = '';
    } else if (
      this.props.data &&
      this.props.data.community_id &&
      this.props.data.community_id === Constants.R180NG
    ) {
      dataContent = this.props.data.respondWrite.respondWriteSubmission;
      topicSentence = dataContent[0].draftResponse[0].topicSentence[0];
      rubricTitle1 = Constants.STRONG_REASONS;
      rubricTitle2 = Constants.PRECISE_WORDS;
      rubricTitle3 = Constants.COMPLETE_SENTENCES;
      rubricTitle4 = Constants.CORRECT_SPELLING;
    }
    moment.locale('en');
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="iread__modal--showmodal"
        >
          <div className="iread-modal__list--wrapper">
            <div className="iread-modal__list--purple">
              <div className="iread-modal__show--heading">{this.props.data.stundentName}</div>
              <div>
                <button className="iread-modal__button-close" onClick={this.handleCancel}>
                  X
                </button>
              </div>
            </div>

            <div className="iread-modal__show--title">
              {this.props.data &&
              this.props.data.community_id &&
              this.props.data.community_id === 'S44NG' ? (
                <div className="iread-modal__show--name">
                  System 44 Next Generation . {this.props.data.assignmentName} .
                  {this.props.data.respondWrite.seriesNumber &&
                    this.props.data.respondWrite.seriesNumber[0]}
                  .
                  {this.props.data.respondWrite.topicNumber &&
                    this.props.data.respondWrite.topicNumber[0]}
                  .
                  {this.props.data.respondWrite.passage && this.props.data.respondWrite.passage[0]}
                </div>
              ) : (
                <div className="iread-modal__show--name">
                  Read 180 Next Generation . {this.props.data.assignmentName} .
                  {this.props.data.respondWrite.topicNumber &&
                    this.props.data.respondWrite.topicNumber[0]}
                  .
                  {this.props.data.respondWrite.segmentNumber &&
                    this.props.data.respondWrite.segmentNumber[0]}
                  .
                  {this.props.data.respondWrite.topicTitle &&
                    this.props.data.respondWrite.topicTitle[0]}
                  .
                  {this.props.data.respondWrite.segmentTitle &&
                    this.props.data.respondWrite.segmentTitle[0]}
                  Level {this.props.data.respondWrite.$ && this.props.data.respondWrite.$.level}
                </div>
              )}
            </div>
            <div className="iread-modal__full--width">
              <div className="iread-modal__half--width">
                <div className="s44">
                  <div className="iread-modal__student--box">
                    <div className="iread-modal__description--title">Prompt</div>
                  </div>
                </div>
                <div className="iread-modal__assignment-roster--textarea">
                  <div className="iread-modal__assignment-roster-div--headers">
                    <div className="iread-modal__assignment--mesg">
                      {dataContent && dataContent[0].prompt}
                    </div>

                    <div />
                  </div>
                </div>

                <div className="s44">
                  <div className="iread-modal__student--box">
                    <div className="iread-modal__description--title">Response</div>
                  </div>
                </div>
                <div className="iread-modal__assignment-roster--textarea">
                  <div className="iread-modal__assignment-roster-div--headers">
                    <div className="iread-modal__assignment--mesg">
                      Draft: <br />
                      [Topic Sentence] {dataContent && topicSentence} <br />
                      [Supporting Detail 1]
                      {dataContent &&
                        dataContent[0] &&
                        dataContent[0].draftResponse &&
                        dataContent[0].draftResponse[0] &&
                        dataContent[0].draftResponse[0].supportingDetail1 &&
                        dataContent[0].draftResponse[0].supportingDetail1[0] &&
                        dataContent[0].draftResponse[0].supportingDetail1[0].fixedText1[0]}
                      <a className="iread-modal__assignment-mesg--a" disabled tabIndex="-1">
                        {dataContent &&
                          dataContent[0] &&
                          dataContent[0].draftResponse &&
                          dataContent[0].draftResponse[0] &&
                          dataContent[0].draftResponse[0].supportingDetail1 &&
                          dataContent[0].draftResponse[0].supportingDetail1[0] &&
                          dataContent[0].draftResponse[0].supportingDetail1[0].studentResponse1[0]}
                      </a>
                      <br />
                      [Supporting Detail 2]
                      {dataContent &&
                        dataContent[0] &&
                        dataContent[0].draftResponse &&
                        dataContent[0].draftResponse[0] &&
                        dataContent[0].draftResponse[0].supportingDetail2 &&
                        dataContent[0].draftResponse[0].supportingDetail2[0] &&
                        dataContent[0].draftResponse[0].supportingDetail2[0].fixedText1[0]}
                      <a className="iread-modal__assignment-mesg--a" disabled tabIndex="-1">
                        {dataContent &&
                          dataContent[0] &&
                          dataContent[0].draftResponse &&
                          dataContent[0].draftResponse[0] &&
                          dataContent[0].draftResponse[0].supportingDetail2 &&
                          dataContent[0].draftResponse[0].supportingDetail2[0] &&
                          dataContent[0].draftResponse[0].supportingDetail2[0].studentResponse1[0]}
                      </a>
                      <br />
                      [conclusion]
                      {dataContent &&
                        dataContent[0] &&
                        dataContent[0].draftResponse &&
                        dataContent[0].draftResponse[0] &&
                        dataContent[0].draftResponse[0].conclusion &&
                        dataContent[0].draftResponse[0].conclusion[0] &&
                        dataContent[0].draftResponse[0].conclusion[0].fixedText1[0]}
                      <a className="iread-modal__assignment-mesg--a" disabled tabIndex="-1">
                        {dataContent &&
                          dataContent[0] &&
                          dataContent[0].draftResponse &&
                          dataContent[0].draftResponse[0] &&
                          dataContent[0].draftResponse[0].conclusion &&
                          dataContent[0].draftResponse[0].conclusion[0] &&
                          dataContent[0].draftResponse[0].conclusion[0].studentResponse1[0]}
                      </a>
                    </div>
                    <div className="iread-modal__assignment--mesg">
                      Published:
                      <span>
                        <button className="print-system44__modal-button-second--pdf">
                          Print PDF
                        </button>
                      </span>
                      <br />
                      {dataContent &&
                        dataContent[0].publishedResponse &&
                        dataContent[0].publishedResponse[0]}
                    </div>
                    <div className="iread-modal__assignment--mesg">
                      Date of Submission:
                      {this.props.data.respondWrite.$ &&
                        moment(new Date(this.props.data.respondWrite.$.dateSubmitted)).format(
                          'MM/DD/YYYY'
                        )}
                      Number of Sessions: {dataContent && dataContent[0].numberOfSessions[0]}
                    </div>

                    <div />
                  </div>
                </div>
              </div>
              <div className="extended-writing__block--two1">
                <div className="extended-writing__block--titl">
                  4-Point Rubric :
                  <span className="extended-writing__block-right--title">Student Self check</span>
                </div>
                <div className="extended-writing__block-scrl--two">
                  <div>
                    <a
                      role="button"
                      className="extended-writing__block-scrl-two--a"
                      onClick={event => {
                        this.handlePopupOpen(event);
                      }}
                      value={rubricTitle1}
                      disabled
                      tabIndex="-1"
                    >
                      {rubricTitle1}
                    </a>
                    <span className="extended-writing__pull--right1">
                      <span
                        className={`valu1 ${this.state.teacherScore1 === '1' ? 'active' : ''}`}
                        name="teacherScore1"
                        value="1"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        1
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore1 === '2' ? 'active' : ''}`}
                        name="teacherScore1"
                        value="2"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        2
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore1 === '3' ? 'active' : ''}`}
                        name="teacherScore1"
                        value="3"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        3
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore1 === '4' ? 'active' : ''}`}
                        name="teacherScore1"
                        value="4"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        4
                      </span>
                    </span>
                  </div>
                  <div>
                    <a
                      role="button"
                      className="extended-writing__block-scrl-two--a"
                      value={rubricTitle2}
                      disabled
                      onClick={event => {
                        this.handlePopupOpen(event);
                      }}
                      tabIndex="-1"
                    >
                      {rubricTitle2}
                    </a>
                    <span className="extended-writing__pull--right1">
                      <span
                        className={`valu1 ${this.state.teacherScore2 === '1' ? 'active' : ''}`}
                        name="teacherScore2"
                        value="1"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        1
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore2 === '2' ? 'active' : ''}`}
                        name="teacherScore2"
                        value="2"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        2
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore2 === '3' ? 'active' : ''}`}
                        name="teacherScore2"
                        value="3"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        3
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore2 === '4' ? 'active' : ''}`}
                        name="teacherScore2"
                        value="4"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        4
                      </span>
                    </span>
                  </div>
                  <div>
                    <a
                      className="extended-writing__block-scrl-two--a"
                      disabled
                      role="button"
                      value={rubricTitle3}
                      onClick={event => {
                        this.handlePopupOpen(event);
                      }}
                      tabIndex="-1"
                    >
                      {rubricTitle3}
                    </a>
                    <span className="extended-writing__pull--right1">
                      <span
                        className={`valu1 ${this.state.teacherScore3 === '1' ? 'active' : ''}`}
                        name="teacherScore3"
                        value="1"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        1
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore3 === '2' ? 'active' : ''}`}
                        name="teacherScore3"
                        value="2"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        2
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore3 === '3' ? 'active' : ''}`}
                        name="teacherScore3"
                        value="3"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        3
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore3 === '4' ? 'active' : ''}`}
                        name="teacherScore3"
                        value="4"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        4
                      </span>
                    </span>
                  </div>
                  {rubricTitle4 ? (
                    <div>
                      <a
                        className="extended-writing__block-scrl-two--a"
                        disabled
                        role="button"
                        value={rubricTitle4}
                        onClick={event => {
                          this.handlePopupOpen(event);
                        }}
                        tabIndex="-1"
                      >
                        {rubricTitle4}
                      </a>
                      <span className="extended-writing__pull--right1">
                        <span
                          className={`valu1 ${this.state.teacherScore4 === '1' ? 'active' : ''}`}
                          name="teacherScore4"
                          value="1"
                          role="button"
                          tabIndex="-1"
                          onClick={event => {
                            this.addRubric(event);
                          }}
                        >
                          1
                        </span>
                        <span
                          className={`valu1 ${this.state.teacherScore4 === '2' ? 'active' : ''}`}
                          name="teacherScore4"
                          value="2"
                          role="button"
                          tabIndex="-1"
                          onClick={event => {
                            this.addRubric(event);
                          }}
                        >
                          2
                        </span>
                        <span
                          className={`valu1 ${this.state.teacherScore4 === '3' ? 'active' : ''}`}
                          name="teacherScore4"
                          value="3"
                          role="button"
                          tabIndex="-1"
                          onClick={event => {
                            this.addRubric(event);
                          }}
                        >
                          3
                        </span>
                        <span
                          className={`valu1 ${this.state.teacherScore4 === '4' ? 'active' : ''}`}
                          name="teacherScore4"
                          value="4"
                          role="button"
                          tabIndex="-1"
                          onClick={event => {
                            this.addRubric(event);
                          }}
                        >
                          4
                        </span>
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                  <div>
                    <a className="extended-writing__block-scrl-two--a" disabled tabIndex="-1">
                      overAll Score
                    </a>
                    <span className="extended-writing__pull--right1">
                      <span
                        className={`valu1 ${this.state.teacherScore5 === '1' ? 'active' : ''}`}
                        name="teacherScore5"
                        value="1"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        1
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore5 === '2' ? 'active' : ''}`}
                        name="teacherScore5"
                        value="2"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        2
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore5 === '3' ? 'active' : ''}`}
                        name="teacherScore5"
                        value="3"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        3
                      </span>
                      <span
                        className={`valu1 ${this.state.teacherScore5 === '4' ? 'active' : ''}`}
                        name="teacherScore5"
                        value="4"
                        role="button"
                        tabIndex="-1"
                        onClick={event => {
                          this.addRubric(event);
                        }}
                      >
                        4
                      </span>
                    </span>
                  </div>
                </div>
                <div className="vl">
                  <div className="align-center">{this.state.studentScore1}</div>
                  <div className="align-center">{this.state.studentScore2}</div>
                  <div className="align-center">{this.state.studentScore3}</div>
                  {rubricTitle4 ? (
                    <div className="align-center">{this.state.studentScore4}</div>
                  ) : (
                    ''
                  )}
                  <div className="align-center">{this.state.studentScore5}</div>
                </div>
              </div>

              <div className="extended-writing__block--two2">
                <div className="extended-writing__block--titl">Comments</div>
                <div className="iread-modal__assignment-roster--textarea1">
                  <textarea
                    cols="60"
                    rows="18"
                    onChange={event => {
                      this.updateComment(event);
                    }}
                    value={this.state.comment}
                  >
                    {this.state.comment}
                  </textarea>
                </div>
              </div>

              <div className="print-activate__quiz--buttons">
                <div className="print-activate-quiz__primary--button">
                  <div className="print-system44-modal__buttons--firstset2">
                    <button
                      className="print-system44__modal-button-first--set print-system44__modal-button--print"
                      onClick={this.handlePrint}
                    >
                      Print
                    </button>
                    <button
                      className="print-system44__modal-button-first--set print-system44__modal-button--cancel"
                      onClick={this.handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="print-system44__modal-button-second--set print-system44__modal-button--save"
                      onClick={this.saveResponseModal}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="print-system44-modal__buttons-firstset--pager">
              <div className="pager">
                <div className="pager-prev">
                  <a className="previous" href="" onClick={this.handlePrevious}>
                    &lt;
                  </a>
                </div>
                <div className="pager-nor"> {this.state.currentIndex} </div>
                <div className="pager-nor"> of </div>
                <div className="pager-nor"> {this.props.tempGridData.length} </div>
                <div className="pager-prev">
                  <a className="previous" href="" onClick={this.handleNext}>
                    &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
          {this.state.showPopUp ? (
            <SystemRecordingPopUp
              tableData={this.state.popUptableData}
              popUpType={this.state.popUpType}
              scoreToggleClose={this.scoreToggleClose}
            />
          ) : null}
        </SAMModal>
      </div>
    );
  }
}

RespondWrite.propTypes = {
  data: PropTypes.any,
  hideCancel: PropTypes.func.isRequired,
  saveRespondData: PropTypes.func.isRequired,
  isOpen: PropTypes.any,
  currentIndex: PropTypes.number,
  tempGridData: PropTypes.array,
  dispatchAction: PropTypes.func.isRequired,
};

export default RespondWrite;
