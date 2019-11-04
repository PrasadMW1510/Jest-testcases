/**
 *
 * PrintCustomQuiz
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';

import * as Constants from './constants';
import './PrintBookLabels.scss';

class PrintBookLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedPrintState: {
        lexile: true,
        readingLevel: true,
        grl: true,
        showPoints: true,
      },
      selectedOption: 'tallBook',
      labelVal: 0,
      showError: false,
    };
  }

  getPreviewConfig = () => {
    const { showError, labelVal, selectedOption } = this.state;
    const { lexile, showPoints, grl, readingLevel } = this.state.checkedPrintState;
    return {
      showError,
      labelVal,
      selectedOption,
      checked: [lexile, showPoints, grl, readingLevel],
    };
  };
  handleRadioChange = event => {
    this.setState({
      selectedOption: event.target.value,
    });
  };
  handleChange = event => {
    const updatedCheckedPrintState = { ...this.state.checkedPrintState };
    updatedCheckedPrintState[event.target.id] = !this.state.checkedPrintState[event.target.id];
    this.setState({
      checkedPrintState: updatedCheckedPrintState,
    });
  };
  handleTextboxChange = event => {
    if (event.target.validity.valid) {
      this.setState({
        labelVal: event.target.value,
      });
    } else {
      this.setState({
        labelVal: '',
      });
    }
  };
  handlePreview = () => {
    if (this.state.labelVal > Constants.LABEL_VALUE) {
      this.setState({
        showError: true,
      });
    } else {
      this.setState({
        showError: false,
      });
      this.props.onPreview(this.getPreviewConfig(), this.props.data);
    }
  };

  render() {
    const { isOpen, data } = this.props;
    const { labelVal, showError } = this.state;
    const { lexile, showPoints, grl, readingLevel } = this.state.checkedPrintState;
    return (
      <div>
        {data.length === 0 ? (
          <SAMModal
            isOpen={isOpen}
            contentLabel="Print Empty Modal For Book Labels"
            modalClassModifier="modal-book-label__empty"
            id="pcq"
          >
            <div className="print-book-label-empty__text">
              There are no selected titles to print. Please select at least one title.
            </div>
            <div className="empty-labels__buttons">
              <div className="empty-labels__secondary-button-ok">
                <SAMButton isPrimaryButton onClickHandler={this.props.handleCancel}>
                  OK
                </SAMButton>
              </div>
            </div>
          </SAMModal>
        ) : (
          <SAMModal
            isOpen={isOpen}
            contentLabel="Print Book Labels"
            modalClassModifier="modal--printbooklabel-quiz"
            id="pcq"
          >
            <div>
              <div className="print-show-label-quiz-list--orange">
                <div className="print-show-label-heading">Print Book Labels</div>
              </div>
              <div className="print-show-label--countheader">
                You have selected {data.length} titles.
              </div>
              <div className="print-show-label--layout">
                <div className="layouttext">Customize the layout</div>
              </div>
              <div className="print-show-label--layout-content">
                Use the check boxes to select information to appear on your labels.
              </div>
            </div>
            <div className="print-show-label--chckbox collapsible-book__wrapper">
              <div className="collapsible-book-list-names">
                <input
                  className="collapsible-book-input"
                  id="lexile"
                  name="Lexile"
                  type="checkbox"
                  onChange={event => this.handleChange(event)}
                  checked={lexile}
                />
                <span
                  className={`${
                    lexile
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                Show Lexile Level
              </div>
              <div className="collapsible-book-list-names">
                <input
                  className="collapsible-book-input"
                  id="showPoints"
                  name="Show Points"
                  type="checkbox"
                  onChange={event => this.handleChange(event)}
                  checked={showPoints}
                />
                <span
                  className={`${
                    showPoints
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                Show Points
              </div>
              <div className="collapsible-book-list-names">
                <input
                  className="collapsible-book-input"
                  id="grl"
                  name="GRL"
                  type="checkbox"
                  onChange={this.handleChange}
                  checked={grl}
                />
                <span
                  className={`${
                    grl
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                Show GRL
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
                  className={`${
                    readingLevel
                      ? 'collapsible-book__checkbox collapsible-book__checkbox--checked'
                      : 'collapsible-book__checkbox'
                  }`}
                />
                Show Reading Level
              </div>
              <div className="pad-t5">
                <input
                  className="valign-mid"
                  id="WideBookLabels"
                  name="radiochoice"
                  type="radio"
                  value="wideBook"
                  checked={this.state.selectedOption === 'wideBook'}
                  onChange={event => {
                    this.handleRadioChange(event);
                  }}
                />
                Wide Book Labels (Use label format Avery 5160 or 6460)
              </div>
              <div className="pad-t5">
                <input
                  className="valign-mid"
                  id="TallBookLabels"
                  name="radiochoice"
                  type="radio"
                  value="tallBook"
                  checked={this.state.selectedOption === 'tallBook'}
                  onChange={event => {
                    this.handleRadioChange(event);
                  }}
                />
                Tall Book Labels (Use label format Avery 5160 or 6460)
              </div>

              <div className="print-custom-booklabel__textarea">
                <div className="print-booklabel__wrapper">
                  Number of labels to skip:
                  <input
                    className="print-custom-booklabel__textbox"
                    id="textboxLabel"
                    name="textboxLabel"
                    type="textbox"
                    value={labelVal}
                    pattern="[0-9]*"
                    maxLength="2"
                    onChange={event => {
                      this.handleTextboxChange(event);
                    }}
                  />
                </div>
                <span className="print-custom-booklabel__span">
                  (Use this feature to &quot;skip&quot; labels if you are using a sheet of labels
                  that is partially used. Max=29)
                </span>
                {showError ? (
                  <p className="print-custom-booklabel__errormessage">
                    Max number of labels to skip is 29.
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div className="print-custom-booklabel__buttons">
                <div className="print-custom-booklabel__cancel">
                  <SAMButton onClickHandler={this.props.handleCancel}>Cancel</SAMButton>
                </div>
                <div className="print-custom-booklabel__preview">
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

PrintBookLabels.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default PrintBookLabels;
