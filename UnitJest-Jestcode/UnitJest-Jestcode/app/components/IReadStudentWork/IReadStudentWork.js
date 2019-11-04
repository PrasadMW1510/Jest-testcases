/**
 *
 * IReadStudentWork
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';

import './IReadStudentWork.scss';

class IReadStudentWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOfWCPM: '',
      commentsVal: '',
      disableSave: true,
      handleAssignmentUpdate: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { iReadStudentWorkData } = nextProps.studentworkprogramscontainer;
    this.setState({
      dataOfWCPM: iReadStudentWorkData.average,
      commentsVal: iReadStudentWorkData.comment,
    });
  }

  onWCPMChange = event => {
    const wcpmVal = event.target.value;
    this.setState({
      dataOfWCPM: wcpmVal,
      disableSave: false,
    });
  };

  onCommentsChange = event => {
    const comments = event.target.value;
    this.setState({
      commentsVal: comments,
      disableSave: false,
    });
  };

  onPrintIreadStudentWork = () => {
    window.print();
  };

  onSaveIreadStudentWork = () => {
    const { data } = this.props;
    this.setState(
      {
        handleAssignmentUpdate: true,
      },
      () => {
        this.props.handleSave(this.state, data);
      }
    );
  };

  onDeleteIreadStudentWork = () => {
    this.props.showDeleteModal();
  };
  onConfirmDelete = () => {
    const { data } = this.props;
    this.props.handleDelete(data);
  };
  render() {
    const { isOpen, data } = this.props;
    const { openSaveSuccessModal, showDeleteModal } = this.props.studentworkprogramscontainer;
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="iread-student-work__show--modal"
          id="pcq"
        >
          <div className="iread-student-work__show--wrapper">
            <div className="iread-student-work__show--purple">
              <div className="iread-student-work__show--heading">Iread, STU3</div>
              <div>
                <button
                  className="iread-student-work__show--close"
                  onClick={this.props.handleCancel}
                >
                  X
                </button>
              </div>
            </div>
            <div className="iread-student-work__show--title">
              <div className="iread-student-work__show--name">
                iRead . {` ${data.from}. ${data.assignment}`}
              </div>
            </div>
            <div className="iread-student-work__show--s44">
              <div className="iread-student-work__student--box">
                <div className="iread-student-work__description--title">Student Grade:</div>
              </div>
              <div className="iread-student-work__header--text">
                To Change the student&apos;s score, enter a new words Correct Per Minute (WCPM)
                score in in the field below.
              </div>
              <div className="iread-student-work__show--assignment">
                <div className="iread-student-work__assignment--row">
                  <div className="iread-student-work__assignment-one">WCPM</div>
                  <div className="iread-student-work__assignment--two">Comments</div>
                </div>
                <div className="iread-student-work__assignment--row">
                  <div className="iread-student-work__assignment-one">
                    <input
                      className="iread-student-work__wcpm--textbox"
                      type="textbox"
                      value={this.state.dataOfWCPM}
                      onChange={event => {
                        this.onWCPMChange(event);
                      }}
                    />
                  </div>
                  <div className="iread-student-work__assignment--two">
                    <input
                      type="text"
                      className="iread-student-work__comments--textbox"
                      value={this.state.commentsVal}
                      onChange={event => {
                        this.onCommentsChange(event);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="iread-student-work__modal--buttons">
              <div className="iread-student-work__modal-buttons--firstset">
                <button
                  className="iread-student-work__modal--button mr-r-12"
                  onClick={this.onPrintIreadStudentWork}
                >
                  Print
                </button>
                <button
                  className="iread-student-work__modal--button"
                  onClick={this.props.handleCancel}
                >
                  Cancel
                </button>
              </div>

              <div className="iread-student-work__modal-buttons--secondset">
                <SAMButton isPrimaryButton onClickHandler={this.onDeleteIreadStudentWork}>
                  Delete
                </SAMButton>
                <SAMButton
                  onClickHandler={this.onSaveIreadStudentWork}
                  disabled={this.state.disableSave}
                >
                  {' '}
                  Save{' '}
                </SAMButton>
              </div>
            </div>
          </div>
        </SAMModal>
        {openSaveSuccessModal && (
          <SAMModal
            isOpen={this.state.handleAssignmentUpdate}
            modalClassModifier="portfolio-conf-save"
          >
            <div>
              <div className="portfolio-conf__warning--heading">&nbsp;</div>
              <div className="portfolio-conf__warning--txt">Assignment Updated</div>
              <SAMButton isPrimaryButton onClickHandler={this.props.handleCancel}>
                OK
              </SAMButton>
            </div>
          </SAMModal>
        )}
        {showDeleteModal && (
          <SAMModal isOpen={isOpen} modalClassModifier="portfolio-conf-warning">
            <div>
              <div className="portfolio-conf__warning--heading">Warning </div>
              <div className="portfolio-conf__warning--txt">Are you sure You want to delete ?</div>
              <div className="portfolio-conf__warning--btn">
                <SAMButton isPrimaryButton onClickHandler={this.onConfirmDelete}>
                  {' '}
                  Yes{' '}
                </SAMButton>
                <SAMButton onClickHandler={this.props.handleCancel}> No </SAMButton>
              </div>
            </div>
          </SAMModal>
        )}
      </div>
    );
  }
}

IReadStudentWork.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.any,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  studentworkprogramscontainer: PropTypes.object,
  openSaveSuccessModal: PropTypes.bool,
  showDeleteModal: PropTypes.func.isRequired,
};

export default IReadStudentWork;
