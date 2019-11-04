/**
 *
 * AddAssignmentComponent
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import * as Constants from './constants';
import './AddAssignmentComponent.scss';

class AddAssignmentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked1: false,
      score: '',
      comment: '',
      scoreDisable: true,
      commentDisable: true,
      disableSave: true,
      assignmentName: '',
      assignmentNameError: '',
      studentId: '',
      showAssignmentUpdate: false,
    };
  }
  getNewAssignmentRoaster = (student, i) => {
    const studentDetails = this.props.addassignmentcontainer.studentDetails.students[i].student[0];
    return (
      <div className="iread-modal-assignment" key={i}>
        <div className="iread-modal-assignment-one font-wei-normal bord-top-bot-rig">
          <input
            type="checkbox"
            onChange={event => {
              this.handleChange(i, event);
            }}
            value={studentDetails.student_id}
            checked={this.state.checked1}
          />
          {studentDetails.student_first_name}
          {studentDetails.student_last_name}
        </div>
        <div className="iread-modal-assignment-one font-wei-normal bord-top-bot-rig txt-center">
          <input
            type="text"
            className="iread-modal-assignment-textbox1"
            value={this.state.score}
            name="score"
            onChange={event => {
              this.handleDatachange(event);
            }}
            disabled={this.state.scoreDisable}
          />
        </div>
        <div className="iread-modal-assignment-three font-wei-normal bord-top-bot-rig">
          <input
            type="textbox"
            className="iread-modal-assignment-textbox-comment"
            value={this.state.comment}
            name="comment"
            onChange={event => {
              this.handleDatachange(event);
            }}
            disabled={this.state.commentDisable}
          />
        </div>
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

  handleChangeAll = (index, event) => {
    const customQuizChecked = event.target.checked;
    if (index === 1) {
      this.setState({
        checked: customQuizChecked,
        checked1: customQuizChecked,
        scoreDisable: !this.state.scoreDisable,
        commentDisable: !this.state.commentDisable,
        disableSave: false,
        assignmentNameError: '',
      });
    }
  };
  handleDatachange = e => {
    const numbers = /^[0-9\b]+$/;
    const change = {};
    if (e.target.name === Constants.CLASS_SCORE) {
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
      if (this.state.assignmentName === '') {
        this.setState({ assignmentNameError: Constants.ASSIGNMENT_NAME_ERROR });
        return '';
      }
      const currDate = this.getFormattedDate(new Date());
      const newAssignment = {};
      newAssignment.assignmentName = this.state.assignmentName;
      newAssignment.assignmentType = this.props.data.newassignment.from;
      newAssignment.createdForClass = this.props.data.newassignment.createdForClass;
      newAssignment.communityId = this.props.data.newassignment.community_id;
      newAssignment.average = this.state.score;
      newAssignment.comment = this.state.comment;
      newAssignment.studentId = this.state.studentId;
      newAssignment.dueDate = currDate;
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
        cancelwarningModal: true,
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
      cancelwarningModal: false,
    });
  };

  closeAssignmentUpdate = () => {
    this.setState({ showAssignmentUpdate: false });
  };

  handleChange = (index, event) => {
    const customQuizChecked = event.target.checked;
    this.setState({
      checked1: customQuizChecked,
      scoreDisable: !this.state.scoreDisable,
      commentDisable: !this.state.commentDisable,
      disableSave: false,
      studentId: event.target.value,
    });
  };
  render() {
    const { isOpen } = this.props;
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="modal--iread-modal"
        >
          <div className="iread-modal-list--wrapper">
            <div className="iread-modal-list--purple">
              <div className="iread-modal-heading">
                {this.props.data.currentIndex === undefined && (
                  <span>{this.props.data.newassignment.className}</span>
                )}
              </div>
              <div>
                <button className="iread-modal-button-close" onClick={this.handleCancel}>
                  {' '}
                  X
                </button>
              </div>
            </div>

            <div className="iread-modal-title">
              <div className="iread-name">
                {this.props.data.currentIndex === undefined && (
                  <div>
                    <div className="assignment-classname-text">
                      {`${this.props.data.newassignment.className}. ${
                        this.props.data.newassignment.from
                      }. `}
                      Fluency Passage:
                    </div>
                    <div className="assignment-passage-text">
                      <select
                        name="assignmentName"
                        className="assignment-passage-select"
                        onChange={this.handleDatachange}
                      >
                        <option value="">Select a Fluency Passage</option>
                        <option value="Grade 1:Benchmark Passage1">
                          Grade 1:Benchmark Passage1
                        </option>
                        <option value="Grade 1:Benchmark Passage2">
                          Grade 1:Benchmark Passage2
                        </option>
                        <option value="Grade 2:Benchmark Passage1">
                          Grade 2:Benchmark Passage1
                        </option>
                        <option value="Grade 2:Benchmark Passage2">
                          Grade 2:Benchmark Passage2
                        </option>
                        <option value="Grade 2:Benchmark Passage3">
                          Grade 2:Benchmark Passage3
                        </option>
                      </select>
                      <span className="assignment-passage-text-error">
                        {this.state.assignmentNameError}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="s44">
              <div className="iread-modal-student-box">
                <div className="iread-modal-description-title">Assignment Roster:</div>
              </div>
            </div>
            <div className="iread-modal-assignment-roster-textarea">
              <div className="iread-modal-assignment-roster-div-headers">
                <div className="iread-modal-assignment-mesg">
                  Select Students that will comeplete the Assignment. Enter Words Correct Per Minute
                  (WCPM) in the field below.
                </div>
                <div className="iread-modal-assignment">
                  <div className="iread-modal-assignment-one">Students</div>
                  <div className="iread-modal-assignment-one">WPCM</div>
                  <div className="iread-modal-assignment-three">Comments</div>
                </div>
                <div className="iread-modal-assignment">
                  <div className="iread-modal-assignment-one font-wei-normal bord-bot">
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
                  <div className="iread-modal-assignment-one font-wei-normal bord-bot" />
                  <div className="iread-modal-assignment-three font-wei-normal bord-bot" />
                </div>
                <div>
                  {this.props.data.currentIndex === undefined && (
                    <div>
                      {this.props.addassignmentcontainer.studentDetails !== undefined &&
                        this.props.addassignmentcontainer.studentDetails.students !== undefined &&
                        this.props.addassignmentcontainer.studentDetails.students.map(
                          (student, i) => this.getNewAssignmentRoaster(student, i)
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="iread-modal-buttons">
              <div className="iread-modal-buttons-firstset">
                <button className="iread-modal-button mr-r-12" onClick={this.handlePreview}>
                  Print
                </button>
                <button className="iread-modal-button" onClick={this.handleCancel}>
                  Cancel
                </button>
              </div>
              <div className="iread-modal-buttons-secondset">
                <SAMButton isPrimaryButton>Delete</SAMButton>
                <SAMButton onClickHandler={this.handleSubmit} disabled={this.state.disableSave}>
                  {' '}
                  Save{' '}
                </SAMButton>
              </div>
            </div>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.state.cancelwarningModal}
          modalClassModifier="portfolio-conf-warning"
        >
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
      </div>
    );
  }
}

AddAssignmentComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hideCancel: PropTypes.func.isRequired,
  data: PropTypes.object,
  addassignmentcontainer: PropTypes.object,
  addNewAssignment: PropTypes.func.isRequired,
};

export default AddAssignmentComponent;
