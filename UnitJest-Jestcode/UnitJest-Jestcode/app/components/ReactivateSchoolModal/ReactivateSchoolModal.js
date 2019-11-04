/**
 *
 * ReactivateSchoolModal
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import SAMButton from 'components/SAMButton';
import SAMModal from 'components/SAMModal';

import './ReactivateSchoolModal.scss';

class ReactivateSchoolModal extends React.Component {
  render() {
    return (
      <SAMModal
        isOpen={this.props.isOpen}
        contentLabel=""
        modalClassModifier="reactivate-school-modal"
      >
        <div className="reactivate-school-modal__header">
          <h5 className="reactivate-school-modal__header-title">Reactivate schools</h5>
        </div>
        <div className="reactivate-school-modal__message">
          You have chosen{' '}
          <span className="reactivate-school-modal--bold">{` ${
            this.props.toReactivateCount
          } `}</span>
          {this.props.toReactivateCount === 1 ? 'School' : 'Schools'} for assignment. Are you sure
          you want to reactivate these schools for your district?
        </div>
        <div className="reactivate-school-modal__button-group-container">
          <div className="reactivate-school-modal__button-group">
            <SAMButton
              id="reactivate-school-modal__no-btn"
              buttonClassModifier="reactivate-school-modal__button"
              buttonType="submit"
              onClickHandler={this.props.onCancel}
            >
              Cancel
            </SAMButton>
            <SAMButton
              id="reactivate-school-modal__yes-btn"
              buttonClassModifier="reactivate-school-modal__button"
              isPrimaryButton
              onClickHandler={this.props.onSave}
            >
              Save
            </SAMButton>
          </div>
        </div>
      </SAMModal>
    );
  }
}

ReactivateSchoolModal.propTypes = {
  isOpen: PropTypes.bool,
  toReactivateCount: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ReactivateSchoolModal;
