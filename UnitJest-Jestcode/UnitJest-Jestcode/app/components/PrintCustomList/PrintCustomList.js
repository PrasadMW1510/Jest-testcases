/**
 *
 * PrintCustomList Component
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './PrintCustomList.scss';

class PrintCustomList extends React.Component {
  handlePrintQuizList = ev => {
    ev.preventDefault();
    this.props.showPrintQuizModal(this.props.searchresultsData.selectedItems);
  };

  handlePrintBookLabel = ev => {
    ev.preventDefault();
    this.props.showPrintBookLabelModal(this.props.searchresultsData.selectedItems);
  };

  handlePrintAnswerList = evt => {
    evt.preventDefault();
    this.props.showPrintQuizAndAnswerKeyModal(this.props.searchresultsData.selectedItems);
  };

  handleExportHTML = ev => {
    ev.preventDefault();
    this.props.viewExportHTML();
  };

  handleActivateQuiz = ev => {
    ev.preventDefault();
    this.props.activateQuizModal();
  };

  handleDeactivateQuiz = ev => {
    ev.preventDefault();
    this.props.deactivateQuizModal();
  };

  handleExportTeacherQuiz = ev => {
    ev.preventDefault();
    this.props.handleExportTeacherQuizModal();
  };

  render() {
    return (
      <div className="print-custom-list_search-tabs-content">
        <div className="print-custom-list__wrapper">
          <div className="print-custom-list__custom-list--orange">
            <div className="print-custom-list_labl">Print/Export Custom List </div>
          </div>
          <div className="print-custom-list__lnk">
            <a
              role="button"
              tabIndex={0}
              className="print-custom-list__print-quiz-list"
              onClick={this.handlePrintQuizList}
            >
              Print Custom Quiz List
            </a>
            <br />
            <a
              role="button"
              tabIndex={0}
              className="print-custom-list__print-quiz-list"
              onClick={this.handlePrintAnswerList}
            >
              Print Quiz and Answer Key
            </a>
            <br />
            <a
              role="button"
              tabIndex={0}
              className="print-custom-list__print-quiz-list"
              onClick={this.handlePrintBookLabel}
            >
              Print Book Labels
            </a>
            <br />

            <a
              role="button"
              tabIndex={0}
              className="print-custom-list__print-quiz-list"
              onClick={this.handleExportHTML}
            >
              Export to HTML
            </a>
            <br />
          </div>
        </div>

        <div>
          <div className="print-custom-list__wrapper-manage">
            <div className="print-custom-list__manage-quiz--orange">
              <div className="print-custom-list__labl">Manage Quizzes</div>
              <div className="print-custom-list__lnk">
                <a
                  role="button"
                  tabIndex={0}
                  className="print-custom-list__manage-quiz-list"
                  onClick={this.handleActivateQuiz}
                >
                  Activate Quizzes
                </a>
                <br />
                <a
                  role="button"
                  tabIndex={0}
                  className="print-custom-list__manage-quiz-list"
                  onClick={this.handleDeactivateQuiz}
                >
                  Deactivate Quizzes
                </a>
                <br />
                <a
                  role="button"
                  tabIndex={0}
                  className="print-custom-list__manage-quiz-list"
                  onClick={this.handleExportTeacherQuiz}
                >
                  Export Teacher-Made Quizzes
                </a>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrintCustomList.propTypes = {
  showPrintQuizModal: PropTypes.func.isRequired,
  showPrintBookLabelModal: PropTypes.func.isRequired,
  showPrintQuizAndAnswerKeyModal: PropTypes.func.isRequired,
  viewExportHTML: PropTypes.func.isRequired,
  activateQuizModal: PropTypes.func.isRequired,
  deactivateQuizModal: PropTypes.func.isRequired,
  handleExportTeacherQuizModal: PropTypes.func,
  searchresultsData: PropTypes.object.isRequired,
};

export default PrintCustomList;
