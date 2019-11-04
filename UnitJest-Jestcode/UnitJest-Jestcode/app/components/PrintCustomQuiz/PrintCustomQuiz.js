/**
 *
 * PrintCustomQuiz
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import './PrintCustomQuiz.scss';

class PrintCustomQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedPrintState: {
        lexile: true,
        readingLevel: true,
        grl: true,
        wordCount: true,
        points: true,
      },
    };
  }

  handleChange = event => {
    const updatedCheckedPrintState = { ...this.state.checkedPrintState };
    updatedCheckedPrintState[event.target.id] = !this.state.checkedPrintState[event.target.id];
    this.setState({
      checkedPrintState: updatedCheckedPrintState,
    });
  };

  handlePreview = () => {
    const { lexile, readingLevel, grl, wordCount, points } = this.state.checkedPrintState;
    this.props.onPreview([lexile, readingLevel, grl, points, wordCount], this.props.data);
  };

  render() {
    const { isOpen, data, handleCancel } = this.props;
    const { lexile, readingLevel, grl, wordCount, points } = this.state.checkedPrintState;
    return (
      <div>
        {data.length === 0 ? (
          <SAMModal
            isOpen={isOpen}
            contentLabel="Print Custom Quiz Empty"
            modalClassModifier="modal-empty__quiz"
            id="pcq"
          >
            <p className="print-custom-quiz-empty-titles__text">
              {' '}
              There are no selected titles to print. Please select at least one title.
            </p>
            <div className="print-custom-quiz-empty-modal__cancel">
              <div className="empty-quiz-button__ok">
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
            modalClassModifier="modal--printcustom-quiz"
            id="pcq"
          >
            <div>
              <div className="print-custom-quiz__quiz-list--orange">
                <div className="print-custom-quiz__heading">Print Custom Quiz List</div>
              </div>
              <div className="print-custom-quiz__countheader">
                You have selected {data.length} titles.
              </div>
              <div className="print-custom-quiz__layout">
                <div className="print-custom-quiz__layouttext">Customize the layout:</div>
              </div>
              <div className="print-custom-quiz__layout-content">
                Use the check boxes to select information to appear on your printout.
              </div>
            </div>
            <div className="print-custom-quiz__chckbox collapsible-book__wrapper">
              <div className="collapsible-book-list-names">
                <input
                  id="lexile"
                  className="print-custom-quiz__chckbox-lexile collapsible-book-input"
                  name="Lexile"
                  type="checkbox"
                  onChange={event => this.handleChange(event)}
                  checked={lexile}
                />
                <span
                  className={`print-custom-quiz__checkmark ${
                    lexile
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                Lexile
              </div>
              <div className="collapsible-book-list-names">
                <input
                  className="collapsible-book-input"
                  id="readingLevel"
                  name="Reading Level"
                  type="checkbox"
                  onChange={event => this.handleChange(event)}
                  checked={readingLevel}
                />
                <span
                  className={`print-custom-quiz__checkmark ${
                    readingLevel
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                Reading level
              </div>
              <div className="collapsible-book-list-names">
                <input
                  className="collapsible-book-input"
                  id="grl"
                  name="grl"
                  type="checkbox"
                  onChange={event => this.handleChange(event)}
                  checked={grl}
                />
                <span
                  className={`print-custom-quiz__checkmark ${
                    grl
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                GRL
              </div>
              <div className="collapsible-book-list-names">
                <input
                  className="collapsible-book-input"
                  id="wordCount"
                  name="Word Count"
                  type="checkbox"
                  onChange={event => this.handleChange(event)}
                  checked={wordCount}
                />
                <span
                  className={`print-custom-quiz__checkmark ${
                    wordCount
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                Word count
              </div>
              <div className="collapsible-book-list-names">
                <input
                  className="collapsible-book-input"
                  id="points"
                  name="Points"
                  type="checkbox"
                  onChange={event => this.handleChange(event)}
                  checked={points}
                />
                <span
                  className={`print-custom-quiz__checkmark ${
                    points
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                Points
              </div>
              <div className="print-custom-quiz__buttons">
                <div className="print-custom-quiz__cancel">
                  <SAMButton onClickHandler={handleCancel}>Cancel</SAMButton>
                </div>
                <div className="print-custom-quiz__preview">
                  <SAMButton isPrimaryButton onClickHandler={this.handlePreview}>
                    Preview
                  </SAMButton>
                </div>
              </div>
            </div>
          </SAMModal>
        )}
      </div>
    );
  }
}

PrintCustomQuiz.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default PrintCustomQuiz;
