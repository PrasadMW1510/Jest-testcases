/**
 *
 * UnsavedChangesModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import './EditAssignmentComponent.scss';

class UnsavedchangesComponent extends React.Component {
  render() {
    return (
      <SAMModal isOpen={this.props.cancelWarningModal} modalClassModifier="portfolio-conf-warning">
        <div>
          <div className="portfolio-conf-warning-heading">Warning </div>
          <div className="portfolio-conf-warning-txt">
            You have unsaved changes. Do you want to leave the screen without saving them?
          </div>
          <div className="portfolio-conf-warning-btn">
            <button className="btn btn--primary" onClick={this.props.closeStudentGoalModal}>
              Yes
            </button>
            <SAMButton onClickHandler={this.props.cancelWarningModalconClose}> No </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }
}

UnsavedchangesComponent.propTypes = {
  cancelWarningModal: PropTypes.bool,
  closeStudentGoalModal: PropTypes.func.isRequired,
  cancelWarningModalconClose: PropTypes.func.isRequired,
};

export default UnsavedchangesComponent;
