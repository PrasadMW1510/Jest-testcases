/**
 * ExportTeacherMadeQuizzes
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import './ExportTeacherMadeQuizzes.scss';

class ExportTeacherMadeQuizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSuccessModal: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      openSuccessModal: nextProps.openSuccessModal,
    });
  }
  handleExportTeacherMadeQuiz = teacherMadeQuiz => {
    this.props.onExportTeacherMadeQuiz(teacherMadeQuiz);
  };

  renderModal = () => {
    const { isOpen, selectedItems } = this.props;
    const { openSuccessModal } = this.state;
    const teacherMadeQuiz = selectedItems.filter(
      teacherMade => teacherMade.QuizTeacherMade[0] === 'true'
    );

    let modal;

    if (teacherMadeQuiz.length > 0) {
      modal = (
        <SAMModal
          isOpen={isOpen}
          contentLabel="export Teacher Made Quizzes"
          modalClassModifier="modal--export-teacher-made-quizzes"
          id="pcq"
        >
          <div className="print-export-teacher-made-quizzes__confirmtext">
            All Teacher-Made Quizzes in your Custom List will be exported to the Teacher-Made
            Quizzes folder on your computer. Do you wish to continue?
          </div>
          <div className="print-export-teacher-made-quizzes__buttons">
            <div className="print-export-teacher-made-quizzes__primary-button-yes">
              <SAMButton
                isPrimaryButton
                onClickHandler={() => {
                  this.handleExportTeacherMadeQuiz(teacherMadeQuiz);
                }}
              >
                Yes
              </SAMButton>
            </div>
            <div className="print-export-teacher-made-quizzes__secondary-button-no">
              <SAMButton onClickHandler={this.props.handleCancel}>No</SAMButton>
            </div>
          </div>
        </SAMModal>
      );
    }
    if (teacherMadeQuiz.length === 0) {
      modal = (
        <SAMModal
          isOpen={isOpen}
          contentLabel="export Teacher Made Quizzes"
          modalClassModifier="modal--export-teacher-made-quizzes-no-select"
          id="pcq"
        >
          <div className="print-export-teacher-made-quizzes-no-select__confirmtext">
            There are no Teacher-Made Quizzes in the Custom List to export. Please select at least
            one Teacher-Made Quiz to export.
          </div>
          <div className="print-export-teacher-made-quizzes__buttons">
            <div className="print-export-teacher-made-quizzes-no-select__secondary-button-ok">
              <SAMButton isPrimaryButton onClickHandler={this.props.handleCancel}>
                OK
              </SAMButton>
            </div>
          </div>
        </SAMModal>
      );
    }

    if (openSuccessModal) {
      modal = (
        <SAMModal
          isOpen={isOpen}
          contentLabel="export Teacher Made Quizzes"
          modalClassModifier="modal--export-teacher-made-quizzes"
          id="pcq"
        >
          <div className="print-export-teacher-made-quizzes-last__confirmtext">
            Teacher-Made Quizzes are exporting. Go to the Message center in SAM to check the
            progress of export.
          </div>
          <div className="print-export-teacher-made-quizzes__buttons">
            <div className="print-export-teacher-made-quizzes__secondary-button-okay">
              <SAMButton isPrimaryButton onClickHandler={this.props.handleCancel}>
                Okay
              </SAMButton>
            </div>
          </div>
        </SAMModal>
      );
    }
    return modal;
  };

  render() {
    return this.renderModal();
  }
}

ExportTeacherMadeQuizzes.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onExportTeacherMadeQuiz: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  openSuccessModal: PropTypes.bool,
};

export default ExportTeacherMadeQuizzes;
