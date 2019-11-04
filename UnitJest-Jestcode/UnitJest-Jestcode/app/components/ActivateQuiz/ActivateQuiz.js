/**
 *
 * ActivateQuiz
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';
import './ActivateQuiz.scss';

class ActivateQuiz extends React.Component {
  activateQuiz = () => {
    this.props.activateQuiz();
  };

  render() {
    const { isOpen } = this.props;
    return (
      <div>
        <SAMModal
          isOpen={isOpen}
          contentLabel="activate Quiz"
          modalClassModifier="modal--activate-quiz"
          id="pcq"
        >
          <div className="print-activatequiz__confirmtext">
            Are you sure you want to activate all of these quizzes?
          </div>
          <div className="print-activate-quiz__buttons">
            <div className="print-activate-quiz__primary-button">
              <SAMButton isPrimaryButton onClickHandler={this.activateQuiz}>
                Yes
              </SAMButton>
            </div>
            <div className="print-activate-quiz__secondary-button">
              <SAMButton onClickHandler={this.props.handleCancel}>No</SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

ActivateQuiz.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  activateQuiz: PropTypes.func.isRequired,
};

export default ActivateQuiz;
