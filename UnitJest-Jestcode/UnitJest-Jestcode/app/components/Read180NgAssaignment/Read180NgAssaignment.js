/**
 *
 * Read180NgAssaignment
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import * as Read180NgAssignmentConstants from './constants';
import './Read180NgAssaignment.scss';

class Read180NgAssaignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked1: false,
      checked2: false,
      comment: '',
      average: '',
      total: '',
      score: '',
      comment2: '',
      average2: '',
      total2: '',
      score2: '',
      name: '',
      assName: '',
      assignmentType: '',
      desc: '',
      scoreDisable: true,
      commentDisable: true,
      disableSave: true,
      assignmentName: '',
      assignmentNameError: '',
      studentId: '',
      showAssignmentUpdate: false,
      emptyName: '',
      dateValue: '',
      emptyDate: '',
      saveClass: false,
      gradeClass: false,
      emptyAssType: '',
    };
  }

  getNewAssignmentRoaster = (student, i) => {
    const read180gradeClass = ['print-read180ngass-modal-button-equals-gray'];
    const read180saveclass = [
      'print-read180ngass-modal-button-second-set print-read180ng-modal-button-save',
    ];
    if (this.state.saveClass) {
      read180saveclass.push('print-read180ngass-modal-button-save-blue');
    }
    if (this.state.gradeClass) {
      read180gradeClass.push('print-read180ngass-modal-button-equals');
    }

    return (
      <div key={i}>
        <input
          name="selected"
          type="checkbox"
          onChange={event => {
            this.handleChange(i, event);
          }}
          value={
            this.props.addread180ngassaignmentcontainer.studentDetails.students[0].student[i]
              .student_id
          }
          checked={this.state.checked}
        />
        {`${
          this.props.addread180ngassaignmentcontainer.studentDetails.students[0].student[i]
            .student_last_name
        }, `}
        {
          this.props.addread180ngassaignmentcontainer.studentDetails.students[0].student[i]
            .student_first_name
        }

        <span className="print-read180ngassaignment-modal-assignment-wrapper1">
          <input
            type="text"
            className="print-read180ngassaignment-modal-assignment-textbox1"
            name="score"
            value={this.state.score}
            onChange={event => {
              this.handleDataChange(event);
            }}
            disabled={this.state.scoreDisable}
          />
          <span>/</span>
          <input
            type="text"
            className="print-read180ngassaignment-modal-assignment-textbox2"
            name="total"
            value={this.state.total}
            onChange={event => {
              this.handleDataChange(event);
            }}
            disabled={this.state.scoreDisable}
          />
          <button className={read180gradeClass.join(' ')} onClick={this.gradeValue}>
            =
          </button>
          <input
            type="text"
            className="print-read180ngassaignment-modal-assignment-textbox3"
            name="average"
            value={this.state.average}
            onChange={event => {
              this.handleDataChange(event);
            }}
            disabled={this.state.scoreDisable}
          />
          <span>%</span>
        </span>
        <input
          type="text"
          className="print-read180ngassaignment-modal-assignment-textbox-comment"
          name="comment"
          value={this.state.comment}
          onChange={event => {
            this.handleDataChange(event);
          }}
          disabled={this.state.commentDisable}
        />
      </div>
    );
  };

  getFormattedDate(date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return `${year}-${month}-${day}`;
  }

  gradeChanges = e => {
    const numbers = /^[0-9\b]+$/;
    const change = {};

    switch (e.target.name) {
      case Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_SCORE ||
        Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_TOTAL:
        this.setState({ average: '' });
        break;
      case Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_AVERAGE:
        this.setState({ score: '' });
        this.setState({ total: '' });
        break;
      case Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_ASS_NAME:
        this.setState({ assName: e.target.value });
        break;
      case Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_COMMENT:
        this.setState({ comment: e.target.value });
        break;
      case Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_DESC:
        this.setState({ desc: e.target.value });
        break;
      default:
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    if (
      e.target.name === Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_SCORE ||
      e.target.name === Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_TOTAL ||
      e.target.name === Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_AVERAGE
    ) {
      if (e.target.value.match(numbers) || e.target.value === '') {
        change[e.target.name] = e.target.value;
        this.setState(change);
      }
    }

    if (
      e.target.name === Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_DATE_VALUE ||
      e.target.name === Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_DATE_VALUE
    ) {
      this.setState({ dateValue: e.target.value });
    }
    this.setState({ saveClass: true });

    if (this.state.score !== '' && this.state.total !== '') {
      this.setState({ gradeClass: true });
    }
    this.setState({ disableSave: false });
  };

  gradeValue = () => {
    if (this.state.score !== '' && this.state.total !== '') {
      const gPercent = Number(this.state.score) / Number(this.state.total) * 100;
      this.setState({ average: gPercent });
    }
  };

  handlePreview = () => {
    this.props.onPreview(this.state.checked);
  };

  handleChangeAll = (index, event) => {
    const customquizchecked = event.target.checked;
    if (index === 1) {
      this.setState({
        checked: customquizchecked,
        scoreDisable: !this.state.scoreDisable,
        commentDisable: !this.state.commentDisable,
        disableSave: false,
        assignmentNameError: '',
      });
    }
  };
  handleDataChange = e => {
    const numbers = /^[0-9\b]+$/;
    const change = {};
    if (e.target.name === Read180NgAssignmentConstants.READ_180_NG_ASSIGNMENT_SCORE) {
      if (e.target.value.match(numbers) || e.target.value === '') {
        change[e.target.name] = e.target.value;
        this.setState(change);
      }
    } else {
      change[e.target.name] = e.target.value;
      this.setState(change);
    }

    this.setState({ assignmentNameError: '' });
  };

  handleSubmit = () => {
    if (this.props.data.currentIndex === undefined) {
      if (this.state.assName === '') {
        this.setState({ assignmentNameError: '.Please select a Assignment name' });
        return '';
      }
      const newAssignment = {};
      newAssignment.assignmentName = this.state.assName;
      newAssignment.assignmentType = this.state.assignmentType;
      newAssignment.createdForClass = this.props.data.newassignment.createdForClass;
      newAssignment.communityId = this.props.data.newassignment.community_id;
      newAssignment.average = this.state.average;
      newAssignment.comment = this.state.comment1;
      newAssignment.studentId = this.state.studentId;
      newAssignment.dueDate = this.state.dateValue;
      this.setState({ disableSave: true });
      this.props.addNewAssignment(newAssignment);
      this.setState({ showAssignmentUpdate: true });
      return 'modelOpened';
    }
    return '';
  };

  handleCancel = () => {
    if (this.state.disableSave === false) {
      this.setState({
        cancelWarningModal: true,
      });
      return 'modelOpened';
    }
    this.props.hideCancel();
    return '';
  };

  yesWarningModalclose = () => {
    this.props.hideCancel();
  };
  cancelWarningModalconClose = () => {
    this.setState({
      cancelWarningModal: false,
    });
  };

  closeAssignmentUpdate = () => {
    this.setState({ showAssignmentUpdate: false });
  };

  handleChange = (index, event) => {
    const customquizchecked = event.target.checked;

    this.setState({
      checked: customquizchecked,
      scoreDisable: !this.state.scoreDisable,
      commentDisable: !this.state.commentDisable,
      disableSave: false,
      studentId: event.target.value,
    });
  };

  cancelWarningModal() {
    return (
      <SAMModal isOpen={this.state.cancelWarningModal} modalClassModifier="portfolio-conf-warning">
        <div>
          <div className="portfolio-conf-warning-heading">Warning </div>
          <div className="portfolio-conf-warning-txt">
            You have unsaved changes. Do you want to leave the screen without saving them?- cancel
          </div>
          <div className="portfolio-conf-warning-btn">
            <SAMButton isPrimaryButton onClickHandler={this.yesWarningModalclose}>
              Yes
            </SAMButton>
            <SAMButton onClickHandler={this.cancelWarningModalconClose}> No </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }

  showAssignmentUpdate() {
    return (
      <SAMModal
        isOpen={this.state.showAssignmentUpdate}
        modalClassModifier="portfolio-conf-success"
      >
        <div>
          <div className="portfolio-conf-success-heading"> </div>
          <div className="portfolio-conf-success-txt">Assignment Created.</div>
          <div className="portfolio-conf-success-btn">
            <SAMButton onClickHandler={this.closeAssignmentUpdate}>OK </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }

  render() {
    const { isOpen } = this.props;
    const read180gradeClass = ['print-read180ngass-modal-button-equals-gray'];
    const read180saveclass = [
      'print-read180ngass-modal-button-second-set print-read180ng-modal-button-save',
    ];
    if (this.state.saveClass) {
      read180saveclass.push('print-read180ngass-modal-button-save-blue');
    }
    if (this.state.gradeClass) {
      read180gradeClass.push('print-read180ngass-modal-button-equals');
    }

    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="modal-read180ngassaignment-modal"
          id="r180na"
        >
          <div className="print-read180ngassaignment-modal-list--wrapper">
            <div className="print-read180ngassaignment-modal-list--purple">
              <div className="print-read180ngassaignment-modal__heading">
                {this.props.data.currentIndex === undefined && (
                  <span>{this.props.data.newassignment.className}</span>
                )}
              </div>
              <div>
                <button
                  className="print-read180ngassaignment-modal__button-close"
                  onClick={this.handleCancel}
                >
                  {' '}
                  X
                </button>
              </div>
            </div>

            <div className="print-read180ngassaignment-modal-title">
              {this.props.data.currentIndex === undefined && (
                <div>
                  <span>{`${this.props.data.newassignment.className}.`}</span>
                  <span className="print-read180ngassaignment-modal-title-span">
                    {' '}
                    Assignment Type:{' '}
                    <select
                      name="assignmentType"
                      value={this.state.assignmentType}
                      className="print-read180ngassaignment-modal-select"
                      onChange={this.handleDataChange}
                    >
                      <option value="quickwrites">Quick Writes</option>
                      <option value="Final Project">Final Project</option>
                      <option value="Participation">Participation</option>
                      <option value="Evidence Based Writing">Evidence Based Writing</option>
                      <option value="Vocabulary Test">Vocabulary Test</option>
                      <option value="Workshop Wrap-Up">Workshop Wrap-Up</option>
                      <option value="others">Other</option>
                    </select>
                    <span className="ngassignment-asstype-passage-text-error">
                      {this.state.assignmentNameError}
                    </span>
                  </span>
                  <span className="print-read180ngassaignment-modal-title-span">
                    {' '}
                    Assignment Name{' '}
                    <input
                      type="textbox"
                      name="assName"
                      className="print-read180ngassaignment-modal-input-textbox"
                      value={this.state.assName}
                      onChange={this.gradeChanges}
                    />
                    <br />
                    <span className="ngassignment-name-passage-text-error">
                      {this.state.emptyName}
                    </span>
                  </span>{' '}
                </div>
              )}
            </div>

            <div className="print-read180ngassaignment-modal-description-box">
              <div className="print-read180ngassaignment-modal-description-title">Description:</div>
              <div className="print-read180ngassaignment-modal-description-textarea">
                <textarea
                  name="desc"
                  className="print-read180ngassaignment-modal-description-textarea-text"
                  rows="3"
                  cols="75"
                  value={this.state.desc}
                  onChange={this.gradeChanges}
                />
                <div className="print-read180ngassaignment-modal-description-inbox"> </div>
              </div>
            </div>

            <div className="print-read180ngassaignment-modal-due-date">
              <div className="print-read180ngassaignment-modal-description-title">Due Date:</div>
              <div className="print-read180ngassaignment-modal-due-date-textarea">
                <div className="print-read180ngassaignment-modal-due-date-inbox">
                  <p className="print-read180ngassaignment-modal-due-date-content1">
                    {' '}
                    Input a due date for the assignment or select a date from the calendar:{' '}
                  </p>
                  <input
                    className="print-read180ngassaignment-modal-due-date-input"
                    type="date"
                    name="dateValue"
                    value={this.state.dateValue}
                    onChange={this.gradeChanges}
                  />
                  <br />
                  <span className="ngassignment-date-passage-text-error">
                    {this.state.emptyDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="print-read180ngassaignment-modal-assignment-roster-box">
              <div className="print-read180ngassaignment-modal-description-title">
                Assignment Roster:
              </div>
              <div className="print-read180ngassaignment-modal-assignment-roster-textarea1">
                <div className="print-read180ngassaignment-modal-assignment-roster-div-headers11">
                  <div className="print-read180ngassaignment-modal-assignment-roster-div-details">
                    Select students that will complete the assessment. If you would like to enter
                    grades, enter percentages in the percentage fields below. You may also calculate
                    grades by entering the student&apos;s score and the total points possible and
                    clicking the equal button.
                  </div>
                  Students{' '}
                  <span className="print-read180ngassaignment-modal-assignment-span print-read180ngassaignment-modal-assignment-roster-grades">
                    Grades
                  </span>{' '}
                  <span className="print-read180ngassaignment-modal-assignment-span print-read180ngassaignment-modal-assignment-roster-comments">
                    Comments
                  </span>
                </div>

                <div className="print-read180ngassaignment-modal-assignment-wrapper1">
                  <div>
                    <input
                      name="selected"
                      type="checkbox"
                      onChange={event => {
                        this.handleChangeAll(1, event);
                      }}
                      checked={this.state.checked}
                    />
                    Select All
                  </div>

                  {this.props.data.currentIndex === undefined && (
                    <div>
                      {this.props.addread180ngassaignmentcontainer.studentDetails !== undefined &&
                        this.props.addread180ngassaignmentcontainer.studentDetails.students !==
                          undefined &&
                        this.props.addread180ngassaignmentcontainer.studentDetails.students[0].student.map(
                          (student, i) => this.getNewAssignmentRoaster(student, i)
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="print-read180ngassaignment-buttons">
              <div className="print-read180ngassaignment-modal__buttons-firstset">
                <button
                  className="print-read180ngassaignment-modal-button-first-set print-system44-modal-button-print"
                  onClick={this.handlePreview}
                >
                  Print
                </button>
                <button
                  className="print-read180ngassaignment-modal-button-first-set print-system44-modal-button-cancel"
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="print-read180ngassaignment-modal__buttons-secondset">
                <button className="print-read180ngassaignment-modal-button-second-set print-read180ngassaignment-modal-button-delete">
                  Delete
                </button>
                <button
                  className={read180saveclass.join(' ')}
                  disabled={this.state.disableSave}
                  onClick={this.handleSubmit}
                >
                  {' '}
                  Save{' '}
                </button>
              </div>
            </div>
          </div>
        </SAMModal>
        {this.cancelWarningModal()}
        {this.showAssignmentUpdate()}
      </div>
    );
  }
}

Read180NgAssaignment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hideCancel: PropTypes.func.isRequired,
  data: PropTypes.object,
  onPreview: PropTypes.func,
  addread180ngassaignmentcontainer: PropTypes.object,
  addNewAssignment: PropTypes.func.isRequired,
};

export default Read180NgAssaignment;
