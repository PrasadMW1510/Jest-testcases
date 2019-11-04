/**
 *
 * UnsavedChangesNavigationModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import './EditAssignmentComponent.scss';

class UnsavedChangesNavigationModal extends React.Component {
  render() {
    return (
      <SAMModal
        isOpen={this.props.cancelWarningNavigationModal}
        modalClassModifier="portfolio-conf-warning"
      >
        <div>
          <div className="portfolio-conf-warning-heading">Warning </div>
          <div className="portfolio-conf-warning-txt">
            You have unsaved changes. Do you want to leave the screen without saving them?
          </div>
          <div className="portfolio-conf-warning-btn">
            <SAMButton isPrimaryButton onClickHandler={this.props.cancelWarningModalconClose}>
              OK
            </SAMButton>
            <SAMButton onClickHandler={this.props.cancelWarningModalconClose}> Cancel </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }
}

UnsavedChangesNavigationModal.propTypes = {
  cancelWarningNavigationModal: PropTypes.bool,
  cancelWarningModalconClose: PropTypes.func.isRequired,
};

export default UnsavedChangesNavigationModal;
