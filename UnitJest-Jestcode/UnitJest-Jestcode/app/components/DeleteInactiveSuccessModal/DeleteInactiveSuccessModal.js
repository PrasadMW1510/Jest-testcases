/**
 * DeleteInactiveSuccessModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import SAMModal from 'components/SAMModal';
import { COHORT_TYPE } from 'containers/App/constants';

import './DeleteInactiveSuccessModal.scss';

function DeleteInactiveSuccessModal(props) {
  function renderMessage() {
    const cohortType = props.data.searchOpts.cohortType;
    let message;

    if (cohortType === COHORT_TYPE.Student) {
      if (props.data.isDelete) {
        const studentSuccessStr =
          props.data.successCount === 1 ? ' student was ' : ' students were ';
        const studentFailureStr = props.data.failureCount === 1 ? ' student ' : ' students ';
        message = (
          <div className="delete-modal-success__message">
            <span className="delete-modal-success--bold">{` ${props.data.successCount} `}</span>{' '}
            {studentSuccessStr} successfully deleted.
            <span className="delete-modal-success--bold">{` ${props.data.failureCount} `}</span>{' '}
            {studentFailureStr} could not be deleted because they are assigned to active classes.
            Click Okay to continue
          </div>
        );
      } else {
        const studentSuccessStr =
          props.data.successCount === 1 ? ' student was ' : ' students were ';
        const studentFailureStr = props.data.failureCount === 1 ? ' student ' : ' students ';
        message = (
          <div className="delete-modal-success__message">
            <span className="delete-modal-success--bold">{` ${props.data.successCount} `}</span>{' '}
            {studentSuccessStr} successfully unenrolled from all programs.
            <span className="delete-modal-success--bold">{` ${props.data.failureCount} `}</span>{' '}
            {studentFailureStr} could not be unenrolled because they are attached to active classes.
            Click Okay to continue
          </div>
        );
      }
    } else if (cohortType === COHORT_TYPE.Teacher) {
      const teacherSuccessStr = props.data.successCount === 1 ? ' teacher was ' : ' teachers were ';
      const teacherFailureStr = props.data.failureCount === 1 ? ' teacher ' : ' teachers ';
      message = (
        <div className="delete-modal-success__message">
          <span className="delete-modal-success--bold">{` ${props.data.successCount} `}</span>{' '}
          {teacherSuccessStr} successfully deleted.
          <span className="delete-modal-success--bold">{` ${props.data.failureCount} `}</span>{' '}
          {teacherFailureStr} could not be deleted because they are assigned to active classes.
          Click Okay to continue
        </div>
      );
    } else if (cohortType === COHORT_TYPE.School) {
      const schoolStr = props.data.successCount === 1 ? ' school ' : ' schools ';
      message = (
        <div className="delete-modal-success__message">
          <span className="delete-modal-success--bold">{` ${props.data.successCount} `}</span>{' '}
          {schoolStr} successfully deleted. Click Okay to continue
        </div>
      );
    } else {
      const classStr = props.data.successCount === 1 ? ' class ' : ' classes ';
      message = (
        <div className="delete-modal-success__message">
          <span className="delete-modal-success--bold">{` ${props.data.successCount} `}</span>{' '}
          {classStr} successfully deleted. Click Okay to continue
        </div>
      );
    }
    return message;
  }

  return (
    <SAMModal isOpen={props.isOpen} contentLabel="" modalClassModifier="delete-modal-success">
      {renderMessage()}
      <div className="delete-modal-success__button">
        <button className="delete-modal-success__yes" onClick={props.onYes}>
          Okay
        </button>
      </div>
    </SAMModal>
  );
}

DeleteInactiveSuccessModal.propTypes = {
  isOpen: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onYes: PropTypes.func.isRequired,
};

export default DeleteInactiveSuccessModal;
