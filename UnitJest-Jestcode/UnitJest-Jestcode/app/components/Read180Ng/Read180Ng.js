/**
 *
 * Read180Ng
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Constants from './constants';
import './Read180Ng.scss';

class Read180Ng extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked1: false,
      delWarningModal: false,
      saveWarningModal: false,
      withoutSaveWarning: false,
      score: '',
      total: '',
      average: '',
      comment: '',
      message: '',
      stuName: '',
      saveClass: false,
      gradeClass: false,
      description: '',
      studentName: '',
    };
  }

  componentWillReceiveProps(nextprops) {
    let matchingID = '';
    const readConst =
      nextprops.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0]
        .classAssignmentGroup[0].classAssignment[0].studentAssignments[0].student[0];
    nextprops.portfolioPageContainer.studentSubmissions.results.map(
      (item, i) =>
        item.$.workItemId === this.props.data.workItemId ? (matchingID = i) : matchingID
    );
    const studentName = nextprops.data.allData[nextprops.data.currentIndex].student;
    this.setState({ studentName });
    if (
      nextprops.portfolioPageContainer !== undefined &&
      nextprops.portfolioPageContainer.studentSubmissions !== undefined &&
      nextprops.portfolioPageContainer.studentSubmissions.results !== undefined &&
      nextprops.portfolioPageContainer.studentSubmissions.results[0] !== undefined &&
      nextprops.portfolioPageContainer.studentSubmissions.results[0].$ !== undefined
    ) {
      const sName = `${
        nextprops.portfolioPageContainer.studentSubmissions.results[0].$.studentLastName
      } ${nextprops.portfolioPageContainer.studentSubmissions.results[0].$.studentFirstName}`;
      this.setState({ stuName: sName });
    }
    if (
      nextprops.read180ngcontainer.read180Program.results !== undefined &&
      nextprops.read180ngcontainer.read180Program.results.workItems !== undefined &&
      nextprops.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem !==
        undefined &&
      nextprops.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0]
        .classAssignmentGroup !== undefined &&
      nextprops.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0]
        .classAssignmentGroup[0].classAssignment !== undefined &&
      nextprops.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0]
        .classAssignmentGroup[0].classAssignment[0].studentAssignments !== undefined &&
      nextprops.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0]
        .classAssignmentGroup[0].classAssignment[0].studentAssignments[0].student !== undefined &&
      readConst !== undefined
    ) {
      this.setState({
        score: readConst.score,
        comment: readConst.comment,
        average: readConst.average,
        total: readConst.total,
      });
    }
  }

  handlePrint = () => {
    window.print();
  };

  handleChange = (index, event) => {
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
  };

  handlePreview = () => {
    this.props.onPreview(this.state.checked);
  };

  createDeleteWarningModal = () => {
    this.props.deleteAssignment();
    this.setState({
      delWarningModal: true,
    });
    return 'modelOpened';
  };

  createSaveWarningModal = () => {
    if (this.state.average === '' && (this.state.score !== '' || this.state.total !== '')) {
      this.setState({
        message: Constants.READ180_PROGRAM_MESSAGE,
      });
      return '';
    }
    this.setState({
      saveWarningModal: true,
    });
    if (
      this.props.read180ngcontainer.read180Program.results !== undefined &&
      this.props.read180ngcontainer.read180Program.results.workItems !== undefined &&
      this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem !==
        undefined &&
      this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0]
        .classAssignmentGroup !== undefined &&
      this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0]
        .classAssignmentGroup[0].$ !== undefined
    ) {
      const postRead180NgData = {};
      postRead180NgData.score = this.state.score;
      postRead180NgData.total = this.state.total;
      postRead180NgData.average = this.state.average;
      postRead180NgData.comment = this.state.comment;
      postRead180NgData.wholeClass = this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0].classAssignmentGroup[0].$.wholeClass;
      postRead180NgData.assignmentName = this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0].classAssignmentGroup[0].assignmentName;
      postRead180NgData.assignmentType = this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0].classAssignmentGroup[0].assignmentType;
      postRead180NgData.dueDate = moment(
        this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0]
          .classAssignmentGroup[0].dueDate[0]
      ).format('YYYY-MM-DD');
      postRead180NgData.communityId = this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0].classAssignmentGroup[0].classAssignment[0].$.communityId;
      postRead180NgData.userId = this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0].classAssignmentGroup[0].classAssignment[0].studentAssignments[0].student[0].userId;
      postRead180NgData.workItemId = this.props.read180ngcontainer.read180Program.results.workItems[0].classAssignmentWorkItem[0].$.workItemId;
      postRead180NgData.description = this.state.description;
      this.props.postRead180NgDataSubmit(postRead180NgData);
    }
    this.setState({ saveClass: false });
    return 'modalopened';
  };

  delWarningModalClose = () => {
    this.setState({
      delWarningModal: false,
    });
    return 'modelOpened';
  };

  delWarningModalProceed = () => {
    this.setState({
      delWarningModal: false,
    });
  };

  saveWarningModalClose = () => {
    this.setState({
      saveWarningModal: false,
    });
    return 'modelOpened';
  };

  withoutSaveWarningModalClose = () => {
    this.setState({
      withoutSaveWarning: false,
    });
    return 'modelOpened';
  };

  saveWarningModalProceed = () => {
    this.props.handleCancel();
  };

  closeModal = () => {
    if (this.state.saveClass) {
      this.setState({
        withoutSaveWarning: true,
      });
    } else {
      this.props.handleCancel();
    }
    return 'modelOpened';
  };

  gradePercent = () => {
    if (this.state.score !== '' && this.state.total !== '') {
      const gPercent = Number(this.state.score) / Number(this.state.total) * 100;
      this.setState({ average: gPercent });
    }
  };

  gradeChanges = e => {
    const numbers = /^[0-9\b]$/;
    const change = {};

    if (
      e.target.name === Constants.READ180_PROGRAM_SCORE ||
      e.target.name === Constants.READ180_PROGRAM_TOTAL ||
      e.target.name === Constants.READ180_PROGRAM_AVERAGE
    ) {
      if (e.target.value.match(numbers) || e.target.value === '') {
        change[e.target.name] = e.target.value;
        this.setState(change);
      }
    } else {
      change[e.target.name] = e.target.value;
      this.setState(change);
    }

    if (e.target.name === Constants.READ180_PROGRAM_AVERAGE) {
      this.setState({ score: '', total: '' });
    }
    if (
      e.target.name === Constants.READ180_PROGRAM_SCORE ||
      e.target.name === Constants.READ180_PROGRAM_TOTAL
    ) {
      this.setState({ average: '', message: '', saveClass: true });
    }
    this.setState({ saveClass: true });
    if (
      (e.target.name === 'score' || e.target.name === 'total') &&
      (this.state.score !== '' && this.state.total !== '')
    ) {
      this.setState({ gradeClass: true });
    }
  };
  render() {
    const read180GradeClass = ['print-read180ng-modal-button-equals-gray'];
    const read180SaveClass = [
      'print-read180ng-modal-button-second-set print-read180ng-modal-button-save',
    ];
    if (this.state.saveClass) {
      read180SaveClass.push('print-read180ng-modal-button-save-blue');
    }
    if (this.state.gradeClass) {
      read180GradeClass.push('print-read180ng-modal-button-equals');
    }

    return (
      <div>
        <div className="print-read180ng-modal-list--wrapper">
          <div className="print-read180ng-modal-list--purple">
            <div className="print-read180ng-modal__heading">{this.state.studentName}</div>
            <div>
              <button className="print-read180ng-modal__button-close" onClick={this.closeModal}>
                X
              </button>
            </div>
          </div>
          <div className="print-read180ng-modal-title">
            <div className="print-read180ng-modal-wrapper-div">
              <span className="print-read180ng-modal-span">Read 180</span> Next Generation{' '}
            </div>
            <div className="edit-assignment-component__div-circle--head">
              <div className="edit-assignment-component__div--circle edit-assignment-component__div--circle3" />
            </div>
            {this.props.read180ngcontainer.read180Program.results !== undefined &&
              this.props.read180ngcontainer.read180Program.results.workItems !== undefined &&
              this.props.read180ngcontainer.read180Program.results.workItems[0]
                .classAssignmentWorkItem !== undefined &&
              this.props.read180ngcontainer.read180Program.results.workItems[0]
                .classAssignmentWorkItem[0].classAssignmentGroup !== undefined &&
              this.props.read180ngcontainer.read180Program.results.workItems[0]
                .classAssignmentWorkItem[0].classAssignmentGroup[0] !== undefined && (
                <div>
                  <div className="print-read180ng-modal-title-div1">
                    {
                      this.props.read180ngcontainer.read180Program.results.workItems[0]
                        .classAssignmentWorkItem[0].classAssignmentGroup[0].assignmentType
                    }
                  </div>
                  <div className="edit-assignment-component__div-circle--head">
                    <div className="edit-assignment-component__div--circle edit-assignment-component__div--circle4" />
                  </div>
                  <div className="print-read180ng-modal-title-div2">
                    {
                      this.props.read180ngcontainer.read180Program.results.workItems[0]
                        .classAssignmentWorkItem[0].classAssignmentGroup[0].assignmentName
                    }
                  </div>
                </div>
              )}
          </div>
          <div className="print-read180ng-modal-clear" />

          <div className="print-read180ng-modal-description-box">
            <div className="print-read180ng-modal-description-title">Description:</div>
            <div className="print-read180ng-modal-description-textarea">
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.gradeChanges}
                rows={3}
                cols="70"
              />
              <div className="print-read180ng-modal-description-inbox"> </div>
            </div>
          </div>

          <div className="print-read180ng-modal-due-date">
            <div className="print-read180ng-modal-description-title">Due Date:</div>
            <div className="print-read180ng-modal-due-date-textarea">
              <div className="print-read180ng-modal-due-date-inbox">
                <p className="print-read180ng-modal-due-date-content">
                  {' '}
                  Select a due date:{' '}
                  {this.props.read180ngcontainer.read180Program.results !== undefined &&
                    this.props.read180ngcontainer.read180Program.results.workItems !== undefined &&
                    this.props.read180ngcontainer.read180Program.results.workItems[0]
                      .classAssignmentWorkItem !== undefined &&
                    this.props.read180ngcontainer.read180Program.results.workItems[0]
                      .classAssignmentWorkItem[0].classAssignmentGroup !== undefined &&
                    this.props.read180ngcontainer.read180Program.results.workItems[0]
                      .classAssignmentWorkItem[0].classAssignmentGroup[0] !== undefined && (
                      <span className="print-read180ng-modal-due-date-span-content">
                        {moment(
                          this.props.read180ngcontainer.read180Program.results.workItems[0]
                            .classAssignmentWorkItem[0].classAssignmentGroup[0].dueDate[0]
                        ).format('MM/DD/YYYY')}
                      </span>
                    )}{' '}
                </p>
              </div>
            </div>
          </div>

          <div className="print-read180ng-modal-assignment-roster-box">
            <div className="print-read180ng-modal-description-title">Student Grade:</div>
            <div className="print-read180ng-modal__description-title--scroll">
              <div className="print-read180ng-modal-assignment-description">
                To change students grade, enter a new grade below.
              </div>
              <div className="print-read180ng-modal-assignment-roster-textarea">
                <div className="print-read180ng-modal-assignment-roster-div-headers">
                  <span className="print-read180ng-modal-assignment-span-right print-system44-modal-assignment-roster-grades">
                    Grade
                  </span>{' '}
                  <span className="print-read180ng-modal-assignment-span-right print-system44-modal-assignment-roster-comments">
                    Comment
                    <span className="print-read180ng-modal-assignment-span-right print-read180ng-modal-assignment-roster-comments-warning">
                      {this.state.message}
                    </span>
                  </span>
                </div>
                <div className="print-read180ng-modal-assignment-wrapper">
                  <div className="print-read180ng-modal-assignment-grades-ml">
                    <input
                      type="textbox"
                      name="score"
                      className="print-read180ng-modal-assignment-textbox1"
                      value={this.state.score}
                      onChange={this.gradeChanges}
                    />
                    &nbsp;&nbsp;<span>/</span>
                    <input
                      type="textbox"
                      name="total"
                      className="print-read180ng-modal-assignment-textbox2"
                      value={this.state.total}
                      onChange={this.gradeChanges}
                    />
                    <button className={read180GradeClass.join(' ')} onClick={this.gradePercent}>
                      =
                    </button>
                    <input
                      type="textbox"
                      name="average"
                      className="print-read180ng-modal-assignment-textbox3"
                      value={this.state.average}
                      onChange={this.gradeChanges}
                    />
                    <span className="print-read180ng-modal-assignment-percentage">%</span>
                  </div>
                  <div className="print-read180ng-modal-assignment-comments">
                    <input
                      type="textbox"
                      name="comment"
                      className="print-read180ng-modal-assignment-textbox-comment"
                      value={this.state.comment}
                      onChange={this.gradeChanges}
                    />
                  </div>
                  <div className="print-read180ng-odal-assignment-roster-inbox"> </div>
                </div>
              </div>
            </div>
          </div>

          <div className="show-read180ng-modal-line"> </div>
          <div className="print-activate-quiz__buttons">
            <div className="print-activate-quiz__primary-button">
              <div className="print-read180ng-modal__buttons-firstset">
                <button
                  onClick={this.handlePrint}
                  className="print-read180ng-modal-button-first-set print-system44-modal-button-print"
                >
                  Print
                </button>
                <button
                  className="print-read180ng-modal-button-first-set print-system44-modal-button-cancel"
                  onClick={this.closeModal}
                >
                  Cancel
                </button>
              </div>

              <div className="print-read180ng-modal__buttons-secondset">
                <button
                  className="print-read180ng-modal-button-second-set print-read180ng-modal-button-delete"
                  onClick={this.createDeleteWarningModal}
                >
                  Delete
                </button>
                <button
                  className={read180SaveClass.join(' ')}
                  onClick={this.createSaveWarningModal}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <SAMModal isOpen={this.state.delWarningModal} modalClassModifier="portfolio-conf-warning">
          <div>
            <div className="portfolio-conf-warning-heading">Warning </div>
            <div className="portfolio-conf-warning-txt"> Are you sure You want to delete ?</div>
            <div className="portfolio-conf-warning-btn">
              <SAMButton isPrimaryButton onClickHandler={this.delWarningModalProceed}>
                {' '}
                Yes{' '}
              </SAMButton>
              <SAMButton onClickHandler={this.delWarningModalClose}> No </SAMButton>
            </div>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.state.withoutSaveWarning}
          modalClassModifier="modal__savescreen--warning"
        >
          <div className="modal--savewrapper-heading1">Warning </div>
          <div className="modal--savewrapper-warning">
            You have unsaved changes.Do you want to leave this screen without saving them?
            <div className="read180ngsave-innerpage-button1">
              <button
                className="read180ng__modal-button--firstset read180ngsave-innerpage-ok-button1"
                onClick={this.saveWarningModalProceed}
              >
                OK
              </button>
              <button
                className="read180ng__modal-button--firstset read180ngsave-innerpage-cancel-button1"
                onClick={this.withoutSaveWarningModalClose}
              >
                {' '}
                Cancel{' '}
              </button>
            </div>
          </div>
        </SAMModal>

        <SAMModal
          isOpen={this.state.saveWarningModal}
          modalClassModifier="modal--savescreen-warning"
        >
          <div className="modal--savewrapper-heading1"> </div>
          <div className="modal--savewrapper-warning">
            Assignment Updated
            <div className="read180ngsave-innerpage-button1">
              <SAMButton onClickHandler={this.saveWarningModalClose}> OK </SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

Read180Ng.defaultProps = {
  isOpen: false,
};

Read180Ng.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  read180ngcontainer: PropTypes.object,
  deleteAssignment: PropTypes.func.isRequired,
  postRead180NgDataSubmit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default Read180Ng;
