/**
 *
 * Read180Swcr2
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import * as Constant from './constant';

import './Read180Swcr2.scss';

class Read180Swcr2 extends React.Component {
  componentWillUnmount() {
    this.props.unMountChild();
  }
  overallScore = () => {
    this.props.overallScore();
  };
  commentArea = e => {
    const { response, rubricType } = this.props;
    const comments = e.target.value;
    this.setState({
      comments,
    });
    this.props.saveColor(response, rubricType, this.props.score, comments);
  };

  scoreClick = value => {
    const { response, rubricType } = this.props;
    this.props.saveColor(response, rubricType, value, this.props.comments);
  };

  render() {
    return (
      <div>
        {' '}
        <div>
          <div className="block">
            <div className="block-one">
              <div className="block-titl">Question :</div>
              {this.props.read180Swcr2.openResponse2Submission &&
                this.props.read180Swcr2.openResponse2Submission[0].question !== undefined && (
                  <div className="block-scrl">
                    {' '}
                    {Parser(
                      `${this.props.read180Swcr2.openResponse2Submission[0].question[0]}`
                    )}{' '}
                  </div>
                )}
            </div>
            <div className="block-two">
              <div className="block-titl">2-Points Rubric :</div>
              <div className="block-scrl-two">
                <a tabIndex={0} role="button" onClick={this.overallScore}>
                  Overall score
                </a>
                <div className="pull-right">
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${this.props.score === Constant.SCORE_ZERO && 'active'}`}
                    onClick={() => this.scoreClick(Constant.SCORE_ZERO)}
                  >
                    {Constant.ZERO}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${this.props.score === Constant.SCORE_ONE && 'active'}`}
                    onClick={() => this.scoreClick(Constant.SCORE_ONE)}
                  >
                    {Constant.ONE}
                  </span>
                  <span
                    tabIndex={0}
                    role="button"
                    className={`valu1 ${this.props.score === Constant.SCORE_TWO && 'active'}`}
                    onClick={() => this.scoreClick(Constant.SCORE_TWO)}
                  >
                    {Constant.TWO}
                  </span>
                </div>
              </div>
            </div>
            <div className="block-three">
              <div className="block-titl">Student Response :</div>
              <div className="block-scrl-three">
                {this.props.read180Swcr2.openResponse2Submission &&
                  this.props.read180Swcr2.openResponse2Submission[0].answer !== undefined && (
                    <div className="print-read180-studentwork-modal-description-textarea">
                      {this.props.read180Swcr2.openResponse2Submission[0].answer[0]}
                    </div>
                  )}
                {}
              </div>
              <div className="block-scrl-three" />
            </div>
            <div className="block-four">
              <div className="block-titl">Comments :</div>
              <textarea
                rows={Constant.FOR_ROWS}
                cols={Constant.FOR_COLUMNS}
                name="comment"
                value={this.props.comments}
                onChange={this.commentArea}
              />
              <div className="block-scrl-four" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Read180Swcr2.propTypes = {
  read180Swcr2: PropTypes.object,
  saveColor: PropTypes.func,
  overallScore: PropTypes.func,
  comments: PropTypes.any,
  score: PropTypes.any,
  unMountChild: PropTypes.func,
  response: PropTypes.string,
  rubricType: PropTypes.string,
};

export default Read180Swcr2;
