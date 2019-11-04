/**
 *
 * System44SuccessRecord
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SystemRecordingPopUp from 'components/SystemRecordingPopUp';
import * as Constants from 'containers/System44SuccessRecordContainer/constants';
import { getBaseUrlWithoutSlms } from 'utils/request';
import moment from 'moment';
import PropTypes from 'prop-types';
import './System44SuccessRecord.scss';
import '../System44Assignment/System44Assignment.scss';

class System44SuccessRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      questionNum: NaN,
      saveDataChanged: true,
      currentIndex: this.props.data.rowIndex,
      popUptableData: '',
      popUpType: 'Final Recording',
      showPopUp: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ popUpType: nextProps.data.rowData.assignment });
  }

  getTitleExt(titleExt) {
    if (this.props.data.rowData.assignment === 'Success Recording') {
      return (
        <span className="print-system44__modal-title--span">
          <a target="_blank" rel="noopener noreferrer" href={titleExt.$ && titleExt.$.pdfFile}>
            {titleExt.passage && titleExt.passage[0]}
          </a>
        </span>
      );
    }
    return (
      <span className="print-system44__modal-title--span">
        {titleExt && titleExt.$ && titleExt.topicTitle}
        {titleExt.$ && titleExt.segmentTitle}
        <a target="_blank" rel="noopener noreferrer" href={titleExt.$ && titleExt.$.pdfFile}>
          Level
          {titleExt.$ && titleExt.$.level}
        </a>
      </span>
    );
  }

  getPopUp = e => {
    const popUpTitle = e.target.getAttribute('value');
    const popTableData = Constants.popUpText[popUpTitle];
    this.setState({ popUptableData: popTableData, showPopUp: true });
  };

  handleSaveData(data) {
    const saveData = data;
    saveData.comment = this.state.comment;
    saveData.questionNum = this.state.questionNum;
    this.setState({
      saveDataChanged: true,
    });
    this.props.assignmentSuccessRecordSaveRequest(data);
  }
  scoreChange = (item, qNumber, e) => {
    this.setState({ rubicScoreValue: e.target.value });
    this.props.buttonChange(item, qNumber, e);
  };

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

  print = () => {
    window.print();
  };

  handleInputChange(e) {
    const commentValue = e.target.value;
    this.setState({
      comment: commentValue,
      saveDataChanged: false,
    });
  }

  handleChange = e => {
    const questionNumValue = e.target.value;
    this.setState({
      questionNum: questionNumValue,
      saveDataChanged: false,
    });
  };

  scoreToggleClose = () => {
    this.setState({ showPopUp: false });
  };

  render() {
    const data = this.props.data && this.props.data.rowData;
    let regardingPath = '';
    if (
      this.props.successPassageRecWorkItem &&
      this.props.successPassageRecWorkItem.oralFluencySubmission &&
      this.props.successPassageRecWorkItem.oralFluencySubmission[0].recordingPath
    ) {
      regardingPath =
        this.props.successPassageRecWorkItem &&
        this.props.successPassageRecWorkItem.oralFluencySubmission &&
        this.props.successPassageRecWorkItem.oralFluencySubmission[0].recordingPath[0];
    } else if (
      this.props.successPassageRecWorkItem &&
      this.props.successPassageRecWorkItem.iReadSuccessRecSubmission &&
      this.props.successPassageRecWorkItem.iReadSuccessRecSubmission[0].recordingPath
    ) {
      regardingPath = this.props.successPassageRecWorkItem.iReadSuccessRecSubmission[0]
        .recordingPath[0];
    } else {
      regardingPath =
        this.props.successPassageRecWorkItem &&
        this.props.successPassageRecWorkItem.successPassageRecSubmission &&
        this.props.successPassageRecWorkItem.successPassageRecSubmission[0].recordingPath[0];
    }
    return (
      <SAMModal
        isOpen={this.props.isOpen}
        contentLabel="activate Quiz"
        modalClassModifier="print-system44__modal-system44--modal"
        id="s44"
      >
        <div className="print-system44-modal__list--wrapper">
          <div className="print-system44-modal__list--purple">
            <div className="print-system44__modal--heading">{data.student}</div>
            <div>
              <button
                className="print-system44-modal__button--close"
                onClick={this.props.handleCancel}
              >
                X
              </button>
            </div>
          </div>
          <div className="print-system44__modal--title">
            {this.props.modalTitle}
            <span className="print-system44__modal-title--span">
              {''}
              {`${data.assignment} ${data.from} `}
            </span>
            {this.props.successPassageRecWorkItem &&
              this.getTitleExt(this.props.successPassageRecWorkItem)}
          </div>

          <div className="print-system44-modal__description--box">
            <div className="print-system44-modal__description--textarea s44-play">
              <a
                href={`${getBaseUrlWithoutSlms()}${regardingPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="print-system44-modal__play--but"
              >
                Play Recording
              </a>
              <p className="print-system44-modal__s44-bot--txt">
                Date of Recording
                {moment(
                  new Date(
                    `${this.props.successPassageRecWorkItem &&
                      this.props.successPassageRecWorkItem.$ &&
                      this.props.successPassageRecWorkItem.$.dateSubmitted}`
                  )
                ).format('MM/DD/YYYY')}
              </p>
            </div>
          </div>
          <div className="print-system44__modal--playdiv">
            <div className="print-system44__modal-due-date--oral print-system44__modal-due--date">
              <div className="print-system44__modal-description--title">Oral Fluency Rubric</div>
              <div className="print-system44__modal-due-date--textarea">
                <div className="print-system44__modal-due-date--inbox">
                  <div className="print-system44__pull-right--here">
                    <p className="print-system44__oral-fluency--txt">
                      <span
                        className="print-system44__oral-fluency--span"
                        role="button"
                        tabIndex={0}
                        onClick={event => this.getPopUp(event)}
                        value="Begenning Fluency"
                      >
                        Begenning Fluency
                      </span>
                      <span>
                        <button
                          value="0"
                          className={`${
                            this.state.questionNum === '0'
                              ? 'print-system44__oral-fluency--button active'
                              : 'print-system44__oral-fluency--button'
                          }`}
                          onClick={this.handleChange}
                        >
                          0
                        </button>
                      </span>
                    </p>
                    <p className="print-system44__oral-fluency--txt">
                      <span
                        className="print-system44__oral-fluency--span"
                        role="button"
                        tabIndex={0}
                        onClick={event => this.getPopUp(event)}
                        value="Emerging Fluency"
                      >
                        Emerging Fluency
                      </span>
                      <span>
                        <button
                          value="1"
                          className={`${
                            this.state.questionNum === '1'
                              ? 'print-system44__oral-fluency--button active'
                              : 'print-system44__oral-fluency--button'
                          }`}
                          onClick={event => this.handleChange(event)}
                        >
                          1
                        </button>
                      </span>
                    </p>
                    <p className="print-system44__oral-fluency--txt">
                      <span
                        className="print-system44__oral-fluency--span"
                        role="button"
                        tabIndex={0}
                        onClick={event => this.getPopUp(event)}
                        value="Developing Fluency"
                      >
                        Developing Fluency
                      </span>
                      <span>
                        <button
                          value="2"
                          className={
                            this.state.questionNum === '2'
                              ? 'print-system44__oral-fluency--button active'
                              : 'print-system44__oral-fluency--button'
                          }
                          onClick={event => this.handleChange(event)}
                        >
                          2
                        </button>
                      </span>
                    </p>
                    <p className="print-system44__oral-fluency--txt">
                      <span
                        className="print-system44__oral-fluency--span"
                        role="button"
                        tabIndex={0}
                        onClick={event => this.getPopUp(event)}
                        value="Proficient Fluency"
                      >
                        Proficient Fluency
                      </span>
                      <span>
                        <button
                          value="3"
                          className={
                            this.state.questionNum === '3'
                              ? 'print-system44__oral-fluency--button active'
                              : 'print-system44__oral-fluency--button'
                          }
                          onClick={event => this.handleChange(event)}
                        >
                          3
                        </button>
                      </span>
                    </p>
                    <p className="print-system44__oral-fluency--txt">
                      <span
                        className="print-system44__oral-fluency--span"
                        role="button"
                        tabIndex={0}
                        onClick={event => this.getPopUp(event)}
                        value="Strong Fluency"
                      >
                        Strong Fluency
                      </span>
                      <span>
                        <button
                          value="4"
                          className={
                            this.state.questionNum === '4'
                              ? 'print-system44__oral-fluency--button active'
                              : 'print-system44__oral-fluency--button'
                          }
                          onClick={event => this.handleChange(event)}
                        >
                          4
                        </button>
                      </span>
                    </p>
                    <p className="print-system44__oral-fluency--txt">
                      <span
                        className="print-system44__oral-fluency--span"
                        role="button"
                        tabIndex={0}
                        onClick={event => this.getPopUp(event)}
                        value="Exemplary Fluency"
                      >
                        Exemplary Fluency
                      </span>
                      <span>
                        <button
                          value="5"
                          className={
                            this.state.questionNum === '5'
                              ? 'print-system44__oral-fluency--button active'
                              : 'print-system44__oral-fluency--button'
                          }
                          onClick={event => this.handleChange(event)}
                        >
                          5
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="print-system44__modal-due--date print-system44__modal-due-date--oral">
              <div className="print-system44__modal-description--title">Comments</div>
              <div className="print-system44__modal-due-date--textarea">
                <div className="print-system44__modal-due-date--inbox">
                  <textarea
                    className="print-system44__modal-description-title--textarea"
                    name="comments"
                    value={this.state.comment}
                    onChange={event => {
                      this.handleInputChange(event);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="print-system44__show-system44-modal--line" />
          <div className="print-activate__quiz--buttons">
            <div className="print-activate-quiz__primary--button">
              <div className="print-system44-modal__buttons--firstset">
                <button
                  className="print-system44-modal-button-first-set print-system44-modal-button-print"
                  onClick={this.print}
                >
                  Print
                </button>
                <button
                  className="print-system44-modal-button-first-set print-system44-modal-button-cancel"
                  onClick={this.props.handleCancel}
                >
                  Cancel
                </button>
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
                  <div className="pager-nor">
                    {this.props.tempGridData && this.props.tempGridData.length}
                  </div>
                  <div className="pager-prev">
                    <a className="previous" href="" onClick={this.handleNext}>
                      &gt;
                    </a>
                  </div>
                </div>
                <div className="print-system44-modal__buttons--secondset">
                  <button className="print-system44-modal__button-second--set print-system44-modal__button--delete">
                    Delete
                  </button>
                  <button
                    className={
                      this.state.saveDataChanged
                        ? 'print-system44-modal__button-second--set print-system44-modal__button--save'
                        : 'print-system44-modal__button-second--set print-system44-modal__button--save print-math180-modal-button-save-blue'
                    }
                    disabled={this.state.saveDataChanged}
                    onClick={dataVal => this.handleSaveData(dataVal)}
                  >
                    Save
                  </button>
                </div>
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
    );
  }
}

System44SuccessRecord.propTypes = {
  data: PropTypes.any,
  tempGridData: PropTypes.any,
  handleCancel: PropTypes.func.isRequired,
  successPassageRecWorkItem: PropTypes.any.isRequired,
  modalTitle: PropTypes.any.isRequired,
  isOpen: PropTypes.any.isRequired,
  dispatchAction: PropTypes.func.isRequired,
  buttonChange: PropTypes.func,
  assignmentSuccessRecordSaveRequest: PropTypes.func.isRequired,
};

export default System44SuccessRecord;
