/**
 *
 * Math180Questions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Constants from './constants';
import './Math180Questions.scss';

class Math180Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
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
      ((this.props.rubicScore !== null &&
        this.props.rubicScore[0] === Constants.TEACHER_SCORE_1 &&
        this.state.rubicScoreValue === '') ||
        this.state.rubicScoreValue === Constants.TEACHER_SCORE_1)
    ) {
      score.push('active');
    }
    if (
      teachScore === Constants.TEACHER_SCORE_2 &&
      ((this.props.rubicScore !== null &&
        this.props.rubicScore[0] === Constants.TEACHER_SCORE_2 &&
        this.state.rubicScoreValue === '') ||
        this.state.rubicScoreValue === Constants.TEACHER_SCORE_2)
    ) {
      score.push('active');
    }
    if (
      teachScore === Constants.TEACHER_SCORE_3 &&
      ((this.props.rubicScore !== null &&
        this.props.rubicScore[0] === Constants.TEACHER_SCORE_3 &&
        this.state.rubicScoreValue === '') ||
        this.state.rubicScoreValue === Constants.TEACHER_SCORE_3)
    ) {
      score.push('active');
    }

    return score;
  };

  commentData = () => {
    if (
      this.props.questionData.evaluation !== undefined &&
      this.props.questionData.evaluation[0].comment !== undefined
    ) {
      return this.props.questionData.evaluation[0].comment;
    }
    return '';
  };

  handleCommentChange = (index, questionIndex, e) => {
    this.props.handleChange(index, questionIndex, e);
    this.setState({ comments: e.target.value });
  };
  commentsReview() {
    if (this.state.comments !== '' && this.props.resetStateData === true) {
      this.setState({ comments: '' });
    }
    if (this.state.rubicScoreValue !== '' && this.props.resetStateData === true) {
      this.setState({ rubicScoreValue: '' });
    }
  }

  render() {
    const rubicScore0 = this.rubicScoreSelection(Constants.TEACHER_SCORE_1);
    const rubricScore1 = this.rubicScoreSelection(Constants.TEACHER_SCORE_2);
    const rubricScore2 = this.rubicScoreSelection(Constants.TEACHER_SCORE_3);
    this.commentsReview();

    return (
      <div>
        <div className="inbox-program-col-sm-6">
          <div className="inbox-program-block-one">
            <div className="inbox-program-tabinr-titl">Question :</div>
            <div className="inbox-program-block-scrl inbox-program-first-bl">
              {this.props.questionData.question}
            </div>
          </div>
          <div className="inbox-program-block-one">
            <div className="inbox-program-tabinr-titl">Student Response</div>
            <div className="block-scrltw">{this.props.questionData.answer[0]}</div>

            <div className="inbox-program-block-date">
              Date of Submission:
              {moment(this.props.submitDate).format('DD/MM/YYYY')}
            </div>
          </div>
        </div>
        <div className="inbox-program-col-sm-6">
          <div className="inbox-program-block-one printblock">
            <div className="inbox-program-block-heading">
              <div className="inbox-program-print-rubric">
                <b>2-Point Rubric</b>
              </div>
              <div className="inbox-program-score">Score</div>
            </div>
            <div className="inbox-program-block-content">
              <div className="inbox-program-.print-rubric">Overall Score</div>
              <div className="inbox-program-score">
                {this.props.questionData.evaluation !== undefined &&
                  this.props.questionData.evaluation[0].rubricScores !== undefined && (
                    <span>
                      {this.props.questionData.evaluation[0].rubricScores[0].score[0].teacherScore}
                    </span>
                  )}
              </div>
            </div>
          </div>

          <div className="inbox-program-block-one hideprint">
            <div className="inbox-program-tabinr-titl">2-Point Rubric</div>
            <div className="inbox-program-block-scrl-score inbox-program-first-bl">
              <button onClick={this.props.scoreToggle} className="button-score">
                Overall score
              </button>
              <div className="pull-right">
                <button
                  value="0"
                  className={rubicScore0.join(' ')}
                  onClick={e =>
                    this.scoreChange(`${this.props.index}`, `${this.props.question}`, e)
                  }
                >
                  0
                </button>
                <button
                  value="1"
                  className={rubricScore1.join(' ')}
                  onClick={e =>
                    this.scoreChange(`${this.props.index}`, `${this.props.question}`, e)
                  }
                >
                  1
                </button>
                <button
                  value="2"
                  className={rubricScore2.join(' ')}
                  onClick={e =>
                    this.scoreChange(`${this.props.index}`, `${this.props.question}`, e)
                  }
                >
                  2
                </button>
              </div>
            </div>
          </div>
          <div className="inbox-program-block-one">
            <div className="inbox-program-tabinr-titl">Comments</div>
            <div className="block-scrltw">
              <textarea
                rows={Constants.MATH_180_QUESTION_COMMENT_ROWS}
                cols={Constants.MATH_180_QUESTION_COMMENT_COLS}
                name="comments"
                className="inbox-program-textarea"
                value={this.state.comments === '' ? this.commentData() : this.state.comments}
                onChange={e =>
                  this.handleCommentChange(`${this.props.index}`, `${this.props.question}`, e)
                }
              >
                {}
              </textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Math180Questions.propTypes = {
  questionData: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  buttonChange: PropTypes.func.isRequired,
  scoreToggle: PropTypes.func.isRequired,
  submitDate: PropTypes.string.isRequired,
  rubicScore: PropTypes.any,
  resetStateData: PropTypes.bool,
};

export default Math180Questions;
