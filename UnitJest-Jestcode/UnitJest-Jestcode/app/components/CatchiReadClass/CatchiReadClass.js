/**
 *
 * CatchiReadClass
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class CatchiReadClass extends React.Component {
  getNewAssignmentRoaster = (student, i) => (
    <div className="catchall-modal-assignment" key={i}>
      <div className="catchall-modal-assignment-one font-wei-normal bord-top-bot-rig">
        <input
          type="checkbox"
          onChange={event => {
            this.props.handleChange(i, event);
          }}
          value={this.props.studentDetails.students[i].student[0].student_id}
          checked={this.props.checked1}
        />
        {this.props.studentDetails.students[i].student[0].student_first_name}
        {this.props.studentDetails.students[i].student[0].student_last_name}
      </div>
      <div className="catchall-modal-assignment-one font-wei-normal bord-top-bot-rig txt-center">
        <input
          type="text"
          className="catchall-modal-assignment-textbox1"
          value={this.props.score}
          name="score"
          onChange={event => {
            this.props.handleDatachange(event);
          }}
          disabled={this.props.scoreDisable}
        />
      </div>
      <div className="catchall-modal-assignment-three font-wei-normal bord-top-bot-rig">
        <input
          type="textbox"
          className="catchall-modal-assignment-textbox-comment"
          value={this.props.comment}
          name="comment"
          onChange={event => {
            this.props.handleDatachange(event);
          }}
          disabled={this.props.commentDisable}
        />
      </div>
    </div>
  );

  render() {
    return (
      <div className="catchall-modal-title">
        <div className="catchall-name">
          <div>
            <div className="print-catchallclass-modal-title">
              Students :
              <span className="print-catchallclass-modal-title-span"> </span>{' '}
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
              Oral Fluency Assestment Fluency Passage:{' '}
              <select
                name="assignmentName"
                className="assignment-passage-select"
                onChange={this.props.handleDatachange}
                value={this.props.assignmentName}
              >
                <option value="">Select a Fluency Passage</option>
                <option value="Grade 1:Benchmark Passage1">Grade 1:Benchmark Passage1</option>
                <option value="Grade 1:Benchmark Passage2">Grade 1:Benchmark Passage2</option>
                <option value="Grade 2:Benchmark Passage1">Grade 2:Benchmark Passage1</option>
                <option value="Grade 2:Benchmark Passage2">Grade 2:Benchmark Passage2</option>
                <option value="Grade 2:Benchmark Passage3">Grade 2:Benchmark Passage3</option>
              </select>
              <span className="assignment-passage-text-error">
                {this.props.assignmentNameError}
              </span>
            </div>
          </div>
        </div>

        <div className="catch-ireadclass-s44">
          <div className="catchall-modal-student-box">
            <div className="catchall-modal-description-title">Assignment Roster:</div>
          </div>
        </div>
        <div className="catchall-modal-assignment-roster-textarea">
          <div className="catchall-modal-assignment-roster-div-headers">
            <div className="catchall-modal-assignment-mesg">
              Select Students that will comeplete the Assignment. Enter Words Correct Per Minute
              (WCPM) in the field below.
            </div>
            <div className="catchall-modal-assignment">
              <div className="catchall-modal-assignment-one">Students</div>
              <div className="catchall-modal-assignment-one">WPCM</div>
              <div className="catchall-modal-assignment-three">Comments</div>
            </div>
            <div className="catchall-modal-assignment">
              <div className="catchall-modal-assignment-one font-wei-normal bord-bot">
                <input
                  name="selected"
                  type="checkbox"
                  onChange={event => {
                    this.props.handleChangeAll(1, event);
                  }}
                  checked={this.props.checked}
                />
                Select All
              </div>
              <div className="catchall-modal-assignment-one font-wei-normal bord-bot" />
              <div className="catchall-modal-assignment-three font-wei-normal bord-bot" />
            </div>
            <div>
              {this.props.studentDetails !== undefined &&
                this.props.studentDetails.students !== undefined &&
                this.props.studentDetails.students.map((student, i) =>
                  this.getNewAssignmentRoaster(student, i)
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CatchiReadClass.propTypes = {
  studentDetails: PropTypes.object,
  handleDatachange: PropTypes.func,
  handleChangeAll: PropTypes.func,
  handleChange: PropTypes.func,
  checked: PropTypes.bool,
  checked1: PropTypes.bool,
  assignmentNameError: PropTypes.string,
  assignmentName: PropTypes.string,
  communityId: PropTypes.string,
  score: PropTypes.string,
  scoreDisable: PropTypes.bool,
  comment: PropTypes.string,
  commentDisable: PropTypes.bool,
};

export default CatchiReadClass;
