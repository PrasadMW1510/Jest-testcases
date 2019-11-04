/**
 *
 * Math180SkillsQuestions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import moment from 'moment';
import * as Constants from './constants';

class Math180SkillsQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      rubicScoreValue: '',
    };
  }
  scoreChange = (item, qNumber, e) => {
    this.setState({ rubicScoreValue: e.target.value });
    this.props.buttonChange(item, qNumber, e);
  };

  rubicScoreSelection = teachScore => {
    const score = ['inbox-program-value'];

    if (
      teachScore === Constants.TEACHER_SCORE_1 &&
      ((this.props.rubicScore[0] === Constants.TEACHER_SCORE_1 &&
        this.state.rubicScoreValue === '') ||
        this.state.rubicScoreValue === Constants.TEACHER_SCORE_1)
    ) {
      score.push('active');
    }
    if (
      teachScore === Constants.TEACHER_SCORE_2 &&
      ((this.props.rubicScore[0] === Constants.TEACHER_SCORE_2 &&
        this.state.rubicScoreValue === '') ||
        this.state.rubicScoreValue === Constants.TEACHER_SCORE_2)
    ) {
      score.push('active');
    }
    if (
      teachScore === Constants.TEACHER_SCORE_3 &&
      ((this.props.rubicScore[0] === Constants.TEACHER_SCORE_3 &&
        this.state.rubicScoreValue === '') ||
        this.state.rubicScoreValue === Constants.TEACHER_SCORE_3)
    ) {
      score.push('active');
    }
    if (
      teachScore === Constants.TEACHER_SCORE_4 &&
      ((this.props.rubicScore[0] === Constants.TEACHER_SCORE_4 &&
        this.state.rubicScoreValue === '') ||
        this.state.rubicScoreValue === Constants.TEACHER_SCORE_4)
    ) {
      score.push('active');
    }

    return score;
  };

  visualImagePath() {
    let imgPath = '';
    if (this.props.communityID === Constants.VIUSAL_MODAL_M180) {
      imgPath = Constants.VISUAL_MODAL_M180_URL;
    } else {
      imgPath = Constants.VISUAL_MODAL_M180Y_URL;
    }
    return imgPath;
  }

  render() {
    const score0 = this.rubicScoreSelection(Constants.TEACHER_SCORE_1);
    const score1 = this.rubicScoreSelection(Constants.TEACHER_SCORE_2);
    const score2 = this.rubicScoreSelection(Constants.TEACHER_SCORE_3);
    const score3 = this.rubicScoreSelection(Constants.TEACHER_SCORE_4);
    const imgPath = this.visualImagePath();

    return (
      <div>
        <div className="inbox-program-col-sm-12 printblock">
          <div className="inbox-program-tabinr-col">
            <div className="inbox-program-block-one">
              <div className="inbox-program-tabinr-titl">Question :</div>
              <div className="inbox-program-block-scrl">
                {this.props.questionsData !== undefined &&
                  this.props.questionsData.data !== undefined &&
                  this.props.questionsData.data.problem[0].stem !== undefined && (
                    <span> {Parser(`${this.props.questionsData.data.problem[0].stem.text}`)} </span>
                  )}
                {this.props.questionsData !== undefined &&
                  this.props.questionsData.data !== undefined &&
                  this.props.questionsData.data.problem[0].parta !== undefined && (
                    <span> {Parser(`${this.props.questionsData.data.problem[0].parta.text}`)}</span>
                  )}
                {this.props.questionsData !== undefined &&
                  this.props.questionsData.data !== undefined &&
                  this.props.questionsData.data.problem[0].partb !== undefined && (
                    <span>{Parser(`${this.props.questionsData.data.problem[0].partb.text}`)}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="inbox-program-tabinr-col ">
            <div className="inbox-program-block-one">
              <div className="inbox-program-tabinr-titl">Visual Model :</div>
              <div className="inbox-program-block-scrl-visual">
                {this.props.questionsData !== undefined &&
                  this.props.questionsData.data !== undefined &&
                  this.props.questionsData.data.problem[0].stimulus !== undefined && (
                    <img
                      width="90%"
                      src={`${imgPath}${
                        this.props.questionsData.data.problem[0].stimulus.art.image
                      }`}
                      alt="visual model"
                    />
                  )}
                {this.props.questionsData !== undefined &&
                  this.props.questionsData.data !== undefined &&
                  this.props.questionsData.data.problem[0].stimulus === undefined && (
                    <span>
                      <b>No Visual Aid accompanies this question</b>
                    </span>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="inbox-program-tabinr-col ">
          <div className="inbox-program-block-one hideprint">
            <div className="inbox-program-tabinr-titl">Question :</div>
            <div className="inbox-program-block-scrl">
              {this.props.questionsData !== undefined &&
                this.props.questionsData.data !== undefined &&
                this.props.questionsData.data.problem[0].stem !== undefined && (
                  <span> {Parser(`${this.props.questionsData.data.problem[0].stem.text}`)} </span>
                )}
              {this.props.questionsData !== undefined &&
                this.props.questionsData.data !== undefined &&
                this.props.questionsData.data.problem[0].parta !== undefined && (
                  <span> {Parser(`${this.props.questionsData.data.problem[0].parta.text}`)}</span>
                )}
              {this.props.questionsData !== undefined &&
                this.props.questionsData.data !== undefined &&
                this.props.questionsData.data.problem[0].partb !== undefined && (
                  <span>{Parser(`${this.props.questionsData.data.problem[0].partb.text}`)}</span>
                )}
            </div>
          </div>
          <div className="inbox-program-block-one">
            <div className="inbox-program-tabinr-titl">Student Response :</div>
            <div className="inbox-program-block-scrltw">
              {this.props.mSkillsQuestionsData.answer}
            </div>
            <div className="inbox-program-block-date">
              Date of Submission:
              {moment(this.props.submitDate).format('MM/DD/YYYY')}
              <div className="pull-right2 testresult">
                Question 1-{this.props.testResults.total} - Score: {this.props.testResults.correct}/{
                  this.props.testResults.total
                }
              </div>
            </div>
          </div>
        </div>
        <div className="inbox-program-tabinr-col ">
          <div className="inbox-program-block-one hideprint">
            <div className="inbox-program-tabinr-titl">Visual Model :</div>
            <div className="inbox-program-block-scrl-visual">
              {this.props.questionsData !== undefined &&
                this.props.questionsData.data !== undefined &&
                this.props.questionsData.data.problem[0].stimulus !== undefined && (
                  <img
                    width="90%"
                    src={`${imgPath}${this.props.questionsData.data.problem[0].stimulus.art.image}`}
                    alt="visual model"
                  />
                )}
              {this.props.questionsData !== undefined &&
                this.props.questionsData.data !== undefined &&
                this.props.questionsData.data.problem[0].stimulus === undefined && (
                  <span>
                    <b>No Visual Aid accompanies this question</b>
                  </span>
                )}
            </div>
          </div>
          <div className="inbox-program-block-one printblock">
            <div className="inbox-program-block-heading">
              <div className="inbox-program-print-rubric">
                <b>3-Points Rubric</b>
              </div>
              <div className="inbox-program-score">Score</div>
            </div>
            <div className="inbox-program-block-content">
              <div className="inbox-program-print-rubric">Overall Score</div>
              <div className="inbox-program-score">
                <span>{this.props.rubicScore[0]}</span>
              </div>
            </div>
          </div>
          <div className="inbox-program-block-one hideprint">
            <div className="inbox-program-tabinr-titl">3-Points Rubric :</div>
            <div className="inbox-program-block-score">
              <button onClick={this.props.scoreToggle} className="button-score">
                Ovarall score
              </button>
              <div className="pull-right">
                <button
                  value="0"
                  className={score0.join(' ')}
                  onClick={e =>
                    this.scoreChange(`${this.props.index}`, `${this.props.question}`, e)
                  }
                >
                  0
                </button>
                <button
                  value="1"
                  className={score1.join(' ')}
                  onClick={e =>
                    this.scoreChange(`${this.props.index}`, `${this.props.question}`, e)
                  }
                >
                  1
                </button>
                <button
                  value="2"
                  className={score2.join(' ')}
                  onClick={e =>
                    this.scoreChange(`${this.props.index}`, `${this.props.question}`, e)
                  }
                >
                  2
                </button>
                <button
                  value="3"
                  className={score3.join(' ')}
                  onClick={e =>
                    this.scoreChange(`${this.props.index}`, `${this.props.question}`, e)
                  }
                >
                  3
                </button>
              </div>
            </div>
          </div>
          <div className="inbox-program-block-one">
            <div className="inbox-program-tabinr-titl">Comments :</div>
            <div className="inbox-program-block-scrltw-comments">
              <textarea
                rows={Constants.SKILL_ASSESTMENT_COMMENT_ROWS}
                cols={Constants.SKILL_ASSESTMENT_COMMENT_COLS}
                onChange={e =>
                  this.props.handleChange(`${this.props.index}`, `${this.props.question}`, e)
                }
              >
                {this.props.mSkillsQuestionsData.evaluation !== undefined &&
                this.props.mSkillsQuestionsData.evaluation[0].comment !== undefined
                  ? this.props.mSkillsQuestionsData.evaluation[0].comment
                  : ''}
              </textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Math180SkillsQuestions.propTypes = {
  questionsData: PropTypes.any,
  mSkillsQuestionsData: PropTypes.object.isRequired,
  scoreToggle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  rubicScore: PropTypes.any,
  buttonChange: PropTypes.func.isRequired,
  submitDate: PropTypes.string,
  testResults: PropTypes.any,
  communityID: PropTypes.string,
};

export default Math180SkillsQuestions;
