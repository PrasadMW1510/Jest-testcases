/**
 *
 * DeactivateQuiz
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import './DeactivateQuiz.scss';

class DeactivateQuiz extends React.Component {
  deactivateQuiz = () => {
    this.props.deactivateQuiz();
  };

  render() {
    const { isOpen } = this.props;
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="deactivate Quiz"
          modalClassModifier="modal--deactivate-quiz"
          id="pcq"
        >
          <div className="print-deactivatequiz__confirmtext">
            Are you sure you want to deactivate all of these quizzes?
          </div>
          <div className="print-deactivate-quiz__buttons">
            <div className="print-deactivate-quiz__primary-button">
              <SAMButton isPrimaryButton onClickHandler={this.deactivateQuiz}>
                Yes
              </SAMButton>
            </div>
            <div className="print-deactivate-quiz__secondary-button">
              <SAMButton onClickHandler={this.props.handleCancel}>No</SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

DeactivateQuiz.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  deactivateQuiz: PropTypes.func.isRequired,
};

export default DeactivateQuiz;
