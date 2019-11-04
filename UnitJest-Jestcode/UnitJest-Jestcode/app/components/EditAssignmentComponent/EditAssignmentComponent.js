/**
 *
 * EditAssignmentComponent
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import './EditAssignmentComponent.scss';
import UnsavedChangesModal from './UnSavedChangesModal';
import DeleteModal from './DeleteModal';
import CheckboxChangeModal from './CheckboxChangeModal';
import UnsavedChangesNavigationModal from './UnsavedChangesNavigationModal';

class EditAssignmentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitalState();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillReceiveProps(nextProps) {
    let studentsMap;
    let students;
    if (nextProps.editassignmentcontainer.respAssignmentData) {
      if (
        nextProps.editassignmentcontainer.respAssignmentData.classAssignment[0]
          .studentAssignments[0].student
      ) {
        students = [
          ...nextProps.editassignmentcontainer.respAssignmentData.classAssignment[0]
            .studentAssignments[0].student,
        ];

        studentsMap = students.map(student => {
          const studentItem = student;
          if (!studentItem.average) {
            studentItem.average = [''];
          }
          if (!studentItem.comment) {
            studentItem.comment = [''];
          }
          if (!studentItem.score) {
            studentItem.score = [''];
          }
          if (!studentItem.total) {
            studentItem.total = [''];
          }
          return { ...studentItem, checked: true };
        });

        if (
          nextProps.editassignmentcontainer.saveAssignmentSuccess &&
          nextProps.editassignmentcontainer.saveAssignmentSuccess.isGraded.length > 0
        ) {
          this.setState(prevState => ({
            students: prevState.students,
          }));
        } else {
          this.setState({
            students: studentsMap,
          });
        }
        if (nextProps.editassignmentcontainer.respAssignmentData.description) {
          this.setState({
            description: nextProps.editassignmentcontainer.respAssignmentData.description[0],
          });
        } else {
          this.setState({
            description: '',
          });
        }

        this.setState({
          assignmentName: nextProps.editassignmentcontainer.respAssignmentData.assignmentName[0],
          assignmentType: nextProps.editassignmentcontainer.respAssignmentData.assignmentType[0],
          communityId:
            nextProps.editassignmentcontainer.respAssignmentData.classAssignment[0].$.communityId,
          dueDate: nextProps.editassignmentcontainer.respAssignmentData.dueDate[0],
          wholeClass: nextProps.editassignmentcontainer.respAssignmentData.$.wholeClass,
        });
      }
    }

    if (nextProps.editassignmentcontainer.saveAssignmentSuccess) {
      if (nextProps.editassignmentcontainer.saveAssignmentSuccess.isGraded.length > 0) {
        this.setState({ showGoalSaveSuccessModal: true });
      } else {
        this.setState({ showGoalSaveSuccessModal: false });
      }
    }
    if (nextProps.editassignmentcontainer.deleteAssignmentSucess) {
      if (nextProps.editassignmentcontainer.deleteAssignmentSucess.isGraded.length > 0) {
        this.setState({ showDeleteSuccessModal: true });
      } else {
        this.setState({ showDeleteSuccessModal: false });
      }
      this.handleCancel();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  getInitalState() {
    return {
      students: null,
      assignmentName: null,
      assignmentType: null,
      communityId: null,
      description: null,
      dueDate: null,
      wholeClass: null,
      average: null,
      score: null,
      total: null,
      showSaveSuccessModal: false,
      showDeleteSuccessModal: false,
      selectAll: true,
      deleteWarningModal: false,
      saveModal: false,
      currentPageIndex: this.props.data.currentIndex,
      showGoalSaveSuccessModal: false,
      showSavedGradeModal: false,
      percentageAverageLimit: false,
      disableAverage: true,
      disableModalSave: true,
    };
  }

  getAssignmentRoaster = (student, index) => {
    if (this.props.data.classId.community_id !== 'S44JR') {
      return (
        <div className="edit-assignment-component__modal--assignment">
          <div className="edit-assignment-component__modal-assignment--one font-wei-normal bord-top-bot-rig txt__no--center">
            <input
              className="edit-assignment-component__assignment--textbox1"
              value={this.state.students[index].score[0]}
              name={`selectStudent${index}`}
              onChange={event => {
                this.handleInputChange(event, index);
              }}
            />
            <span className="edit-assignment-component__modal-assignment--span">/</span>
            <input
              className="edit-assignment-component__modal-assignment--textbox2"
              value={this.state.students[index].total[0]}
              name={`total${index}`}
              onChange={event => {
                this.handleInputChange(event, index);
              }}
            />
            <button
              className="edit-assignment-component__modal-button--equals"
              name="average"
              disabled={this.state.disableAverage}
              onClick={event => {
                this.gradePercent(event, index);
              }}
            >
              =
            </button>
            <input
              type="textbox"
              className="edit-assignment-component__modal-assignment--textbox3"
              value={this.state.students[index].average[0]}
              name={`average${index}`}
              onChange={event => {
                this.handleInputChange(event, index);
              }}
            />
            <span className="edit-assignment-component__modal-assignment--span">%</span>
          </div>
          <div className="edit-assignment-component__modal-assignment--three font-wei-normal bord-top-bot-rig">
            <input
              type="textbox"
              className="edit-assignment-component__modal-assignment-textbox--comment"
              value={this.state.students[index].comment[0]}
              name={`comment${index}`}
              onChange={event => {
                this.handleInputChange(event, index);
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="edit-assignment-component__modal--assignment" key={index}>
        <div className="edit-assignment-component__modal-assignment--one font-wei-normal bord-top-bot-rig txt-center">
          <input
            className="edit-assignment-component__assignment--textbox1"
            value={this.state.students[index].average[0]}
            name={`average${index}`}
            onChange={event => {
              this.handleInputChange(event, index);
            }}
          />
        </div>
        <div className="edit-assignment-component__modal-assignment--three font-wei-normal bord-top-bot-rig">
          <input
            type="textbox"
            className="edit-assignment-component__modal-assignment-textbox--comment"
            value={this.state.students[index].comment[0]}
            name={`comment${index}`}
            onChange={event => {
              this.handleInputChange(event, index);
            }}
          />
        </div>
      </div>
    );
  };

  handleSubmit = () => {
    this.props.saveAssignmentRequest({ ...this.state, ...this.props.data });
  };

  handleDeleteAssignment = confirm => {
    if (confirm) {
      this.props.deleteAssignmentRequest({
        ...this.props.data.metaData[this.state.currentPageIndex],
      });
      this.setState({
        deleteWarningModal: false,
      });
    } else {
      this.setState({
        deleteWarningModal: false,
      });
    }
  };

  handleDeleteWarning = () => {
    this.setState({
      deleteWarningModal: true,
    });
  };

  handlePrint = () => {
    window.print();
  };

  handleAllSelectChange = () => {
    const students = [...this.state.students];
    this.setState(nextState => ({
      selectAll: !nextState.selectAll,
    }));
    const checkedStudents = students.map(student => ({
      ...student,
      checked: !this.state.selectAll,
    }));
    if (this.state.selectAll) {
      this.setState({
        showSavedGradeModal: true,
      });
    }
    this.setState({
      students: checkedStudents,
    });
  };

  handleSelectChange = (event, index) => {
    const students = [...this.state.students];
    students[index].checked = !students[index].checked;
    if (event.target.name === `selectStudent${index}`) {
      this.setState({
        students,
        selectAll: students[index].checked !== false,
      });
    }
  };

  handleInputChange(event, index) {
    const numbers = /^[0-9\b]+$/;
    const students = [...this.state.students];
    let disableAverage;
    if (event.target.name === 'description') {
      this.setState({
        description: event.target.value,
      });
    } else if (event.target.name === `comment${index}`) {
      students[index].comment[0] = event.target.value;
    } else if (event.target.name === `average${index}`) {
      if (event.target.value.match(numbers) || event.target.value === '') {
        students[index].average[0] = event.target.value;
        students[index].score[0] = '';
        students[index].total[0] = '';
      }
    } else if (event.target.name === `score${index}`) {
      if (event.target.value.match(numbers) || event.target.value === '') {
        students[index].score[0] = event.target.value;
        students[index].average[0] = '';
      }
    } else if (event.target.name === `total${index}`) {
      if (event.target.value.match(numbers) || event.target.value === '') {
        students[index].total[0] = event.target.value;
        students[index].average[0] = '';
      }
    }
    if (students[index].total[0] === '' || students[index].score[0] === '') {
      disableAverage = true;
    } else {
      disableAverage = false;
    }

    this.setState({
      students,
      saveModal: true,
      disableAverage,
      disableModalSave: false,
    });
  }

  handleCancel = () => {
    if (this.state.saveModal) {
      this.setState({
        cancelWarningModal: true,
      });
    } else {
      this.props.closeStudentGoalModal();
    }
  };

  cancelWarningModalconClose = () => {
    this.setState({
      cancelWarningModal: false,
      cancelWarningNavigationModal: false,
      percentageAverageLimit: false,
    });
  };

  showOkModalClose = () => {
    this.setState({
      showGoalSaveSuccessModal: false,
      saveModal: false,
    });
  };

  handleShowSavedGradeModal = () => {
    this.setState({
      showSavedGradeModal: false,
    });
  };

  handleGoToPrevPage = e => {
    e.preventDefault();
    if (this.state.currentPageIndex === 0) {
      return;
    }

    this.setState({
      currentPageIndex: this.state.currentPageIndex - 1,
      cancelWarningNavigationModal: !this.state.disableModalSave,
      disableModalSave: true,
      saveModal: false,
    });
    this.props.clearResponseStatus();
    this.props.getAssignmentData({
      classId: this.props.data.metaData[this.state.currentPageIndex - 1],
    });
  };

  handleGoToNextPage = e => {
    e.preventDefault();
    if (this.state.currentPageIndex === this.props.data.metaData.length - 1) {
      return;
    }

    this.setState({
      currentPageIndex: this.state.currentPageIndex + 1,
      cancelWarningNavigationModal: !this.state.disableModalSave,
      disableModalSave: true,
      saveModal: false,
    });
    this.props.clearResponseStatus();
    this.props.getAssignmentData({
      classId: this.props.data.metaData[this.state.currentPageIndex + 1],
    });
  };

  gradePercent = (event, index) => {
    const students = [...this.state.students];
    let gpercent = 0;
    let percentageAverageLimit = false;
    if (students[index].score !== '' && students[index].total !== '') {
      gpercent = Number(students[index].score) / Number(students[index].total) * 100;
      if (gpercent >= 0 && gpercent <= 100) {
        students[index].average[0] = gpercent;
      } else {
        students[index].average[0] = '';
        percentageAverageLimit = true;
      }
      this.setState({ students, percentageAverageLimit });
    }
  };

  escFunction = event => {
    if (event.keyCode === 27) {
      this.setState({
        cancelWarningModal: false,
      });
    } else if (event.keyCode === 13) {
      this.props.closeStudentGoalModal();
    }
  };

  render() {
    const { isOpen } = this.props;
    const getDueDateValue = this.state.dueDate && this.state.dueDate.substring(0, 10).split('-');
    let programName = '';
    const communityIdHeading =
      this.props.data.classId.community_id === 'S44JR' ? (
        <div className="edit-assignment-component__modal-assignment--one">WPCM</div>
      ) : (
        <div className="edit-assignment-component__modal-assignment--one">Grades</div>
      );
    if (this.props.data.classId.community_id === 'S44NG') {
      programName = 'System 44 ';
    }
    if (this.props.data.classId.community_id === 'S44JR') {
      programName = 'iRead ';
    }
    if (this.props.data.classId.community_id === 'R180NG') {
      programName = 'Read 180 ';
    }
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="edit-assignment-component__modal--edit-modal"
        >
          <div className="edit-assignment-component__list--wrapper">
            <div className="edit-assignment-component__list--purple">
              <div className="edit-assignment-component__modal--heading">
                <span>
                  {this.props.data.metaData[this.state.currentPageIndex].className ||
                    this.props.data.classId.student}
                </span>
                {this.props.data.currentIndex === undefined && <span>CLAS3Iread</span>}
              </div>
              <div>
                <button
                  className="edit-assignment-component__button--close"
                  onClick={this.handleCancel}
                >
                  {' '}
                  X
                </button>
              </div>
            </div>

            <div className="edit-assignment-component__modal-title">
              <div className="edit-assignment-component__text--name">
                {this.props.data.currentIndex !== undefined && (
                  <span>
                    <div className="edit-assignment-component__div--style">
                      <span className="edit-assignment-component__div--span1">{programName}</span>
                      <span className="edit-assignment-component__div--span2">
                        {programName !== 'iRead ' ? 'Next Generation' : ''}
                      </span>
                    </div>
                    <div className="edit-assignment-component__div-circle--head">
                      <div className="edit-assignment-component__div--circle edit-assignment-component__div--circle1" />
                    </div>
                    <div className="edit-assignment-component__div--style edit-assignment-component__div--style1">{` ${
                      this.props.data.metaData[this.state.currentPageIndex].from
                    }`}</div>
                    <div className="edit-assignment-component__div-circle--head">
                      <div className="edit-assignment-component__div--circle edit-assignment-component__div--circle2" />
                    </div>
                    <div className="edit-assignment-component__div--style edit-assignment-component__div--style1">{`${
                      this.props.data.metaData[this.state.currentPageIndex].assignment
                    }`}</div>
                  </span>
                )}
                {this.props.data.currentIndex === undefined && (
                  <span>
                    Iread. Oral Fluency Assessment. FluencyPassage :
                    <select>
                      <option value="Grade1: BenchMark Passage 1">
                        {' '}
                        Grade1: BenchMark Passage 1
                      </option>
                      <option value="Grade1: BenchMark Passage 2">
                        Grade1: BenchMark Passage 2
                      </option>
                      <option value="Grade2: BenchMark Passage 1">
                        Grade2: BenchMark Passage 1
                      </option>
                      <option value="Grade2: BenchMark Passage 2">
                        Grade2: BenchMark Passage 2
                      </option>
                      <option value="Grade2: BenchMark Passage 3">
                        Grade2: BenchMark Passage 3
                      </option>
                    </select>
                  </span>
                )}
              </div>
            </div>

            {this.props.data.classId.community_id !== 'S44JR' && (
              <div className="s44">
                <div className="edit-assignment-component__description--box">
                  <div className="edit-assignment-component__description--title">Description:</div>
                  <div className="edit-assignment-component__description--textarea">
                    <textarea
                      className="edit-assignment-component__description-title--textarea"
                      name="description"
                      value={this.state.description}
                      onChange={event => {
                        this.handleInputChange(event);
                      }}
                    />
                  </div>
                </div>
                <div className="edit-assignment-component__modal--duedate">
                  <div className="edit-assignment-component__description--title edit-assignment-component__modal-duedate-title">
                    Due Date:
                  </div>
                  <div className="edit-assignment-component__modal-due-date--inbox">
                    <div className="edit-assignment-component__modal-due-date--content">
                      <div className="edit-assignment-component__date--descript">
                        Select due date:
                      </div>
                      <div className="edit-assignment-component__date--display">
                        {this.state.dueDate && getDueDateValue[2]}{' '}
                        <span className="edit-assignment-component__date-display--slash">/</span>{' '}
                        {this.state.dueDate && getDueDateValue[1]}{' '}
                        <span className="edit-assignment-component__date-display--slash">/</span>{' '}
                        {this.state.dueDate && getDueDateValue[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="s44">
              <div className="edit-assignment-component__modal-student-box">
                <div className="edit-assignment-component__description--title edit-assignment-component__modal-duedate-title">
                  Student Grade:
                </div>
              </div>
            </div>
            <div className="edit-assignment-component__assignment-roster--textarea">
              <div className="edit-read180ng-modal-assignment-description">
                To change students grade, enter a new grade below.
              </div>
              <div className="edit-assignment-component__roster-div--headers">
                {this.props.data.classId.community_id === 'S44JR' && (
                  <div className="edit-assignment-component__assignment--mesg">
                    Select Students that will comeplete the Assignment. Enter Words Correct Per
                    Minute (WCPM) in the field below.
                  </div>
                )}
                <div className="edit-assignment-component__modal--assignment">
                  {communityIdHeading}
                  <div className="edit-assignment-component__modal-assignment--three">Comments</div>
                </div>
                <div className="edit-assignment-component__modal--assignment">
                  <div className="edit-assignment-component__modal-assignment--one font-wei-normal bord-bot" />
                  <div className="edit-assignment-component__modal-assignment--three font-wei-normal bord-bot" />
                </div>
                <div>
                  {this.props.data.currentIndex !== undefined && (
                    <div>
                      {this.props.editassignmentcontainer.respAssignmentData &&
                        this.props.editassignmentcontainer.studentDetails.length !== 0 &&
                        this.state.students &&
                        this.state.students.map((student, index) =>
                          this.getAssignmentRoaster(student, index)
                        )}
                    </div>
                  )}
                  {}
                </div>
              </div>
            </div>
            {this.props.data.classId.community_id !== 'S44JR' && (
              <div className="edit-assignment-component__modal-bottom-italic--text">
                *Assignment was completed while student was enrolled in Read180 Next Generation
              </div>
            )}

            <div className="edit-assignment-component__modal--buttons">
              <div className="edit-assignment-component__modal-buttons--firstset">
                <button
                  className="edit-assignment-component__modal--button mr-r-12"
                  onClick={this.handlePrint}
                >
                  Print
                </button>
                <button
                  className="edit-assignment-component__modal--button"
                  onClick={this.handleCancel}
                >
                  Cancel
                </button>
              </div>

              <div className="edit-assignment-component__modal-buttons--firstset">
                <div className="pager">
                  <div className="pager-prev">
                    <a className="previous" href="" onClick={this.handleGoToPrevPage}>
                      &lt;
                    </a>
                  </div>
                  <div className="pager-nor"> {this.state.currentPageIndex + 1} </div>
                  <div className="pager-nor"> of </div>
                  <div className="pager-nor"> {this.props.data.metaData.length} </div>
                  <div className="pager-prev">
                    <a className="previous" href="" onClick={this.handleGoToNextPage}>
                      &gt;
                    </a>
                  </div>
                </div>
              </div>

              <div className="edit-assignment-component__modal-buttons--secondset">
                <SAMButton onClickHandler={this.handleDeleteWarning} isPrimaryButton>
                  Delete
                </SAMButton>
                <SAMButton
                  onClickHandler={this.handleSubmit}
                  disabled={this.state.disableModalSave}
                >
                  {' '}
                  Save{' '}
                </SAMButton>
              </div>
            </div>
          </div>
        </SAMModal>
        <UnsavedChangesModal
          cancelWarningModal={this.state.cancelWarningModal}
          closeStudentGoalModal={this.props.closeStudentGoalModal}
          cancelWarningModalconClose={this.cancelWarningModalconClose}
        />
        <UnsavedChangesNavigationModal
          cancelWarningNavigationModal={this.state.cancelWarningNavigationModal}
          cancelWarningModalconClose={this.cancelWarningModalconClose}
        />
        <DeleteModal
          deleteWarningModal={this.state.deleteWarningModal}
          handleDeleteAssignment={this.handleDeleteAssignment}
        />

        <SAMModal
          isOpen={this.state.showAverageErrorModal}
          modalClassModifier="portfolio-conf-warning"
        >
          <div>
            <div className="portfolio-conf-warning-heading">Error </div>
            <div className="portfolio-conf-warning-txt">
              Percentage must be between 0% and 100%. Please enter a valid grade.
            </div>
            <div className="portfolio-conf-warning-btn">
              <SAMButton onClickHandler={this.showAverageErrorModalClose}>OK </SAMButton>
            </div>
          </div>
        </SAMModal>

        <SAMModal
          isOpen={this.state.showGoalSaveSuccessModal}
          modalClassModifier="portfolio-conf-warning-saving"
        >
          <div>
            <div className="portfolio-conf-warning-save-txt">Assessment Saved</div>
            <div className="portfolio-conf-warning-save-btn">
              <SAMButton onClickHandler={this.showOkModalClose}>OK </SAMButton>
            </div>
          </div>
        </SAMModal>

        <CheckboxChangeModal
          showSavedGradeModal={this.state.showSavedGradeModal}
          closeStudentGoalModal={this.props.closeStudentGoalModal}
          handleShowSavedGradeModal={this.handleShowSavedGradeModal}
        />
      </div>
    );
  }
}

EditAssignmentComponent.defaultProps = {
  isOpen: false,
};

EditAssignmentComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  editassignmentcontainer: PropTypes.object.isRequired,
  saveAssignmentRequest: PropTypes.func.isRequired,
  deleteAssignmentRequest: PropTypes.func.isRequired,
  closeStudentGoalModal: PropTypes.func.isRequired,
  clearResponseStatus: PropTypes.func.isRequired,
  getAssignmentData: PropTypes.func.isRequired,
};

export default EditAssignmentComponent;
