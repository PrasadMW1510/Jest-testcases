/**
 *
 * CatchAllClass
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import PropTypes from 'prop-types';
import CatchiReadClass from 'components/CatchiReadClass';

import CatchSystem44Class from 'components/CatchSystem44Class';
import CatchAllClassMath180 from 'components/CatchAllClassMath180';
import CatchAllClassWarning from 'components/CatchAllClassWarning';

import * as CatchAllClassConstants from './constants';
import './CatchAllClass.scss';

class CatchAllClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      communityId: '',
      disableSave: true,
      assignmentNameError: '',
      assignmentName: '',
      scoreDisable: true,
      commentDisable: true,
      score: '',
      showAssignmentUpdate: false,
      name: '',
      selected: '',
      average: '',
      total: '',
      comment: '',
      desc: '',
      dateValue: '',
      checked: false,
      checked1: false,
      students: null,
      disableAverage: true,
      disableModalSave: true,
      assignmentTypeError: '',
      dueDateError: '',
      studentError: '',
    };
  }

  getFormattedDate(date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return `${year}-${month}-${day}`;
  }

  handleInputChange = (event, index) => {
    const students = this.state.students;

    const numbers = /^[0-9\b]+$/;
    let disableAverage;
    switch (event.target.name) {
      case CatchAllClassConstants.CATCH_ALL_CLASS_DESCRIPTION:
        this.setState({
          selected: event.target.value,
          assignmentTypeError: '',
        });
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_ASSIGNMENTTYPE:
        this.setState({
          assignmentType: event.target.value,
        });
        break;
      case `comment${index}`:
        students[index].comment = event.target.value;
        break;
      case `average${index}`:
        if (event.target.value.match(numbers) || event.target.value === '') {
          students[index].average = event.target.value;
          students[index].score = '';
          students[index].total = '';
        }
        break;
      case `score${index}`:
        if (event.target.value.match(numbers) || event.target.value === '') {
          students[index].score = event.target.value;
          students[index].average = '';
        }
        break;
      case `total${index}`:
        if (event.target.value.match(numbers) || event.target.value === '') {
          students[index].total = event.target.value;
          students[index].average = '';
        }
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_ASSIGNMENT_NAME:
        this.setState({ assignmentNameError: '' });
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_DATEVALUE:
        this.setState({ dateValue: '' });
        break;
      default:
        break;
    }

    if (students[index].total === '' || students[index].score === '') {
      disableAverage = true;
      students[index].buttonDisable = true;
    } else {
      disableAverage = false;
      students[index].buttonDisable = false;
    }

    this.setState({
      students,
      disableSave: false,
      disableAverage,
      disableModalSave: false,
    });
  };

  handleSelectChange = (event, index) => {
    const students = [...this.state.students];
    students[index].checked = !students[index].checked;
    students[index].textdisable = !students[index].checked;
    if (event.target.name === `checkbox_${index}`) {
      this.setState({
        students,
      });
    }
    if (students[index].checked) {
      this.setState({ disableSave: false });
    }
    this.setState({ studentError: '' });
  };

  gradePercent = (event, index) => {
    const students = [...this.state.students];
    let gPercent = 0;
    let percentageAverageLimit = false;
    if (students[index].score !== '' && students[index].total !== '') {
      gPercent = Number(students[index].score) / Number(students[index].total) * 100;
      if (gPercent >= 0 && gPercent <= 100) {
        students[index].average = gPercent;
      } else {
        students[index].average = '';
        percentageAverageLimit = true;
      }
      this.setState({ students, percentageAverageLimit });
    }
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
    if (e.target.name === CatchAllClassConstants.CATCH_ALL_CLASS_SCORE) {
      if (e.target.value.match(numbers) || e.target.value === '') {
        change[e.target.name] = e.target.value;
        this.setState(change);
      }
    } else {
      change[e.target.name] = e.target.value;
      this.setState(change);
    }
    if (e.target.name === CatchAllClassConstants.CATCH_ALL_CLASS_COMMUNITYID) {
      if (e.target.value === CatchAllClassConstants.CATCH_ALL_CLASS_IREAD) {
        this.props.getStudentDetails(this.props.data.newclassId);
      }
      if (e.target.value === CatchAllClassConstants.CATCH_ALL_CLASS_SYSTEM44) {
        this.props.getStudentDetails(this.props.data.newclassId);
      }
    }

    this.setState({ assignmentNameError: '' });
  };

  gradeChanges = e => {
    const numbers = /^[0-9\b]+$/;
    const change = {};

    switch (e.target.name) {
      case CatchAllClassConstants.CATCH_ALL_CLASS_SCORE:
        if (e.target.value.match(numbers) || e.target.value === '') {
          change[e.target.name] = e.target.value;
          this.setState(change);
        }
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_TOTAL:
        if (e.target.value.match(numbers) || e.target.value === '') {
          change[e.target.name] = e.target.value;
          this.setState(change);
        }
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_AVERAGE:
        if (e.target.value.match(numbers) || e.target.value === '') {
          change[e.target.name] = e.target.value;
          this.setState(change);
        }
        this.setState({ score: '', total: '' });
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_ASSIGNMENT_NAME:
        this.setState({ name: e.target.value, assignmentNameError: '' });
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_ASSIGNMENTTYPE:
        this.setState({ selected: e.target.value, assignmentTypeError: '' });
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_COMMENT:
        this.setState({ comment: e.target.value });
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_DESC:
        this.setState({ desc: e.target.value });
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_DATE:
        this.setState({ date: e.target.value });
        break;
      case CatchAllClassConstants.CATCH_ALL_CLASS_DATEVALUE:
        this.setState({ dueDateError: '' });
        this.setState({ dateValue: e.target.value });
        break;
      default:
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    if (
      e.target.name === CatchAllClassConstants.CATCH_ALL_CLASS_SCORE ||
      e.target.name === CatchAllClassConstants.CATCH_ALL_CLASS_TOTAL
    ) {
      this.setState({ average: '' });
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

  handleSubmit = () => {
    if (this.state.communityId === CatchAllClassConstants.CATCH_ALL_CLASS_IREAD) {
      if (this.state.assignmentName === '') {
        this.setState({
          assignmentNameError: CatchAllClassConstants.CATCH_ALL_ASSIGNMENT_NAME_ERROR,
        });
        return '';
      }
      const currDate = this.getFormattedDate(new Date());
      const newAssignment = {};
      newAssignment.assignmentName = this.state.assignmentName;
      newAssignment.assignmentType = CatchAllClassConstants.CATCH_ALL_ASSIGNMENT_TYPE;
      newAssignment.createdForClass = this.props.data.newclassId;
      newAssignment.communityId = CatchAllClassConstants.CATCH_ALL_CLASS_IREAD;
      newAssignment.average = this.state.score;
      newAssignment.comment = this.state.comment;
      newAssignment.studentId = this.state.studentId;
      newAssignment.dueDate = currDate;
      this.setState({ disableSave: true });
      this.props.addNewAssignment(newAssignment);
      this.setState({ showAssignmentUpdate: true });
      return 'modelOpened';
    } else if (this.state.communityId === CatchAllClassConstants.CATCH_ALL_CLASS_SYSTEM44) {
      let validation = true;
      if (this.state.selected === '') {
        this.setState({
          assignmentTypeError: CatchAllClassConstants.CATCH_ALL_ASSIGNMENT_TYPE_ERROR,
        });
        validation = false;
      }
      if (this.state.name === '') {
        this.setState({
          assignmentNameError: CatchAllClassConstants.CATCH_ALL_ASSGNMENT_SYSTEM_NAME_ERROR,
        });
        validation = false;
      }
      if (this.state.dateValue === '') {
        this.setState({ dueDateError: CatchAllClassConstants.CATCH_ALL_DATE_ERROR });
        validation = false;
      }
      if (validation === true) {
        let stuCheckCount = 0;
        for (let i = 0; i < this.state.students.length; i += 1) {
          if (this.state.students[i].checked === true) {
            stuCheckCount += 1;
          }
        }
        if (stuCheckCount === 0) {
          validation = false;
          this.setState({ studentError: CatchAllClassConstants.CATCH_ALL_STUDENT_ERROR });
        }
      }
      if (validation === true) {
        this.props.postSavedData({ ...this.state });
        this.setState({ disableSave: true, showAssignmentUpdate: true });
        return 'modelOpened';
      }
    }
    return '';
  };

  handleAllSelectChange = event => {
    const students = [...this.state.students];
    this.setState(nextState => ({
      checked: !nextState.checked,
    }));
    const checkedStudents = students.map(student => ({
      ...student,
      checked: !this.state.checked,
      textdisable: this.state.checked,
    }));
    if (event.target.checked) {
      this.setState({
        disableSave: false,
      });
    }
    this.setState({
      students: checkedStudents,
      studentError: '',
    });
  };

  handleReadChange = (index, event) => {
    const customQuizChecked = event.target.checked;
    if (index === 1) {
      this.setState({
        checked: customQuizChecked,
        checked1: customQuizChecked,
      });
    } else if (index === 2) {
      this.setState({
        checked1: customQuizChecked,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
    this.setState({ disableSave: false });
  };

  handleCancel = () => {
    if (this.state.disableSave === false) {
      this.setState({
        cancelwarningModal: true,
      });
      return 'modelOpened';
    }
    this.props.handleCancel();
    return '';
  };

  yesWarningModalclose = () => {
    this.props.handleCancel();
  };
  cancelWarningModalconClose = () => {
    this.setState({
      cancelwarningModal: false,
    });
  };

  studentsData = () => {
    let students;
    let studentsMap;
    if (this.state.students === null) {
      if (
        this.props.catchallclasscontainer.studentDetails !== undefined &&
        this.props.catchallclasscontainer.studentDetails.students !== undefined
      ) {
        students = this.props.catchallclasscontainer.studentDetails.students[0].student;
        studentsMap = students.map(student => ({
          ...student,
          total: student.total ? student.total : '',
          score: student.score ? student.score : '',
          comment: student.comment ? student.comment : '',
          average: student.average ? student.average : '',
          checked: student.checked ? student.checked : false,
          textdisable: student.checked ? student.textdisable : true,
          buttonDisable: student.checked ? student.buttonDisable : true,
        }));
        this.setState({
          students: studentsMap,
        });
      }
    }
  };

  render() {
    const { isOpen } = this.props;
    if (
      this.props.catchallclasscontainer.studentDetails !== undefined &&
      this.props.catchallclasscontainer.studentDetails.students !== undefined
    ) {
      this.studentsData();
    }
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="modal--catchallclass-modal"
          id="r180na"
        >
          <div className="print-catchallclass-modal-list--wrapper">
            <div className="print-catchallclass-modal-list--purple">
              <div className="print-catchallclass-modal__heading">
                {this.props.data.newassignment.className}
              </div>
              <div>
                <button
                  className="print-catchallclass-modal__button-close"
                  onClick={this.handleCancel}
                >
                  X
                </button>
              </div>
            </div>
            {(this.state.communityId === '' ||
              this.state.communityId === CatchAllClassConstants.CATCH_ALL_CLASS_MATH180) && (
              <CatchAllClassMath180 handleDatachange={this.handleDatachange} />
            )}

            {this.state.communityId === CatchAllClassConstants.CATCH_ALL_CLASS_IREAD && (
              <CatchiReadClass
                studentDetails={this.props.catchallclasscontainer.studentDetails}
                handleDatachange={this.handleDatachange}
                handleChangeAll={this.handleChangeAll}
                checked={this.state.checked}
                checked1={this.state.checked1}
                assignmentNameError={this.state.assignmentNameError}
                assignmentName={this.state.assignmentName}
                communityId={this.state.communityId}
                score={this.state.score}
                scoreDisable={this.state.scoreDisable}
                comment={this.state.comment}
                commentDisable={this.state.commentDisable}
                handleChange={this.handleChange}
              />
            )}
            {this.state.communityId === CatchAllClassConstants.CATCH_ALL_CLASS_SYSTEM44 && (
              <CatchSystem44Class
                handleDatachange={this.handleDatachange}
                communityId={this.state.communityId !== '' ? this.state.communityId : ''}
                assignmentTypeError={this.state.assignmentTypeError}
                name={this.state.name}
                gradeChanges={this.gradeChanges}
                assignmentNameError={this.state.assignmentNameError}
                desc={this.state.desc}
                dateValue={this.state.dateValue}
                dueDateError={this.state.dueDateError}
                studentError={this.state.studentError}
                handleAllSelectChange={this.handleAllSelectChange}
                checked={this.state.checked}
                studentDetails={this.props.catchallclasscontainer.studentDetails}
                students={this.state.students}
                handleSelectChange={this.handleSelectChange}
                handleInputChange={this.handleInputChange}
                gradePercent={this.gradePercent}
              />
            )}
            <div className="show-catchallclass-modal-line"> </div>
            <div className="print-activate-quiz__buttons">
              <div className="print-activate-quiz__primary-button">
                <div className="print-catchallclass-modal__buttons-firstset">
                  <button
                    className="print-catchallclass-modal-button-first-set print-system44-modal-button-print"
                    onClick={this.print}
                    disabled="true"
                  >
                    Print
                  </button>
                  <button
                    className="print-catchallclass-modal-button-first-set print-system44-modal-button-cancel"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="print-catchallclass-modal__buttons-secondset">
                  <button
                    className="print-catchallclass-modal-button-second-set print-catchallclass-modal-button-delete"
                    disabled="true"
                  >
                    Delete
                  </button>

                  <button
                    className="print-catchallclass-modal-button-second-set print-catchallclass-modal-button-save"
                    disabled={this.state.disableSave}
                    onClick={this.handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SAMModal>
        <CatchAllClassWarning
          showAssignmentUpdate={this.state.showAssignmentUpdate}
          closeAssignmentUpdate={this.closeAssignmentUpdate}
          cancelwarningModal={this.state.cancelwarningModal}
          yesWarningModalclose={this.yesWarningModalclose}
          cancelWarningModalconClose={this.cancelWarningModalconClose}
        />
      </div>
    );
  }
}

CatchAllClass.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  catchallclasscontainer: PropTypes.object,
  addNewAssignment: PropTypes.func.isRequired,
  postSavedData: PropTypes.func.isRequired,
  getStudentDetails: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default CatchAllClass;
