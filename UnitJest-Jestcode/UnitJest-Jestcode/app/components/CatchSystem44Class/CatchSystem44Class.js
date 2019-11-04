/**
 *
 * CatchSystem44Class
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './constants';

class CatchSystem44Class extends React.Component {
  getAssignmentRoaster = (student, index) => {
    if (this.props.students != null) {
      let sys44Student = '0';
      if (
        this.props.studentDetails.students !== undefined &&
        this.props.studentDetails.students[0].student[index].applications !== undefined
      ) {
        for (
          let i = 0;
          i <
          this.props.studentDetails.students[0].student[index].applications[0].application.length;
          i += 1
        ) {
          if (
            this.props.studentDetails.students[0].student[index].applications[0].application[i]
              .app_id[0] === Constants.CATCH_ALL_CLASS_SYSTEM44
          ) {
            sys44Student = '1';
          }
        }
      }
      if (sys44Student === '1') {
        return (
          <div className="catchall-modal-assignment" key={index}>
            <div className="catchall-modal-assignment-one font-wei-normal bord-top-bot-rig">
              <input
                name={`checkbox_${index}`}
                type="checkbox"
                onChange={event => {
                  this.props.handleSelectChange(event, index);
                }}
                checked={this.props.students[index].checked}
              />
              {this.props.studentDetails.students &&
                this.props.studentDetails.students[0].student[index].student_last_name[0]}
              {this.props.studentDetails.students &&
                this.props.studentDetails.students[0].student[index].student_first_name[0]}
            </div>
            <div className="catchall-modal-assignment-one font-wei-normal bord-top-bot-rig txt-center">
              <input
                className="print-catchall-modal-assignment-textbox1"
                value={this.props.students[index].score}
                name={`score${index}`}
                onChange={event => {
                  this.props.handleInputChange(event, index);
                }}
                disabled={this.props.students[index].textdisable}
              />
              <span>/</span>
              <input
                className="print-catchall-modal-assignment-textbox2"
                value={this.props.students[index].total}
                name={`total${index}`}
                onChange={event => {
                  this.props.handleInputChange(event, index);
                }}
                disabled={this.props.students[index].textdisable}
              />
              <button
                className="print-catchall-modal-button-equals"
                name="average"
                disabled={this.props.students[index].buttonDisable}
                onClick={event => {
                  this.props.gradePercent(event, index);
                }}
              >
                =
              </button>
              <input
                type="textbox"
                className="print-catchall-modal-assignment-textbox3"
                value={this.props.students[index].average}
                name={`average${index}`}
                onChange={event => {
                  this.props.handleInputChange(event, index);
                }}
                disabled={this.props.students[index].textdisable}
              />
              <span>%</span>
            </div>
            <div className="catchall-modal-assignment-three font-wei-normal bord-top-bot-rig">
              <input
                type="textbox"
                className="print-catchall-modal-assignment-textbox-comment"
                value={this.props.students[index].comment}
                name={`comment${index}`}
                onChange={event => {
                  this.props.handleInputChange(event, index);
                }}
              />
            </div>
          </div>
        );
      }
    }
    return '';
  };
  render() {
    return (
      <div className="catchall-modal-title">
        <div className="catchall-name">
          <div>
            <div className="print-catchallclass-modal-title">
              <span className="catchallclass-assignmenttype-error-content">Students :</span>
              <span className="print-catchallclass-modal-title-span"> </span>{' '}
              <div className="catchallclass-assignmenttype-error-main">
                <span className="print-catchallclass-modal-title-span">
                  {' '}
                  <select
                    name="communityId"
                    onChange={this.props.handleDatachange}
                    className="assignment-passage-select"
                    value={this.props.communityId}
                  >
                    <option value="">Select Program</option>
                    <option value="M180Y2">Math 180 Year 2</option>
                    <option value="S44JR">iRead</option>
                    <option value="S44NG,R180NG">System 44 Next Generation</option>
                  </select>
                </span>{' '}
              </div>
              <span className="catchallclass-assignmenttype-error-content">Assignment Type: </span>
              <div className="catchallclass-assignmenttype-error-main">
                <select
                  className="print-catchall-modal-select"
                  name="assignmentType"
                  onChange={this.props.gradeChanges}
                >
                  <option value="">Assignment Type </option>
                  <option value="QuickWrites">QuickWrites </option>
                  <option value="Participation">Participation</option>
                  <option value="Evidence Based Writing">Evidence Based Writing</option>
                  <option value="Research">Research</option>
                  <option value="others">Other</option>
                </select>{' '}
                <span className="catchallclass-error-text-color">
                  {this.props.assignmentTypeError}
                </span>
              </div>
              <span className="catchallclass-assignmenttype-error-content">Assignment Name </span>
              <div className="catchallclass-assignmenttype-error-main">
                <input
                  type="textbox"
                  name="assName"
                  className="print-catchall-modal-input-textbox"
                  value={this.props.name}
                  onChange={this.props.gradeChanges}
                />
                <span className="catchallclass-error-text-color">
                  {this.props.assignmentNameError}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="print-catchall-modal-description-box">
          <div className="print-catchall-modal-description-title">Description:</div>
          <div className="print-catchall-modal-description-textarea">
            <textarea
              name="desc"
              className="print-catchall-modal-description-textarea-text"
              rows="3"
              cols="75"
              value={this.props.desc}
              onChange={this.props.gradeChanges}
            />
            <div className="print-catchall-modal-description-inbox"> </div>
          </div>
        </div>
        <div className="print-catchall-modal-due-date">
          <div className="print-catchall-modal-description-title">Due Date:</div>
          <div className="print-catchall-modal-due-date-textarea">
            <div className="print-catchall-modal-due-date-inbox">
              <p className="print-catchall-modal-due-date-content1">
                {' '}
                Input a due date for the assignment or select a date from the calendar:{' '}
              </p>
              <div className="catchallclass-print-due-date">
                <input
                  className="print-catchall-modal-due-date-input"
                  type="date"
                  name="dateValue"
                  value={this.props.dateValue}
                  onChange={this.props.gradeChanges}
                />
                <span className="catchallclass-error-text-color">{this.props.dueDateError}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="print-catchall-modal-assignment-roster-box">
          <div className="print-catchall-modal-description-title">Assignment Roster:</div>
          <div className="print-catchall-modal-assignment-roster-textarea1">
            <div className="print-catchall-modal-assignment-roster-div-headers11">
              <div className="print-catchall-modal-assignment-roster-div-details">
                <div className="print-catchall-modal-assignment-roster-main">
                  <div className="print-catchall-modal-assignment-roster-div-conent">
                    Select students that will complete the assessment. If you would like to enter
                    grades, enter percentages in the percentage fields below. You may also calculate
                    grades by entering the student&apos;s score and the total points possible and
                    clicking the equal button.
                  </div>
                  <div className="print-catchall-modal-assignment-roster-div-content-error">
                    <span className="catchallclass-error-text-color">
                      {this.props.studentError}
                    </span>
                  </div>
                </div>
                <br />
              </div>
              Students{' '}
              <span className="print-catchall-modal-assignment-span print-catchall-modal-assignment-roster-grades">
                Grades
              </span>{' '}
              <span className="print-catchall-modal-assignment-span print-catchall-modal-assignment-roster-comments">
                Comments
              </span>
            </div>
            <div className="print-catchall-modal-assignment-wrapper1">
              <div>
                <input
                  name="selected"
                  type="checkbox"
                  onChange={event => {
                    this.props.handleAllSelectChange(event);
                  }}
                  checked={this.props.checked}
                />
                Select All
              </div>

              <div className="print-catchall-modal-assignment-roster-inbox"> </div>
              <div>
                {this.props.studentDetails !== undefined &&
                  this.props.studentDetails.students !== undefined &&
                  this.props.studentDetails.students[0].student.map((student, i) =>
                    this.getAssignmentRoaster(student, i)
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CatchSystem44Class.propTypes = {
  handleDatachange: PropTypes.func,
  communityId: PropTypes.string,
  assignmentTypeError: PropTypes.string,
  name: PropTypes.string,
  gradeChanges: PropTypes.func,
  assignmentNameError: PropTypes.string,
  desc: PropTypes.string,
  dateValue: PropTypes.string,
  dueDateError: PropTypes.string,
  studentError: PropTypes.string,
  handleAllSelectChange: PropTypes.func,
  checked: PropTypes.bool,
  studentDetails: PropTypes.any,
  students: PropTypes.array,
  handleSelectChange: PropTypes.func,
  handleInputChange: PropTypes.func,
  gradePercent: PropTypes.func,
};

export default CatchSystem44Class;
