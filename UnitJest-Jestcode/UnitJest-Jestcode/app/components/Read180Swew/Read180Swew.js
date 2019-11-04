/**
 *
 * Read180Swew
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import * as Constant from './constant';

import './Read180Swew.scss';

class Read180Swew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overallScores: Constant.overAllScores,
      responseType:
        props.read180Swew.writingPromptSubmission &&
        props.read180Swew.writingPromptSubmission[0].evaluation &&
        props.read180Swew.writingPromptSubmission[0].evaluation[0].$.submissionType,
      rubricType:
        props.read180Swew.writingPromptSubmission &&
        props.read180Swew.writingPromptSubmission[0].evaluation &&
        props.read180Swew.writingPromptSubmission[0].evaluation[0].$.rubricType,
    };
  }

  componentWillUnmount() {
    this.props.unMountChild();
  }

  commentArea = e => {
    const comments = e.target.value;
    const { response, rubricType } = this.props;
    this.setState({
      comments,
    });
    this.props.saveColor(response, rubricType, this.props.score, comments);
  };

  overlink = () => {
    this.props.overLink();
  };

  scoreClick = (row, value) => {
    const { overallScores } = this.state;
    const { response, rubricType } = this.props;
    if (value === Constant.SCORE_ONE) {
      overallScores[row].score1 = Constant.SCORE_ACTIVE;
      overallScores[row].score2 = '';
      overallScores[row].score3 = '';
      overallScores[row].score4 = '';
      this.setState({ overallScores });
    }
    if (value === Constant.SCORE_TWO) {
      overallScores[row].score2 = Constant.SCORE_ACTIVE;
      overallScores[row].score1 = '';
      overallScores[row].score3 = '';
      overallScores[row].score4 = '';
      this.setState({ overallScores });
    }
    if (value === Constant.SCORE_THREE) {
      overallScores[row].score3 = Constant.SCORE_ACTIVE;
      overallScores[row].score1 = '';
      overallScores[row].score2 = '';
      overallScores[row].score4 = '';
      this.setState({ overallScores });
    }
    if (value === Constant.SCORE_FOUR) {
      overallScores[row].score4 = Constant.SCORE_ACTIVE;
      overallScores[row].score2 = '';
      overallScores[row].score3 = '';
      overallScores[row].score1 = '';
      this.setState({ overallScores });
    }
    this.props.saveColor(response, rubricType, value, this.props.comments);
  };

  render() {
    const { overallScores } = this.state;
    return (
      <div>
        <div className="block">
          <div className="extended-writing-block-one">
            <div className="extended-writing-block-titl">Question :</div>
            {this.props.read180Swew.writingPromptSubmission &&
              this.props.read180Swew.writingPromptSubmission[0].question !== undefined && (
                <div className="extended-writing-block-scrl-one">
                  {' '}
                  {Parser(`${this.props.read180Swew.writingPromptSubmission[0].question[0]}`)}{' '}
                </div>
              )}
          </div>
          <div className="extended-writing-block-two">
            <div className="extended-writing-block-titl">Narrative 4-Point Rubric :</div>
            <div className="extended-writing-block-scrl-two">
              <div>
                <a tabIndex={0} role="button" onClick={this.overlink}>
                  states the topic and controlling idea about the topic
                </a>
                <span className="extended-writing-pull-right">
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedOne.score1}`}
                    onClick={() => this.scoreClick('selectedOne', Constant.SCORE_ONE)}
                  >
                    {Constant.ONE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedOne.score2}`}
                    onClick={() => this.scoreClick('selectedOne', Constant.SCORE_TWO)}
                  >
                    {Constant.TWO}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedOne.score3}`}
                    onClick={() => this.scoreClick('selectedOne', Constant.SCORE_THREE)}
                  >
                    {Constant.THREE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedOne.score4}`}
                    onClick={() => this.scoreClick('selectedOne', Constant.SCORE_FOUR)}
                  >
                    {Constant.FOUR}
                  </span>
                </span>
              </div>
              <div>
                <a tabIndex={0} role="button" onClick={this.overlink}>
                  Facts, example and support the topic sentence
                </a>
                <span className="extended-writing-pull-right">
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedTwo.score1}`}
                    onClick={() => this.scoreClick('selectedTwo', Constant.SCORE_ONE)}
                  >
                    {Constant.ONE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedTwo.score2}`}
                    onClick={() => this.scoreClick('selectedTwo', Constant.SCORE_TWO)}
                  >
                    {Constant.TWO}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedTwo.score3}`}
                    onClick={() => this.scoreClick('selectedTwo', Constant.SCORE_THREE)}
                  >
                    {Constant.THREE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedTwo.score4}`}
                    onClick={() => this.scoreClick('selectedTwo', Constant.SCORE_FOUR)}
                  >
                    {Constant.FOUR}
                  </span>
                </span>
              </div>
              <div>
                <a tabIndex={0} role="button" onClick={this.overlink}>
                  transition/linking words and phrase connect ideas
                </a>
                <span className="extended-writing-pull-right">
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedThree.score1}`}
                    onClick={() => this.scoreClick('selectedThree', Constant.SCORE_ONE)}
                  >
                    {Constant.ONE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedThree.score2}`}
                    onClick={() => this.scoreClick('selectedThree', Constant.SCORE_TWO)}
                  >
                    {Constant.TWO}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedThree.score3}`}
                    onClick={() => this.scoreClick('selectedThree', Constant.SCORE_THREE)}
                  >
                    {Constant.THREE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedThree.score4}`}
                    onClick={() => this.scoreClick('selectedThree', Constant.SCORE_FOUR)}
                  >
                    {Constant.FOUR}
                  </span>
                </span>
              </div>
              <div>
                <a tabIndex={0} role="button" onClick={this.overlink}>
                  presice verb and convey information
                </a>
                <span className="extended-writing-pull-right">
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedFour.score1}`}
                    onClick={() => this.scoreClick('selectedFour', Constant.SCORE_ONE)}
                  >
                    {Constant.ONE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedFour.score2}`}
                    onClick={() => this.scoreClick('selectedFour', Constant.SCORE_TWO)}
                  >
                    {Constant.TWO}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedFour.score3}`}
                    onClick={() => this.scoreClick('selectedFour', Constant.SCORE_THREE)}
                  >
                    {Constant.THREE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedFour.score4}`}
                    onClick={() => this.scoreClick('selectedFour', Constant.SCORE_FOUR)}
                  >
                    {Constant.FOUR}
                  </span>
                </span>
              </div>
              <div>
                <a tabIndex={0} role="button" onClick={this.overlink}>
                  A concluding sentence explains the topic&apos;s significance
                </a>
                <span className="extended-writing-pull-right">
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedFive.score1}`}
                    onClick={() => this.scoreClick('selectedFive', Constant.SCORE_ONE)}
                  >
                    {Constant.ONE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedFive.score2}`}
                    onClick={() => this.scoreClick('selectedFive', Constant.SCORE_TWO)}
                  >
                    {Constant.TWO}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedFive.score3}`}
                    onClick={() => this.scoreClick('selectedFive', Constant.SCORE_THREE)}
                  >
                    {Constant.THREE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedFive.score4}`}
                    onClick={() => this.scoreClick('selectedFive', Constant.SCORE_FOUR)}
                  >
                    {Constant.FOUR}
                  </span>
                </span>
              </div>
              <div>
                <a tabIndex={0} role="button" onClick={this.overlink}>
                  Follow conventions of mechanics, usage and spelling
                </a>
                <span className="extended-writing-pull-right">
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedsix.score1}`}
                    onClick={() => this.scoreClick('selectedsix', Constant.SCORE_ONE)}
                  >
                    {Constant.ONE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedsix.score2}`}
                    onClick={() => this.scoreClick('selectedsix', Constant.SCORE_TWO)}
                  >
                    {Constant.TWO}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedsix.score3}`}
                    onClick={() => this.scoreClick('selectedsix', Constant.SCORE_THREE)}
                  >
                    {Constant.THREE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedsix.score4}`}
                    onClick={() => this.scoreClick('selectedsix', Constant.SCORE_FOUR)}
                  >
                    {Constant.FOUR}
                  </span>
                </span>
              </div>
              <div>
                <a>overAll Score</a>
                <span className="extended-writing-pull-right">
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedseven.score1}`}
                    onClick={() => this.scoreClick('selectedseven', Constant.SCORE_ONE)}
                  >
                    {Constant.ONE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedseven.score2}`}
                    onClick={() => this.scoreClick('selectedseven', Constant.SCORE_TWO)}
                  >
                    {Constant.TWO}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedseven.score3}`}
                    onClick={() => this.scoreClick('selectedseven', Constant.SCORE_THREE)}
                  >
                    {Constant.THREE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${overallScores.selectedseven.score4}`}
                    onClick={() => this.scoreClick('selectedseven', Constant.SCORE_FOUR)}
                  >
                    {Constant.FOUR}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="extended-writing-block-three">
            <div className="extended-writing-block-titl">Student Response :</div>
            <div className="extended-writing-block-scrl-three">
              {this.props.read180Swew.writingPromptSubmission &&
                this.props.read180Swew.writingPromptSubmission[0].answer !== undefined && (
                  <div className="extended-writing-print-read180-studentwork-modal-description-textarea">
                    {this.props.read180Swew.writingPromptSubmission[0].answer[0]}
                  </div>
                )}
            </div>
          </div>
          <div className="extended-writing-block-four">
            <div className="extended-writing-block-titl">Comments :</div>
            <textarea
              rows={Constant.FOR_ROWS}
              cols={Constant.FOR_COLUMNS}
              name="comment"
              value={this.props.comments}
              onChange={this.commentArea}
            />
            <div className="extended-writing-block-scrl-four" />
          </div>
        </div>
      </div>
    );
  }
}

Read180Swew.propTypes = {
  read180Swew: PropTypes.object.isRequired,
  saveColor: PropTypes.func.isRequired,
  overLink: PropTypes.func.isRequired,
  comments: PropTypes.any.isRequired,
  score: PropTypes.any.isRequired,
  unMountChild: PropTypes.func.isRequired,
  response: PropTypes.string.isRequired,
  rubricType: PropTypes.string.isRequired,
};

export default Read180Swew;
