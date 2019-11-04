/**
 *
 * PrintQuizAndAnswerKey
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import * as Constants from 'containers/PrintQuizAndAnswerKeyContainer/constants';
import './PrintQuizAndAnswerKey.scss';

class PrintQuizAndAnswerKey extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      initialTitle: data[0] && data[0].Title,
      initialId: data[0] && data[0].ID,
      initialNumberOfQs: 10,
    };
  }

  prevQuiz = event => {
    event.preventDefault();
    const { data } = this.props;
    let curpos = data.findIndex(x => x.ID[0] === this.state.initialId[0]);
    data.map((item, i) => {
      if (item.ID[0] === this.state.initialId) {
        curpos = i;
      }
      return curpos;
    });
    this.setState({
      initialTitle: curpos === 0 ? data[curpos].Title : data[curpos - 1].Title,
      initialId: curpos === 0 ? data[curpos].ID : data[curpos - 1].ID,
    });
  };

  nextQuiz = ev => {
    ev.preventDefault();
    const { data } = this.props;
    let curpos = data.findIndex(x => x.ID[0] === this.state.initialId[0]);
    data.map((item, i) => {
      if (item.ID[0] === this.state.initialId) {
        curpos = i;
      }
      return curpos;
    });
    this.setState({
      initialTitle: curpos === data.length - 1 ? data[curpos].Title : data[curpos + 1].Title,
      initialId: curpos === data.length - 1 ? data[curpos].ID : data[curpos + 1].ID,
    });
  };

  changeNoOfQs = ev => {
    if (ev.target.validity.valid) {
      this.setState({
        initialNumberOfQs: ev.target.value,
      });
    } else {
      this.setState({
        initialNumberOfQs: '',
      });
    }
  };

  handlePreview = () => {
    this.props.onPreview(this.state);
  };

  render() {
    const { isOpen, data } = this.props;
    const { initialTitle, initialNumberOfQs } = this.state;
    return (
      <div>
        {data.length === 0 ? (
          <SAMModal
            isOpen={isOpen}
            contentLabel="Print Empty Modal For Quiz and Answer"
            modalClassModifier="modal-quiz-and-answer__empty"
            id="pcq"
          >
            <div className="print-custom-empty__text">
              Please select at least one quiz to print.
            </div>
            <div className="empty-quiz_and_answer__buttons">
              <div className="empty-quiz-and-answer__secondary-button-ok">
                <SAMButton isPrimaryButton onClickHandler={this.props.handleCancel}>
                  OK
                </SAMButton>
              </div>
            </div>
          </SAMModal>
        ) : (
          <SAMModal
            isOpen={isOpen}
            contentLabel="Print Custom Quiz"
            modalClassModifier="modal--quiz-and-answer-key"
            id="pcq"
          >
            <div className="print--quiz-and-answer-key-list--orange">
              <div className="print-cus-heading">Print Quiz and Answer Key</div>
              <div className="print-right-txt">
                <a
                  className="print-a-span"
                  href="button"
                  onClick={event => {
                    this.prevQuiz(event);
                  }}
                >
                  Previous
                </a>
                <a
                  className="print-a-span"
                  href="button"
                  onClick={event => {
                    this.nextQuiz(event);
                  }}
                >
                  Next
                </a>
              </div>
            </div>

            <div className="print-title-quizandanswerkey">
              <div className="print-title-quizandanswerkey-style">
                <span>Title:</span> {initialTitle}
              </div>
            </div>
            <div className="print-background">
              <div className="print-questinandanswer__input">
                Number of Questions:
                <input
                  className="print-questinandanswer__textbox"
                  type="textbox"
                  value={
                    initialNumberOfQs > Constants.DEFAULT_INITIAL_NUMBER_OF_QS
                      ? Constants.DEFAULT_INITIAL_NUMBER_OF_QS
                      : initialNumberOfQs
                  }
                  pattern="[0-9]*"
                  onChange={event => {
                    this.changeNoOfQs(event);
                  }}
                />
                <span>(Maximum 30)</span>
              </div>
            </div>
            <div className="print-quiz-and-answer-key__buttons">
              <div className="print-quiz-and-answer-key__close">
                <SAMButton onClickHandler={this.props.handleCancel}>Close</SAMButton>
              </div>
              <div className="print-quiz-and-answer-key__preview">
                <SAMButton isPrimaryButton onClickHandler={this.handlePreview}>
                  Preview
                </SAMButton>
              </div>
            </div>
          </SAMModal>
        )}
      </div>
    );
  }
}

PrintQuizAndAnswerKey.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default PrintQuizAndAnswerKey;
