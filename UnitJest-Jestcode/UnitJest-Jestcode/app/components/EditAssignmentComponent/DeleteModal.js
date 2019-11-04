/**
 *
 * DeleteModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import './EditAssignmentComponent.scss';

class DeleteModal extends React.Component {
  render() {
    return (
      <SAMModal isOpen={this.props.deleteWarningModal} modalClassModifier="portfolio-conf-warning">
        <div>
          <div className="portfolio-conf-warning-heading">Warning </div>
          <div className="portfolio-conf-warning-txt">
            Are you sure you want to delete this assignment? All assignment data will be lost
          </div>
          <div className="portfolio-conf-warning-btn">
            <SAMButton
              isPrimaryButton
              onClickHandler={() => this.props.handleDeleteAssignment(true)}
            >
              {' '}
              Yes{' '}
            </SAMButton>
            <SAMButton onClickHandler={() => this.props.handleDeleteAssignment(false)}>
              {' '}
              No{' '}
            </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }
}

DeleteModal.propTypes = {
  handleDeleteAssignment: PropTypes.func.isRequired,
  deleteWarningModal: PropTypes.bool.isRequired,
};

export default DeleteModal;
