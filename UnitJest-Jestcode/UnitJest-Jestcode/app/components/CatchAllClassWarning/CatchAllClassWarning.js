/**
 *
 * CatchAllClassWarning
 *
 */

import React from 'react';
import SAMModal from 'components/SAMModal';
import SAMButton from 'components/SAMButton';
import PropTypes from 'prop-types';

class CatchAllClassWarning extends React.Component {
  render() {
    return (
      <div>
        <SAMModal
          isOpen={this.props.showAssignmentUpdate}
          modalClassModifier="portfolio-assignment-success"
        >
          <div>
            <div className="portfolio-assignment-success-heading"> </div>
            <div className="portfolio-assignment-success-txt">Assignment Created.</div>
            <div className="portfolio-assignment-success-btn">
              <SAMButton isPrimaryButton onClickHandler={this.props.closeAssignmentUpdate}>
                OK{' '}
              </SAMButton>
            </div>
          </div>
        </SAMModal>
        <SAMModal
          isOpen={this.props.cancelwarningModal}
          modalClassModifier="portfolio-conf-warning"
        >
          <div>
            <div className="portfolio-conf-warning-heading">Warning </div>
            <div className="portfolio-conf-warning-txt">
              You have unsaved changes. Do you want to leave the screen without saving them?- cancel
            </div>
            <div className="portfolio-conf-warning-btn portfolio-conf-warning-popup-btn">
              <SAMButton isPrimaryButton onClickHandler={this.props.yesWarningModalclose}>
                Yes
              </SAMButton>
              <SAMButton onClickHandler={this.props.cancelWarningModalconClose}> No </SAMButton>
            </div>
          </div>
        </SAMModal>
      </div>
    );
  }
}

CatchAllClassWarning.propTypes = {
  showAssignmentUpdate: PropTypes.bool,
  closeAssignmentUpdate: PropTypes.func.isRequired,
  cancelwarningModal: PropTypes.bool,
  yesWarningModalclose: PropTypes.func.isRequired,
  cancelWarningModalconClose: PropTypes.func.isRequired,
};

export default CatchAllClassWarning;
