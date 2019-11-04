/**
 *
 * ClearRosterSuccessModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { resetSelections, schoolSelection } from 'containers/SmartBarContainer/actions';
import { makeSelectSchoolId } from 'containers/SmartBarContainer/selectors';
import { makeSelectLoginUserOrg } from 'containers/App/selectors';
import { hideModal } from 'containers/ModalController/actions';
import { USER_ORG } from 'containers/App/constants';
import { usageSummaryRequest } from 'containers/UsageSummaryContainer/actions';
import ClearRosterSuccessModal from 'components/ClearRosterSuccessModal';

export class ClearRosterSuccessModalContainer extends React.Component {
  handleYes = e => {
    e.preventDefault();
    this.props.hideModal();
    this.props.hideModal();
    this.props.resetSelections();
    if (this.props.userOrg === USER_ORG.District) {
      this.props.schoolSelection(this.props.selectedSchoolId);
    }
    this.props.usageSummaryRequest();
  };

  render() {
    return <ClearRosterSuccessModal isOpen onYes={this.handleYes} />;
  }
}

ClearRosterSuccessModalContainer.propTypes = {
  hideModal: PropTypes.func.isRequired,
  usageSummaryRequest: PropTypes.func,
  userOrg: PropTypes.string,
  resetSelections: PropTypes.func.isRequired,
  schoolSelection: PropTypes.func.isRequired,
  selectedSchoolId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userOrg: makeSelectLoginUserOrg(),
  selectedSchoolId: makeSelectSchoolId(),
});
const withConnect = connect(mapStateToProps, {
  hideModal,
  usageSummaryRequest,
  resetSelections,
  schoolSelection,
});

export default compose(withRouter, withConnect)(ClearRosterSuccessModalContainer);
