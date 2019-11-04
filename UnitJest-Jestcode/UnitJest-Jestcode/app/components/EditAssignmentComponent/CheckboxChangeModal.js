/**
 *
 * CheckboxChangeModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import './EditAssignmentComponent.scss';

class CheckboxChangeModal extends React.Component {
  render() {
    return (
      <SAMModal
        isOpen={this.props.showSavedGradeModal}
        modalClassModifier="portfolio-conf-warning-saved-grade"
      >
        <div>
          <div className="portfolio-conf-warning-heading">Warning </div>
          <div className="portfolio-conf-warning-txt">
            This student has a saved grade for this assignment. Removing this student from the
            roster will delete his or her grade. Would you like to continue
          </div>
          <div className="portfolio-conf-warning-btn">
            <SAMButton isPrimaryButton onClickHandler={this.props.closeStudentGoalModal}>
              {' '}
              Yes{' '}
            </SAMButton>
            <SAMButton onClickHandler={this.props.handleShowSavedGradeModal}> No </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }
}

CheckboxChangeModal.propTypes = {
  closeStudentGoalModal: PropTypes.func.isRequired,
  handleShowSavedGradeModal: PropTypes.func.isRequired,
  showSavedGradeModal: PropTypes.bool.isRequired,
};

export default CheckboxChangeModal;
